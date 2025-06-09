"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Edit, Mail, Phone, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useDataStore } from "@/lib/data-store"

export function ClientManager() {
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    investmentAmount: "",
    riskProfile: "" as "Conservative" | "Moderate" | "Aggressive" | "",
  })
  const { toast } = useToast()
  const { clients, addClient, updateClient } = useDataStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.investmentAmount) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const clientData = {
      ...formData,
      investmentAmount: Number(formData.investmentAmount),
      riskProfile: formData.riskProfile as "Conservative" | "Moderate" | "Aggressive",
      onboardingDate: new Date().toISOString().split("T")[0],
      status: "Active" as const,
    }

    if (editingId) {
      updateClient(editingId, clientData)
      toast({
        title: "Client updated",
        description: "Client information has been successfully updated",
      })
      setEditingId(null)
    } else {
      addClient(clientData)
      toast({
        title: "Client added",
        description: "New client has been successfully onboarded",
      })
      setIsCreating(false)
    }

    setFormData({ name: "", email: "", phone: "", investmentAmount: "", riskProfile: "" })
  }

  const handleEdit = (client: any) => {
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      investmentAmount: client.investmentAmount.toString(),
      riskProfile: client.riskProfile,
    })
    setEditingId(client.id)
    setIsCreating(true)
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingId(null)
    setFormData({ name: "", email: "", phone: "", investmentAmount: "", riskProfile: "" })
  }

  const totalAUM = clients.reduce((sum, client) => sum + client.investmentAmount, 0)

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border/40">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Client Management
            </CardTitle>
            <CardDescription>Onboard and manage PMS clients</CardDescription>
          </div>
          {!isCreating && (
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {/* AUM Summary */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="bg-primary/10 rounded-lg p-4">
              <h3 className="font-medium text-primary mb-2">Total Clients</h3>
              <p className="text-2xl font-bold">{clients.length}</p>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4">
              <h3 className="font-medium text-green-400 mb-2">Assets Under Management</h3>
              <p className="text-2xl font-bold text-green-400">₹{(totalAUM / 10000000).toFixed(1)}Cr</p>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4">
              <h3 className="font-medium text-blue-400 mb-2">Active Clients</h3>
              <p className="text-2xl font-bold text-blue-400">{clients.filter((c) => c.status === "Active").length}</p>
            </div>
          </div>

          {isCreating && (
            <Card className="mb-6 bg-muted/20">
              <CardHeader>
                <CardTitle className="text-lg">{editingId ? "Edit Client" : "Onboard New Client"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter client name..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter email address..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter phone number..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="investment">Investment Amount *</Label>
                      <Input
                        id="investment"
                        type="number"
                        value={formData.investmentAmount}
                        onChange={(e) => setFormData({ ...formData, investmentAmount: e.target.value })}
                        placeholder="Enter investment amount..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="risk">Risk Profile *</Label>
                      <Select
                        value={formData.riskProfile}
                        onValueChange={(value) => setFormData({ ...formData, riskProfile: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk profile" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Conservative">Conservative</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="Aggressive">Aggressive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">{editingId ? "Update Client" : "Onboard Client"}</Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Client List ({clients.length})</h3>
            {clients.map((client) => (
              <Card key={client.id} className="bg-muted/20 border-border/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {client.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {client.onboardingDate}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={client.status === "Active" ? "default" : "secondary"}>{client.status}</Badge>
                        <Badge variant="outline">{client.riskProfile}</Badge>
                        <span className="text-sm font-medium">₹{(client.investmentAmount / 100000).toFixed(1)}L</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(client)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
