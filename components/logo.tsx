"use client"

import Link from "next/link"
import { TrendingUp } from "lucide-react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <TrendingUp className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
        Jainwin Marwari
      </span>
    </Link>
  )
}
