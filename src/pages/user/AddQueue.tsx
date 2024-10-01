import React, { useCallback, useEffect, useState } from "react"
import { IoMdAddCircle } from "react-icons/io"
import { Locket } from "../../types/locket"
import { useCookies } from "react-cookie"
import { socket } from "../../socket"
import { useToast } from "@chakra-ui/react"
import { QueueAggregateResponse } from "../../types/queue"
import printQueue from "../../helper/printQueue"
import HeaderLayout from "../../components/HeaderLayout"
import getLocketCodeFromName from "../../helper/getLocketCodeFromName"
import Footer from "../../components/Footer"

export default function AddQueue() {
    const [loading, setLoading] = useState(false)
    const [locket, setLocket] = useState<Locket[]>([])
    const [queues, setQueues] = useState<Map<number, QueueAggregateResponse>>(
        new Map()
    )
    const [cookies] = useCookies(["auth"])
    const toast = useToast()

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

    const getTotalQueue = useCallback(async () => {
        if (locket.length === 0) return // Exit if no locket data

        try {
            setLoading(true)
            const queuePromises = locket.map(async (value) => {
                const response = await fetch(`/api/queue/${value.id}/total`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

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
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }, [locket])

    useEffect(() => {
        getAllLocket()
    }, [getAllLocket])

    useEffect(() => {
        getTotalQueue()
    }, [getTotalQueue])

    useEffect(() => {
        setLoading(true)

        socket.connect()

        socket.on("connect", () => {
            console.log(socket.id) // an alphanumeric id...
        })

        socket.on("total", () => {
            getTotalQueue()
        })

        setLoading(false)
        return () => {
            socket.disconnect()
        }
    }, [getTotalQueue])

    const addQueue = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        socket.emit("getTotalQueue", parseInt(e.currentTarget.value))
        socket.emit("getRemainQueue", parseInt(e.currentTarget.value))
        socket.emit("getNextQueue", parseInt(e.currentTarget.value))
        socket.emit("getAllQueue", parseInt(e.currentTarget.value))

        try {
            setLoading(true)
            const token = cookies.auth
            const response = await fetch("/api/queue", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    locket_id: e.currentTarget.value,
                }),
            })

            const body = await response.json()

            console.log(body.data)
            if (!body.errors) {
                setLoading(true)
                await getTotalQueue()
                toast({
                    title: "Berhasil",
                    description: `Antrian berhasil di ambil`,
                    status: "success",
                })
                setLoading(false)
            } else {
                setLoading(false)
                toast({
                    title: "Gagal",
                    description: `Terjadi error ${body.errors}`,
                    status: "error",
                })
                throw new Error(body.errors)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    return (
        <>
            <HeaderLayout>
                <section className="min-h-full">
                    <div className="grid grid-cols-4 gap-4">
                        {locket.map((value: Locket, index: number) => {
                            const totalQueue = queues.get(value.id)?.total ?? 0
                            const locketCode = getLocketCodeFromName(value.name)
                            const total = `${locketCode}${String(
                                totalQueue
                            ).padStart(2, "0")}`
                            const totalPrint = `${locketCode}${String(
                                typeof totalQueue === "number"
                                    ? totalQueue + 1
                                    : 1
                            ).padStart(2, "0")}`
                            return (
                                <div
                                    key={index}
                                    className={`
                                    ${index > 3 ? "col-span-2" : "col-span-1"}
                                    rounded-2xl
                                    ${
                                        index === 1
                                            ? "bg-primary text-secondary"
                                            : ""
                                    }
                                    ${
                                        index === 2
                                            ? "bg-highlight text-white"
                                            : ""
                                    }
                                    ${
                                        index === locket.length - 1
                                            ? "bg-secondary text-primary"
                                            : ""
                                    }
                                    ${
                                        index !== 1 &&
                                        index !== 2 &&
                                        index !== locket.length - 1
                                            ? "bg-white"
                                            : ""
                                    }
                                    `}
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
                                    <button
                                        onClick={(
                                            e: React.MouseEvent<HTMLButtonElement>
                                        ) => {
                                            addQueue(e)
                                            printQueue(totalPrint, value.name)
                                        }}
                                        value={value.id}
                                        disabled={loading}
                                        className={`flex gap-2 items-center justify-center mx-auto mb-4 py-3 px-3 rounded-full font-semibold hover:bg-muted ${
                                            index === 1
                                                ? "bg-secondary text-primary"
                                                : ""
                                        }
                                    ${
                                        index === 2
                                            ? "bg-white text-primary"
                                            : ""
                                    }
                                    ${
                                        index === locket.length - 1
                                            ? "bg-primary text-white"
                                            : ""
                                    }
                                    ${
                                        index !== 1 &&
                                        index !== 2 &&
                                        index !== locket.length - 1
                                            ? "bg-primary text-white"
                                            : ""
                                    }`}
                                    >
                                        <IoMdAddCircle size={25} /> Tambah
                                        Antrian
                                    </button>
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
