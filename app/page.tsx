"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Logo } from "@/components/logo"
import { FinancialDisclaimer } from "@/components/disclaimer"
import { PerformanceDashboard } from "@/components/performance-dashboard"
import { TrendingUp, Users, BarChart3, Target, ArrowRight, Shield, Award, Globe, Sparkles } from "lucide-react"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"
import { useDataStore } from "@/lib/data-store"

export default function HomePage() {
  const isMobile = useMobile()
  const { portfolioData } = useDataStore()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            {!isMobile && <Navigation />}
          </div>
        </div>
      </header>

      {isMobile && (
        <div className="border-b border-border glass-effect">
          <div className="container mx-auto px-4 py-2">
            <Navigation />
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-16">
          {/* Financial Disclaimer - Prominent placement */}
          <div className="animate-fade-in">
            <FinancialDisclaimer />
          </div>

          {/* Hero Section */}
          <section className="text-center space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                <span className="text-lg font-medium text-primary">Professional Portfolio Management</span>
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                Jainwin Marwari
              </h1>
              <div className="space-y-2">
                <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
                  CFA Level 2 Cleared • Portfolio Management Services
                </p>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Professional investment management with a focus on long-term wealth creation, risk-adjusted returns,
                  and disciplined investment strategies
                </p>
              </div>
            </div>
            <div className="flex gap-6 justify-center flex-wrap">
              <Button asChild size="lg" className="premium-button text-lg px-8 py-6">
                <Link href="/portfolio">
                  <BarChart3 className="mr-3 h-6 w-6" />
                  View Portfolio Performance
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="hover-lift text-lg px-8 py-6 border-primary/30 hover:bg-primary/5"
              >
                <Link href="/about">
                  <Users className="mr-3 h-6 w-6" />
                  Learn About Our Approach
                </Link>
              </Button>
            </div>
          </section>

          {/* Quick Stats with Enhanced Design */}
          <section className="grid gap-6 md:grid-cols-4 animate-slide-up">
            <Card className="premium-card text-center hover-lift bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="pt-8 pb-6">
                <div className="text-4xl font-bold text-primary mb-3">
                  ₹{(portfolioData.totalValue / 100000).toFixed(1)}L
                </div>
                <p className="text-sm text-muted-foreground font-medium">Portfolio Value</p>
                <div className="mt-2 text-xs text-primary/70">Current Holdings</div>
              </CardContent>
            </Card>
            <Card className="premium-card text-center hover-lift bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border-emerald-500/20">
              <CardContent className="pt-8 pb-6">
                <div className="text-4xl font-bold text-emerald-600 mb-3">
                  +{portfolioData.returnPercentage.toFixed(1)}%
                </div>
                <p className="text-sm text-muted-foreground font-medium">Total Returns</p>
                <div className="mt-2 text-xs text-emerald-600/70">Since Inception</div>
              </CardContent>
            </Card>
            <Card className="premium-card text-center hover-lift bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20">
              <CardContent className="pt-8 pb-6">
                <div className="text-4xl font-bold text-purple-600 mb-3">{portfolioData.cagr}%</div>
                <p className="text-sm text-muted-foreground font-medium">CAGR</p>
                <div className="mt-2 text-xs text-purple-600/70">Annualized Return</div>
              </CardContent>
            </Card>
            <Card className="premium-card text-center hover-lift bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
              <CardContent className="pt-8 pb-6">
                <div className="text-4xl font-bold text-blue-600 mb-3">{portfolioData.sharpeRatio}</div>
                <p className="text-sm text-muted-foreground font-medium">Sharpe Ratio</p>
                <div className="mt-2 text-xs text-blue-600/70">Risk-Adjusted Returns</div>
              </CardContent>
            </Card>
          </section>

          {/* Performance Dashboard */}
          <section className="animate-slide-up">
            <PerformanceDashboard />
          </section>

          {/* Investment Strategy Section */}
          <section className="space-y-8 animate-slide-up">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Investment Strategy
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A disciplined approach combining value, growth, and quality investing principles
              </p>
            </div>

            <Card className="premium-card-lg bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-primary/20">
              <CardContent className="pt-8 pb-8">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary">30% Value</h3>
                    <p className="text-muted-foreground">Undervalued businesses with strong catalysts for growth</p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto">
                      <TrendingUp className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-600">30% Growth</h3>
                    <p className="text-muted-foreground">Scalable business models with earnings momentum</p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto">
                      <Shield className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-600">40% Quality</h3>
                    <p className="text-muted-foreground">High ROCE companies with ethical management</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Services Section */}
          <section className="space-y-12 animate-slide-up">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Investment Services</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive portfolio management solutions tailored to your financial goals
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="premium-card hover-lift">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Portfolio Management</CardTitle>
                  <CardDescription className="text-base">
                    Active portfolio management with focus on risk-adjusted returns and long-term wealth creation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Equity and debt allocation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Risk assessment and management
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Regular portfolio rebalancing
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Performance monitoring
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="premium-card hover-lift">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">Investment Analysis</CardTitle>
                  <CardDescription className="text-base">
                    In-depth market research and analysis to identify investment opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                      Fundamental analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                      Market trend evaluation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                      Sector rotation strategies
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                      Risk-return optimization
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="premium-card hover-lift">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Wealth Planning</CardTitle>
                  <CardDescription className="text-base">
                    Strategic financial planning to help you achieve your long-term financial objectives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                      Goal-based investing
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                      Tax optimization strategies
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                      Retirement planning
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                      Estate planning guidance
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Trust & Credentials */}
          <section className="space-y-12 animate-slide-up">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Why Choose Our Services</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Professional expertise backed by credentials and proven track record
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="premium-card text-center hover-lift">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">CFA Level 2</h3>
                  <p className="text-sm text-muted-foreground">Chartered Financial Analyst certification</p>
                </CardContent>
              </Card>
              <Card className="premium-card text-center hover-lift">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Proven Track Record</h3>
                  <p className="text-sm text-muted-foreground">Consistent outperformance vs benchmarks</p>
                </CardContent>
              </Card>
              <Card className="premium-card text-center hover-lift">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Risk Management</h3>
                  <p className="text-sm text-muted-foreground">Focus on downside protection</p>
                </CardContent>
              </Card>
              <Card className="premium-card text-center hover-lift">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Globe className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Transparent Reporting</h3>
                  <p className="text-sm text-muted-foreground">Regular updates and clear communication</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center space-y-8 animate-fade-in">
            <Card className="premium-card-lg bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
              <CardContent className="pt-12 pb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Investment Journey?</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                  Get in touch to discuss your investment goals and learn how our portfolio management services can help
                  you achieve them.
                </p>
                <div className="flex gap-6 justify-center flex-wrap">
                  <Button asChild size="lg" className="premium-button text-lg px-8 py-6">
                    <Link href="/about">
                      Get Started
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="hover-lift text-lg px-8 py-6 border-primary/30 hover:bg-primary/5"
                  >
                    <Link href="/portfolio">View Portfolio Performance</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
