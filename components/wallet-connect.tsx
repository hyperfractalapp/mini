"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from "lucide-react"

interface WalletConnectProps {
  onConnect: (address: string) => void
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    setIsConnecting(true)

    try {
      // Simulate wallet connection - in a real app, this would use a wallet provider
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock wallet address - in a real app, this would come from the wallet provider
      const mockAddress =
        "0x" +
        Array(40)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("")

      onConnect(mockAddress)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Card className="w-full rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle>Connect Your Wallet</CardTitle>
        <CardDescription>Connect your wallet to start trading on prediction markets</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="rounded-full bg-primary/10 p-6 mb-4">
          <Wallet className="h-12 w-12 text-primary" />
        </div>
        <Button onClick={connectWallet} disabled={isConnecting} className="w-full rounded-xl">
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      </CardContent>
    </Card>
  )
}

