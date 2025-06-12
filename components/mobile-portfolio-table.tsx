"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Building2, Target } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface Position {
  symbol: string
  companyName: string
  shares: number
  avgBuyPrice: number
  currentPrice: number
  firstBuyDate: string
  totalValue: number
  totalCost: number
  return: number
  returnPercent: number
  sector: string
  marketCap: string
}

interface MobilePortfolioTableProps {
  positions: Position[]
}

export function MobilePortfolioTable({ positions }: MobilePortfolioTableProps) {
  const isMobile = useMobile()

  if (!isMobile) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40">
              <th className="text-left p-3 font-medium">Company</th>
              <th className="text-right p-3 font-medium">Shares</th>
              <th className="text-right p-3 font-medium">Avg Buy Price</th>
              <th className="text-right p-3 font-medium">Current Price</th>
              <th className="text-right p-3 font-medium">Total Value</th>
              <th className="text-right p-3 font-medium">Total Cost</th>
              <th className="text-right p-3 font-medium">Return</th>
              <th className="text-right p-3 font-medium">Return %</th>
              <th className="text-center p-3 font-medium">Sector</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => (
              <tr key={position.symbol} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                <td className="p-3">
                  <div>
                    <div className="font-medium text-primary">{position.symbol}</div>
                    <div className="text-sm text-muted-foreground">{position.companyName}</div>
                  </div>
                </td>
                <td className="p-3 text-right font-medium">{position.shares}</td>
                <td className="p-3 text-right">
                  ₹
                  {position.avgBuyPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="p-3 text-right font-medium">
                  ₹
                  {position.currentPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="p-3 text-right font-bold">₹{position.totalValue.toLocaleString()}</td>
                <td className="p-3 text-right">₹{position.totalCost.toLocaleString()}</td>
                <td
                  className={`p-3 text-right font-medium ${position.return >= 0 ? "text-emerald-600" : "text-red-500"}`}
                >
                  {position.return >= 0 ? "+" : ""}₹{position.return.toLocaleString()}
                </td>
                <td className="p-3 text-right">
                  <Badge
                    variant={position.returnPercent >= 0 ? "default" : "destructive"}
                    className="flex items-center gap-1 justify-center"
                  >
                    {position.returnPercent >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {position.returnPercent >= 0 ? "+" : ""}
                    {position.returnPercent}%
                  </Badge>
                </td>
                <td className="p-3 text-center">
                  <Badge variant="outline" className="text-xs">
                    {position.sector}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {positions.map((position) => (
        <Card key={position.symbol} className="premium-card bg-muted/10 border-border/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-primary">{position.symbol}</CardTitle>
                <p className="text-sm text-muted-foreground">{position.companyName}</p>
              </div>
              <Badge
                variant={position.returnPercent >= 0 ? "default" : "destructive"}
                className="flex items-center gap-1"
              >
                {position.returnPercent >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {position.returnPercent >= 0 ? "+" : ""}
                {position.returnPercent}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  Shares
                </p>
                <p className="font-medium">{position.shares}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg Buy Price</p>
                <p className="font-medium">
                  ₹
                  {position.avgBuyPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Current Price</p>
                <p className="font-medium text-primary">
                  ₹
                  {position.currentPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Value</p>
                <p className="font-bold">₹{position.totalValue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Cost</p>
                <p className="font-medium">₹{position.totalCost.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  Return
                </p>
                <p className={`font-medium ${position.return >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {position.return >= 0 ? "+" : ""}₹{position.return.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/20">
              <Badge variant="outline" className="text-xs">
                <Building2 className="h-3 w-3 mr-1" />
                {position.sector}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {position.marketCap}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
