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

// Stable price system with realistic stock data
const stockDatabase = {
  RELIANCE: { basePrice: 2450.8, name: "Reliance Industries Ltd", sector: "Oil & Gas", marketCap: "Large Cap" },
  TCS: {
    basePrice: 3520.5,
    name: "Tata Consultancy Services",
    sector: "Information Technology",
    marketCap: "Large Cap",
  },
  HDFC: { basePrice: 1752.25, name: "HDFC Bank Ltd", sector: "Financial Services", marketCap: "Large Cap" },
  INFY: { basePrice: 1450.75, name: "Infosys Ltd", sector: "Information Technology", marketCap: "Large Cap" },
  BAJFINANCE: { basePrice: 6850.4, name: "Bajaj Finance Ltd", sector: "Financial Services", marketCap: "Large Cap" },
}

const getStablePrice = (symbol: string, basePrice: number): number => {
  const today = new Date().toDateString()
  const lastUpdate = localStorage.getItem(`price_${symbol}_date`)

  if (lastUpdate === today) {
    const savedPrice = localStorage.getItem(`price_${symbol}`)
    if (savedPrice) return Number.parseFloat(savedPrice)
  }

  // Generate new daily price (simulating market close)
  const volatility = 0.015 // 1.5% daily volatility
  const randomChange = (Math.random() - 0.5) * 2 * volatility
  const newPrice = basePrice * (1 + randomChange)

  localStorage.setItem(`price_${symbol}`, newPrice.toFixed(2))
  localStorage.setItem(`price_${symbol}_date`, today)

  return Number(newPrice.toFixed(2))
}

