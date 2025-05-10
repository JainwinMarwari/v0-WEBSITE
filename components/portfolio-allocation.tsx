"use client"

import { useEffect, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample allocation data
const allocationData = [
  { name: "Consumer", value: 25, color: "#3b82f6" },
  { name: "Financials", value: 20, color: "#10b981" },
  { name: "Manufacturing", value: 18, color: "#6366f1" },
  { name: "Technology", value: 15, color: "#f59e0b" },
  { name: "Healthcare", value: 12, color: "#8b5cf6" },
  { name: "Others", value: 10, color: "#ec4899" },
]

export default function PortfolioAllocation() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Portfolio Allocation</CardTitle>
        <CardDescription>Asset allocation by sector</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="font-medium">{payload[0].name}</div>
                          <div className="font-medium text-right">{payload[0].value}%</div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {allocationData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <div className="text-sm">
                {item.name}: {item.value}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
