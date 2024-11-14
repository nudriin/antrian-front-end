import { useCallback, useEffect, useState } from "react"
import { Locket } from "../../types/locket"
import { socket } from "../../socket"
import { QueueAggregateResponse } from "../../types/queue"
import HeaderLayout from "../../components/HeaderLayout"
import getLocketCodeFromName from "../../helper/getLocketCodeFromName"
import Footer from "../../components/Footer"

export default function Queue() {
    const [, setLoading] = useState(false)
    const [locket, setLocket] = useState<Locket[]>([])
    const [queues, setQueues] = useState<Map<number, QueueAggregateResponse>>(
        new Map()
    )

    const getAllLocket = useCallback(async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/locket", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const body = await response.json()

            if (!body.errors) {
                setLocket(body.data)
            } else {
                throw new Error(body.errors)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [])

    const getCurrentQueue = useCallback(async () => {
        if (locket.length === 0) return

        try {
            setLoading(true)
            const queuePromises = locket.map(async (value) => {
                const response = await fetch(
                    `/api/queue/locket/${value.id}/current`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )

                return await response.json()
            })

            const result = await Promise.all(queuePromises)
            const queueMap = new Map<number, QueueAggregateResponse>()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            result.forEach((result: any) => {
                if (!result.errors) {
                    queueMap.set(result.data.locket_id, result.data)
                } else {
                    console.error(result.errors)
                    throw new Error(result.errors)
                }
            })

            setQueues(queueMap)
            console.log(queueMap)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [locket])

    useEffect(() => {
        getAllLocket()
    }, [getAllLocket])

    useEffect(() => {
        getCurrentQueue()
    }, [getCurrentQueue])

    useEffect(() => {
        socket.connect()

        socket.on("currentQueue", () => {
            getCurrentQueue()
        })

        return () => {
            socket.disconnect()
        }
    }, [getCurrentQueue, locket])

    return (
        <>
            <HeaderLayout>
                <section className="min-h-full">
                    <div className="gap-4 space-y-3 lg:space-y-0 sm:grid lg:grid-cols-4">
                        {locket.map((value: Locket, index: number) => {
                            const totalQueue =
                                queues.get(value.id)?.currentQueue ?? 0
                            const locketCode = getLocketCodeFromName(value.name)
                            const total = `${locketCode}${String(
                                totalQueue
                            ).padStart(2, "0")}`

                            let backgroundColor = "bg-white"
                            let textColor = "text-primary"

                            if (index === 0) {
                                backgroundColor = "bg-[#8E8CFF]"
                                textColor = "text-primary"
                            } else if (index === 1) {
                                backgroundColor = "bg-[#FFB800]"
                                textColor = "text-primary"
                            } else if (index === 2) {
                                backgroundColor = "bg-[#FF6B6B]"
                                textColor = "text-primary"
                            } else if (index === 3) {
                                backgroundColor = "bg-[#00CCFF]"
                                textColor = "text-primary"
                            } else if (index === 4) {
                                backgroundColor = "bg-[#4EB4C0]"
                                textColor = "text-primary"
                            } else if (index === 5) {
                                backgroundColor = "bg-[#FF93D2]"
                                textColor = "text-primary"
                            } else if (index === 6) {
                                backgroundColor = "bg-[#73FF73]"
                                textColor = "text-primary"
                            }
                            return (
                                <div
                                    key={index}
                                    className={`p-2 rounded-2xl ${backgroundColor} ${textColor}`}
                                >
                                    <h3
                                        className={`text-2xl my-3 uppercase font-semibold`}
                                    >
                                        Antrian
                                    </h3>
                                    <h1 className={`text-6xl my-6 font-bold`}>
                                        {total}
                                    </h1>
                                    <h3
                                        className={`text-2xl my-3 uppercase font-semibold`}
                                    >
                                        Loket {value.name}
                                    </h3>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </HeaderLayout>
            <Footer />
        </>
    )
}
