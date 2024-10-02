import { useCallback, useEffect, useState } from "react"
import AdminLayout from "../../components/AdminLayout"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"
import {
    DailyQueueTotalStats,
    QueueDistributionByLocket,
    QueueTotalStats,
} from "../../types/queue"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../../components/ui/chart"
import { Bar, BarChart, CartesianGrid, Pie, XAxis, PieChart } from "recharts"
import { IoTrendingUp } from "react-icons/io5"
import { toZonedTime } from "date-fns-tz"
import { format } from "date-fns"

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <div className="p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <StatsCards />
                    <PieCharts />
                    <div className="col-span-2">
                        <LineChart />
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

function LineChart() {
    const [data, setData] = useState<DailyQueueTotalStats[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const color = "#446AEF"
    const timeZone = "Asia/Jakarta"
    const today = format(toZonedTime(new Date(), timeZone), "LLLL")

    const getAllDailyStats = useCallback(async () => {
        try {
            setLoading(true)
            const response = await fetch(
                "/api/queue/all/daily-queue-last-mounth",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            const body = await response.json()
            if (!body.errors) {
                setLoading(false)
                setData(body.data)
            } else {
                setLoading(false)
                throw new Error(body.errors)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getAllDailyStats()
    }, [getAllDailyStats])

    let chartData
    if (!loading) {
        chartData = data?.map((val) => {
            return {
                date: format(toZonedTime(val.date, timeZone), "PP"),
                count: val.count,
            }
        })
    }

    const chartConfig = {
        antrian: {
            label: "Antrian",
            color: color,
        },
    } satisfies ChartConfig

    return (
        <Card>
            <CardHeader>
                <CardTitle>Grafik Antrian Harian</CardTitle>
                <CardDescription>{today}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="count" fill={color} radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending antrian harian pada bulan ini{" "}
                    <IoTrendingUp className="w-4 h-4" />
                </div>
            </CardFooter>
        </Card>
    )
}

function PieCharts() {
    const [chartData, setChartata] = useState<QueueDistributionByLocket[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const color = "#446AEF"

    const getAllDailyStats = useCallback(async () => {
        try {
            setLoading(true)
            const response = await fetch(
                "/api/queue/all/queue-distribution-locket",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            const body = await response.json()
            if (!body.errors) {
                setLoading(false)
                setChartata(body.data)
            } else {
                setLoading(false)
                throw new Error(body.errors)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getAllDailyStats()
    }, [getAllDailyStats])
    let data
    if (!loading) {
        data = chartData.map((value, index) => {
            const fill = index % 2 == 0 ? "#446AEF" : "#C7FE1E"
            return {
                locket: value.locket,
                count: value.count,
                fill: fill,
            }
        })
    }

    const chartConfig = {
        antrian: {
            label: "Loket",
            color: color,
        },
        count: {
            label: "Jumlah",
        },
    } satisfies ChartConfig
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Distirbusi Antrian Pada setiap Loket</CardTitle>
                <CardDescription>All Time</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    nameKey="locket"
                                    hideLabel
                                />
                            }
                        />
                        <Pie
                            data={data}
                            dataKey="count"
                            label
                            nameKey="locket"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Distribusi seluruh antrian yang ada pada loket{" "}
                </div>
            </CardFooter>
        </Card>
    )
}
