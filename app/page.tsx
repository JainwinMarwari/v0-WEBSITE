"use client";

// Add at the top of the file
import { Button } from "@/components/ui/button";
import { Input, Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

// Add this component inside your existing page component
function SubscribeButton() {
  // ... [paste the entire SubscribeButton code from previous steps]
}

// Then use it in your JSX:
<SubscribeButton />
import Link from "next/link"
import { ArrowUpRight, BarChart3, BookOpen, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PerformanceChart from "@/components/performance-chart"
import RecentArticles from "@/components/recent-articles"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <TrendingUp className="h-5 w-5" />
            <span>Jainwin Marwari</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/portfolio" className="text-sm font-medium transition-colors hover:text-primary">
              Portfolio
            </Link>
            <Link href="/articles" className="text-sm font-medium transition-colors hover:text-primary">
              Articles
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
          </nav>
          <SubscribeButton className="hidden md:flex" />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Investing in the Future of India's Small & Mid-Caps
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Managed by Harsh Kumar Jain, CFA Level 2 – a fundamentals-first investor with a balanced approach
                  across value, growth, and quality.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button>
                    View Portfolio
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline">Read Latest Analysis</Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
                <PerformanceChart />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Investment Approach</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Long-Term Wealth Creation Through Quality Investing
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    30% Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Undervalued businesses with catalysts for growth. We identify companies trading below their
                    intrinsic value with clear paths to revaluation.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    30% Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Scalable business models with earnings momentum. We target companies with sustainable growth
                    trajectories and expanding market opportunities.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    40% Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    High ROCE, strong promoters, clean accounting. We focus on businesses with excellent capital
                    allocation and governance to compound wealth over time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Articles</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  In-depth analysis and insights on Indian small & mid-cap companies
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12">
              <RecentArticles />
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="lg">
                View All Articles
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 Jainwin Marwari. All rights reserved.</p>
          <div className="flex gap-4">
            <Link 
  href="https://www.linkedin.com/in/harshandfinance" 
  className="text-sm font-medium transition-colors hover:text-primary"
  target="_blank"
  rel="noopener noreferrer"
>
  LinkedIn
</Link>
<Link 
  href="https://x.com/Harshjain10__" 
  className="text-sm font-medium transition-colors hover:text-primary"
  target="_blank"
  rel="noopener noreferrer"
>
  Twitter
</Link>
<Link 
  href="mailto:jainwinmarwari@gmail.com" 
  className="text-sm font-medium transition-colors hover:text-primary"
>
  jainwinmarwari@gmail.com
</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
