"use client"

import { BarChart2, Home } from "lucide-react"

interface NavigationProps {
  activeTab: string
  onChange: (tab: string) => void
}

export function Navigation({ activeTab, onChange }: NavigationProps) {
  return (
    <div className="fixed bottom-4 left-4 right-4 bg-card rounded-2xl border border-border shadow-lg">
      <div className="max-w-md mx-auto flex justify-around">
        <button
          onClick={() => onChange("markets")}
          className={`flex flex-col items-center py-3 px-6 rounded-xl transition-colors ${
            activeTab === "markets" ? "bg-accent text-primary" : "text-muted-foreground"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Markets</span>
        </button>
        <button
          onClick={() => onChange("portfolio")}
          className={`flex flex-col items-center py-3 px-6 rounded-xl transition-colors ${
            activeTab === "portfolio" ? "bg-accent text-primary" : "text-muted-foreground"
          }`}
        >
          <BarChart2 className="h-5 w-5" />
          <span className="text-xs mt-1">Portfolio</span>
        </button>
      </div>
    </div>
  )
}

