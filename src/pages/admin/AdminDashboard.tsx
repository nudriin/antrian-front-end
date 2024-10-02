import { useCallback, useEffect, useState } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Card, CardContent } from "../../components/ui/card"
import { QueueTotalStats } from "../../types/queue"
import BarCharts from "../../components/BarCharts"
import PieCharts from "../../components/PieCharts"

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <div className="p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <StatsCards />
                    <PieCharts />
                    <div className="col-span-2">
                        <BarCharts />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

function StatsCards() {
    const [statistics, setStatistics] = useState<QueueTotalStats>()

    const getAllStats = useCallback(async () => {
        try {
            const response = await fetch("/api/queue/all/statistics", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const body = await response.json()
            if (!body.errors) {
                setStatistics(body.data)
            } else {
                throw new Error(body.errors)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getAllStats()
    }, [getAllStats])

    return (
        <>
            <StatsCard content="Hari Ini" data={statistics?.totalToday} />
            <StatsCard content="Minggu Ini" data={statistics?.totalWeek} />
            <StatsCard content="Bulan Ini" data={statistics?.totalMonth} />
        </>
    )
}

function StatsCard({
    content,
    data,
}: {
    content: string
    data: number | undefined
}) {
    return (
        <Card className="h-full gap-4 text-left rounded-2xl group border-primary/20 hover:cursor-pointer">
            <CardContent className="mt-7">
                <div className="mb-1 font-semibold">Total Antrian</div>
                <div className="text-4xl font-bold">+{data}</div>
                <div className="text-muted-foreground">{content}</div>
            </CardContent>
        </Card>
    )
}
