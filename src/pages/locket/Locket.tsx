import React, { useEffect, useState } from "react"
import LocketComponent from "../../components/LocketComponent"
import { socket } from "../../socket"
import { Locket as LocketType } from "../../types/locket"
import { Queue, QueueAggregateResponse } from "../../types/queue"
import { useToast } from "@chakra-ui/react"
import { useCookies } from "react-cookie"
import useTotalQueue from "../../hooks/useTotalQueue"
import useNextQueue from "../../hooks/useNextQueue"
import useCurrentQueue from "../../hooks/useCurrentQueue"
import useAllQueueInLocket from "../../hooks/useAllQueueInLocket"
import useLocketByName from "../../hooks/useLocketByName"
import useRemainQueue from "../../hooks/useRemainQueue"
import { useParams } from "react-router-dom"
import getLocketCodeFromName from "../../helper/getLocketCodeFromName"

export default function Locket() {
    const { locketName } = useParams()
    const total = useTotalQueue(locketName || "")
    const initialNext = useNextQueue(locketName || "")
    const initialCurrent = useCurrentQueue(locketName || "")
    const initialRemain = useRemainQueue(locketName || "")
    const initialQueues = useAllQueueInLocket(locketName || "")
    const initalLocket = useLocketByName(locketName || "")
    const [cookie] = useCookies(["auth"])
    const token = cookie.auth
    const toast = useToast()

    const [remain, setRemain] = useState<QueueAggregateResponse | undefined>(
        undefined
    )
    const [next, setNext] = useState<QueueAggregateResponse | undefined>(
        undefined
    )
    const [current, setCurrent] = useState<QueueAggregateResponse | undefined>(
        undefined
    )
    const [queues, setQueues] = useState<Queue[] | undefined | []>(undefined)
    const [locket, setLocket] = useState<LocketType | undefined>(undefined)

    useEffect(() => {
        if (initialRemain !== undefined) {
            setRemain(initialRemain)
        }
        if (initialNext !== undefined) {
            setNext(initialNext)
        }
        if (initialCurrent !== undefined) {
            setCurrent(initialCurrent)
        }
        if (initialQueues !== undefined) {
            setQueues(initialQueues)
        }
        if (initalLocket !== undefined) {
            setLocket(initalLocket)
        }
    }, [
        initialRemain,
        initialNext,
        initialCurrent,
        initialQueues,
        initalLocket,
    ])

    const handleCall = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        try {
            const id = e.currentTarget.value
            const response = await fetch(`/api/queue/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })

            const body = await response.json()
            if (!body.errors) {
                socket.emit("getRemainQueue", locket?.id)
                socket.emit("getNextQueue", locket?.id)
                socket.emit("getCurrentQueue", locket?.id)
                socket.emit("getAllQueue", locket?.id)
                console.log(body)
                toast({
                    title: "Berhasil",
                    description: `Antrian A${body.data.queue_number} berhasil di panggil!`,
                    status: "success",
                })
            } else {
                toast({
                    title: "Gagal",
                    description: `${body.errors}`,
                    status: "error",
                })
                console.log(body.errors)
                throw new Error(body.errors)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handlePending = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        try {
            const id = e.currentTarget.value
            const response = await fetch(`/api/queue/${id}/pending`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })

            const body = await response.json()
            if (!body.errors) {
                socket.emit("getRemainQueue", locket?.id)
                socket.emit("getNextQueue", locket?.id)
                socket.emit("getCurrentQueue", locket?.id)
                socket.emit("getAllQueue", locket?.id)
                console.log(body)
                toast({
                    title: "Berhasil",
                    description: `Antrian A${body.data.queue_number} berhasil di tahan!`,
                    status: "success",
                })
            } else {
                toast({
                    title: "Gagal",
                    description: `${body.errors}`,
                    status: "error",
                })
                console.log(body.errors)
                throw new Error(body.errors)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleReset = async () => {
        try {
            const response = await fetch(
                `/api/queue/locket/${locket?.id}/reset`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const body = await response.json()
            if (!body.errors) {
                socket.emit("getTotalQueue", locket?.id)
                socket.emit("getRemainQueue", locket?.id)
                socket.emit("getNextQueue", locket?.id)
                socket.emit("getCurrentQueue", locket?.id)
                socket.emit("getAllQueue", locket?.id)
                toast({
                    title: "Berhasil",
                    description: `Antrian berhasil di reset`,
                    status: "success",
                })
            } else {
                toast({
                    title: "Gagal",
                    description: `${body.errors}`,
                    status: "error",
                })
                console.log(body.errors)
                throw new Error(body.errors)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const locketCode = getLocketCodeFromName(locketName)

    return (
        <LocketComponent
            title={`Locket ${locket?.name?.toLocaleUpperCase()}`}
            total={total}
            current={current}
            next={next}
            remain={remain}
            locket={locket}
            queues={queues}
            locketCode={locketCode}
            handleCall={handleCall}
            handlePending={handlePending}
            handleReset={handleReset}
        />
    )
}
