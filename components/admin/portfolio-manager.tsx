"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, RefreshCw, Download, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useDataStore } from "@/lib/data-store"

export function PortfolioManager() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const { toast } = useToast()
  const { portfolioData, updatePortfolioData, refreshStockPrices, addPerformanceRecord } = useDataStore()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      const fileContent = await file.text()
      const lines = fileContent.split("\n")
      const headers = lines[0].split(",")

      // Parse CSV data with enhanced structure
      const positions = lines
        .slice(1)
        .filter((line) => line.trim())
        .map((line) => {
          const values = line.split(",")
          const symbol = values[0]?.trim()
          const shares = Number.parseInt(values[1]?.trim() || "0")
          const buyPrice = Number.parseFloat(values[2]?.trim() || "0")
          const buyDate = values[3]?.trim() || new Date().toISOString().split("T")[0]

          // Use current price as buy price for now, will be updated by API
          const currentPrice = buyPrice
          const totalValue = shares * currentPrice
          const totalCost = shares * buyPrice
          const returnAmount = totalValue - totalCost
          const returnPercent = totalCost > 0 ? (returnAmount / totalCost) * 100 : 0

          return {
            symbol,
            shares,
            buyPrice,
            currentPrice,
            buyDate,
            totalValue,
            totalCost,
            return: Math.round(returnAmount),
            returnPercent: Number(returnPercent.toFixed(1)),
          }
        })

      const newTotalValue = positions.reduce((sum, pos) => sum + pos.totalValue, 0)
      const newTotalCost = positions.reduce((sum, pos) => sum + pos.totalCost, 0)
      const newTotalReturn = newTotalValue - newTotalCost
      const newReturnPercentage = newTotalCost > 0 ? (newTotalReturn / newTotalCost) * 100 : 0

      updatePortfolioData({
        positions,
        totalValue: newTotalValue,
        totalCost: newTotalCost,
        totalReturn: newTotalReturn,
        returnPercentage: Number(newReturnPercentage.toFixed(1)),
      })

      // Add performance record
      addPerformanceRecord()

      toast({
        title: "Portfolio updated successfully",
        description: `Uploaded ${positions.length} positions from ${file.name}`,
      })

      setFile(null)
      const fileInput = document.getElementById("portfolio-file-upload") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Error parsing CSV file. Please check the format.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleRefreshPrices = async () => {
    setRefreshing(true)
    try {
      await refreshStockPrices()
      addPerformanceRecord()
      toast({
        title: "Prices updated",
        description: "Stock prices have been refreshed with latest market data",
      })
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Error fetching latest prices",
        variant: "destructive",
      })
    } finally {
      setRefreshing(false)
    }
  }

  const downloadTemplate = () => {
    const csvContent = `Symbol,Shares,BuyPrice,BuyDate
HDFC,100,1500.00,2023-06-15
INFY,200,1240.00,2023-07-20
TCS,50,3200.00,2023-08-10
RELIANCE,75,2200.00,2023-09-05`

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "portfolio-template.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Portfolio Data Management
          </CardTitle>
          <CardDescription>
            Upload CSV files with Symbol, Shares, BuyPrice, and BuyDate columns to track performance over time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="portfolio-file-upload">Upload Portfolio CSV</Label>
                <Input
                  id="portfolio-file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                {file && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={handleUpload} disabled={!file || uploading} className="flex-1">
                  {uploading ? "Uploading..." : "Upload Portfolio"}
                </Button>
                <Button variant="outline" onClick={downloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  Template
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Live Data Management</Label>
                <p className="text-sm text-muted-foreground">
                  Refresh stock prices with real-time market data and record performance
                </p>
              </div>
              <Button onClick={handleRefreshPrices} disabled={refreshing} className="w-full">
                <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing..." : "Refresh Stock Prices"}
              </Button>
              <Button onClick={addPerformanceRecord} variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Record Performance
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/40">
        <CardHeader>
          <CardTitle>Current Portfolio Summary</CardTitle>
          <CardDescription>Overview of uploaded portfolio data with performance tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <div className="bg-primary/10 rounded-lg p-4">
              <h3 className="font-medium text-primary mb-2">Total Value</h3>
              <p className="text-2xl font-bold">₹{portfolioData.totalValue.toLocaleString()}</p>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4">
              <h3 className="font-medium text-blue-400 mb-2">Total Cost</h3>
              <p className="text-2xl font-bold text-blue-400">₹{portfolioData.totalCost.toLocaleString()}</p>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4">
              <h3 className="font-medium text-green-400 mb-2">Total Return</h3>
              <p className="text-2xl font-bold text-green-400">₹{portfolioData.totalReturn.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-500/10 rounded-lg p-4">
              <h3 className="font-medium text-yellow-400 mb-2">Return %</h3>
              <p className="text-2xl font-bold text-yellow-400">+{portfolioData.returnPercentage}%</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Portfolio Metrics</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Total Positions: {portfolioData.positions.length}</p>
                <p>CAGR: {portfolioData.cagr}%</p>
                <p>Sharpe Ratio: {portfolioData.sharpeRatio}</p>
                <p>Max Drawdown: {portfolioData.maxDrawdown}%</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Performance History</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Records: {portfolioData.performanceHistory.length}</p>
                <p>Last Updated: {new Date().toLocaleString()}</p>
                <p>Tracking Since: {portfolioData.performanceHistory[0]?.date || "N/A"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
