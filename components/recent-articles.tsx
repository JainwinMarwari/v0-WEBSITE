import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample article data
const articles = [
  {
    id: 1,
    title: "Why Small & Mid-Caps Are the Future of Alpha",
    excerpt: "Insights on how under-researched Indian companies can deliver market-beating returns with patience.",
    date: "May 5, 2025",
    readTime: "8 min read",
    categories: ["Small-Caps", "Mid-Caps", "Indian Markets"],
  },
  {
    id: 2,
    title: "Value Investing in the Indian Context",
    excerpt: "Adapting global value investing principles to the unique characteristics of the Indian market.",
    date: "April 22, 2025",
    readTime: "12 min read",
    categories: ["Value Investing", "Indian Markets"],
  },
  {
    id: 3,
    title: "Quality Metrics for Indian Companies",
    excerpt:
      "How to evaluate the quality of Indian businesses through promoter analysis, capital allocation, and accounting practices.",
    date: "April 10, 2025",
    readTime: "10 min read",
    categories: ["Quality Investing", "Corporate Governance"],
  },
]

export default function RecentArticles() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card key={article.id} className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">
              <Link href={`/articles/${article.id}`} className="hover:underline">
                {article.title}
              </Link>
            </CardTitle>
            <CardDescription className="flex flex-wrap gap-2">
              {article.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground">{article.excerpt}</p>
          </CardContent>
          <CardFooter className="flex items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
