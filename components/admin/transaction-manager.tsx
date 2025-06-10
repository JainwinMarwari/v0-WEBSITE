"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Download, FileText, TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useDataStore } from "@/lib/data-store"
import { Badge } from "@/components/ui/badge"

export function TransactionManager() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()
  const { portfolioData, uploadTransactions } = useDataStore()

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
      const headers = lines[0].split(",").map((h) => h.trim())

      // Parse transactions
      const transactions = lines
        .slice(1)
        .filter((line) => line.trim())
        .map((line, index) => {
          const values = line.split(",").map((v) => v.trim())
          const date = values[0]
          const symbol = values[1]
          const type = values[2]?.toUpperCase() as "BUY" | "SELL"
          const quantity = Number.parseInt(values[3] || "0")
          const price = Number.parseFloat(values[4] || "0")
          const fees = Number.parseFloat(values[5] || "0")
          const amount = quantity * price + (type === "BUY" ? fees : -fees)

          return {
            id: `txn-${Date.now()}-${index}`,
            date,
            symbol,
            type,
            quantity,
            price,
            amount,
            fees,
          }
        })

      uploadTransactions(transactions)

      toast({
        title: "Transactions uploaded successfully",
        description: `Processed ${transactions.length} transactions and generated portfolio analysis`,
      })

      setFile(null)
      const fileInput = document.getElementById("transaction-file-upload") as HTMLInputElement
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

  const downloadTemplate = () => {
    const csvContent = `Date,Symbol,Type,Quantity,Price,Fees
2024-01-15,HDFC,BUY,100,1500.00,15.00
2024-02-20,INFY,BUY,200,1240.00,24.80
2024-03-10,TCS,BUY,50,3200.00,16.00
2024-06-15,HDFC,SELL,50,1600.00,8.00`

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "transactions-template.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const { analysis } = portfolioData

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Transaction Upload & Analysis
          </CardTitle>
          <CardDescription>
            Upload your transaction history to generate detailed portfolio analysis and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transaction-file-upload">Upload Transactions CSV</Label>
                <Input
                  id="transaction-file-upload"
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
                  {uploading ? "Processing..." : "Upload & Analyze"}
                </Button>
                <Button variant="outline" onClick={downloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  Template
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>File Format Requirements</Label>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• CSV format with headers: Date, Symbol, Type, Quantity, Price, Fees</p>
                  <p>• Date format: YYYY-MM-DD</p>
                  <p>• Type: BUY or SELL</p>
                  <p>• Numeric values for Quantity, Price, and Fees</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Portfolio Analysis Results
              </CardTitle>
              <CardDescription>Comprehensive analysis based on your transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-medium text-blue-700 mb-2">Total Invested</h3>
                  <p className="text-2xl font-bold text-blue-800">₹{analysis.totalInvested.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-medium text-green-700 mb-2">Current Value</h3>
                  <p className="text-2xl font-bold text-green-800">₹{analysis.currentValue.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h3 className="font-medium text-purple-700 mb-2">Total Returns</h3>
                  <p className="text-2xl font-bold text-purple-800">₹{analysis.totalReturns.toLocaleString()}</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                  <h3 className="font-medium text-indigo-700 mb-2">Return %</h3>
                  <p className="text-2xl font-bold text-indigo-800">+{analysis.returnPercentage.toFixed(1)}%</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Performance Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Realized Gains</span>
                      <span className="font-bold text-green-600">₹{analysis.realizedGains.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Unrealized Gains</span>
                      <span className="font-bold text-blue-600">₹{analysis.unrealizedGains.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Holding Period</span>
                      <span className="font-bold">{analysis.holdingPeriod} days</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Top Performers</h4>
                  <div className="space-y-2">
                    {analysis.topPerformers.slice(0, 3).map((position) => (
                      <div
                        key={position.symbol}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <span className="font-medium">{position.symbol}</span>
                          <p className="text-sm text-muted-foreground">₹{position.totalValue.toLocaleString()}</p>
                        </div>
                        <Badge
                          variant={position.returnPercent >= 0 ? "default" : "destructive"}
                          className="flex items-center gap-1"
                        >
                          {position.returnPercent >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {position.returnPercent >= 0 ? "+" : ""}
                          {position.returnPercent.toFixed(1)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {analysis.sectorAllocation.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-lg mb-4">Sector Allocation</h4>
                  <div className="grid gap-3 md:grid-cols-3">
                    {analysis.sectorAllocation.map((sector) => (
                      <div key={sector.sector} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{sector.sector}</span>
                          <span className="text-sm font-bold">{sector.percentage.toFixed(1)}%</span>
                        </div>
                        <p className="text-sm text-muted-foreground">₹{sector.value.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Transaction Summary
              </CardTitle>
              <CardDescription>Overview of processed transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Total Transactions</h4>
                    <p className="text-2xl font-bold">{portfolioData.transactions.length}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Buy Orders</h4>
                    <p className="text-2xl font-bold text-green-600">
                      {portfolioData.transactions.filter((t) => t.type === "BUY").length}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Sell Orders</h4>
                    <p className="text-2xl font-bold text-red-600">
                      {portfolioData.transactions.filter((t) => t.type === "SELL").length}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Analysis generated on: {new Date().toLocaleString()}</p>
                  <p>Data includes all buy/sell transactions with fees and commissions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
