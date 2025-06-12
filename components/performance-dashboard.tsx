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
      color: portfolioData.cagr > 15 ? "text-emerald-600" : "text-blue-600",
      bgColor: portfolioData.cagr > 15 ? "bg-emerald-500/10" : "bg-blue-500/10",
      borderColor: portfolioData.cagr > 15 ? "border-emerald-500/20" : "border-blue-500/20",
    },
    {
      title: "Sharpe Ratio",
      value: portfolioData.sharpeRatio.toString(),
      description: "Risk-adjusted returns",
      icon: Target,
      color: portfolioData.sharpeRatio > 1 ? "text-emerald-600" : "text-blue-600",
      bgColor: portfolioData.sharpeRatio > 1 ? "bg-emerald-500/10" : "bg-blue-500/10",
      borderColor: portfolioData.sharpeRatio > 1 ? "border-emerald-500/20" : "border-blue-500/20",
    },
    {
      title: "Max Drawdown",
      value: `${portfolioData.maxDrawdown}%`,
      description: "Maximum peak-to-trough decline",
      icon: TrendingDown,
      color: portfolioData.maxDrawdown < 10 ? "text-emerald-600" : "text-rose-600",
      bgColor: portfolioData.maxDrawdown < 10 ? "bg-emerald-500/10" : "bg-rose-500/10",
      borderColor: portfolioData.maxDrawdown < 10 ? "border-emerald-500/20" : "border-rose-500/20",
    },
    {
      title: "Volatility",
      value: `${portfolioData.volatility}%`,
      description: "Annualized standard deviation",
      icon: Activity,
      color: portfolioData.volatility < 20 ? "text-emerald-600" : "text-amber-600",
      bgColor: portfolioData.volatility < 20 ? "bg-emerald-500/10" : "bg-amber-500/10",
      borderColor: portfolioData.volatility < 20 ? "border-emerald-500/20" : "border-amber-500/20",
    },
    {
      title: "Total Return",
      value: `₹${(portfolioData.totalReturn / 100000).toFixed(1)}L`,
      description: "Absolute gains",
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Alpha",
      value: `${(portfolioData.returnPercentage - 16.5).toFixed(1)}%`,
      description: "Excess return vs benchmark",
      icon: Shield,
      color: portfolioData.returnPercentage > 16.5 ? "text-emerald-600" : "text-rose-600",
      bgColor: portfolioData.returnPercentage > 16.5 ? "bg-emerald-500/10" : "bg-rose-500/10",
      borderColor: portfolioData.returnPercentage > 16.5 ? "border-emerald-500/20" : "border-rose-500/20",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="premium-card-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Performance Metrics
          </CardTitle>
          <CardDescription>Key performance indicators for portfolio management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => {
              const Icon = metric.icon
              return (
                <div
                  key={metric.title}
                  className={`${metric.bgColor} ${metric.borderColor} rounded-lg p-4 border hover-lift`}
                >
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

      <Card className="premium-card-lg">
        <CardHeader>
          <CardTitle className="text-blue-700 dark:text-blue-300">Performance Benchmarks</CardTitle>
          <CardDescription>Comparison with market indices and peer performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-200/30 hover-lift">
              <div>
                <h4 className="font-medium text-blue-700 dark:text-blue-300">Portfolio vs Nifty 50</h4>
                <p className="text-sm text-muted-foreground">1 Year Performance</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-600">+5.8%</div>
                <p className="text-xs text-muted-foreground">Outperformance</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-teal-50/50 dark:bg-teal-950/20 rounded-lg border border-teal-200/30 hover-lift">
              <div>
                <h4 className="font-medium text-teal-700 dark:text-teal-300">Risk-Adjusted Performance</h4>
                <p className="text-sm text-muted-foreground">Sharpe Ratio vs Benchmark</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-600">+0.35</div>
                <p className="text-xs text-muted-foreground">Better risk-adjusted returns</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-lg border border-indigo-200/30 hover-lift">
              <div>
                <h4 className="font-medium text-indigo-700 dark:text-indigo-300">Downside Protection</h4>
                <p className="text-sm text-muted-foreground">Max Drawdown vs Market</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-600">-3.2%</div>
                <p className="text-xs text-muted-foreground">Lower drawdown</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
