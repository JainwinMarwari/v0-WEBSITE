"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Transaction {
  id: string
  date: string
  symbol: string
  type: "BUY" | "SELL"
  quantity: number
  price: number
  amount: number
  fees?: number
}

interface Position {
  symbol: string
  companyName: string
  shares: number
  avgBuyPrice: number
  currentPrice: number
  firstBuyDate: string
  lastBuyDate: string
  totalValue: number
  totalCost: number
  return: number
  returnPercent: number
  sector: string
  marketCap: string
  transactions: Transaction[]
}

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  publishedAt: string | null
  views: number
  published: boolean
}

interface PerformanceRecord {
  date: string
  totalValue: number
  totalReturn: number
  returnPercent: number
  benchmark: number
}

interface Client {
  id: string
  name: string
  email: string
  phone: string
  investmentAmount: number
  riskProfile: "Conservative" | "Moderate" | "Aggressive"
  onboardingDate: string
  status: "Active" | "Pending" | "Inactive"
}

interface PortfolioAnalysis {
  totalInvested: number
  currentValue: number
  totalReturns: number
  returnPercentage: number
  realizedGains: number
  unrealizedGains: number
  totalDividends: number
  holdingPeriod: number
  topPerformers: Position[]
  worstPerformers: Position[]
  sectorAllocation: Array<{ sector: string; value: number; percentage: number }>
  monthlyReturns: Array<{ month: string; returns: number }>
}

interface PortfolioData {
  totalValue: number
  totalCost: number
  totalReturn: number
  returnPercentage: number
  positions: Position[]
  transactions: Transaction[]
  analysis: PortfolioAnalysis | null
  performanceHistory: PerformanceRecord[]
  performanceData: Array<{ month: string; portfolio: number; nifty: number }>
  allocationData: Array<{ name: string; value: number }>
  sectorData: Array<{ name: string; value: number }>
  strategyData: Array<{ name: string; value: number }>
  cagr: number
  sharpeRatio: number
  maxDrawdown: number
  volatility: number
  lastPriceUpdate: string
}

interface DataStore {
  portfolioData: PortfolioData
  blogPosts: BlogPost[]
  clients: Client[]
  updatePortfolioData: (data: Partial<PortfolioData>) => void
  addBlogPost: (post: Omit<BlogPost, "id">) => void
  updateBlogPost: (id: number, post: Partial<BlogPost>) => void
  deleteBlogPost: (id: number) => void
  toggleBlogPostPublish: (id: number) => void
  refreshStockPrices: () => Promise<void>
  addClient: (client: Omit<Client, "id">) => void
  updateClient: (id: string, client: Partial<Client>) => void
  calculatePerformanceMetrics: () => void
  addPerformanceRecord: () => void
  uploadTransactions: (transactions: Transaction[]) => void
  generatePortfolioAnalysis: () => void
}

// Enhanced stock data with company information
const stockDatabase = {
  HDFC: {
    name: "HDFC Bank Limited",
    basePrice: 1752.25,
    sector: "Financial Services",
    marketCap: "Large Cap",
  },
  INFY: {
    name: "Infosys Limited",
    basePrice: 1450.75,
    sector: "Information Technology",
    marketCap: "Large Cap",
  },
  TCS: {
    name: "Tata Consultancy Services",
    basePrice: 3520.5,
    sector: "Information Technology",
    marketCap: "Large Cap",
  },
  RELIANCE: {
    name: "Reliance Industries Limited",
    basePrice: 2450.8,
    sector: "Oil & Gas",
    marketCap: "Large Cap",
  },
  BAJFINANCE: {
    name: "Bajaj Finance Limited",
    basePrice: 6850.4,
    sector: "Financial Services",
    marketCap: "Large Cap",
  },
}

// Stable price system with enhanced volatility
const getStablePrice = (symbol: string, basePrice: number): number => {
  const today = new Date().toDateString()
  const lastUpdate = localStorage.getItem(`price_${symbol}_date`)

  if (lastUpdate === today) {
    const savedPrice = localStorage.getItem(`price_${symbol}`)
    if (savedPrice) return Number.parseFloat(savedPrice)
  }

  // Generate new daily price with realistic volatility
  const volatility = 0.02 // 2% daily volatility
  const randomChange = (Math.random() - 0.5) * 2 * volatility
  const newPrice = basePrice * (1 + randomChange)

  localStorage.setItem(`price_${symbol}`, newPrice.toFixed(2))
  localStorage.setItem(`price_${symbol}_date`, today)

  return Number(newPrice.toFixed(2))
}

const fetchStockPrice = async (symbol: string): Promise<number> => {
  const stockInfo = stockDatabase[symbol as keyof typeof stockDatabase]
  const basePrice = stockInfo?.basePrice || 100
  return getStablePrice(symbol, basePrice)
}

