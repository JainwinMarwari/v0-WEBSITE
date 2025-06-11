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

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

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
        <div className="animate-fade-in space-y-8">
          <BackButton href="/" label="Back to Dashboard" />

          {/* Portfolio Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="premium-card bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20 hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Total Portfolio Value</CardTitle>
                <DollarSign className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">₹{portfolioData.totalValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Last updated: {new Date(portfolioData.lastPriceUpdate).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>

            <Card className="premium-card bg-gradient-to-br from-emerald-500/5 via-emerald-500/10 to-emerald-500/5 border-emerald-500/20 hover-lift">
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

            <Card className="premium-card bg-gradient-to-br from-purple-500/5 via-purple-500/10 to-purple-500/5 border-purple-500/20 hover-lift">
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

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap">
            <Button onClick={refreshData} disabled={loading} className="premium-button">
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Refreshing..." : "Refresh Data"}
            </Button>
            <Button variant="outline" onClick={downloadPortfolioData} className="hover-lift">
              <Download className="mr-2 h-4 w-4" />
              Download Portfolio Data
            </Button>
          </div>

          {/* Performance Chart - Separate Section */}
          <div className="space-y-8">
            <Card className="premium-card-lg animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  Portfolio Performance
                </CardTitle>
                <CardDescription className="text-base">
                  Monthly returns compared to Nifty benchmark over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[450px] w-full">
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
                        margin={{ top: 30, right: 40, left: 20, bottom: 30 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="month"
                          className="text-sm"
                          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                          axisLine={{ stroke: "hsl(var(--border))" }}
                          tickLine={{ stroke: "hsl(var(--border))" }}
                        />
                        <YAxis
                          className="text-sm"
                          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                          axisLine={{ stroke: "hsl(var(--border))" }}
                          tickLine={{ stroke: "hsl(var(--border))" }}
                          label={{ value: "Returns (%)", angle: -90, position: "insideLeft" }}
                        />
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend wrapperStyle={{ paddingTop: "20px" }} />
                        <Line
                          type="monotone"
                          dataKey="portfolio"
                          stroke="var(--color-portfolio)"
                          strokeWidth={3}
                          dot={{ r: 6, fill: "var(--color-portfolio)", strokeWidth: 2 }}
                          activeDot={{ r: 8, stroke: "var(--color-portfolio)", strokeWidth: 3 }}
                          name="Portfolio"
                        />
                        <Line
                          type="monotone"
                          dataKey="nifty"
                          stroke="var(--color-nifty)"
                          strokeWidth={2}
                          dot={{ r: 4, fill: "var(--color-nifty)", strokeWidth: 2 }}
                          activeDot={{ r: 6, stroke: "var(--color-nifty)", strokeWidth: 2 }}
                          name="Nifty"
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Allocation - Separate Section with Proper Spacing */}
            <Card className="premium-card-lg animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Building2 className="h-6 w-6 text-accent" />
                  Portfolio Allocation
                </CardTitle>
                <CardDescription className="text-base">
                  Distribution across different categories and investment strategies
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="sector" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50">
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

                  <TabsContent value="sector" className="mt-8">
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={portfolioData.sectorData}
                            cx="50%"
                            cy="50%"
                            outerRadius={140}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                            stroke="hsl(var(--background))"
                            strokeWidth={2}
                          >
                            {portfolioData.sectorData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`${value}%`, "Allocation"]}
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="market-cap" className="mt-8">
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={portfolioData.allocationData}
                            cx="50%"
                            cy="50%"
                            outerRadius={140}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                            stroke="hsl(var(--background))"
                            strokeWidth={2}
                          >
                            {portfolioData.allocationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`${value}%`, "Allocation"]}
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="strategy" className="mt-8">
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={portfolioData.strategyData}
                          margin={{ top: 30, right: 40, left: 20, bottom: 30 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="hsl(var(--border))" />
                          <XAxis
                            dataKey="name"
                            className="text-sm"
                            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                            axisLine={{ stroke: "hsl(var(--border))" }}
                            tickLine={{ stroke: "hsl(var(--border))" }}
                          />
                          <YAxis
                            className="text-sm"
                            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                            axisLine={{ stroke: "hsl(var(--border))" }}
                            tickLine={{ stroke: "hsl(var(--border))" }}
                            label={{ value: "Allocation (%)", angle: -90, position: "insideLeft" }}
                          />
                          <Tooltip
                            formatter={(value) => [`${value}%`, "Allocation"]}
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Bar dataKey="value" name="Allocation %" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]}>
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
          <Card className="premium-card-lg animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BarChart3 className="h-6 w-6 text-primary" />
                Current Holdings
              </CardTitle>
              <CardDescription className="text-base">
                Your active portfolio positions with detailed performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold text-muted-foreground">Stock Details</th>
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
                          <div className="space-y-2">
                            <div className="font-semibold text-foreground text-lg">{position.symbol}</div>
                            <div className="text-sm text-muted-foreground">{position.companyName}</div>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="text-xs">
                                {position.sector}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {position.marketCap}
                              </Badge>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right font-medium text-lg">{position.shares.toLocaleString()}</td>
                        <td className="p-4 text-right">₹{position.avgBuyPrice.toLocaleString()}</td>
                        <td className="p-4 text-right font-medium">₹{position.currentPrice.toLocaleString()}</td>
                        <td className="p-4 text-right font-semibold text-lg">
                          ₹{position.totalValue.toLocaleString()}
                        </td>
                        <td
                          className={`p-4 text-right font-semibold ${
                            position.return >= 0 ? "text-emerald-600" : "text-red-600"
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
                                : "bg-red-500 hover:bg-red-600 text-white"
                            } font-semibold text-sm px-3 py-1`}
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
      </main>
    </div>
  )
}
