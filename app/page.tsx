"use client"

import { useEffect, useState, useCallback } from "react"
import { WalletConnect } from "@/components/wallet-connect"
import { MarketsView } from "@/components/markets-view"
import { PortfolioView } from "@/components/portfolio-view"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  const [activeTab, setActiveTab] = useState("markets")
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  // Add this helper to safely access the Telegram WebApp
  const getTelegramWebApp = useCallback(() => {
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      return window.Telegram.WebApp
    }
    return null
  }, [])

  useEffect(() => {
    // Initialize Telegram WebApp
    const webApp = getTelegramWebApp()

    if (webApp) {
      if (webApp.isExpanded) {
        webApp.expand()
      }

      webApp.ready()

      // Set theme based on Telegram theme
      document.documentElement.classList.add(webApp.colorScheme)
    }
  }, [getTelegramWebApp])

  const handleConnect = (address: string) => {
    setIsConnected(true)
    setWalletAddress(address)

    const webApp = getTelegramWebApp()
    if (webApp) {
      webApp.showPopup({
        title: "Wallet Connected",
        message: `Connected to ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
        buttons: [{ type: "close" }],
      })
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" forcedTheme="dark">
      <main className="flex min-h-screen flex-col items-center p-4 bg-background text-foreground">
        <div className="w-full max-w-md mx-auto pb-20">
          <h1 className="text-2xl font-bold text-center mb-4">PredictX</h1>

          {!isConnected ? (
            <WalletConnect onConnect={handleConnect} />
          ) : (
            <>
              <div className="mb-4">
                {activeTab === "markets" && <MarketsView walletAddress={walletAddress} />}
                {activeTab === "portfolio" && <PortfolioView walletAddress={walletAddress} />}
              </div>

              <Navigation activeTab={activeTab} onChange={setActiveTab} />
            </>
          )}
        </div>
      </main>
    </ThemeProvider>
  )
}

