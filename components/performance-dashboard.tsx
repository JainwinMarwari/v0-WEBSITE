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
      color: portfolioData.cagr > 6 ? "text-emerald-600" : "text-chart-2",
      bgColor: portfolioData.cagr > 6 ? "bg-emerald-500/10" : "bg-chart-2/10",
      borderColor: portfolioData.cagr > 6 ? "border-emerald-500/20" : "border-chart-2/20",
    },
    {
      title: "Sharpe Ratio",
      value: portfolioData.sharpeRatio.toString(),
      description: "Risk-adjusted returns",
      icon: Target,
      color: portfolioData.sharpeRatio > 1 ? "text-emerald-600" : "text-chart-2",
      bgColor: portfolioData.sharpeRatio > 1 ? "bg-emerald-500/10" : "bg-chart-2/10",
      borderColor: portfolioData.sharpeRatio > 1 ? "border-emerald-500/20" : "border-chart-2/20",
    },
    {
      title: "Max Drawdown",
      value: `${portfolioData.maxDrawdown}%`,
      description: "Maximum peak-to-trough decline",
      icon: TrendingDown,
      color: portfolioData.maxDrawdown < 10 ? "text-emerald-600" : "text-red-500",
      bgColor: portfolioData.maxDrawdown < 10 ? "bg-emerald-500/10" : "bg-red-500/10",
      borderColor: portfolioData.maxDrawdown < 10 ? "border-emerald-500/20" : "border-red-500/20",
    },
    {
      title: "Volatility",
      value: `${portfolioData.volatility}%`,
      description: "Annualized standard deviation",
      icon: Activity,
      color: portfolioData.volatility < 20 ? "text-emerald-600" : "text-chart-2",
      bgColor: portfolioData.volatility < 20 ? "bg-emerald-500/10" : "bg-chart-2/10",
      borderColor: portfolioData.volatility < 20 ? "border-emerald-500/20" : "border-chart-2/20",
    },
    {
      title: "Total Return",
      value: `₹${(portfolioData.totalReturn / 100000).toFixed(1)}L`,
      description: "Absolute gains",
      icon: BarChart3,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      title: "Alpha",
      value: `${(portfolioData.returnPercentage - 4.1).toFixed(1)}%`,
      description: "Excess return vs benchmark",
      icon: Shield,
      color: portfolioData.returnPercentage > 4.1 ? "text-emerald-600" : "text-red-500",
      bgColor: portfolioData.returnPercentage > 4.1 ? "bg-emerald-500/10" : "bg-red-500/10",
      borderColor: portfolioData.returnPercentage > 4.1 ? "border-emerald-500/20" : "border-red-500/20",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="premium-card bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BarChart3 className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
          <CardDescription>Key performance indicators for portfolio management excellence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => {
              const Icon = metric.icon
              return (
                <div
                  key={metric.title}
                  className={`${metric.bgColor} ${metric.borderColor} rounded-xl p-4 border transition-all hover:scale-105`}
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

      <Card className="premium-card bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-primary">Performance Benchmarks</CardTitle>
          <CardDescription>Comparison with market indices and peer performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
              <div>
                <h4 className="font-medium text-primary">Portfolio vs Nifty 50</h4>
                <p className="text-sm text-muted-foreground">10 Month Performance</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-600">+0.78%</div>
                <p className="text-xs text-muted-foreground">Outperformance</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-500/5 to-emerald-500/10 rounded-lg border border-emerald-500/20">
              <div>
                <h4 className="font-medium text-emerald-600">Risk-Adjusted Performance</h4>
                <p className="text-sm text-muted-foreground">Sharpe Ratio vs Benchmark</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-600">+0.45</div>
                <p className="text-xs text-muted-foreground">Superior risk-adjusted returns</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-chart-2/5 to-chart-2/10 rounded-lg border border-chart-2/20">
              <div>
                <h4 className="font-medium text-chart-2">Downside Protection</h4>
                <p className="text-sm text-muted-foreground">Max Drawdown vs Market</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-chart-2">-2.8%</div>
                <p className="text-xs text-muted-foreground">Lower drawdown risk</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
