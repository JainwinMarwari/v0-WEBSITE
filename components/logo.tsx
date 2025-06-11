"use client"

import Link from "next/link"
import { TrendingUp } from "lucide-react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
      <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
        <TrendingUp className="h-5 w-5 text-white" />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Jainwin Marwari
      </span>
    </Link>
  )
}
