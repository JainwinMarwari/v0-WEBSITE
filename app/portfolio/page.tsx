"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { TrendingUp, DollarSign, Percent, Download, RefreshCw } from "lucide-react"
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
import { MobilePortfolioTable } from "@/components/mobile-portfolio-table"
import { ResponsiveChartContainer } from "@/components/responsive-chart-container"
import { useDataStore } from "@/lib/data-store"

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

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
      "Symbol",
      "Company Name",
      "Shares",
      "Avg Buy Price",
      "Current Price",
      "Total Value",
      "Total Cost",
      "Return",
      "Return %",
      "Sector",
      "Market Cap",
    ]
    const rows = portfolioData.positions.map((pos) => [
      pos.symbol,
      pos.companyName,
      pos.shares,
      pos.avgBuyPrice.toFixed(2),
      pos.currentPrice.toFixed(2),
      pos.totalValue,
      pos.totalCost,
      pos.return,
      `${pos.returnPercent}%`,
      pos.sector,
      pos.marketCap,
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

  const chartConfig = isMobile
    ? { margin: { top: 10, right: 10, left: 10, bottom: 10 }, fontSize: 10, strokeWidth: 1.5 }
    : { margin: { top: 5, right: 30, left: 20, bottom: 5 }, fontSize: 12, strokeWidth: 2 }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            {!isMobile && <Navigation />}
          </div>
        </div>
      </header>

      {isMobile && (
        <div className="border-b border-border/40 bg-card/50 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-2">
            <Navigation />
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-4 md:py-8">
        <BackButton href="/" label="Back to Dashboard" />
        <div className="space-y-4 md:space-y-6 animate-fade-in">
          {/* Portfolio Summary */}
          <div className={`grid gap-3 md:gap-4 ${isMobile ? "grid-cols-1" : "md:grid-cols-3"}`}>
            <Card className="premium-card bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`${isMobile ? "text-sm" : "text-sm"} font-medium`}>
                  Total Portfolio Value
                </CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className={`${isMobile ? "text-xl" : "text-2xl"} font-bold text-primary`}>
                  ₹{portfolioData.totalValue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Updated: {new Date(portfolioData.lastPriceUpdate).toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="premium-card bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border-emerald-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`${isMobile ? "text-sm" : "text-sm"} font-medium`}>Total Return</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className={`${isMobile ? "text-xl" : "text-2xl"} font-bold text-emerald-600`}>
                  ₹{portfolioData.totalReturn.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Unrealized gains</p>
              </CardContent>
            </Card>
            <Card className="premium-card bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`${isMobile ? "text-sm" : "text-sm"} font-medium`}>Return Percentage</CardTitle>
                <Percent className="h-4 w-4 text-chart-2" />
              </CardHeader>
              <CardContent>
                <div className={`${isMobile ? "text-xl" : "text-2xl"} font-bold text-chart-2`}>
                  +{portfolioData.returnPercentage}%
                </div>
                <p className="text-xs text-muted-foreground">Since inception</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className={`flex gap-2 md:gap-4 ${isMobile ? "flex-col" : "flex-row"}`}>
            <Button
              onClick={refreshData}
              disabled={loading}
              className={`${isMobile ? "w-full" : ""} bg-primary hover:bg-primary/90`}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Refreshing..." : "Refresh Data"}
            </Button>
            <Button
              variant="outline"
              onClick={downloadPortfolioData}
              className={`${isMobile ? "w-full" : ""} border-primary/20 hover:bg-primary/5`}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Portfolio Data
            </Button>
          </div>

          {/* Portfolio Performance Chart */}
          <Card className="premium-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-primary">Portfolio Performance</CardTitle>
              <CardDescription>Monthly returns compared to Nifty benchmark</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveChartContainer height={400} mobileHeight={300}>
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
                    <RechartsLineChart data={portfolioData.performanceData} margin={chartConfig.margin}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="month"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={chartConfig.fontSize}
                        tick={{ fontSize: chartConfig.fontSize }}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={chartConfig.fontSize}
                        tick={{ fontSize: chartConfig.fontSize }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      {!isMobile && <Legend />}
                      <Line
                        type="monotone"
                        dataKey="portfolio"
                        stroke="var(--color-portfolio)"
                        strokeWidth={chartConfig.strokeWidth}
                        dot={{ r: isMobile ? 3 : 5, fill: "var(--color-portfolio)" }}
                        name="Portfolio"
                      />
                      <Line
                        type="monotone"
                        dataKey="nifty"
                        stroke="var(--color-nifty)"
                        strokeWidth={chartConfig.strokeWidth}
                        dot={{ r: isMobile ? 3 : 5, fill: "var(--color-nifty)" }}
                        name="Nifty"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </ResponsiveChartContainer>
            </CardContent>
          </Card>

          {/* Portfolio Allocation Charts */}
          <Card className="premium-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className={`${isMobile ? "text-lg" : "text-xl"} text-primary`}>Portfolio Allocation</CardTitle>
              <CardDescription>Distribution across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sector" className="w-full">
                <TabsList className={`grid grid-cols-3 mb-6 ${isMobile ? "h-8 text-xs" : ""} bg-muted/50`}>
                  <TabsTrigger value="sector" className={isMobile ? "text-xs px-2" : ""}>
                    Sector
                  </TabsTrigger>
                  <TabsTrigger value="market-cap" className={isMobile ? "text-xs px-2" : ""}>
                    {isMobile ? "Cap" : "Market Cap"}
                  </TabsTrigger>
                  <TabsTrigger value="strategy" className={isMobile ? "text-xs px-2" : ""}>
                    Strategy
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="sector">
                  <ResponsiveChartContainer height={350} mobileHeight={250}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={portfolioData.sectorData}
                          cx="50%"
                          cy="50%"
                          labelLine={!isMobile}
                          label={isMobile ? false : ({ name, value }) => `${name}: ${value}%`}
                          outerRadius={isMobile ? 80 : 120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {portfolioData.sectorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend wrapperStyle={{ fontSize: isMobile ? "12px" : "14px" }} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ResponsiveChartContainer>
                </TabsContent>
                <TabsContent value="market-cap">
                  <ResponsiveChartContainer height={350} mobileHeight={250}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={portfolioData.allocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={!isMobile}
                          label={isMobile ? false : ({ name, value }) => `${name}: ${value}%`}
                          outerRadius={isMobile ? 80 : 120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {portfolioData.allocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend wrapperStyle={{ fontSize: isMobile ? "12px" : "14px" }} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ResponsiveChartContainer>
                </TabsContent>
                <TabsContent value="strategy">
                  <ResponsiveChartContainer height={350} mobileHeight={250}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={portfolioData.strategyData} margin={chartConfig.margin}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="name"
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={chartConfig.fontSize}
                          tick={{ fontSize: chartConfig.fontSize }}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={chartConfig.fontSize}
                          tick={{ fontSize: chartConfig.fontSize }}
                        />
                        <Tooltip formatter={(value) => `${value}%`} />
                        {!isMobile && <Legend />}
                        <Bar dataKey="value" name="Allocation %" radius={[4, 4, 0, 0]}>
                          {portfolioData.strategyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ResponsiveChartContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Holdings Table */}
          <Card className="premium-card bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className={`${isMobile ? "text-lg" : "text-xl"} text-primary`}>Current Holdings</CardTitle>
                <CardDescription>Your active portfolio positions with detailed analysis</CardDescription>
              </div>
              {!isMobile && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadPortfolioData}
                  className="border-primary/20 hover:bg-primary/5"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <MobilePortfolioTable positions={portfolioData.positions} />
              {isMobile && (
                <Button
                  variant="outline"
                  className="w-full mt-4 border-primary/20 hover:bg-primary/5"
                  onClick={downloadPortfolioData}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Portfolio Data
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Portfolio Analysis */}
          <Card className="premium-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-primary">Portfolio Analysis</CardTitle>
              <CardDescription>Comprehensive analysis of current holdings and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Key Insights</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <h4 className="font-medium text-primary mb-2">Sector Concentration</h4>
                      <p className="text-sm text-muted-foreground">
                        Portfolio is well-diversified across Financial Services (35.2%) and Information Technology
                        (44.9%), providing balanced exposure to India's growth sectors.
                      </p>
                    </div>
                    <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                      <h4 className="font-medium text-emerald-600 mb-2">Quality Focus</h4>
                      <p className="text-sm text-muted-foreground">
                        All holdings are large-cap companies with strong fundamentals, consistent earnings, and
                        established market positions.
                      </p>
                    </div>
                    <div className="p-4 bg-chart-2/5 rounded-lg border border-chart-2/20">
                      <h4 className="font-medium text-chart-2 mb-2">Risk Profile</h4>
                      <p className="text-sm text-muted-foreground">
                        Conservative risk profile with maximum drawdown of 4.2% and volatility of 12.8%, suitable for
                        long-term wealth creation.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Performance Metrics</h3>
                  <div className="grid gap-3">
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                      <span className="text-sm font-medium">CAGR</span>
                      <span className="font-bold text-primary">{portfolioData.cagr}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                      <span className="text-sm font-medium">Sharpe Ratio</span>
                      <span className="font-bold text-emerald-600">{portfolioData.sharpeRatio}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                      <span className="text-sm font-medium">Max Drawdown</span>
                      <span className="font-bold text-chart-2">{portfolioData.maxDrawdown}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                      <span className="text-sm font-medium">Volatility</span>
                      <span className="font-bold text-chart-3">{portfolioData.volatility}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
