"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { PenTool, Eye, Edit, Trash2, Calendar, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useDataStore } from "@/lib/data-store"

export function BlogManager() {
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
  })
  const { toast } = useToast()
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, toggleBlogPostPublish } = useDataStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please fill in the title and content",
        variant: "destructive",
      })
      return
    }

    if (editingId) {
      updateBlogPost(editingId, formData)
      toast({
        title: "Post updated",
        description: "Blog post has been successfully updated",
      })
      setEditingId(null)
    } else {
      addBlogPost({
        ...formData,
        publishedAt: null,
        views: 0,
        published: false,
      })
      toast({
        title: "Post created",
        description: "New blog post has been created as draft",
      })
      setIsCreating(false)
    }

    setFormData({ title: "", excerpt: "", content: "" })
  }

  const handleEdit = (post: any) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
    })
    setEditingId(post.id)
    setIsCreating(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteBlogPost(id)
      toast({
        title: "Post deleted",
        description: "Blog post has been successfully deleted",
      })
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingId(null)
    setFormData({ title: "", excerpt: "", content: "" })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border/40">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <PenTool className="h-5 w-5" />
              Blog Management
            </CardTitle>
            <CardDescription>Create, edit, and manage blog posts</CardDescription>
          </div>
          {!isCreating && (
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isCreating && (
            <Card className="mb-6 bg-muted/20">
              <CardHeader>
                <CardTitle className="text-lg">{editingId ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter post title..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Brief summary of the post..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Write your blog post content here..."
                      rows={15}
                      className="font-mono"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">{editingId ? "Update Post" : "Create Post"}</Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Existing Posts ({blogPosts.length})</h3>
            {blogPosts.map((post) => (
              <Card key={post.id} className="bg-muted/20 border-border/20">
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
                        <Badge variant={post.published ? "default" : "secondary"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toggleBlogPostPublish(post.id)}>
                      {post.published ? "Unpublish" : "Publish"}
                    </Button>
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
        </CardContent>
      </Card>
    </div>
  )
}
