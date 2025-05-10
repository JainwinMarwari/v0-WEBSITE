"use client";

import Link from "next/link";
import { ArrowUpRight, BarChart3, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import PerformanceChart from "@/components/performance-chart";
import RecentArticles from "@/components/recent-articles";

function SubscribeButton({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "🎉 Subscribed!",
        description: "You'll be notified about new articles",
      });
      setOpen(false);
      setEmail("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={className}
        >
          Subscribe
        </Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader className="text-lg font-semibold mb-4">
          Get Article Updates
        </DialogHeader>
        <form onSubmit={handleSubscribe} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Notify Me
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <TrendingUp className="h-5 w-5" />
            <span>Jainwin Marwari</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/portfolio" className="text-sm font-medium transition-colors hover:text-primary">
              Portfolio
            </Link>
            <Link href="/articles" className="text-sm font-medium transition-colors hover:text-primary">
              Articles
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
          </nav>
          <SubscribeButton className="hidden md:flex" />
        </div>
      </header>

      <main className="flex-1">
        {/* Rest of your existing content remains the same */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
          {/* ... existing section content ... */}
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          {/* ... existing section content ... */}
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
          {/* ... existing section content ... */}
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 Jainwin Marwari. All rights reserved.</p>
          <div className="flex gap-4">
            <Link 
              href="https://www.linkedin.com/in/harshandfinance" 
              className="text-sm font-medium transition-colors hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
            <Link 
              href="https://x.com/Harshjain10__" 
              className="text-sm font-medium transition-colors hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </Link>
            <Link 
              href="mailto:jainwinmarwari@gmail.com" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              jainwinmarwari@gmail.com
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
