"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { TrendingUp, TrendingDown, DollarSign, Percent, BarChart3, Download } from "lucide-react"
import { Logo } from "@/components/logo"
import { BackButton } from "@/components/back-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useToast } from "@/hooks/use-toast"

// Mock data - in a real app, this would come from your API/database
const mockPortfolioData = {
  totalValue: 4523189,
  totalReturn: 823456,
  returnPercentage: 22.3,
  positions: [
    { symbol: "HDFC", shares: 100, currentPrice: 1752.25, totalValue: 175225, return: 25250, returnPercent: 16.8 },
    { symbol: "INFY", shares: 200, currentPrice: 1450.75, totalValue: 290150, return: 42150, returnPercent: 17.0 },
    { symbol: "TCS", shares: 50, currentPrice: 3520.5, totalValue: 176025, return: 15375, returnPercent: 9.6 },
    { symbol: "RELIANCE", shares: 75, currentPrice: 2450.8, totalValue: 183810, return: 27810, returnPercent: 17.8 },
    { symbol: "BAJAJ", shares: 150, currentPrice: 1120.4, totalValue: 168060, return: -7140, returnPercent: -4.1 },
    { symbol: "ZOMATO", shares: 500, currentPrice: 175.6, totalValue: 87800, return: 32800, returnPercent: 59.6 },
    { symbol: "NYKAA", shares: 300, currentPrice: 145.8, totalValue: 43740, return: -6260, returnPercent: -12.5 },
    { symbol: "ADANI", shares: 50, currentPrice: 2850.3, totalValue: 142515, return: 17515, returnPercent: 14.0 },
  ],
  performanceData: [
    { month: "Jan", portfolio: 12.5, nifty: 8.2 },
    { month: "Feb", portfolio: 10.8, nifty: 9.5 },
    { month: "Mar", portfolio: 15.2, nifty: 11.3 },
    { month: "Apr", portfolio: 14.1, nifty: 10.8 },
    { month: "May", portfolio: 18.5, nifty: 12.4 },
    { month: "Jun", portfolio: 17.2, nifty: 13.1 },
    { month: "Jul", portfolio: 19.8, nifty: 14.5 },
    { month: "Aug", portfolio: 21.5, nifty: 15.2 },
    { month: "Sep", portfolio: 20.3, nifty: 14.8 },
    { month: "Oct", portfolio: 22.8, nifty: 16.1 },
    { month: "Nov", portfolio: 21.9, nifty: 15.7 },
    { month: "Dec", portfolio: 22.3, nifty: 16.5 },
  ],
  allocationData: [
    { name: "Large Cap", value: 30 },
    { name: "Mid Cap", value: 40 },
    { name: "Small Cap", value: 20 },
    { name: "Micro Cap", value: 10 },
  ],
  sectorData: [
    { name: "IT", value: 25 },
    { name: "Financial", value: 20 },
    { name: "Consumer", value: 15 },
    { name: "Healthcare", value: 15 },
    { name: "Manufacturing", value: 10 },
    { name: "Others", value: 15 },
  ],
  strategyData: [
    { name: "Value", value: 30 },
    { name: "Growth", value: 30 },
    { name: "Quality", value: 40 },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export default function PortfolioPage() {
  const [portfolioData, setPortfolioData] = useState(mockPortfolioData)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const refreshData = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)

    toast({
      title: "Data refreshed",
      description: "Portfolio data has been updated with the latest values",
    })
  }

  const downloadPortfolioData = () => {
    // Create CSV content
    const headers = ["Symbol", "Shares", "Current Price", "Total Value", "Return", "Return %"]
    const rows = portfolioData.positions.map((pos) => [
      pos.symbol,
      pos.shares,
      pos.currentPrice,
      pos.totalValue,
      pos.return,
      `${pos.returnPercent}%`,
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `jainwin-portfolio-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Download complete",
      description: "Portfolio data has been downloaded as CSV",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Navigation />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <BackButton href="/" label="Back to Dashboard" />
        <div className="space-y-6">
          {/* Portfolio Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-card/50 border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{portfolioData.totalValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Updated just now</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Return</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">₹{portfolioData.totalReturn.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Unrealized gains</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Return Percentage</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">+{portfolioData.returnPercentage}%</div>
                <p className="text-xs text-muted-foreground">Since inception</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button onClick={refreshData} disabled={loading}>
              <BarChart3 className="mr-2 h-4 w-4" />
              {loading ? "Refreshing..." : "Refresh Data"}
            </Button>
            <Button variant="outline" onClick={downloadPortfolioData}>
              <Download className="mr-2 h-4 w-4" />
              Download Portfolio Data
            </Button>
          </div>

          {/* Portfolio Charts */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Monthly returns compared to Nifty benchmark</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    portfolio: {
                      label: "Portfolio",
                      color: "hsl(var(--chart-1))",
                    },
                    nifty: {
                      label: "Nifty",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={portfolioData.performanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="portfolio"
                        stroke="var(--color-portfolio)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Portfolio"
                      />
                      <Line
                        type="monotone"
                        dataKey="nifty"
                        stroke="var(--color-nifty)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Nifty"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Allocation Charts */}
          <Tabs defaultValue="market-cap" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="market-cap">Market Cap Allocation</TabsTrigger>
              <TabsTrigger value="sector">Sector Allocation</TabsTrigger>
              <TabsTrigger value="strategy">Strategy Allocation</TabsTrigger>
            </TabsList>
            <TabsContent value="market-cap">
              <Card className="bg-card/50 border-border/40">
                <CardHeader>
                  <CardTitle>Market Cap Allocation</CardTitle>
                  <CardDescription>Distribution across market capitalization segments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={portfolioData.allocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {portfolioData.allocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sector">
              <Card className="bg-card/50 border-border/40">
                <CardHeader>
                  <CardTitle>Sector Allocation</CardTitle>
                  <CardDescription>Distribution across industry sectors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={portfolioData.sectorData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {portfolioData.sectorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="strategy">
              <Card className="bg-card/50 border-border/40">
                <CardHeader>
                  <CardTitle>Strategy Allocation</CardTitle>
                  <CardDescription>Distribution across investment strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={portfolioData.strategyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                        <Bar dataKey="value" name="Allocation %" fill="#4299e1">
                          {portfolioData.strategyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Holdings Table */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Current Holdings</CardTitle>
                <CardDescription>Your active portfolio positions</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={downloadPortfolioData}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="text-left p-2">Symbol</th>
                      <th className="text-right p-2">Shares</th>
                      <th className="text-right p-2">Current Price</th>
                      <th className="text-right p-2">Total Value</th>
                      <th className="text-right p-2">Return</th>
                      <th className="text-right p-2">Return %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioData.positions.map((position) => (
                      <tr key={position.symbol} className="border-b border-border/40">
                        <td className="p-2 font-medium">{position.symbol}</td>
                        <td className="p-2 text-right">{position.shares}</td>
                        <td className="p-2 text-right">
                          ₹
                          {position.currentPrice.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="p-2 text-right">₹{position.totalValue.toLocaleString()}</td>
                        <td className={`p-2 text-right ${position.return >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {position.return >= 0 ? "+" : ""}₹{position.return.toLocaleString()}
                        </td>
                        <td
                          className={`p-2 text-right flex items-center justify-end ${position.returnPercent >= 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {position.returnPercent >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          {position.returnPercent >= 0 ? "+" : ""}
                          {position.returnPercent}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
