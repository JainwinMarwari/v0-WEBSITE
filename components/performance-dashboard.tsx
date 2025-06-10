"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, BarChart3, Target, Activity, Shield } from "lucide-react"
import { useDataStore } from "@/lib/data-store"

export function PerformanceDashboard() {
  const { portfolioData } = useDataStore()

  const metrics = [
    {
      title: "CAGR",
      value: `${portfolioData.cagr}%`,
      description: "Compound Annual Growth Rate",
      icon: TrendingUp,
      color: portfolioData.cagr > 15 ? "text-green-400" : "text-blue-400",
      bgColor: portfolioData.cagr > 15 ? "bg-green-500/10" : "bg-blue-500/10",
    },
    {
      title: "Sharpe Ratio",
      value: portfolioData.sharpeRatio.toString(),
      description: "Risk-adjusted returns",
      icon: Target,
      color: portfolioData.sharpeRatio > 1 ? "text-green-400" : "text-blue-400",
      bgColor: portfolioData.sharpeRatio > 1 ? "bg-green-500/10" : "bg-blue-500/10",
    },
    {
      title: "Max Drawdown",
      value: `${portfolioData.maxDrawdown}%`,
      description: "Maximum peak-to-trough decline",
      icon: TrendingDown,
      color: portfolioData.maxDrawdown < 10 ? "text-green-400" : "text-red-400",
      bgColor: portfolioData.maxDrawdown < 10 ? "bg-green-500/10" : "bg-red-500/10",
    },
    {
      title: "Volatility",
      value: `${portfolioData.volatility}%`,
      description: "Annualized standard deviation",
      icon: Activity,
      color: portfolioData.volatility < 20 ? "text-green-400" : "text-blue-400",
      bgColor: portfolioData.volatility < 20 ? "bg-green-500/10" : "bg-blue-500/10",
    },
    {
      title: "Total Return",
      value: `₹${(portfolioData.totalReturn / 100000).toFixed(1)}L`,
      description: "Absolute gains",
      icon: BarChart3,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Alpha",
      value: `${(portfolioData.returnPercentage - 16.5).toFixed(1)}%`,
      description: "Excess return vs benchmark",
      icon: Shield,
      color: portfolioData.returnPercentage > 16.5 ? "text-green-400" : "text-red-400",
      bgColor: portfolioData.returnPercentage > 16.5 ? "bg-green-500/10" : "bg-red-500/10",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
          <CardDescription>Key performance indicators for portfolio management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => {
              const Icon = metric.icon
              return (
                <div key={metric.title} className={`${metric.bgColor} rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-medium ${metric.color}`}>{metric.title}</h3>
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                  <div className={`text-2xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/40">
        <CardHeader>
          <CardTitle>Performance Benchmarks</CardTitle>
          <CardDescription>Comparison with market indices and peer performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
              <div>
                <h4 className="font-medium">Portfolio vs Nifty 50</h4>
                <p className="text-sm text-muted-foreground">1 Year Performance</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-400">+5.8%</div>
                <p className="text-xs text-muted-foreground">Outperformance</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
              <div>
                <h4 className="font-medium">Risk-Adjusted Performance</h4>
                <p className="text-sm text-muted-foreground">Sharpe Ratio vs Benchmark</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-400">+0.35</div>
                <p className="text-xs text-muted-foreground">Better risk-adjusted returns</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
              <div>
                <h4 className="font-medium">Downside Protection</h4>
                <p className="text-sm text-muted-foreground">Max Drawdown vs Market</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-400">-3.2%</div>
                <p className="text-xs text-muted-foreground">Lower drawdown</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
