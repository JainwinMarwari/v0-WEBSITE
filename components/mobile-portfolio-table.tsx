"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Calendar, DollarSign } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface Position {
  symbol: string
  shares: number
  buyPrice: number
  currentPrice: number
  buyDate: string
  totalValue: number
  totalCost: number
  return: number
  returnPercent: number
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
              <th className="text-left p-2">Symbol</th>
              <th className="text-right p-2">Shares</th>
              <th className="text-right p-2">Buy Price</th>
              <th className="text-right p-2">Current Price</th>
              <th className="text-right p-2">Buy Date</th>
              <th className="text-right p-2">Total Value</th>
              <th className="text-right p-2">Total Cost</th>
              <th className="text-right p-2">Return</th>
              <th className="text-right p-2">Return %</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => (
              <tr key={position.symbol} className="border-b border-border/40">
                <td className="p-2 font-medium">{position.symbol}</td>
                <td className="p-2 text-right">{position.shares}</td>
                <td className="p-2 text-right">
                  ₹
                  {position.buyPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="p-2 text-right">
                  ₹
                  {position.currentPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="p-2 text-right">{position.buyDate}</td>
                <td className="p-2 text-right">₹{position.totalValue.toLocaleString()}</td>
                <td className="p-2 text-right">₹{position.totalCost.toLocaleString()}</td>
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
    )
  }

  return (
    <div className="space-y-3">
      {positions.map((position) => (
        <Card key={position.symbol} className="bg-muted/20 border-border/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{position.symbol}</CardTitle>
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
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Shares</p>
                <p className="font-medium">{position.shares}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Buy Price</p>
                <p className="font-medium">
                  ₹
                  {position.buyPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Current Price</p>
                <p className="font-medium">
                  ₹
                  {position.currentPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Buy Date
                </p>
                <p className="font-medium">{position.buyDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Value</p>
                <p className="font-medium">₹{position.totalValue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Cost</p>
                <p className="font-medium">₹{position.totalCost.toLocaleString()}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  Return
                </p>
                <p className={`font-medium ${position.return >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {position.return >= 0 ? "+" : ""}₹{position.return.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
