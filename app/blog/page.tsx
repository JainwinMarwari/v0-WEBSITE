"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { PenTool, Eye, Edit, Trash2, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Logo } from "@/components/logo"
import { BackButton } from "@/components/back-button"

// Mock blog posts - in a real app, this would come from your API/database
const mockPosts = [
  {
    id: 1,
    title: "Q4 2024 Portfolio Review: Navigating Market Volatility",
    excerpt:
      "A comprehensive analysis of my portfolio performance during the fourth quarter, including key lessons learned and strategy adjustments.",
    content: "Full content here...",
    publishedAt: "2024-01-15",
    views: 1250,
    published: true,
  },
  {
    id: 2,
    title: "Tech Stock Analysis: Why I'm Bullish on AI Companies",
    excerpt: "Deep dive into the AI sector and why I believe certain companies are positioned for long-term growth.",
    content: "Full content here...",
    publishedAt: "2024-01-10",
    views: 890,
    published: true,
  },
  {
    id: 3,
    title: "Risk Management Strategies for Volatile Markets",
    excerpt: "Essential risk management techniques every investor should know to protect their portfolio.",
    content: "Full content here...",
    publishedAt: null,
    views: 0,
    published: false,
  },
]

export default function BlogPage() {
  const [posts, setPosts] = useState(mockPosts)
  const { toast } = useToast()

  const handleDelete = async (postId: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== postId))
      toast({
        title: "Post deleted",
        description: "The blog post has been successfully deleted.",
      })
    }
  }

  const togglePublish = async (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              published: !post.published,
              publishedAt: !post.published ? new Date().toISOString().split("T")[0] : null,
            }
          : post,
      ),
    )

    const post = posts.find((p) => p.id === postId)
    toast({
      title: post?.published ? "Post unpublished" : "Post published",
      description: post?.published ? "The post is now hidden from public view." : "The post is now live on your blog.",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Navigation />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <BackButton href="/" label="Back to Dashboard" />
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Your Blog Posts</h2>
              <p className="text-muted-foreground">Manage and organize your financial insights</p>
            </div>
            <Button asChild>
              <Link href="/blog/write">
                <PenTool className="mr-2 h-4 w-4" />
                Write New Post
              </Link>
            </Button>
          </div>

          {/* Blog Posts */}
          <div className="grid gap-4">
            {posts.map((post) => (
              <Card key={post.id} className="bg-card/50 border-border/40">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.publishedAt ? post.publishedAt : "Draft"}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.views} views
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            post.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/blog/edit/${post.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => togglePublish(post.id)}>
                      {post.published ? "Unpublish" : "Publish"}
                    </Button>
                    {post.published && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/post/${post.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {posts.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <PenTool className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start sharing your financial insights with your first blog post.
                </p>
                <Button asChild>
                  <Link href="/blog/write">Write Your First Post</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
