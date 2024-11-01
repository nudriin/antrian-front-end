import { useCallback, useEffect, useRef, useState } from "react"
import { QueueStatsByLocketLastMonth } from "../types/queue"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import * as XLSX from "xlsx" // Tambahkan import untuk xlsx

export default function AdminReportTable() {
    const [data, setData] = useState<QueueStatsByLocketLastMonth>()
    const [dataSixMonths, setDataSixMonths] =
        useState<QueueStatsByLocketLastMonth>()
    const [dataAllTme, setDataAllTime] = useState<QueueStatsByLocketLastMonth>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedRange, setSelectedRange] = useState("30_days") // Tambah state untuk filter
    const tableRef = useRef<HTMLTableElement>(null)

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

    const getAllLastSixMonthStats = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await fetch(
                "/api/queue/all/queue-stats-last-six-month",
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
                setDataSixMonths(body.data)
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

    const getAllTime = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await fetch(
                "/api/queue/all/queue-stats-all-time",
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
                setDataAllTime(body.data)
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
        if (selectedRange === "30_days") {
            getAllDailyStats()
        } else if (selectedRange === "6_months") {
            getAllLastSixMonthStats()
        } else if (selectedRange === "all_time") {
            getAllTime()
        }
    }, [getAllDailyStats, getAllLastSixMonthStats, getAllTime, selectedRange])

    const exportToExcel = () => {
        if (!tableRef.current) return
        const dates = new Date().toLocaleDateString()
        const table = tableRef.current
        const wb = XLSX.utils.table_to_book(table)
        XLSX.writeFile(wb, `Laporan ${dates} .xlsx`)
    }

    const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRange(event.target.value)
    }

    // Tentukan data berdasarkan rentang waktu yang dipilih
    let displayedData
    if (selectedRange === "30_days") {
        displayedData = data
    } else if (selectedRange === "6_months") {
        displayedData = dataSixMonths
    } else if (selectedRange === "all_time") {
        displayedData = dataAllTme
    }

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

    if (!displayedData || Object.keys(displayedData).length === 0) {
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
            Object.values(displayedData).flatMap((category) =>
                Object.keys(category)
            )
        ),
    ].sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

    const categories = Object.keys(displayedData)

    return (
        <div className="py-4 overflow-x-auto bg-white border shadow border-primary/20 rounded-2xl">
            <div className="flex items-center justify-between mx-6 mb-6">
                <h1 className="text-2xl font-semibold">
                    Tabel Distribusi Antrian
                </h1>
                <div className="flex items-center space-x-4">
                    <select
                        value={selectedRange}
                        onChange={handleRangeChange}
                        className="p-1 border-2 rounded-lg border-primary"
                    >
                        <option value="30_days">30 Hari Terakhir</option>
                        <option value="6_months">6 Bulan Terakhir</option>
                        <option value="all_time">Semua</option>
                    </select>
                    <Button className="bg-highlight" onClick={exportToExcel}>
                        Export (xlsx)
                    </Button>
                </div>
            </div>
            <table className="w-full min-w-[600px]" ref={tableRef}>
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
                                "hover:bg-slate-300",
                                index % 2 == 0 && "bg-muted"
                            )}
                        >
                            <td className="p-2 text-center border-b border-b-primary/20">
                                {date.substring(0, 10)}
                            </td>
                            {categories.map((category) => (
                                <td
                                    key={`${date}-${category}`}
                                    className="p-2 text-center border-b border-b-primary/20"
                                >
                                    {displayedData[category][date] || 0}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
