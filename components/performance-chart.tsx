"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample portfolio performance data
const performanceData = {
  "1M": [
    { date: "Apr 10", value: 100 },
    { date: "Apr 15", value: 102 },
    { date: "Apr 20", value: 98 },
    { date: "Apr 25", value: 103 },
    { date: "Apr 30", value: 105 },
    { date: "May 05", value: 108 },
    { date: "May 10", value: 110 },
  ],
  "3M": [
    { date: "Feb 10", value: 100 },
    { date: "Feb 25", value: 103 },
    { date: "Mar 10", value: 105 },
    { date: "Mar 25", value: 102 },
    { date: "Apr 10", value: 108 },
    { date: "Apr 25", value: 112 },
    { date: "May 10", value: 110 },
  ],
  "6M": [
    { date: "Nov 10", value: 100 },
    { date: "Dec 10", value: 104 },
    { date: "Jan 10", value: 108 },
    { date: "Feb 10", value: 105 },
    { date: "Mar 10", value: 110 },
    { date: "Apr 10", value: 115 },
    { date: "May 10", value: 110 },
  ],
  "1Y": [
    { date: "May 2024", value: 100 },
    { date: "Jul 2024", value: 105 },
    { date: "Sep 2024", value: 110 },
    { date: "Nov 2024", value: 108 },
    { date: "Jan 2025", value: 115 },
    { date: "Mar 2025", value: 120 },
    { date: "May 2025", value: 110 },
  ],
}

export default function PerformanceChart() {
  const [activeTab, setActiveTab] = useState("1M")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const data = performanceData[activeTab as keyof typeof performanceData]
  const startValue = data[0].value
  const currentValue = data[data.length - 1].value
  const percentageChange = ((currentValue - startValue) / startValue) * 100
  const isPositive = percentageChange >= 0

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Portfolio Performance</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <span className={isPositive ? "text-green-500" : "text-red-500"}>
              {isPositive ? "+" : ""}
              {percentageChange.toFixed(2)}%
            </span>
            <span className="text-muted-foreground">vs. benchmark</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="1M" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="1M">1M</TabsTrigger>
            <TabsTrigger value="3M">3M</TabsTrigger>
            <TabsTrigger value="6M">6M</TabsTrigger>
            <TabsTrigger value="1Y">1Y</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    domain={["dataMin - 5", "dataMax + 5"]}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="font-medium">{payload[0].payload.date}</div>
                              <div className="font-medium text-right">{payload[0].value}</div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={isPositive ? "#10b981" : "#ef4444"}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
