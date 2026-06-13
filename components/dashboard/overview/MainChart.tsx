"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const description = "Overview statistics chart"

// FIXED: Aligned color variables to correctly target shadcn theme overrides
const chartConfig = {
    visitors: {
        label: "Proposals/Clients",
    },
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function MainChart({ statistics }: any) {
    const [timeRange, setTimeRange] = React.useState("90d")

    const filteredData = React.useMemo(() => {
        // FIXED: Use the 'statistics' prop safely instead of referencing undefined 'chartData'
        return statistics.filter((item: any) => {
            const date = new Date(item.date)

            // FIXED: Swapped static historical date reference for a dynamic current runtime timestamp
            const referenceDate = new Date()

            let daysToSubtract = 90
            if (timeRange === "30d") {
                daysToSubtract = 30
            } else if (timeRange === "7d") {
                daysToSubtract = 7
            }

            const startDate = new Date(referenceDate)
            startDate.setDate(startDate.getDate() - daysToSubtract)
            return date >= startDate
        })
    }, [statistics, timeRange])

    return (
        <div className="w-full">
            <Card className="border-none shadow-sm bg-card rounded-2xl overflow-hidden">
                {/* DESIGN FIX: Enhanced spacing, removed harsh border-b, and handled padding alignment */}
                <CardHeader className="flex flex-col gap-4 px-6 pt-6 pb-2 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                    <div className="grid gap-1">
                        <CardTitle className="text-xl font-bold font-heading tracking-tight text-foreground">
                            CRM Activity
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            Timeline tracking client acquisitions and generated proposals.
                        </CardDescription>
                    </div>

                    <Select value={timeRange} onValueChange={(val) => setTimeRange(val || "90d")}>
                        <SelectTrigger
                            className="w-full sm:w-[160px] h-9 rounded-xl border border-border bg-background text-sm font-medium shadow-sm transition-colors focus:ring-1 focus:ring-primary"
                            aria-label="Select a time range"
                        >
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border border-border bg-popover shadow-md">
                            <SelectItem value="90d" className="rounded-lg cursor-pointer">
                                Last 3 months
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg cursor-pointer">
                                Last 30 days
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg cursor-pointer">
                                Last 7 days
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>

                {/* DESIGN FIX: Standardized internal padding to keep chart spacing clean */}
                <CardContent className="px-4 pb-6 pt-2 sm:px-6 sm:pb-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[280px] w-full"
                    >
                        {filteredData.length === 0 ? (
                            <div className="h-full w-full p-6 flex items-center justify-center text-muted-foreground italic text-sm bg-muted/10 rounded-xl border border-dashed border-border">
                                No activity records found for this timeframe.
                            </div>
                        ) : (
                            <AreaChart
                                data={filteredData}
                                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                            >
                                <defs>
                                    {/* DESIGN FIX: Adjusted opacity targets for a premium glass-like fade effect */}
                                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="0%"
                                            stopColor="var(--chart-1)"
                                            stopOpacity={0.2}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="var(--chart-1)"
                                            stopOpacity={0.0}
                                        />
                                    </linearGradient>
                                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="0%"
                                            stopColor="var(--chart-2)"
                                            stopOpacity={0.2}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="var(--chart-2)"
                                            stopOpacity={0.0}
                                        />
                                    </linearGradient>
                                </defs>

                                {/* DESIGN FIX: Softened the grid line colors */}
                                <CartesianGrid vertical={false} strokeDasharray="4 4" className="stroke-muted/30" />

                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={12}
                                    minTickGap={40}
                                    className="text-xs font-medium text-muted-foreground/80"
                                    tickFormatter={(value) => {
                                        const date = new Date(value)
                                        if (isNaN(date.getTime())) return value
                                        return date.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                />

                                <ChartTooltip
                                    cursor={{ stroke: "var(--border)", strokeWidth: 1, strokeDasharray: "4 4" }}
                                    content={
                                        <ChartTooltipContent
                                            className="rounded-xl border border-border bg-popover p-2 shadow-xl"
                                            labelFormatter={(value) => {
                                                const date = new Date(value)
                                                if (isNaN(date.getTime())) return value
                                                return date.toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric"
                                                })
                                            }}
                                            indicator="dot"
                                        />
                                    }
                                />

                                {/* DESIGN FIX: Standardized strokeWidths to 2px with cleaner joins */}
                                <Area
                                    dataKey="mobile"
                                    type="monotone"
                                    fill="url(#fillMobile)"
                                    stroke="var(--chart-2)"
                                    stackId="a"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 4, strokeWidth: 0 }}
                                />
                                <Area
                                    dataKey="desktop"
                                    type="monotone"
                                    fill="url(#fillDesktop)"
                                    stroke="var(--chart-1)"
                                    stackId="a"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 4, strokeWidth: 0 }}
                                />
                                <ChartLegend className="mt-4" content={<ChartLegendContent />} />
                            </AreaChart>
                        )}
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}