"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface MobileChartProps {
  title: string
  description: string
  children: React.ReactNode
  defaultExpanded?: boolean
}

export function MobileChart({ title, description, children, defaultExpanded = false }: MobileChartProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const isMobile = useMobile()

  if (!isMobile) {
    return (
      <Card className="bg-card/50 border-border/40">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 border-border/40">
      <CardHeader className="pb-2">
        <Button
          variant="ghost"
          className="w-full justify-between p-0 h-auto"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="text-left">
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      {isExpanded && <CardContent className="pt-2">{children}</CardContent>}
    </Card>
  )
}
