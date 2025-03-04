"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Market } from "@/types/market"
import { placeBet } from "@/lib/api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MarketCardProps {
  market: Market
  walletAddress: string
}

export function MarketCard({ market, walletAddress }: MarketCardProps) {
  const [isPlacingBet, setIsPlacingBet] = useState(false)
  const [betAmount, setBetAmount] = useState("")
  const [betOutcome, setBetOutcome] = useState<"yes" | "no" | null>(null)
  const [showBetDialog, setShowBetDialog] = useState(false)

  const getTelegramWebApp = () => {
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      return window.Telegram.WebApp
    }
    return null
  }

  const handlePlaceBet = async () => {
    if (!betOutcome || !betAmount) return

    setIsPlacingBet(true)

    try {
      await placeBet({
        marketId: market.id,
        outcome: betOutcome,
        amount: Number.parseFloat(betAmount),
        walletAddress,
      })

      const webApp = getTelegramWebApp()
      if (webApp) {
        webApp.showPopup({
          title: "Bet Placed",
          message: `Successfully placed a ${betAmount} bet on ${betOutcome.toUpperCase()}`,
          buttons: [{ type: "close" }],
        })
      }

      setShowBetDialog(false)
      setBetAmount("")
      setBetOutcome(null)
    } catch (error) {
      console.error("Failed to place bet:", error)
      const webApp = getTelegramWebApp()
      if (webApp) {
        webApp.showPopup({
          title: "Error",
          message: "Failed to place bet. Please try again.",
          buttons: [{ type: "close" }],
        })
      }
    } finally {
      setIsPlacingBet(false)
    }
  }

  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{market.question}</CardTitle>
            <CardDescription className="text-xs mt-1">
              Ends {new Date(market.endDate).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge
            variant={
              market.category === "politics" ? "default" : market.category === "crypto" ? "secondary" : "outline"
            }
          >
            {market.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Yes</span>
            <span>{market.yesPrice}%</span>
          </div>
          <Progress value={market.yesPrice} className="h-2 rounded-full" />
          <div className="flex justify-between text-sm">
            <span>No</span>
            <span>{market.noPrice}%</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2">Volume: ${market.volume.toLocaleString()}</div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Dialog open={showBetDialog} onOpenChange={setShowBetDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full rounded-xl">
              Place Bet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Place a Bet</DialogTitle>
              <DialogDescription>{market.question}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant={betOutcome === "yes" ? "default" : "outline"} onClick={() => setBetOutcome("yes")}>
                  Yes ({market.yesPrice}%)
                </Button>
                <Button variant={betOutcome === "no" ? "default" : "outline"} onClick={() => setBetOutcome("no")}>
                  No ({market.noPrice}%)
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="10.00"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handlePlaceBet} disabled={isPlacingBet || !betOutcome || !betAmount}>
                {isPlacingBet ? "Placing Bet..." : "Confirm Bet"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

