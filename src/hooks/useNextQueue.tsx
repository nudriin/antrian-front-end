import { useCallback, useEffect, useState } from "react"
import { Locket } from "../types/locket"
import { socket } from "../socket"
import { QueueAggregateResponse } from "../types/queue"

export default function useNextQueue(name: string) {
    const [locket, setLocket] = useState<Locket>()
    const [next, setNext] = useState<QueueAggregateResponse>()
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

    const getNextQueue = useCallback(async () => {
        try {
            if (!loading && locket?.id) {
                const response = await fetch(
                    `/api/queue/locket/${locket?.id}/next`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )

                const body = await response.json()
                if (!body.errors) {
                    setNext(body.data)
                    setLoading(false)
                } else {
                    setLoading(false)
                    throw new Error(body.errors)
                }
            } else {
                setLoading(false)
                return
            }
        } catch (error) {
            console.log(error)
        }
    }, [loading, locket])

    useEffect(() => {
        getLocketName()
    }, [getLocketName])

    useEffect(() => {
        getNextQueue()
    }, [getNextQueue])

    useEffect(() => {
        socket.connect()

        const onNextQueue = (data: QueueAggregateResponse) => {
            setNext(data)
        }

        socket.on("nextQueue", onNextQueue)

        return () => {
            socket.off("nextQueue", onNextQueue)
        }
    }, [])

    return next
}
