"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Logo } from "@/components/logo"
import { BackButton } from "@/components/back-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, BarChart3, PenTool, Settings, Users } from "lucide-react"
import { AdminAuth } from "@/components/admin-auth"
import { PortfolioManager } from "@/components/admin/portfolio-manager"
import { BlogManager } from "@/components/admin/blog-manager"
import { ClientManager } from "@/components/admin/client-manager"
import { useMobile } from "@/hooks/use-mobile"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const isMobile = useMobile()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Logo />
              {!isMobile && <Navigation />}
            </div>
          </div>
        </header>

        {isMobile && (
          <div className="border-b border-border/40 bg-card/50">
            <div className="container mx-auto px-4 py-2">
              <Navigation />
            </div>
          </div>
        )}

        <main className="container mx-auto px-4 py-8">
          <BackButton href="/" label="Back to Dashboard" />
          <AdminAuth onSuccess={() => setIsAuthenticated(true)} />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            {!isMobile && <Navigation />}
          </div>
        </div>
      </header>

      {isMobile && (
        <div className="border-b border-border/40 bg-card/50">
          <div className="container mx-auto px-4 py-2">
            <Navigation />
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-4 md:py-8">
        <BackButton href="/" label="Back to Dashboard" />

        <div className="space-y-6">
          {/* Admin Header */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl">
                <Shield className="h-6 w-6 text-primary" />
                PMS Admin Panel
              </CardTitle>
              <CardDescription className="text-base md:text-lg">
                Manage portfolio data, client relationships, blog content, and system settings
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Admin Tabs */}
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className={`grid grid-cols-4 mb-6 ${isMobile ? "h-10" : ""}`}>
              <TabsTrigger value="portfolio" className={isMobile ? "text-xs px-1" : ""}>
                <BarChart3 className="h-4 w-4 mr-1" />
                {isMobile ? "Portfolio" : "Portfolio"}
              </TabsTrigger>
              <TabsTrigger value="clients" className={isMobile ? "text-xs px-1" : ""}>
                <Users className="h-4 w-4 mr-1" />
                {isMobile ? "Clients" : "Clients"}
              </TabsTrigger>
              <TabsTrigger value="blog" className={isMobile ? "text-xs px-1" : ""}>
                <PenTool className="h-4 w-4 mr-1" />
                {isMobile ? "Blog" : "Blog"}
              </TabsTrigger>
              <TabsTrigger value="settings" className={isMobile ? "text-xs px-1" : ""}>
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio">
              <PortfolioManager />
            </TabsContent>

            <TabsContent value="clients">
              <ClientManager />
            </TabsContent>

            <TabsContent value="blog">
              <BlogManager />
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-card/50 border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    PMS System Settings
                  </CardTitle>
                  <CardDescription>Configure system preferences and data sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Data Sources & APIs</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card className="bg-muted/20">
                          <CardHeader>
                            <CardTitle className="text-base">Stock Price API</CardTitle>
                            <CardDescription>Real-time market data integration</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">
                                Currently using Yahoo Finance API simulation for real-time price updates
                              </p>
                              <div className="flex gap-2">
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Active</span>
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                                  Real-time
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-muted/20">
                          <CardHeader>
                            <CardTitle className="text-base">Performance Tracking</CardTitle>
                            <CardDescription>Portfolio performance analytics</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">
                                Advanced metrics including CAGR, Sharpe ratio, and drawdown analysis
                              </p>
                              <div className="flex gap-2">
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                                  Enabled
                                </span>
                                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                                  Advanced
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">PMS Features</h3>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="bg-green-500/10 rounded-lg p-4">
                          <h4 className="font-medium text-green-400 mb-2">Client Management</h4>
                          <p className="text-sm text-muted-foreground">Operational</p>
                        </div>
                        <div className="bg-green-500/10 rounded-lg p-4">
                          <h4 className="font-medium text-green-400 mb-2">Performance Analytics</h4>
                          <p className="text-sm text-muted-foreground">Operational</p>
                        </div>
                        <div className="bg-green-500/10 rounded-lg p-4">
                          <h4 className="font-medium text-green-400 mb-2">Portfolio Tracking</h4>
                          <p className="text-sm text-muted-foreground">Operational</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Compliance & Reporting</h3>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          All portfolio management activities are tracked for regulatory compliance. Performance
                          reporting includes industry-standard metrics and benchmarking.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">SEBI Compliant</span>
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Audit Ready</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
