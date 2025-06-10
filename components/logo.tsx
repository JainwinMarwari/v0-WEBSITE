"use client"

import Link from "next/link"
import { TrendingUp } from "lucide-react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-200 group">
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
        <TrendingUp className="h-6 w-6 text-primary-foreground" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Jainwin Marwari
        </span>
        <span className="text-xs text-muted-foreground font-medium">Portfolio Management</span>
      </div>
    </Link>
  )
}