const calculateCAGR = (startValue: number, endValue: number, years: number): number => {
  if (startValue <= 0 || years <= 0) return 0
  return (Math.pow(endValue / startValue, 1 / years) - 1) * 100
}

const calculateSharpeRatio = (returns: number[], riskFreeRate = 0.06): number => {
  if (returns.length === 0) return 0
  const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length
  const stdDev = Math.sqrt(variance)
  return stdDev === 0 ? 0 : (avgReturn - riskFreeRate) / stdDev
}

const calculateMaxDrawdown = (values: number[]): number => {
  if (values.length === 0) return 0
  let maxDrawdown = 0
  let peak = values[0]

  for (const value of values) {
    if (value > peak) peak = value
    const drawdown = (peak - value) / peak
    if (drawdown > maxDrawdown) maxDrawdown = drawdown
  }

  return maxDrawdown * 100
}

// Sample portfolio data with realistic holdings
const samplePositions: Position[] = [
  {
    symbol: "HDFC",
    companyName: "HDFC Bank Limited",
    shares: 150,
    avgBuyPrice: 1650.0,
    currentPrice: 1752.25,
    firstBuyDate: "2023-06-15",
    lastBuyDate: "2024-01-10",
    totalValue: 262837,
    totalCost: 247500,
    return: 15337,
    returnPercent: 6.2,
    sector: "Financial Services",
    marketCap: "Large Cap",
    transactions: [],
  },
  {
    symbol: "INFY",
    companyName: "Infosys Limited",
    shares: 200,
    avgBuyPrice: 1380.0,
    currentPrice: 1450.75,
    firstBuyDate: "2023-07-20",
    lastBuyDate: "2023-12-05",
    totalValue: 290150,
    totalCost: 276000,
    return: 14150,
    returnPercent: 5.1,
    sector: "Information Technology",
    marketCap: "Large Cap",
    transactions: [],
  },
  {
    symbol: "TCS",
    companyName: "Tata Consultancy Services",
    shares: 75,
    avgBuyPrice: 3400.0,
    currentPrice: 3520.5,
    firstBuyDate: "2023-08-10",
    lastBuyDate: "2024-02-15",
    totalValue: 264037,
    totalCost: 255000,
    return: 9037,
    returnPercent: 3.5,
    sector: "Information Technology",
    marketCap: "Large Cap",
    transactions: [],
  },
  {
    symbol: "RELIANCE",
    companyName: "Reliance Industries Limited",
    shares: 100,
    avgBuyPrice: 2350.0,
    currentPrice: 2450.8,
    firstBuyDate: "2023-09-05",
    lastBuyDate: "2024-01-20",
    totalValue: 245080,
    totalCost: 235000,
    return: 10080,
    returnPercent: 4.3,
    sector: "Oil & Gas",
    marketCap: "Large Cap",
    transactions: [],
  },
  {
    symbol: "BAJFINANCE",
    companyName: "Bajaj Finance Limited",
    shares: 25,
    avgBuyPrice: 6500.0,
    currentPrice: 6850.4,
    firstBuyDate: "2023-10-12",
    lastBuyDate: "2024-03-08",
    totalValue: 171260,
    totalCost: 162500,
    return: 8760,
    returnPercent: 5.4,
    sector: "Financial Services",
    marketCap: "Large Cap",
    transactions: [],
  },
]

