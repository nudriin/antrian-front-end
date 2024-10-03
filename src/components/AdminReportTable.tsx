import { useCallback, useEffect, useState } from "react"
import { QueueStatsByLocketLastMonth } from "../types/queue"
import { cn } from "../lib/utils"

export default function AdminReportTable() {
    const [data, setData] = useState<QueueStatsByLocketLastMonth>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const getAllDailyStats = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await fetch(
                "/api/queue/all/queue-stats-last-month",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const body = await response.json()
            if (!body.errors) {
                setData(body.data)
            } else {
                throw new Error(body.errors)
            }
        } catch (error) {
            console.error(error)
            setError(
                error instanceof Error ? error.message : "An error occurred"
            )
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        getAllDailyStats()
    }, [getAllDailyStats])

    if (isLoading) {
        return (
            <div className="p-4 bg-white border-b border-b-primary/20 rounded-2xl">
                <div className="flex items-center justify-center h-40">
                    <div className="text-lg">Loading data...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-4 bg-white border-b border-b-primary/20 rounded-2xl">
                <div className="flex items-center justify-center h-40">
                    <div className="text-lg text-red-500">Error: {error}</div>
                </div>
            </div>
        )
    }

    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="p-4 bg-white border-b border-b-primary/20 rounded-2xl">
                <div className="flex items-center justify-center h-40">
                    <div className="text-lg">No data available</div>
                </div>
            </div>
        )
    }

    const allDates = [
        ...new Set(
            Object.values(data).flatMap((category) => Object.keys(category))
        ),
    ].sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

    const categories = Object.keys(data)

    return (
        <div className="py-4 overflow-x-auto bg-white border shadow border-primary/20 rounded-2xl">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">
                    Distribusi Antrian per Tanggal
                </h1>
            </div>
            <table className="w-full min-w-[600px]">
                <thead>
                    <tr>
                        <th className="p-2 border-b border-b-primary/20">
                            Tanggal
                        </th>
                        {categories.map((category) => (
                            <th
                                key={category}
                                className="p-2 border-b border-b-primary/20"
                            >
                                {category.toUpperCase()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {allDates.map((date, index) => (
                        <tr
                            key={date}
                            className={cn(
                                "hover:bg-muted-foreground",
                                index % 2 == 0 && "bg-muted"
                            )}
                        >
                            <td className="p-2 text-center border-b border-b-primary/20">
                                {new Date(date).toLocaleDateString()}
                            </td>
                            {categories.map((category) => (
                                <td
                                    key={`${date}-${category}`}
                                    className="p-2 text-center border-b border-b-primary/20"
                                >
                                    {data[category][date] || 0}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
