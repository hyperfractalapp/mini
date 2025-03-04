"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchMarkets } from "@/lib/api"
import type { Market } from "@/types/market"
import { MarketCard } from "@/components/market-card"
import { Skeleton } from "@/components/ui/skeleton"

interface MarketsViewProps {
  walletAddress: string
}

export function MarketsView({ walletAddress }: MarketsViewProps) {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")

  useEffect(() => {
    const loadMarkets = async () => {
      try {
        setLoading(true)
        const data = await fetchMarkets()
        setMarkets(data)
      } catch (error) {
        console.error("Failed to fetch markets:", error)
      } finally {
        setLoading(false)
      }
    }

    loadMarkets()
  }, [])

  const filteredMarkets = markets.filter((market) => {
    const matchesSearch = market.question.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === "all" || market.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search markets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>

      <Tabs defaultValue="all" onValueChange={setCategory}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="politics">Politics</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="sports">Sports</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-8 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4 pb-16">
          {filteredMarkets.length > 0 ? (
            filteredMarkets.map((market) => (
              <MarketCard key={market.id} market={market} walletAddress={walletAddress} />
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No markets found</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