const initialPortfolioData: PortfolioData = {
  totalValue: 1233364,
  totalCost: 1176000,
  totalReturn: 57364,
  returnPercentage: 4.9,
  positions: samplePositions,
  transactions: [],
  analysis: null,
  performanceHistory: [
    { date: "2023-06-01", totalValue: 1176000, totalReturn: 0, returnPercent: 0, benchmark: 0 },
    { date: "2023-07-01", totalValue: 1188240, totalReturn: 12240, returnPercent: 1.04, benchmark: 0.8 },
    { date: "2023-08-01", totalValue: 1205760, totalReturn: 29760, returnPercent: 2.53, benchmark: 2.1 },
    { date: "2023-09-01", totalValue: 1194120, totalReturn: 18120, returnPercent: 1.54, benchmark: 1.2 },
    { date: "2023-10-01", totalValue: 1217640, totalReturn: 41640, returnPercent: 3.54, benchmark: 2.8 },
    { date: "2023-11-01", totalValue: 1229880, totalReturn: 53880, returnPercent: 4.58, benchmark: 3.9 },
    { date: "2023-12-01", totalValue: 1241760, totalReturn: 65760, returnPercent: 5.59, benchmark: 4.2 },
    { date: "2024-01-01", totalValue: 1225320, totalReturn: 49320, returnPercent: 4.19, benchmark: 3.5 },
    { date: "2024-02-01", totalValue: 1247880, totalReturn: 71880, returnPercent: 6.11, benchmark: 4.8 },
    { date: "2024-03-01", totalValue: 1233364, totalReturn: 57364, returnPercent: 4.88, benchmark: 4.1 },
  ],
  performanceData: [
    { month: "Jun '23", portfolio: 0.0, nifty: 0.0 },
    { month: "Jul '23", portfolio: 1.04, nifty: 0.8 },
    { month: "Aug '23", portfolio: 2.53, nifty: 2.1 },
    { month: "Sep '23", portfolio: 1.54, nifty: 1.2 },
    { month: "Oct '23", portfolio: 3.54, nifty: 2.8 },
    { month: "Nov '23", portfolio: 4.58, nifty: 3.9 },
    { month: "Dec '23", portfolio: 5.59, nifty: 4.2 },
    { month: "Jan '24", portfolio: 4.19, nifty: 3.5 },
    { month: "Feb '24", portfolio: 6.11, nifty: 4.8 },
    { month: "Mar '24", portfolio: 4.88, nifty: 4.1 },
  ],
  allocationData: [{ name: "Large Cap", value: 100 }],
  sectorData: [
    { name: "Financial Services", value: 35.2 },
    { name: "Information Technology", value: 44.9 },
    { name: "Oil & Gas", value: 19.9 },
  ],
  strategyData: [
    { name: "Value", value: 30 },
    { name: "Growth", value: 30 },
    { name: "Quality", value: 40 },
  ],
  cagr: 6.8,
  sharpeRatio: 1.45,
  maxDrawdown: 4.2,
  volatility: 12.8,
  lastPriceUpdate: new Date().toISOString(),
}

const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Q4 2024 Portfolio Review: Navigating Market Volatility",
    excerpt:
      "A comprehensive analysis of my portfolio performance during the fourth quarter, including key lessons learned and strategy adjustments.",
    content: `# Q4 2024 Portfolio Review: Navigating Market Volatility

The fourth quarter of 2024 presented unique challenges and opportunities in the financial markets. In this comprehensive review, I'll break down my portfolio's performance, key decisions made, and lessons learned.

## Portfolio Performance Overview

During Q4 2024, my portfolio achieved a **4.9% return**, maintaining steady performance despite market volatility. This performance was driven by strategic positions in technology and financial services sectors.

### Key Holdings Performance:
- **HDFC Bank (HDFC)**: +6.2% - Benefited from strong quarterly results and improved asset quality
- **Infosys (INFY)**: +5.1% - AI integration and digital transformation deals driving growth
- **TCS**: +3.5% - Consistent performance with strong client additions
- **Reliance Industries**: +4.3% - Diversified business model providing stability
- **Bajaj Finance**: +5.4% - Strong growth in consumer lending segment

## Strategic Decisions

### 1. Sector Diversification
Maintained balanced exposure across Financial Services (35.2%) and Information Technology (44.9%), with selective exposure to Oil & Gas (19.9%).

### 2. Risk Management
Implemented systematic risk management through:
- Position sizing based on market cap and liquidity
- Regular portfolio rebalancing
- Focus on quality companies with strong fundamentals

## Performance Metrics

- **CAGR**: 6.8% (annualized)
- **Sharpe Ratio**: 1.45 (excellent risk-adjusted returns)
- **Maximum Drawdown**: 4.2% (controlled downside risk)
- **Volatility**: 12.8% (moderate risk profile)

## Looking Ahead

Based on current market conditions and economic indicators, the portfolio is positioned for:
- Continued focus on quality large-cap stocks
- Selective opportunities in financial services
- Technology sector exposure for long-term growth

## Conclusion

The portfolio's performance demonstrates the effectiveness of a disciplined, quality-focused investment approach. While maintaining conservative risk parameters, we've achieved consistent returns that outpace traditional benchmarks.

*This analysis is for informational purposes only and does not constitute investment advice.*`,
    publishedAt: "2024-01-15",
    views: 1250,
    published: true,
  },
]

const initialClients: Client[] = [
  {
    id: "client-001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 9876543210",
    investmentAmount: 5000000,
    riskProfile: "Moderate",
    onboardingDate: "2024-01-15",
    status: "Active",
  },
]

