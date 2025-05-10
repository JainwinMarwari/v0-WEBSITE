import Link from "next/link"
import { Calendar, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample article data
const articles = [
  {
    id: 1,
    title: "Financial Analysis: Tech Sector Q1 2025 Performance",
    excerpt:
      "An in-depth look at the technology sector's performance in Q1 2025, with focus on key players and emerging trends.",
    date: "May 5, 2025",
    readTime: "8 min read",
    categories: ["Tech Sector", "Financial Analysis"],
    featured: true,
  },
  {
    id: 2,
    title: "Value Investing in a High Interest Rate Environment",
    excerpt:
      "Strategies for identifying undervalued companies and managing portfolio risk in the current high interest rate landscape.",
    date: "April 22, 2025",
    readTime: "12 min read",
    categories: ["Value Investing", "Risk Management"],
    featured: true,
  },
  {
    id: 3,
    title: "ESG Considerations in Modern Portfolio Construction",
    excerpt:
      "How environmental, social, and governance factors are increasingly important in building resilient investment portfolios.",
    date: "April 10, 2025",
    readTime: "10 min read",
    categories: ["ESG", "Portfolio Strategy"],
    featured: false,
  },
  {
    id: 4,
    title: "Quarterly Earnings Analysis: Banking Sector",
    excerpt:
      "A comprehensive review of Q1 2025 earnings for major banks, with insights on profitability, loan growth, and credit quality.",
    date: "April 5, 2025",
    readTime: "15 min read",
    categories: ["Banking", "Earnings Analysis"],
    featured: false,
  },
  {
    id: 5,
    title: "Inflation Impact on Consumer Staples Companies",
    excerpt: "Analyzing how persistent inflation is affecting consumer staples companies and their pricing strategies.",
    date: "March 28, 2025",
    readTime: "9 min read",
    categories: ["Consumer Staples", "Inflation"],
    featured: false,
  },
  {
    id: 6,
    title: "Technical Analysis: Key Market Indicators",
    excerpt:
      "Examining important technical indicators and what they suggest about market direction in the coming months.",
    date: "March 15, 2025",
    readTime: "11 min read",
    categories: ["Technical Analysis", "Market Trends"],
    featured: false,
  },
  {
    id: 7,
    title: "Semiconductor Industry: Supply Chain Challenges",
    excerpt:
      "Investigating ongoing supply chain issues in the semiconductor industry and implications for tech companies.",
    date: "March 8, 2025",
    readTime: "13 min read",
    categories: ["Semiconductors", "Supply Chain"],
    featured: false,
  },
  {
    id: 8,
    title: "Dividend Aristocrats: Stable Income in Volatile Markets",
    excerpt: "Profiling top dividend aristocrats that offer reliable income streams during market uncertainty.",
    date: "February 25, 2025",
    readTime: "10 min read",
    categories: ["Dividend Investing", "Income Strategy"],
    featured: false,
  },
]

// All unique categories
const allCategories = Array.from(new Set(articles.flatMap((article) => article.categories)))

export default function ArticlesPage() {
  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Articles</h1>
        <p className="text-muted-foreground">In-depth research and insights on Indian small & mid-cap companies</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search articles..." className="pl-9" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            All Categories
          </Button>
          <Button variant="outline" size="sm">
            Small-Caps
          </Button>
          <Button variant="outline" size="sm">
            Mid-Caps
          </Button>
          <Button variant="outline" size="sm">
            Value Investing
          </Button>
          <Button variant="outline" size="sm">
            More...
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Articles</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="company">Company Analysis</TabsTrigger>
          <TabsTrigger value="strategy">Investment Strategy</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
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
                <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
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
                  <Link href={`/articles/${article.id}`} className="text-primary hover:underline">
                    Read more
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="featured" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles
              .filter((a) => a.featured)
              .map((article) => (
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
                  <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
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
                    <Link href={`/articles/${article.id}`} className="text-primary hover:underline">
                      Read more
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="company" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles
              .filter((a) =>
                a.categories.some((c) => ["Tech Sector", "Banking", "Consumer Staples", "Semiconductors"].includes(c)),
              )
              .map((article) => (
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
                  <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
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
                    <Link href={`/articles/${article.id}`} className="text-primary hover:underline">
                      Read more
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="strategy" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles
              .filter((a) =>
                a.categories.some((c) =>
                  ["Value Investing", "ESG", "Portfolio Strategy", "Risk Management", "Dividend Investing"].includes(c),
                ),
              )
              .map((article) => (
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
                  <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
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
                    <Link href={`/articles/${article.id}`} className="text-primary hover:underline">
                      Read more
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            1
          </Button>
          <Button variant="outline" size="icon">
            2
          </Button>
          <Button variant="outline" size="icon">
            3
          </Button>
          <span className="mx-2">...</span>
          <Button variant="outline" size="icon">
            8
          </Button>
        </div>
      </div>
    </div>
  )
}
