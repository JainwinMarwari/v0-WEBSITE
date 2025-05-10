// components/ui/subscribe-button.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export function SubscribeButton() {
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
        <Button variant="outline" size="sm">
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
            placeholder="Your best email"
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
