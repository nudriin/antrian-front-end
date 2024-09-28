import useTotalQueue from "../../hooks/useTotalQueue"
import useNextQueue from "../../hooks/useNextQueue"
import useCurrentQueue from "../../hooks/useCurrentQueue"
import useRemainQueue from "../../hooks/useRemainQueue"
import useAllQueueInLocket from "../../hooks/useAllQueueInLocket"
import React, { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { socket } from "../../socket"
import { Queue, QueueAggregateResponse } from "../../types/queue"
import useLocketByName from "../../hooks/useLocketByName"
import { Locket } from "../../types/locket"
import textToSpeech from "../../helper/textToSpeech"
import { useToast } from "@chakra-ui/react"
import LocketComponent from "../../components/LocketComponent"

export default function LocketPaud() {
    const total = useTotalQueue("paud")
    const initialNext = useNextQueue("paud")
    const initialCurrent = useCurrentQueue("paud")
    const initialRemain = useRemainQueue("paud")
    const initialQueues = useAllQueueInLocket("paud")
    const initalLocket = useLocketByName("paud")
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
    const [locket, setLocket] = useState<Locket | undefined>(undefined)

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

    return (
        <LocketComponent
            title="Locket PAUD"
            total={total}
            current={current}
            next={next}
            remain={remain}
            locket={locket}
            queues={queues}
            locketCode="A"
            handleCall={handleCall}
            textToSpeech={textToSpeech}
        />
    )
}
