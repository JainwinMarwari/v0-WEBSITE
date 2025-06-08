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
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Navigation />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Hero Section */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <CardTitle className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Welcome to Jainwin Marwari
                </CardTitle>
              </div>
              <CardDescription className="text-lg text-muted-foreground">
                CFA Level 2 cleared finance professional with expertise in portfolio management and investment analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/portfolio">
                    View Portfolio <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="border-primary/20 hover:bg-primary/10">
                  <Link href="/about">
                    About Me <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Investment Strategy Section */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Target className="h-5 w-5" />
                Investment Strategy
              </CardTitle>
              <CardDescription>A disciplined approach to wealth creation through quality investments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    Investment Focus
                  </h3>
                  <p className="text-muted-foreground">
                    We focus on micro, small, and mid-cap Indian stocks over a 3–5 year horizon. Our investment universe
                    consists of companies with strong fundamentals, ethical management, and sustainable competitive
                    advantages.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <BarChart4 className="h-4 w-4 text-primary" />
                    Portfolio Strategy
                  </h3>
                  <p className="text-muted-foreground">
                    Our investment approach is a hybrid of 30% Value (undervalued businesses with catalysts), 30% Growth
                    (scalable models with earnings momentum), and 40% Quality (high ROCE, strong promoters, clean
                    accounting). We maintain a concentrated portfolio of 15-20 high-conviction ideas.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Scale className="h-4 w-4 text-primary" />
                    Sell Discipline
                  </h3>
                  <p className="text-muted-foreground">
                    We sell only when performance deteriorates, promoters show red flags, or better opportunities arise.
                    Our low turnover approach focuses on compounding wealth through time rather than frequent trading.
                  </p>
                </div>
              </div>

              {/* Strategy Visualization */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <h4 className="font-medium text-primary mb-2">Value</h4>
                  <div className="text-2xl font-bold">30%</div>
                  <p className="text-xs text-muted-foreground mt-1">Undervalued with catalysts</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <h4 className="font-medium text-primary mb-2">Growth</h4>
                  <div className="text-2xl font-bold">30%</div>
                  <p className="text-xs text-muted-foreground mt-1">Scalable with momentum</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <h4 className="font-medium text-primary mb-2">Quality</h4>
                  <div className="text-2xl font-bold">40%</div>
                  <p className="text-xs text-muted-foreground mt-1">High ROCE, strong promoters</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card/50 border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">₹45,23,189</div>
                <p className="text-xs text-green-400">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Return</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">+12.5%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
                <PieChart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">18</div>
                <p className="text-xs text-muted-foreground">Concentrated portfolio</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                <FileText className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">12</div>
                <p className="text-xs text-muted-foreground">+2 this month</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-primary">Portfolio Management</CardTitle>
                <CardDescription>Upload your trading data and track performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                  <Link href="/upload">Upload Portfolio Data</Link>
                </Button>
                <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10" asChild>
                  <Link href="/portfolio">View Performance Charts</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-primary">Content Creation</CardTitle>
                <CardDescription>Share your insights and analysis through blog posts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                  <Link href="/blog/write">Write New Post</Link>
                </Button>
                <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10" asChild>
                  <Link href="/blog">Manage Blog Posts</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
