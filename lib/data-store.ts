"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Position {
  symbol: string
  shares: number
  buyPrice: number
  currentPrice: number
  buyDate: string
  totalValue: number
  totalCost: number
  return: number
  returnPercent: number
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

interface PortfolioData {
  totalValue: number
  totalCost: number
  totalReturn: number
  returnPercentage: number
  positions: Position[]
  performanceHistory: PerformanceRecord[]
  performanceData: Array<{ month: string; portfolio: number; nifty: number }>
  allocationData: Array<{ name: string; value: number }>
  sectorData: Array<{ name: string; value: number }>
  strategyData: Array<{ name: string; value: number }>
  cagr: number
  sharpeRatio: number
  maxDrawdown: number
  volatility: number
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
}

// Yahoo Finance API integration (simplified for demo)
const fetchStockPrice = async (symbol: string): Promise<number> => {
  try {
    // In a real implementation, you would use a proper API key and endpoint
    // For demo purposes, we'll simulate API calls with realistic price movements
    const basePrice =
      {
        HDFC: 1752.25,
        INFY: 1450.75,
        TCS: 3520.5,
        RELIANCE: 2450.8,
        BAJAJ: 1120.4,
        ZOMATO: 175.6,
        NYKAA: 145.8,
        ADANI: 2850.3,
      }[symbol] || 100

    // Simulate realistic price movement
    const volatility = 0.02 // 2% daily volatility
    const randomChange = (Math.random() - 0.5) * 2 * volatility
    const newPrice = basePrice * (1 + randomChange)

    return Number(newPrice.toFixed(2))
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error)
    return 0
  }
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

const initialPortfolioData: PortfolioData = {
  totalValue: 4523189,
  totalCost: 3699733,
  totalReturn: 823456,
  returnPercentage: 22.3,
  positions: [
    {
      symbol: "HDFC",
      shares: 100,
      buyPrice: 1500.0,
      currentPrice: 1752.25,
      buyDate: "2023-06-15",
      totalValue: 175225,
      totalCost: 150000,
      return: 25225,
      returnPercent: 16.8,
    },
    {
      symbol: "INFY",
      shares: 200,
      buyPrice: 1240.0,
      currentPrice: 1450.75,
      buyDate: "2023-07-20",
      totalValue: 290150,
      totalCost: 248000,
      return: 42150,
      returnPercent: 17.0,
    },
    {
      symbol: "TCS",
      shares: 50,
      buyPrice: 3200.0,
      currentPrice: 3520.5,
      buyDate: "2023-08-10",
      totalValue: 176025,
      totalCost: 160000,
      return: 16025,
      returnPercent: 10.0,
    },
    {
      symbol: "RELIANCE",
      shares: 75,
      buyPrice: 2200.0,
      currentPrice: 2450.8,
      buyDate: "2023-09-05",
      totalValue: 183810,
      totalCost: 165000,
      return: 18810,
      returnPercent: 11.4,
    },
  ],
  performanceHistory: [
    { date: "2024-01-01", totalValue: 3699733, totalReturn: 0, returnPercent: 0, benchmark: 0 },
    { date: "2024-06-01", totalValue: 4100000, totalReturn: 400267, returnPercent: 10.8, benchmark: 8.5 },
    { date: "2024-12-01", totalValue: 4523189, totalReturn: 823456, returnPercent: 22.3, benchmark: 16.5 },
  ],
  performanceData: [
    { month: "Jan", portfolio: 12.5, nifty: 8.2 },
    { month: "Feb", portfolio: 10.8, nifty: 9.5 },
    { month: "Mar", portfolio: 15.2, nifty: 11.3 },
    { month: "Apr", portfolio: 14.1, nifty: 10.8 },
    { month: "May", portfolio: 18.5, nifty: 12.4 },
    { month: "Jun", portfolio: 17.2, nifty: 13.1 },
    { month: "Jul", portfolio: 19.8, nifty: 14.5 },
    { month: "Aug", portfolio: 21.5, nifty: 15.2 },
    { month: "Sep", portfolio: 20.3, nifty: 14.8 },
    { month: "Oct", portfolio: 22.8, nifty: 16.1 },
    { month: "Nov", portfolio: 21.9, nifty: 15.7 },
    { month: "Dec", portfolio: 22.3, nifty: 16.5 },
  ],
  allocationData: [
    { name: "Large Cap", value: 30 },
    { name: "Mid Cap", value: 40 },
    { name: "Small Cap", value: 20 },
    { name: "Micro Cap", value: 10 },
  ],
  sectorData: [
    { name: "IT", value: 25 },
    { name: "Financial", value: 20 },
    { name: "Consumer", value: 15 },
    { name: "Healthcare", value: 15 },
    { name: "Manufacturing", value: 10 },
    { name: "Others", value: 15 },
  ],
  strategyData: [
    { name: "Value", value: 30 },
    { name: "Growth", value: 30 },
    { name: "Quality", value: 40 },
  ],
  cagr: 22.3,
  sharpeRatio: 1.45,
  maxDrawdown: 8.2,
  volatility: 15.6,
}

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
  {
    id: "client-002",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 9876543211",
    investmentAmount: 2500000,
    riskProfile: "Conservative",
    onboardingDate: "2024-02-20",
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
          },
        }))

        // Recalculate performance metrics
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

        // Don't add duplicate records for the same date
        if (portfolioData.performanceHistory.some((record) => record.date === today)) {
          return
        }

        const newRecord: PerformanceRecord = {
          date: today,
          totalValue: portfolioData.totalValue,
          totalReturn: portfolioData.totalReturn,
          returnPercent: portfolioData.returnPercentage,
          benchmark: portfolioData.returnPercentage * 0.8, // Simulated benchmark
        }

        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            performanceHistory: [...state.portfolioData.performanceHistory, newRecord],
          },
        }))

        get().calculatePerformanceMetrics()
      },
    }),
    {
      name: "jainwin-marwari-data-store",
    },
  ),
)
