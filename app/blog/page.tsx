"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Eye, Calendar } from "lucide-react"
import { Logo } from "@/components/logo"
import { BackButton } from "@/components/back-button"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"
import { useDataStore } from "@/lib/data-store"

export default function BlogPage() {
  const isMobile = useMobile()
  const { blogPosts } = useDataStore()

  // Only show published posts to regular users
  const publishedPosts = blogPosts.filter((post) => post.published)

  return (
    <div className="min-h-screen bg-background">
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
          {/* Header */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">Investment Insights & Analysis</h2>
            <p className="text-muted-foreground">
              Professional insights on financial markets, investment strategies, and portfolio management
            </p>
          </div>

          {/* Blog Posts */}
          <div className="grid gap-4">
            {publishedPosts.map((post) => (
              <Card key={post.id} className="bg-card/50 border-border/40 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="space-y-2">
                    <CardTitle className="text-lg md:text-xl">
                      <Link href={`/blog/post/${post.id}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base">{post.excerpt}</CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.publishedAt}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {post.views} views
                      </div>
                      <Badge variant="default">Published</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href={`/blog/post/${post.id}`}>
                    <span className="text-primary hover:underline">Read more →</span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {publishedPosts.length === 0 && (
            <Card className="bg-card/50 border-border/40">
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No posts published yet</h3>
                <p className="text-muted-foreground">Check back soon for investment insights and market analysis.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
