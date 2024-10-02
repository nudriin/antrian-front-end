import { useCallback, useEffect, useState } from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "./ui/chart"
import { DailyQueueTotalStats } from "../types/queue"
import { toZonedTime } from "date-fns-tz"
import { format } from "date-fns"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { IoTrendingUp } from "react-icons/io5"

export default function BarCharts() {
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
