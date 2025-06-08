"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Upload, Home, PenTool, User } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Portfolio", href: "/portfolio", icon: BarChart3 },
  { name: "Upload Data", href: "/upload", icon: Upload },
  { name: "Blog", href: "/blog", icon: FileText },
  { name: "Write Post", href: "/blog/write", icon: PenTool },
  { name: "About", href: "/about", icon: User },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-2">
      {navigation.map((item) => {
        const Icon = item.icon
        return (
          <Button
            key={item.name}
            variant={pathname === item.href ? "default" : "ghost"}
            asChild
            className="flex items-center gap-2"
          >
            <Link href={item.href}>
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