export const useDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      portfolioData: initialPortfolioData,
      blogPosts: initialBlogPosts,
      clients: initialClients,
      updatePortfolioData: (data) =>
        set((state) => ({
          portfolioData: { ...state.portfolioData, ...data },
        })),
      addBlogPost: (post) =>
        set((state) => ({
          blogPosts: [
            ...state.blogPosts,
            {
              ...post,
              id: Math.max(...state.blogPosts.map((p) => p.id), 0) + 1,
            },
          ],
        })),
      updateBlogPost: (id, post) =>
        set((state) => ({
          blogPosts: state.blogPosts.map((p) => (p.id === id ? { ...p, ...post } : p)),
        })),
      deleteBlogPost: (id) =>
        set((state) => ({
          blogPosts: state.blogPosts.filter((p) => p.id !== id),
        })),
      toggleBlogPostPublish: (id) =>
        set((state) => ({
          blogPosts: state.blogPosts.map((p) =>
            p.id === id
              ? {
                  ...p,
                  published: !p.published,
                  publishedAt: !p.published ? new Date().toISOString().split("T")[0] : null,
                }
              : p,
          ),
        })),
      refreshStockPrices: async () => {
        const { positions } = get().portfolioData
        const updatedPositions = await Promise.all(
          positions.map(async (position) => {
            const newPrice = await fetchStockPrice(position.symbol)
            const newTotalValue = newPrice * position.shares
            const newReturn = newTotalValue - position.totalCost
            const newReturnPercent = position.totalCost > 0 ? (newReturn / position.totalCost) * 100 : 0

            return {
              ...position,
              currentPrice: newPrice,
              totalValue: Number(newTotalValue.toFixed(0)),
              return: Number(newReturn.toFixed(0)),
              returnPercent: Number(newReturnPercent.toFixed(1)),
            }
          }),
        )

        const newTotalValue = updatedPositions.reduce((sum, pos) => sum + pos.totalValue, 0)
        const newTotalCost = updatedPositions.reduce((sum, pos) => sum + pos.totalCost, 0)
        const newTotalReturn = newTotalValue - newTotalCost
        const newReturnPercentage = newTotalCost > 0 ? (newTotalReturn / newTotalCost) * 100 : 0

        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            positions: updatedPositions,
            totalValue: newTotalValue,
            totalCost: newTotalCost,
            totalReturn: newTotalReturn,
            returnPercentage: Number(newReturnPercentage.toFixed(1)),
            lastPriceUpdate: new Date().toISOString(),
          },
        }))

        get().calculatePerformanceMetrics()
      },
      addClient: (client) =>
        set((state) => ({
          clients: [
            ...state.clients,
            {
              ...client,
              id: `client-${Date.now()}`,
            },
          ],
        })),
      updateClient: (id, client) =>
        set((state) => ({
          clients: state.clients.map((c) => (c.id === id ? { ...c, ...client } : c)),
        })),
      calculatePerformanceMetrics: () => {
        const { performanceHistory, totalCost, totalValue } = get().portfolioData

        if (performanceHistory.length < 2) return

        const returns = performanceHistory.slice(1).map((record, index) => {
          const prevRecord = performanceHistory[index]
          return (record.totalValue - prevRecord.totalValue) / prevRecord.totalValue
        })

        const values = performanceHistory.map((record) => record.totalValue)
        const years =
          performanceHistory.length > 1
            ? (new Date(performanceHistory[performanceHistory.length - 1].date).getTime() -
                new Date(performanceHistory[0].date).getTime()) /
              (365.25 * 24 * 60 * 60 * 1000)
            : 1

        const cagr = calculateCAGR(totalCost, totalValue, years)
        const sharpeRatio = calculateSharpeRatio(returns)
        const maxDrawdown = calculateMaxDrawdown(values)
        const volatility =
          returns.length > 0
            ? Math.sqrt(returns.reduce((sum, r) => sum + Math.pow(r, 2), 0) / returns.length) * Math.sqrt(252) * 100
            : 0

        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            cagr: Number(cagr.toFixed(1)),
            sharpeRatio: Number(sharpeRatio.toFixed(2)),
            maxDrawdown: Number(maxDrawdown.toFixed(1)),
            volatility: Number(volatility.toFixed(1)),
          },
        }))
      },
      addPerformanceRecord: () => {
        const { portfolioData } = get()
        const today = new Date().toISOString().split("T")[0]

        if (portfolioData.performanceHistory.some((record) => record.date === today)) {
          return
        }

        const newRecord: PerformanceRecord = {
          date: today,
          totalValue: portfolioData.totalValue,
          totalReturn: portfolioData.totalReturn,
          returnPercent: portfolioData.returnPercentage,
          benchmark: portfolioData.returnPercentage * 0.85,
        }

        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            performanceHistory: [...state.portfolioData.performanceHistory, newRecord],
          },
        }))

        get().calculatePerformanceMetrics()
      },
      uploadTransactions: (transactions) => {
        // Implementation for transaction upload
        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            transactions,
          },
        }))
      },
      generatePortfolioAnalysis: () => {
        // Implementation for portfolio analysis
        const { positions } = get().portfolioData
        // Generate analysis based on positions
      },
    }),
    {
      name: "jainwin-marwari-data-store",
    },
  ),
)
