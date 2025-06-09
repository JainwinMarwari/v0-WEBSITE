"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { TrendingUp, DollarSign, Percent, BarChart3, Download } from "lucide-react"
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
import { MobileChart } from "@/components/mobile-chart"
import { MobilePortfolioTable } from "@/components/mobile-portfolio-table"
import { ResponsiveChartContainer } from "@/components/responsive-chart-container"
import { useDataStore } from "@/lib/data-store"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

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
    link.setAttribute("download", `districtd-portfolio-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Download complete",
      description: "Portfolio data has been downloaded as CSV",
    })
  }

  // Mobile-optimized chart configurations
  const mobileChartConfig = {
    margin: { top: 10, right: 10, left: 10, bottom: 10 },
    fontSize: 10,
    strokeWidth: 1.5,
  }

  const desktopChartConfig = {
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
    fontSize: 12,
    strokeWidth: 2,
  }

  const chartConfig = isMobile ? mobileChartConfig : desktopChartConfig

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            {!isMobile && <Navigation />}
          </div>
        </div>
      </header>

      {isMobile && (
        <div className="border-b border-border/40 bg-card/50">
          <div className="container mx-auto px-4 py-2">
            <Navigation />
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-4 md:py-8">
        <BackButton href="/" label="Back to Dashboard" />
        <div className="space-y-4 md:space-y-6">
          {/* Portfolio Summary */}
          <div className={`grid gap-3 md:gap-4 ${isMobile ? "grid-cols-1" : "md:grid-cols-3"}`}>
            <Card className="bg-card/50 border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`${isMobile ? "text-sm" : "text-sm"} font-medium`}>
                  Total Portfolio Value
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`${isMobile ? "text-xl" : "text-2xl"} font-bold`}>
                  ₹{portfolioData.totalValue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Updated just now</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`${isMobile ? "text-sm" : "text-sm"} font-medium`}>Total Return</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`${isMobile ? "text-xl" : "text-2xl"} font-bold text-green-400`}>
                  ₹{portfolioData.totalReturn.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Unrealized gains</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`${isMobile ? "text-sm" : "text-sm"} font-medium`}>Return Percentage</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`${isMobile ? "text-xl" : "text-2xl"} font-bold text-green-400`}>
                  +{portfolioData.returnPercentage}%
                </div>
                <p className="text-xs text-muted-foreground">Since inception</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className={`flex gap-2 md:gap-4 ${isMobile ? "flex-col" : "flex-row"}`}>
            <Button onClick={refreshData} disabled={loading} className={isMobile ? "w-full" : ""}>
              <BarChart3 className="mr-2 h-4 w-4" />
              {loading ? "Refreshing..." : "Refresh Data"}
            </Button>
            <Button variant="outline" onClick={downloadPortfolioData} className={isMobile ? "w-full" : ""}>
              <Download className="mr-2 h-4 w-4" />
              Download Portfolio Data
            </Button>
          </div>

          {/* Portfolio Performance Chart */}
          <MobileChart
            title="Portfolio Performance"
            description="Monthly returns compared to Nifty benchmark"
            defaultExpanded={!isMobile}
          >
            <ResponsiveChartContainer height={320} mobileHeight={250}>
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
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="month"
                      stroke="#9CA3AF"
                      fontSize={chartConfig.fontSize}
                      tick={{ fontSize: chartConfig.fontSize }}
                    />
                    <YAxis stroke="#9CA3AF" fontSize={chartConfig.fontSize} tick={{ fontSize: chartConfig.fontSize }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    {!isMobile && <Legend />}
                    <Line
                      type="monotone"
                      dataKey="portfolio"
                      stroke="var(--color-portfolio)"
                      strokeWidth={chartConfig.strokeWidth}
                      dot={{ r: isMobile ? 2 : 4 }}
                      name="Portfolio"
                    />
                    <Line
                      type="monotone"
                      dataKey="nifty"
                      stroke="var(--color-nifty)"
                      strokeWidth={chartConfig.strokeWidth}
                      dot={{ r: isMobile ? 2 : 4 }}
                      name="Nifty"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </ResponsiveChartContainer>
          </MobileChart>

          {/* Portfolio Allocation Charts */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader>
              <CardTitle className={isMobile ? "text-lg" : "text-xl"}>Portfolio Allocation</CardTitle>
              <CardDescription>Distribution across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="market-cap" className="w-full">
                <TabsList className={`grid grid-cols-3 mb-4 ${isMobile ? "h-8 text-xs" : ""}`}>
                  <TabsTrigger value="market-cap" className={isMobile ? "text-xs px-2" : ""}>
                    {isMobile ? "Cap" : "Market Cap"}
                  </TabsTrigger>
                  <TabsTrigger value="sector" className={isMobile ? "text-xs px-2" : ""}>
                    Sector
                  </TabsTrigger>
                  <TabsTrigger value="strategy" className={isMobile ? "text-xs px-2" : ""}>
                    Strategy
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="market-cap">
                  <ResponsiveChartContainer height={300} mobileHeight={220}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={portfolioData.allocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={!isMobile}
                          label={isMobile ? false : ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
                <TabsContent value="sector">
                  <ResponsiveChartContainer height={300} mobileHeight={220}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={portfolioData.sectorData}
                          cx="50%"
                          cy="50%"
                          labelLine={!isMobile}
                          label={isMobile ? false : ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
                <TabsContent value="strategy">
                  <ResponsiveChartContainer height={300} mobileHeight={220}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={portfolioData.strategyData} margin={chartConfig.margin}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                          dataKey="name"
                          stroke="#9CA3AF"
                          fontSize={chartConfig.fontSize}
                          tick={{ fontSize: chartConfig.fontSize }}
                        />
                        <YAxis
                          stroke="#9CA3AF"
                          fontSize={chartConfig.fontSize}
                          tick={{ fontSize: chartConfig.fontSize }}
                        />
                        <Tooltip formatter={(value) => `${value}%`} />
                        {!isMobile && <Legend />}
                        <Bar dataKey="value" name="Allocation %" fill="#4299e1">
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
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className={isMobile ? "text-lg" : "text-xl"}>Current Holdings</CardTitle>
                <CardDescription>Your active portfolio positions</CardDescription>
              </div>
              {!isMobile && (
                <Button variant="outline" size="sm" onClick={downloadPortfolioData}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <MobilePortfolioTable positions={portfolioData.positions} />
              {isMobile && (
                <Button variant="outline" className="w-full mt-4" onClick={downloadPortfolioData}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Portfolio Data
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
