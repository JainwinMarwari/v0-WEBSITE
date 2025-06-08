"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Save, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { PasswordProtection } from "@/components/password-protection"
import { Logo } from "@/components/logo"
import { BackButton } from "@/components/back-button"

export default function WritePostPage() {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const [showPasswordProtection, setShowPasswordProtection] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  const handleSave = async (publish = false) => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please fill in the title and content before saving.",
        variant: "destructive",
      })
      return
    }

    setSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: publish ? "Post published!" : "Draft saved!",
        description: publish
          ? "Your blog post is now live and visible to readers."
          : "Your draft has been saved and can be published later.",
      })

      if (publish) {
        router.push("/blog")
      }
    } catch (error) {
      toast({
        title: "Save failed",
        description: "There was an error saving your post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (showPasswordProtection && !isAuthorized) {
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
        <PasswordProtection
          onSuccess={() => {
            setIsAuthorized(true)
            setShowPasswordProtection(false)
          }}
          title="Secure Blog Access"
          description="Enter password to write blog posts"
        />
      </div>
    )
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
        <BackButton href="/blog" label="Back to Blog" />

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Create New Blog Post</CardTitle>
              <CardDescription>Share your financial insights and analysis with your audience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter your post title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief summary of your post (optional)..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Write your blog post content here... You can use Markdown formatting."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  className="font-mono"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={() => handleSave(false)} disabled={saving} variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "Saving..." : "Save Draft"}
                </Button>
                <Button onClick={() => handleSave(true)} disabled={saving}>
                  <Eye className="mr-2 h-4 w-4" />
                  {saving ? "Publishing..." : "Publish Post"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Card */}
          {(title || content) && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {title && <h2 className="text-2xl font-bold">{title}</h2>}
                  {excerpt && <p className="text-muted-foreground italic">{excerpt}</p>}
                  {content && (
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-wrap">{content}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
