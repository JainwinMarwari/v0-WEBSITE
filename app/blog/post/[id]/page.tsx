import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Calendar, Eye } from "lucide-react"
import { Logo } from "@/components/logo"
import { BackButton } from "@/components/back-button"

// Mock data - in a real app, this would be fetched based on the ID
const mockPost = {
  id: 1,
  title: "Q4 2024 Portfolio Review: Navigating Market Volatility",
  excerpt:
    "A comprehensive analysis of my portfolio performance during the fourth quarter, including key lessons learned and strategy adjustments.",
  content: `# Q4 2024 Portfolio Review: Navigating Market Volatility

The fourth quarter of 2024 presented unique challenges and opportunities in the financial markets. In this comprehensive review, I'll break down my portfolio's performance, key decisions made, and lessons learned.

## Portfolio Performance Overview

During Q4 2024, my portfolio achieved a **12.5% return**, outperforming the S&P 500's 8.2% gain. This outperformance was primarily driven by strategic positions in technology and healthcare sectors.

### Key Holdings Performance:
- **Apple (AAPL)**: +18.3% - Benefited from strong iPhone 15 sales
- **Microsoft (MSFT)**: +22.1% - AI integration driving growth
- **Tesla (TSLA)**: -8.5% - Faced headwinds from increased competition

## Strategic Decisions

### 1. Technology Sector Overweight
I maintained an overweight position in technology stocks, particularly those with strong AI capabilities. This decision proved beneficial as the sector continued its upward trajectory.

### 2. Risk Management
Implemented a systematic approach to risk management, including:
- Position sizing based on volatility
- Regular rebalancing
- Stop-loss orders on speculative positions

## Lessons Learned

1. **Diversification remains key** - While tech performed well, having exposure across sectors helped during volatile periods
2. **Timing the market is difficult** - Consistent investing proved more effective than trying to time entries and exits
3. **Research pays off** - Companies with strong fundamentals outperformed during market stress

## Looking Ahead to 2025

Based on current market conditions and economic indicators, I'm positioning the portfolio for:
- Continued growth in AI and technology
- Potential opportunities in emerging markets
- Defensive positions in utilities and consumer staples

## Conclusion

Q4 2024 reinforced the importance of disciplined investing and thorough research. While the portfolio performed well, there's always room for improvement and learning.

*What are your thoughts on the current market environment? Feel free to share your insights in the comments below.*`,
  publishedAt: "2024-01-15",
  views: 1250,
  published: true,
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
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
        <article className="max-w-4xl mx-auto">
          <Card className="bg-card/50 border-border/40">
            <CardHeader>
              <CardTitle className="text-3xl">{mockPost.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {mockPost.publishedAt}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {mockPost.views} views
                </div>
              </div>
              {mockPost.excerpt && <p className="text-lg text-muted-foreground italic">{mockPost.excerpt}</p>}
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap leading-relaxed">{mockPost.content}</div>
              </div>
            </CardContent>
          </Card>
        </article>
      </main>
    </div>
  )
}
