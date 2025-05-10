import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2, ThumbsUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Sample article data
const article = {
  id: 1,
  title: "Why Small & Mid-Caps Are the Future of Alpha",
  excerpt: "Insights on how under-researched Indian companies can deliver market-beating returns with patience.",
  date: "May 5, 2025",
  readTime: "8 min read",
  categories: ["Small-Caps", "Mid-Caps", "Indian Markets"],
  author: "Harsh Kumar Jain",
  content: `
    <h2>Introduction</h2>
    <p>The Indian equity markets present a unique opportunity for investors willing to look beyond the well-covered large-cap space. Small and mid-cap companies, often overlooked by institutional investors and research analysts, can offer significant alpha generation potential for patient, research-driven investors.</p>
    
    <h2>The Small & Mid-Cap Opportunity</h2>
    <p>India's economic growth story is increasingly being driven by emerging companies that are disrupting traditional sectors or creating entirely new market categories. These businesses, typically in the small and mid-cap segment, represent the future of India's economic transformation.</p>
    
    <h2>Information Asymmetry Creates Alpha</h2>
    <p>One of the primary reasons small and mid-cap stocks can deliver superior returns is the information asymmetry that exists in this segment. With limited analyst coverage and institutional ownership, diligent investors who conduct thorough research can identify mispriced opportunities before the broader market recognizes their potential.</p>
    
    <h3>Limited Research Coverage</h3>
    <p>While the average large-cap stock in India is covered by 30+ research analysts, many small-caps have fewer than 5 analysts tracking them, and some have no formal coverage at all. This lack of attention creates opportunities for investors willing to do the work.</p>
    
    <h3>Institutional Constraints</h3>
    <p>Many institutional investors face constraints that prevent them from investing in smaller companies, including liquidity requirements, mandate restrictions, and minimum market capitalization thresholds. This structural limitation reduces competition and creates opportunities for nimble investors.</p>
    
    <h2>Growth Potential</h2>
    <p>Small and mid-sized companies have greater room for expansion compared to their large-cap counterparts. A ₹1,000 crore company can double or triple its size much more easily than a ₹100,000 crore conglomerate. This mathematical reality, combined with the entrepreneurial drive often found in smaller companies, creates a fertile ground for growth.</p>
    
    <h2>The Compounding Effect</h2>
    <p>The power of compounding is most evident in smaller companies that can sustain high growth rates over extended periods. A company growing at 25% annually will increase its value 10x in just 10 years. Finding these compounders early in their journey can lead to extraordinary returns.</p>
    
    <h2>Key Success Factors</h2>
    
    <h3>Thorough Research</h3>
    <p>Success in the small and mid-cap space requires deep, fundamental research. This includes analyzing financial statements, understanding business models, evaluating management quality, and assessing competitive positioning. There are no shortcuts to this process.</p>
    
    <h3>Patience</h3>
    <p>The market may take time to recognize the value of smaller companies. Investors must be willing to hold positions for 3-5 years or longer to realize the full potential of their investments. This patience is often rewarded with superior returns.</p>
    
    <h3>Risk Management</h3>
    <p>While the potential returns are higher in the small and mid-cap space, so are the risks. Proper position sizing, diversification across sectors, and a focus on quality factors (strong balance sheets, ethical management, sustainable business models) are essential to managing these risks.</p>
    
    <h2>Case Studies</h2>
    <p>Several Indian small and mid-caps have delivered extraordinary returns for patient investors. Companies that started as small enterprises have grown to become industry leaders, delivering multi-bagger returns along the way. These success stories illustrate the potential of this investment approach.</p>
    
    <h2>Conclusion</h2>
    <p>For investors willing to conduct thorough research and maintain a long-term perspective, India's small and mid-cap universe offers tremendous opportunities for alpha generation. The combination of information asymmetry, growth potential, and the power of compounding creates a perfect environment for identifying tomorrow's winners today.</p>
  `,
  relatedArticles: [
    {
      id: 2,
      title: "Value Investing in the Indian Context",
      excerpt: "Adapting global value investing principles to the unique characteristics of the Indian market.",
      date: "April 22, 2025",
      categories: ["Value Investing", "Indian Markets"],
    },
    {
      id: 3,
      title: "Quality Metrics for Indian Companies",
      excerpt:
        "How to evaluate the quality of Indian businesses through promoter analysis, capital allocation, and accounting practices.",
      date: "April 10, 2025",
      categories: ["Quality Investing", "Corporate Governance"],
    },
    {
      id: 4,
      title: "The Power of Compounding in Equity Markets",
      excerpt:
        "Understanding how time and consistent returns can create extraordinary wealth through the magic of compounding.",
      date: "March 15, 2025",
      categories: ["Investing Principles", "Wealth Creation"],
    },
  ],
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link href="/articles" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Link>
      </div>

      <article className="mx-auto max-w-3xl">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">{article.title}</h1>
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
            <div>By {article.author}</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>Like</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        <div
          className="prose prose-slate dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <Separator className="my-12" />

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {article.relatedArticles.map((relatedArticle) => (
              <Card key={relatedArticle.id} className="flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    <Link href={`/articles/${relatedArticle.id}`} className="hover:underline">
                      {relatedArticle.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex flex-wrap gap-1">
                    {relatedArticle.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">{relatedArticle.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Subscribe to Jainwin Marwari Insights</h2>
          <p className="text-muted-foreground mb-4">
            Get the latest Indian small & mid-cap investment analysis delivered to your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </article>
    </div>
  )
}
