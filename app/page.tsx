import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  PieChart,
  FileText,
  Sparkles,
  Target,
  BarChart4,
  Scale,
  Users,
  Award,
} from "lucide-react"
import Link from "next/link"
import { PerformanceDashboard } from "@/components/performance-dashboard"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="hidden md:block">
              <Navigation />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden border-b border-border/40 bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-2">
          <Navigation />
        </div>
      </div>

      <main className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid gap-4 md:gap-6 animate-fade-in">
          {/* Hero Section */}
          <Card className="premium-card bg-gradient-to-br from-primary/5 via-card to-primary/10 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl md:text-3xl gradient-text">Welcome to Jainwin Marwari</CardTitle>
              </div>
              <CardDescription className="text-base md:text-lg text-muted-foreground">
                CFA Level 2 cleared finance professional specializing in Portfolio Management Services (PMS) with
                premium analytics, performance tracking, and institutional-grade investment strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg">
                  <Link href="/portfolio">
                    View Portfolio <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="border-primary/20 hover:bg-primary/5">
                  <Link href="/about">
                    About Me <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Investment Strategy Section */}
          <Card className="premium-card bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary text-lg md:text-xl">
                <Target className="h-5 w-5" />
                Investment Philosophy & Strategy
              </CardTitle>
              <CardDescription>
                A disciplined, research-driven approach to wealth creation through quality investments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2 text-sm md:text-base">
                    <Target className="h-4 w-4 text-primary" />
                    Investment Focus
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    We focus on high-quality large-cap Indian stocks with strong fundamentals, ethical management, and
                    sustainable competitive advantages. Our investment universe consists of companies with proven track
                    records and clear growth catalysts over a 3–5 year investment horizon.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2 text-sm md:text-base">
                    <BarChart4 className="h-4 w-4 text-primary" />
                    Portfolio Strategy
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Our investment approach combines 30% Value (undervalued businesses with clear catalysts), 30% Growth
                    (scalable models with earnings momentum), and 40% Quality (high ROCE, strong promoters, clean
                    accounting). We maintain a concentrated portfolio of 15-20 high-conviction ideas.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2 text-sm md:text-base">
                    <Scale className="h-4 w-4 text-primary" />
                    Risk Management
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    We employ systematic risk management through position sizing, regular rebalancing, and strict sell
                    discipline. Our low turnover approach focuses on compounding wealth through time rather than
                    frequent trading, with continuous monitoring of portfolio metrics.
                  </p>
                </div>
              </div>

              {/* Strategy Visualization */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-4">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-3 md:p-4 text-center border border-primary/20">
                  <h4 className="font-medium text-primary mb-2 text-sm md:text-base">Value</h4>
                  <div className="text-xl md:text-2xl font-bold text-primary">30%</div>
                  <p className="text-xs text-muted-foreground mt-1">Undervalued with catalysts</p>
                </div>
                <div className="bg-gradient-to-br from-chart-2/10 to-chart-2/5 rounded-xl p-3 md:p-4 text-center border border-chart-2/20">
                  <h4 className="font-medium text-chart-2 mb-2 text-sm md:text-base">Growth</h4>
                  <div className="text-xl md:text-2xl font-bold text-chart-2">30%</div>
                  <p className="text-xs text-muted-foreground mt-1">Scalable with momentum</p>
                </div>
                <div className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 rounded-xl p-3 md:p-4 text-center border border-chart-3/20">
                  <h4 className="font-medium text-chart-3 mb-2 text-sm md:text-base">Quality</h4>
                  <div className="text-xl md:text-2xl font-bold text-chart-3">40%</div>
                  <p className="text-xs text-muted-foreground mt-1">High ROCE, strong promoters</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Dashboard */}
          <PerformanceDashboard />

          {/* Quick Stats */}
          <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
            <Card className="premium-card bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Total Portfolio Value</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold text-primary">₹12,33,364</div>
                <p className="text-xs text-emerald-600">+4.9% total return</p>
              </CardContent>
            </Card>
            <Card className="premium-card bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">CAGR</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold text-emerald-600">6.8%</div>
                <p className="text-xs text-muted-foreground">Annualized return</p>
              </CardContent>
            </Card>
            <Card className="premium-card bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Active Positions</CardTitle>
                <PieChart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold text-primary">5</div>
                <p className="text-xs text-muted-foreground">Quality holdings</p>
              </CardContent>
            </Card>
            <Card className="premium-card bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Sharpe Ratio</CardTitle>
                <Award className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold text-primary">1.45</div>
                <p className="text-xs text-muted-foreground">Risk-adjusted returns</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="premium-card bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-primary text-lg md:text-xl flex items-center gap-2">
                  <BarChart4 className="h-5 w-5" />
                  Portfolio Analytics
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Advanced performance metrics and comprehensive investment analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg" asChild>
                  <Link href="/portfolio">View Performance Charts</Link>
                </Button>
                <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5" asChild>
                  <Link href="/admin">Admin Panel</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="premium-card bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-primary text-lg md:text-xl flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  PMS Services
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Professional portfolio management and institutional-grade client services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg" asChild>
                  <Link href="/admin">Client Management</Link>
                </Button>
                <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="premium-card bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-primary text-lg md:text-xl flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Investment Research
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  In-depth market analysis and professional investment insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg" asChild>
                  <Link href="/blog">Read Analysis</Link>
                </Button>
                <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5" asChild>
                  <Link href="/admin">Write New Post</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
