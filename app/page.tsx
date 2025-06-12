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
  Shield,
  Star,
  Zap,
  Brain,
  Heart,
} from "lucide-react"
import Link from "next/link"
import { PerformanceDashboard } from "@/components/performance-dashboard"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="glass-effect sticky top-0 z-50 border-b border-border/40">
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
      <div className="md:hidden glass-effect border-b border-border/40">
        <div className="container mx-auto px-4 py-3">
          <Navigation />
        </div>
      </div>

      <main className="container mx-auto px-4 section-spacing">
        <div className="animate-fade-in content-spacing">
          {/* Hero Section */}
          <Card className="premium-card-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-600/5 to-transparent opacity-60" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl" />
            <CardHeader className="relative pb-6">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl hover-glow animate-scale-in">
                  <Sparkles className="h-10 w-10 text-blue-600 animate-glow" />
                </div>
                <div className="flex-1 space-y-4">
                  <CardTitle className="text-4xl md:text-6xl font-bold text-balance">
                    <span className="gradient-text">Welcome to Jainwin Marwari</span>
                  </CardTitle>
                  <CardDescription className="text-lg md:text-xl text-premium-muted max-w-3xl">
                    CFA Level 2 cleared finance professional specializing in Portfolio Management Services (PMS) and
                    investment analysis. Building wealth through disciplined investing and superior risk-adjusted
                    returns.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative pt-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="premium-button focus-ring">
                  <Link href="/portfolio">
                    View Portfolio <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 focus-ring"
                >
                  <Link href="/about">
                    About Me <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Investment Philosophy */}
          <Card className="premium-card-lg">
            <CardHeader className="pb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl">
                  <Brain className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold text-balance">Investment Philosophy</CardTitle>
                  <CardDescription className="text-lg text-premium-muted mt-2">
                    A disciplined approach to wealth creation through quality investments and rigorous analysis
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-10">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="space-y-4 group animate-slide-up">
                  <div className="flex items-center gap-4">
                    <div className="p-4 ocean-accent rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-xl text-premium">Investment Focus</h3>
                  </div>
                  <p className="text-premium-muted leading-relaxed">
                    We focus on micro, small, and mid-cap Indian stocks over a 3–5 year horizon with strong
                    fundamentals, ethical management, and sustainable competitive advantages.
                  </p>
                </div>

                <div className="space-y-4 group animate-slide-up" style={{ animationDelay: "0.1s" }}>
                  <div className="flex items-center gap-4">
                    <div className="p-4 sky-accent rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <BarChart4 className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-xl text-premium">Portfolio Strategy</h3>
                  </div>
                  <p className="text-premium-muted leading-relaxed">
                    Hybrid approach: 30% Value, 30% Growth, 40% Quality. Concentrated portfolio of 15-20 high-conviction
                    ideas with rigorous risk management.
                  </p>
                </div>

                <div className="space-y-4 group animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <div className="flex items-center gap-4">
                    <div className="p-4 indigo-accent rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Scale className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-xl text-premium">Sell Discipline</h3>
                  </div>
                  <p className="text-premium-muted leading-relaxed">
                    Low turnover approach focusing on compounding wealth through time rather than frequent trading.
                    Systematic exit criteria based on fundamentals.
                  </p>
                </div>
              </div>

              {/* Strategy Visualization - Blue Theme */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <div className="premium-card text-center p-8 hover-lift bg-gradient-to-br from-blue-500/5 to-blue-600/10 border-blue-500/20">
                  <div className="p-4 bg-blue-500/20 rounded-full w-fit mx-auto mb-6">
                    <Star className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-blue-600 text-lg mb-3">Value</h4>
                  <div className="text-4xl font-bold text-blue-600 mb-3">30%</div>
                  <p className="text-sm text-premium-muted">Undervalued with catalysts</p>
                </div>

                <div className="premium-card text-center p-8 hover-lift bg-gradient-to-br from-cyan-500/5 to-cyan-600/10 border-cyan-500/20">
                  <div className="p-4 bg-cyan-500/20 rounded-full w-fit mx-auto mb-6">
                    <Zap className="h-8 w-8 text-cyan-600" />
                  </div>
                  <h4 className="font-bold text-cyan-600 text-lg mb-3">Growth</h4>
                  <div className="text-4xl font-bold text-cyan-600 mb-3">30%</div>
                  <p className="text-sm text-premium-muted">Scalable with momentum</p>
                </div>

                <div className="premium-card text-center p-8 hover-lift bg-gradient-to-br from-indigo-500/5 to-indigo-600/10 border-indigo-500/20">
                  <div className="p-4 bg-indigo-500/20 rounded-full w-fit mx-auto mb-6">
                    <Award className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h4 className="font-bold text-indigo-600 text-lg mb-3">Quality</h4>
                  <div className="text-4xl font-bold text-indigo-600 mb-3">40%</div>
                  <p className="text-sm text-premium-muted">High ROCE, strong promoters</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Dashboard */}
          <PerformanceDashboard />

          {/* Quick Stats - Blue Theme */}
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            <Card className="premium-card hover-glow bg-gradient-to-br from-blue-500/5 to-blue-600/10 border-blue-500/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-blue-600">Total Portfolio Value</CardTitle>
                <DollarSign className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">₹14,39,376</div>
                <p className="text-xs text-cyan-600 font-medium">+25.3% total return</p>
              </CardContent>
            </Card>

            <Card className="premium-card hover-glow bg-gradient-to-br from-cyan-500/5 to-cyan-600/10 border-cyan-500/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-cyan-700 dark:text-cyan-300">CAGR</CardTitle>
                <TrendingUp className="h-5 w-5 text-cyan-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-cyan-600 mb-2">28.9%</div>
                <p className="text-xs text-premium-muted">Annualized return</p>
              </CardContent>
            </Card>

            <Card className="premium-card hover-glow bg-gradient-to-br from-indigo-500/5 to-indigo-600/10 border-indigo-500/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  Active Positions
                </CardTitle>
                <PieChart className="h-5 w-5 text-indigo-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-indigo-600 mb-2">5</div>
                <p className="text-xs text-premium-muted">Concentrated portfolio</p>
              </CardContent>
            </Card>

            <Card className="premium-card hover-glow bg-gradient-to-br from-slate-500/5 to-slate-600/10 border-slate-500/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Sharpe Ratio</CardTitle>
                <Award className="h-5 w-5 text-slate-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-slate-600 mb-2">1.85</div>
                <p className="text-xs text-premium-muted">Risk-adjusted returns</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions - Blue Theme */}
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="premium-card-lg group hover:shadow-2xl transition-all duration-500">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-6">
                  <div className="p-5 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl group-hover:scale-110 transition-all duration-300">
                    <BarChart4 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-blue-600 group-hover:text-blue-500 transition-colors">
                      Portfolio Management
                    </CardTitle>
                    <CardDescription className="mt-2 text-premium-muted">
                      Track performance metrics and analyze investment returns
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full premium-button focus-ring" asChild>
                  <Link href="/portfolio">View Performance Charts</Link>
                </Button>
                <Button variant="outline" className="w-full border-blue-300 hover:bg-blue-50 focus-ring" asChild>
                  <Link href="/admin">Admin Panel</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="premium-card-lg group hover:shadow-2xl transition-all duration-500">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-6">
                  <div className="p-5 cyan-accent rounded-2xl group-hover:scale-110 transition-all duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-cyan-700 dark:text-cyan-300 group-hover:text-cyan-600 transition-colors">
                      PMS Services
                    </CardTitle>
                    <CardDescription className="mt-2 text-premium-muted">
                      Professional portfolio management and client services
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full cyan-accent shadow-md hover:shadow-lg focus-ring" asChild>
                  <Link href="/admin">Client Management</Link>
                </Button>
                <Button variant="outline" className="w-full border-cyan-300 hover:bg-cyan-50 focus-ring" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="premium-card-lg group hover:shadow-2xl transition-all duration-500">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-6">
                  <div className="p-5 indigo-accent rounded-2xl group-hover:scale-110 transition-all duration-300">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-indigo-600 group-hover:text-indigo-500 transition-colors">
                      Investment Insights
                    </CardTitle>
                    <CardDescription className="mt-2 text-premium-muted">
                      Read analysis and insights on financial markets
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full indigo-accent shadow-md hover:shadow-lg focus-ring" asChild>
                  <Link href="/blog">Read Blog Posts</Link>
                </Button>
                <Button variant="outline" className="w-full border-indigo-300 hover:bg-indigo-50 focus-ring" asChild>
                  <Link href="/admin">Write New Post</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators - Blue Theme */}
          <Card className="premium-card-lg bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200/50 dark:border-blue-800/30">
            <CardHeader className="pb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                  <Shield className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-blue-700 dark:text-blue-300">
                    Professional Credentials & Trust
                  </CardTitle>
                  <CardDescription className="text-premium-muted mt-2">
                    Building confidence through transparency and expertise
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex items-center gap-4 p-6 bg-white/70 dark:bg-gray-800/70 rounded-xl hover-lift border border-blue-200/50 dark:border-blue-800/30">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                    <Award className="h-7 w-7 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-700 dark:text-blue-300 text-lg">CFA Level 2</h4>
                    <p className="text-sm text-premium-muted">Cleared Professional</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-white/70 dark:bg-gray-800/70 rounded-xl hover-lift border border-cyan-200/50 dark:border-cyan-800/30">
                  <div className="p-4 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl">
                    <BarChart4 className="h-7 w-7 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-cyan-700 dark:text-cyan-300 text-lg">Track Record</h4>
                    <p className="text-sm text-premium-muted">28.9% CAGR Performance</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-white/70 dark:bg-gray-800/70 rounded-xl hover-lift border border-indigo-200/50 dark:border-indigo-800/30">
                  <div className="p-4 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
                    <Heart className="h-7 w-7 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-700 dark:text-indigo-300 text-lg">Transparency</h4>
                    <p className="text-sm text-premium-muted">Open Portfolio Tracking</p>
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
