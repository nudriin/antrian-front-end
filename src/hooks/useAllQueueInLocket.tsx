import { useCallback, useEffect, useState } from "react"
import { Queue } from "../types/queue"
import { Locket } from "../types/locket"
import { socket } from "../socket"

export default function useAllQueueInLocket(name: string) {
    const [locket, setLocket] = useState<Locket>()
    const [queues, setQueues] = useState<Queue[]>()
    const [loading, setLoading] = useState<boolean>(false)

    const getLocketName = useCallback(async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/locket/${name}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const body = await response.json()

            if (!body.errors) {
                setLocket(body.data)
                setLoading(false)
            } else {
                setLoading(false)
                throw new Error(body.errors)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }, [name])

    const getAllQueue = useCallback(async () => {
        try {
            if (!loading && locket?.id) {
                const response = await fetch(
                    `/api/queue/locket/${locket?.id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )

                const body = await response.json()

                if (!body.errors) {
                    setQueues(() => body.data)
                    setLoading(false)
                } else {
                    setLoading(false)
                    throw new Error(body.errors)
                }
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }, [loading, locket])

    useEffect(() => {
        getLocketName()
    }, [getLocketName])

    useEffect(() => {
        getAllQueue()
    }, [getAllQueue])

    useEffect(() => {
        socket.connect()

        const onAllQueue = () => {
            getAllQueue()
        }
        socket.on("allQueue", onAllQueue)

        return () => {
            socket.off("allQueue", onAllQueue)
        }
    }, [getAllQueue])

    return queues
}
