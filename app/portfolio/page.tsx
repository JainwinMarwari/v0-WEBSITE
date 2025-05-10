import { BarChart3, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import PerformanceChart from "@/components/performance-chart"
import PortfolioAllocation from "@/components/portfolio-allocation"

export default function PortfolioPage() {
  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Fund Performance</h1>
        <p className="text-muted-foreground">Track our investment performance and portfolio allocation</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <CardDescription>As of May 10, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$247,580.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">↑ 12.4%</span> since inception
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">YTD Return</CardTitle>
            <CardDescription>Jan 1 - May 10, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+8.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">↑ 2.1%</span> vs benchmark
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Dividend Yield</CardTitle>
            <CardDescription>Trailing 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.4%</div>
            <p className="text-xs text-muted-foreground">$8,417.72 in dividend income</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <PerformanceChart />
        <PortfolioAllocation />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Portfolio Holdings
          </CardTitle>
          <CardDescription>Current investment positions and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="equities">
            <TabsList className="mb-4">
              <TabsTrigger value="equities">Equities</TabsTrigger>
              <TabsTrigger value="fixed-income">Fixed Income</TabsTrigger>
              <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
            </TabsList>
            <TabsContent value="equities">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Position Size</TableHead>
                    <TableHead>Allocation</TableHead>
                    <TableHead className="text-right">Return</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">AAPL</TableCell>
                    <TableCell>Technology</TableCell>
                    <TableCell>$32,450</TableCell>
                    <TableCell>13.1%</TableCell>
                    <TableCell className="text-right text-green-500">+18.4%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">MSFT</TableCell>
                    <TableCell>Technology</TableCell>
                    <TableCell>$28,750</TableCell>
                    <TableCell>11.6%</TableCell>
                    <TableCell className="text-right text-green-500">+22.1%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">AMZN</TableCell>
                    <TableCell>Consumer Discretionary</TableCell>
                    <TableCell>$24,320</TableCell>
                    <TableCell>9.8%</TableCell>
                    <TableCell className="text-right text-green-500">+15.7%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">JNJ</TableCell>
                    <TableCell>Healthcare</TableCell>
                    <TableCell>$18,650</TableCell>
                    <TableCell>7.5%</TableCell>
                    <TableCell className="text-right text-green-500">+4.2%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">PG</TableCell>
                    <TableCell>Consumer Staples</TableCell>
                    <TableCell>$15,780</TableCell>
                    <TableCell>6.4%</TableCell>
                    <TableCell className="text-right text-green-500">+6.8%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">V</TableCell>
                    <TableCell>Financials</TableCell>
                    <TableCell>$14,250</TableCell>
                    <TableCell>5.8%</TableCell>
                    <TableCell className="text-right text-green-500">+11.3%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">XOM</TableCell>
                    <TableCell>Energy</TableCell>
                    <TableCell>$12,480</TableCell>
                    <TableCell>5.0%</TableCell>
                    <TableCell className="text-right text-red-500">-2.1%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="fixed-income">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Security</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Position Size</TableHead>
                    <TableHead>Allocation</TableHead>
                    <TableHead className="text-right">Yield</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">US Treasury 10Y</TableCell>
                    <TableCell>Government Bond</TableCell>
                    <TableCell>$18,500</TableCell>
                    <TableCell>7.5%</TableCell>
                    <TableCell className="text-right">4.2%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Corporate Bond ETF</TableCell>
                    <TableCell>Corporate Bonds</TableCell>
                    <TableCell>$15,200</TableCell>
                    <TableCell>6.1%</TableCell>
                    <TableCell className="text-right">5.1%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Municipal Bond Fund</TableCell>
                    <TableCell>Municipal Bonds</TableCell>
                    <TableCell>$12,800</TableCell>
                    <TableCell>5.2%</TableCell>
                    <TableCell className="text-right">3.8%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="alternatives">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Investment</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Position Size</TableHead>
                    <TableHead>Allocation</TableHead>
                    <TableHead className="text-right">Return</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">REIT ETF</TableCell>
                    <TableCell>Real Estate</TableCell>
                    <TableCell>$14,200</TableCell>
                    <TableCell>5.7%</TableCell>
                    <TableCell className="text-right text-green-500">+7.8%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gold ETF</TableCell>
                    <TableCell>Commodities</TableCell>
                    <TableCell>$8,500</TableCell>
                    <TableCell>3.4%</TableCell>
                    <TableCell className="text-right text-green-500">+12.3%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Investment Strategy
          </CardTitle>
          <CardDescription>Current market outlook and portfolio strategy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Investment Focus</h3>
            <p className="text-muted-foreground">
              We focus on micro, small, and mid-cap Indian stocks over a 3–5 year horizon. Our investment universe
              consists of companies with strong fundamentals, ethical management, and sustainable competitive
              advantages.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Portfolio Strategy</h3>
            <p className="text-muted-foreground">
              Our investment approach is a hybrid of 30% Value (undervalued businesses with catalysts), 30% Growth
              (scalable models with earnings momentum), and 40% Quality (high ROCE, strong promoters, clean accounting).
              We maintain a concentrated portfolio of 15-20 high-conviction ideas.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Sell Discipline</h3>
            <p className="text-muted-foreground">
              We sell only when performance deteriorates, promoters show red flags, or better opportunities arise. Our
              low turnover approach focuses on compounding wealth through time rather than frequent trading.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