const fetchStockPrice = async (symbol: string): Promise<number> => {
  const stockInfo = stockDatabase[symbol as keyof typeof stockDatabase]
  if (!stockInfo) return 100
  return getStablePrice(symbol, stockInfo.basePrice)
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

// Sample portfolio data with realistic positions
const samplePositions: Position[] = [
  {
    symbol: "RELIANCE",
    companyName: "Reliance Industries Ltd",
    shares: 150,
    avgBuyPrice: 2200.0,
    currentPrice: getStablePrice("RELIANCE", 2450.8),
    firstBuyDate: "2023-03-15",
    lastBuyDate: "2023-08-20",
    totalValue: 0,
    totalCost: 330000,
    return: 0,
    returnPercent: 0,
    sector: "Oil & Gas",
    marketCap: "Large Cap",
    transactions: [],
  },
  {
    symbol: "TCS",
    companyName: "Tata Consultancy Services",
    shares: 80,
    avgBuyPrice: 3200.0,
    currentPrice: getStablePrice("TCS", 3520.5),
    firstBuyDate: "2023-04-10",
    lastBuyDate: "2023-09-15",
    totalValue: 0,
    totalCost: 256000,
    return: 0,
    returnPercent: 0,
    sector: "Information Technology",
    marketCap: "Large Cap",
    transactions: [],
  },
  {
    symbol: "HDFC",
    companyName: "HDFC Bank Ltd",
    shares: 200,
    avgBuyPrice: 1500.0,
    currentPrice: getStablePrice("HDFC", 1752.25),
    firstBuyDate: "2023-02-20",
    lastBuyDate: "2023-07-10",
    totalValue: 0,
    totalCost: 300000,
    return: 0,
    returnPercent: 0,
    sector: "Financial Services",
    marketCap: "Large Cap",
    transactions: [],
  },
  {
    symbol: "INFY",
    companyName: "Infosys Ltd",
    shares: 120,
    avgBuyPrice: 1300.0,
    currentPrice: getStablePrice("INFY", 1450.75),
    firstBuyDate: "2023-05-05",
    lastBuyDate: "2023-10-12",
    totalValue: 0,
    totalCost: 156000,
    return: 0,
    returnPercent: 0,
    sector: "Information Technology",
    marketCap: "Large Cap",
    transactions: [],
  },
  {
    symbol: "BAJFINANCE",
    companyName: "Bajaj Finance Ltd",
    shares: 25,
    avgBuyPrice: 6200.0,
    currentPrice: getStablePrice("BAJFINANCE", 6850.4),
    firstBuyDate: "2023-06-18",
    lastBuyDate: "2023-11-08",
    totalValue: 0,
    totalCost: 155000,
    return: 0,
    returnPercent: 0,
    sector: "Financial Services",
    marketCap: "Large Cap",
    transactions: [],
  },
]

// Calculate initial values for sample positions
samplePositions.forEach((position) => {
  position.totalValue = position.shares * position.currentPrice
  position.return = position.totalValue - position.totalCost
  position.returnPercent = (position.return / position.totalCost) * 100
})

const initialPortfolioData: PortfolioData = {
  totalValue: samplePositions.reduce((sum, pos) => sum + pos.totalValue, 0),
  totalCost: samplePositions.reduce((sum, pos) => sum + pos.totalCost, 0),
  totalReturn: samplePositions.reduce((sum, pos) => sum + pos.return, 0),
  returnPercentage: 0,
  positions: samplePositions,
  transactions: [],
  analysis: null,
  performanceHistory: [
    { date: "2023-01-01", totalValue: 1197000, totalReturn: 0, returnPercent: 0, benchmark: 0 },
    { date: "2023-03-01", totalValue: 1256850, totalReturn: 59850, returnPercent: 5.0, benchmark: 3.2 },
    { date: "2023-06-01", totalValue: 1317692, totalReturn: 120692, returnPercent: 10.1, benchmark: 7.8 },
    { date: "2023-09-01", totalValue: 1378534, totalReturn: 181534, returnPercent: 15.2, benchmark: 11.5 },
    { date: "2023-12-01", totalValue: 1439376, totalReturn: 242376, returnPercent: 20.3, benchmark: 15.1 },
    { date: "2024-01-01", totalValue: 1500218, totalReturn: 303218, returnPercent: 25.3, benchmark: 18.7 },
  ],
  performanceData: [
    { month: "Jan", portfolio: 25.3, nifty: 18.7 },
    { month: "Feb", portfolio: 23.8, nifty: 17.2 },
    { month: "Mar", portfolio: 26.1, nifty: 19.5 },
    { month: "Apr", portfolio: 24.7, nifty: 18.1 },
    { month: "May", portfolio: 27.4, nifty: 20.8 },
    { month: "Jun", portfolio: 25.9, nifty: 19.3 },
    { month: "Jul", portfolio: 28.2, nifty: 21.6 },
    { month: "Aug", portfolio: 26.8, nifty: 20.2 },
    { month: "Sep", portfolio: 29.1, nifty: 22.4 },
    { month: "Oct", portfolio: 27.6, nifty: 21.0 },
    { month: "Nov", portfolio: 30.3, nifty: 23.7 },
    { month: "Dec", portfolio: 28.9, nifty: 22.3 },
  ],
  allocationData: [
    { name: "Large Cap", value: 85 },
    { name: "Mid Cap", value: 15 },
    { name: "Small Cap", value: 0 },
  ],
  sectorData: [
    { name: "Information Technology", value: 35 },
    { name: "Financial Services", value: 38 },
    { name: "Oil & Gas", value: 27 },
  ],
  strategyData: [
    { name: "Value", value: 30 },
    { name: "Growth", value: 35 },
    { name: "Quality", value: 35 },
  ],
  cagr: 28.9,
  sharpeRatio: 1.85,
  maxDrawdown: 6.2,
  volatility: 14.3,
  lastPriceUpdate: new Date().toISOString(),
}

// Calculate initial return percentage
initialPortfolioData.returnPercentage =
  initialPortfolioData.totalCost > 0 ? (initialPortfolioData.totalReturn / initialPortfolioData.totalCost) * 100 : 0

const initialBlogPosts: BlogPost[] = [
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
            const newReturnPercent = (newReturn / position.totalCost) * 100

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
        const newReturnPercentage = (newTotalReturn / newTotalCost) * 100

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
          benchmark: portfolioData.returnPercentage * 0.8,
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
