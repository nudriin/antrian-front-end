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
import LocketComponent from "../../components/LocketComponent"

export default function LocketUmpeg() {
    const total = useTotalQueue("umpeg")
    const initialNext = useNextQueue("umpeg")
    const initialCurrent = useCurrentQueue("umpeg")
    const initialRemain = useRemainQueue("umpeg")
    const initialQueues = useAllQueueInLocket("umpeg")
    const initalLocket = useLocketByName("umpeg")
    const [cookie] = useCookies(["auth"])
    const token = cookie.auth

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
            } else {
                console.log(body.errors)
                throw new Error(body.errors)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <LocketComponent
            title="Locket UMPEG"
            total={total}
            current={current}
            next={next}
            remain={remain}
            locket={locket}
            queues={queues}
            locketCode="E"
            handleCall={handleCall}
            textToSpeech={textToSpeech}
        />
    )
}
