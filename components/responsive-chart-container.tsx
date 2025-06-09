"use client"

import type React from "react"

import { useMobile } from "@/hooks/use-mobile"

interface ResponsiveChartContainerProps {
  children: React.ReactNode
  height?: number
  mobileHeight?: number
}

export function ResponsiveChartContainer({
  children,
  height = 320,
  mobileHeight = 250,
}: ResponsiveChartContainerProps) {
  const isMobile = useMobile()
  const chartHeight = isMobile ? mobileHeight : height

  return <div className={`h-[${chartHeight}px] w-full`}>{children}</div>
}
