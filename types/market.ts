export interface Market {
  id: string
  question: string
  category: string
  endDate: string
  yesPrice: number
  noPrice: number
  volume: number
}

export interface Position {
  id: string
  marketId: string
  marketQuestion: string
  outcome: "yes" | "no"
  shares: number
  buyPrice: number
  currentPrice: number
  value: number
  profit: number
}

export type TransactionType = "deposit" | "withdrawal" | "bet"

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  date: string
  marketId?: string
  outcome?: "yes" | "no"
}

