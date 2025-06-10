"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { TrendingUp, DollarSign, Percent, Download, RefreshCw, Calendar, Building2, BarChart3 } from "lucide-react"
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
import { useMobile } from "@/hooks/use-mobile"
import { useDataStore } from "@/lib/data-store"
import { Badge } from "@/components/ui/badge"

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b"]

export default function PortfolioPage() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const isMobile = useMobile()
  const { portfolioData, refreshStockPrices } = useDataStore()

  const refreshData = async () => {
    setLoading(true)
    try {
      await refreshStockPrices()
      toast({
        title: "Data refreshed",
        description: "Portfolio data has been updated with the latest values",
      })
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Error fetching latest data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const downloadPortfolioData = () => {
    const headers = [
      "Date",
      "Symbol",
      "Company",
      "Shares",
      "Avg Buy Price",
      "Current Price",
      "Total Value",
      "Total Cost",
      "Return",
      "Return %",
      "Sector",
    ]
    const rows = portfolioData.positions.map((pos) => [
      new Date().toISOString().split("T")[0],
      pos.symbol,
      pos.companyName,
      pos.shares,
      pos.avgBuyPrice,
      pos.currentPrice,
      pos.totalValue,
      pos.totalCost,
      pos.return,
      `${pos.returnPercent}%`,
      pos.sector,
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `jainwin-marwari-portfolio-${new Date().toISOString().split("T")[0]}.csv`)
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
      <header className="border-b border-border glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            {!isMobile && <Navigation />}
          </div>
        </div>
      </header>

      {isMobile && (
        <div className="border-b border-border glass-effect">
          <div className="container mx-auto px-4 py-2">
            <Navigation />
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="animate-fade-in">
          <BackButton href="/" label="Back to Dashboard" />

          <div className="space-y-8">
            {/* Portfolio Summary */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="premium-card bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-primary">Total Portfolio Value</CardTitle>
                  <DollarSign className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">
                    ₹{portfolioData.totalValue.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Last updated: {new Date(portfolioData.lastPriceUpdate).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>

              <Card className="premium-card bg-gradient-to-br from-emerald-500/5 via-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    Total Return
                  </CardTitle>
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    ₹{portfolioData.totalReturn.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Unrealized gains</p>
                </CardContent>
              </Card>

              <Card className="premium-card bg-gradient-to-br from-purple-500/5 via-purple-500/10 to-purple-500/5 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Return Percentage
                  </CardTitle>
                  <Percent className="h-5 w-5 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    +{portfolioData.returnPercentage.toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">Since inception</p>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex gap-4 flex-wrap">
              <Button onClick={refreshData} disabled={loading} className="premium-button focus-ring">
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                {loading ? "Refreshing..." : "Refresh Data"}
              </Button>
              <Button
                variant="outline"
                onClick={downloadPortfolioData}
                className="border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 focus-ring"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Portfolio Data
              </Button>
            </div>

            {/* Charts Section - Fixed Layout with Proper Spacing */}
            <div className="space-y-8">
              {/* Performance Chart - Full Width */}
              <Card className="premium-card-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Portfolio Performance
                  </CardTitle>
                  <CardDescription>Monthly returns compared to Nifty benchmark</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ChartContainer
                      config={{
                        portfolio: {
                          label: "Portfolio",
                          color: "hsl(var(--primary))",
                        },
                        nifty: {
                          label: "Nifty",
                          color: "hsl(var(--accent))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart
                          data={portfolioData.performanceData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis
                            dataKey="month"
                            className="text-xs"
                            tick={{ fontSize: 12 }}
                            axisLine={{ stroke: "hsl(var(--border))" }}
                          />
                          <YAxis
                            className="text-xs"
                            tick={{ fontSize: 12 }}
                            axisLine={{ stroke: "hsl(var(--border))" }}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="portfolio"
                            stroke="var(--color-portfolio)"
                            strokeWidth={3}
                            dot={{ r: 5, fill: "var(--color-portfolio)" }}
                            activeDot={{ r: 7, stroke: "var(--color-portfolio)", strokeWidth: 2 }}
                            name="Portfolio"
                          />
                          <Line
                            type="monotone"
                            dataKey="nifty"
                            stroke="var(--color-nifty)"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "var(--color-nifty)" }}
                            activeDot={{ r: 6, stroke: "var(--color-nifty)", strokeWidth: 2 }}
                            name="Nifty"
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Allocation - Separate Card with Proper Spacing */}
              <Card className="premium-card-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-accent" />
                    Portfolio Allocation
                  </CardTitle>
                  <CardDescription>Distribution across different categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="sector" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50">
                      <TabsTrigger
                        value="sector"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        Sector
                      </TabsTrigger>
                      <TabsTrigger
                        value="market-cap"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        Market Cap
                      </TabsTrigger>
                      <TabsTrigger
                        value="strategy"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        Strategy
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="sector" className="mt-6">
                      <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={portfolioData.sectorData}
                              cx="50%"
                              cy="50%"
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              labelLine={false}
                            >
                              {portfolioData.sectorData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>

                    <TabsContent value="market-cap" className="mt-6">
                      <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={portfolioData.allocationData}
                              cx="50%"
                              cy="50%"
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              labelLine={false}
                            >
                              {portfolioData.allocationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>

                    <TabsContent value="strategy" className="mt-6">
                      <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={portfolioData.strategyData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                            <XAxis
                              dataKey="name"
                              className="text-xs"
                              tick={{ fontSize: 12 }}
                              axisLine={{ stroke: "hsl(var(--border))" }}
                            />
                            <YAxis
                              className="text-xs"
                              tick={{ fontSize: 12 }}
                              axisLine={{ stroke: "hsl(var(--border))" }}
                            />
                            <Tooltip />
                            <Bar dataKey="value" name="Allocation %" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                              {portfolioData.strategyData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Holdings Table */}
            <Card className="premium-card-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Current Holdings
                </CardTitle>
                <CardDescription>Your active portfolio positions with performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-semibold text-muted-foreground">Stock</th>
                        <th className="text-right p-4 font-semibold text-muted-foreground">Shares</th>
                        <th className="text-right p-4 font-semibold text-muted-foreground">Avg Buy Price</th>
                        <th className="text-right p-4 font-semibold text-muted-foreground">Current Price</th>
                        <th className="text-right p-4 font-semibold text-muted-foreground">Total Value</th>
                        <th className="text-right p-4 font-semibold text-muted-foreground">Return</th>
                        <th className="text-right p-4 font-semibold text-muted-foreground">Return %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolioData.positions.map((position, index) => (
                        <tr
                          key={position.symbol}
                          className={`border-b border-border/50 hover:bg-muted/20 transition-all duration-200 ${
                            index % 2 === 0 ? "bg-muted/5" : ""
                          }`}
                        >
                          <td className="p-4">
                            <div className="space-y-1">
                              <div className="font-semibold text-foreground">{position.symbol}</div>
                              <div className="text-sm text-muted-foreground">{position.companyName}</div>
                              <Badge variant="outline" className="text-xs">
                                {position.sector}
                              </Badge>
                            </div>
                          </td>
                          <td className="p-4 text-right font-medium">{position.shares.toLocaleString()}</td>
                          <td className="p-4 text-right">₹{position.avgBuyPrice.toLocaleString()}</td>
                          <td className="p-4 text-right font-medium">₹{position.currentPrice.toLocaleString()}</td>
                          <td className="p-4 text-right font-semibold">₹{position.totalValue.toLocaleString()}</td>
                          <td
                            className={`p-4 text-right font-semibold ${
                              position.return >= 0 ? "text-emerald-600" : "text-rose-600"
                            }`}
                          >
                            {position.return >= 0 ? "+" : ""}₹{position.return.toLocaleString()}
                          </td>
                          <td className="p-4 text-right">
                            <Badge
                              variant={position.returnPercent >= 0 ? "default" : "destructive"}
                              className={`${
                                position.returnPercent >= 0
                                  ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                                  : "bg-rose-500 hover:bg-rose-600 text-white"
                              } font-semibold`}
                            >
                              {position.returnPercent >= 0 ? "+" : ""}
                              {position.returnPercent.toFixed(1)}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
