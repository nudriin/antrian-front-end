import { useCallback, useEffect, useRef, useState } from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"
import { QueueDistributionByLocket } from "../types/queue"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "./ui/chart"
import { Pie, PieChart } from "recharts"
import * as htmlToImage from "html-to-image"
import { saveAs } from "file-saver"
import { Button } from "./ui/button"
import { LuDownload } from "react-icons/lu"

export default function PieCharts() {
    const [chartData, setChartata] = useState<QueueDistributionByLocket[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const chartRef = useRef(null)

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

    // Function to download the chart as PNG
    const downloadChartAsPng = async () => {
        if (chartRef.current) {
            const dataUrl = await htmlToImage.toPng(chartRef.current)
            saveAs(dataUrl, "daily-queue-chart.png")
        }
    }

    return (
        <Card ref={chartRef} className="flex flex-col">
            <Button
                onClick={downloadChartAsPng}
                size={"icon"}
                variant={"ghost"}
                className="m-2"
            >
                <LuDownload />
            </Button>
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
