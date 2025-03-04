"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchPortfolio, fetchTransactionHistory } from "@/lib/api"
import type { Position, Transaction } from "@/types/market"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface PortfolioViewProps {
  walletAddress: string
}

export function PortfolioView({ walletAddress }: PortfolioViewProps) {
  const [positions, setPositions] = useState<Position[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [balance, setBalance] = useState({ available: 0, locked: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setLoading(true)
        const { positions, balance } = await fetchPortfolio(walletAddress)
        const history = await fetchTransactionHistory(walletAddress)

        setPositions(positions)
        setBalance(balance)
        setTransactions(history)
      } catch (error) {
        console.error("Failed to fetch portfolio:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPortfolio()
  }, [walletAddress])

  return (
    <div className="space-y-4 pb-16">
      <Card>
        <CardHeader>
          <CardTitle>Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-3xl font-bold">${balance.available.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">
                ${balance.locked.toFixed(2)} locked in active positions
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="positions">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="positions">
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-12 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : positions.length > 0 ? (
            <div className="space-y-4">
              {positions.map((position) => (
                <Card key={position.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{position.marketQuestion}</CardTitle>
                    <CardDescription className="text-xs">
                      {position.outcome.toUpperCase()} @ {position.buyPrice}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">${position.value.toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">{position.shares} shares</div>
                      </div>
                      <div
                        className={`text-sm font-medium ${position.profit >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {position.profit >= 0 ? "+" : ""}
                        {position.profit.toFixed(2)}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No active positions</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 border-b">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2 mt-2" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          ) : transactions.length > 0 ? (
            <Card>
              <CardContent className="p-0">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center gap-4 p-3 border-b last:border-0">
                    <div
                      className={`p-2 rounded-full ${tx.type === "deposit" ? "bg-green-100" : tx.type === "withdrawal" ? "bg-red-100" : "bg-blue-100"}`}
                    >
                      {tx.type === "deposit" ? (
                        <ArrowDownIcon className="h-5 w-5 text-green-600" />
                      ) : tx.type === "withdrawal" ? (
                        <ArrowUpIcon className="h-5 w-5 text-red-600" />
                      ) : (
                        <ArrowUpIcon className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {tx.type === "deposit" ? "Deposit" : tx.type === "withdrawal" ? "Withdrawal" : "Bet Placed"}
                      </div>
                      <div className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleString()}</div>
                    </div>
                    <div className={`text-sm font-medium ${tx.type === "deposit" ? "text-green-600" : "text-red-600"}`}>
                      {tx.type === "deposit" ? "+" : "-"}${tx.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No transaction history</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

