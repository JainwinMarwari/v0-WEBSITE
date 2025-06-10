"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Logo } from "@/components/logo"
import { BackButton } from "@/components/back-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, BarChart3, PenTool, Settings, Users, FileText } from "lucide-react"
import { AdminAuth } from "@/components/admin-auth"
import { PortfolioManager } from "@/components/admin/portfolio-manager"
import { BlogManager } from "@/components/admin/blog-manager"
import { ClientManager } from "@/components/admin/client-manager"
import { TransactionManager } from "@/components/admin/transaction-manager"
import { useMobile } from "@/hooks/use-mobile"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const isMobile = useMobile()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Logo />
              {!isMobile && <Navigation />}
            </div>
          </div>
        </header>

        {isMobile && (
          <div className="border-b border-slate-200 bg-white/80">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            {!isMobile && <Navigation />}
          </div>
        </div>
      </header>

      {isMobile && (
        <div className="border-b border-slate-200 bg-white/80">
          <div className="container mx-auto px-4 py-2">
            <Navigation />
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-4 md:py-8">
        <BackButton href="/" label="Back to Dashboard" />

        <div className="space-y-6">
          {/* Admin Header */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl text-blue-800">
                <Shield className="h-6 w-6" />
                PMS Admin Panel
              </CardTitle>
              <CardDescription className="text-base md:text-lg text-slate-600">
                Manage portfolio data, client relationships, transactions, and content
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Admin Tabs */}
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className={`grid grid-cols-5 mb-6 bg-white border border-slate-200 ${isMobile ? "h-10" : ""}`}>
              <TabsTrigger value="transactions" className={isMobile ? "text-xs px-1" : ""}>
                <FileText className="h-4 w-4 mr-1" />
                {isMobile ? "Txns" : "Transactions"}
              </TabsTrigger>
              <TabsTrigger value="portfolio" className={isMobile ? "text-xs px-1" : ""}>
                <BarChart3 className="h-4 w-4 mr-1" />
                Portfolio
              </TabsTrigger>
              <TabsTrigger value="clients" className={isMobile ? "text-xs px-1" : ""}>
                <Users className="h-4 w-4 mr-1" />
                Clients
              </TabsTrigger>
              <TabsTrigger value="blog" className={isMobile ? "text-xs px-1" : ""}>
                <PenTool className="h-4 w-4 mr-1" />
                Blog
              </TabsTrigger>
              <TabsTrigger value="settings" className={isMobile ? "text-xs px-1" : ""}>
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transactions">
              <TransactionManager />
            </TabsContent>

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
              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Settings className="h-5 w-5" />
                    PMS System Settings
                  </CardTitle>
                  <CardDescription>Configure system preferences and data sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-800">Data Sources & APIs</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card className="bg-slate-50 border-slate-200">
                          <CardHeader>
                            <CardTitle className="text-base text-slate-800">Stock Price API</CardTitle>
                            <CardDescription>Real-time market data integration</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <p className="text-sm text-slate-600">
                                Stable daily pricing system with previous day's closing prices, updated each morning
                              </p>
                              <div className="flex gap-2">
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Stable</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                  Daily Updates
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-slate-50 border-slate-200">
                          <CardHeader>
                            <CardTitle className="text-base text-slate-800">Transaction Analysis</CardTitle>
                            <CardDescription>Portfolio performance analytics</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <p className="text-sm text-slate-600">
                                Advanced transaction processing with detailed portfolio analysis and performance metrics
                              </p>
                              <div className="flex gap-2">
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Enabled</span>
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                  Advanced
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-800">PMS Features</h3>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <h4 className="font-medium text-green-700 mb-2">Client Management</h4>
                          <p className="text-sm text-green-600">Operational</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <h4 className="font-medium text-green-700 mb-2">Transaction Processing</h4>
                          <p className="text-sm text-green-600">Operational</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <h4 className="font-medium text-green-700 mb-2">Portfolio Analytics</h4>
                          <p className="text-sm text-green-600">Operational</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-800">System Status</h3>
                      <div className="space-y-2">
                        <p className="text-sm text-slate-600">
                          All portfolio management activities are tracked for regulatory compliance. Performance
                          reporting includes industry-standard metrics and benchmarking with stable pricing system.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">SEBI Compliant</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Audit Ready</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                            Stable Pricing
                          </span>
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
