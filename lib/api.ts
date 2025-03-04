import type { Market, Position, Transaction } from "@/types/market"

// Mock data for development - in production, this would connect to the Polymarket API
const mockMarkets: Market[] = [
  {
    id: "1",
    question: "Will BTC exceed $100k in 2024?",
    category: "crypto",
    endDate: "2024-12-31T23:59:59Z",
    yesPrice: 68,
    noPrice: 32,
    volume: 1250000,
  },
  {
    id: "2",
    question: "Will the US have a recession in 2024?",
    category: "politics",
    endDate: "2024-12-31T23:59:59Z",
    yesPrice: 42,
    noPrice: 58,
    volume: 890000,
  },
  {
    id: "3",
    question: "Will Ethereum 2.0 fully launch in 2024?",
    category: "crypto",
    endDate: "2024-12-31T23:59:59Z",
    yesPrice: 75,
    noPrice: 25,
    volume: 560000,
  },
  {
    id: "4",
    question: "Will SpaceX reach Mars in 2024?",
    category: "science",
    endDate: "2024-12-31T23:59:59Z",
    yesPrice: 12,
    noPrice: 88,
    volume: 320000,
  },
  {
    id: "5",
    question: "Will the Democrats win the 2024 US election?",
    category: "politics",
    endDate: "2024-11-05T23:59:59Z",
    yesPrice: 51,
    noPrice: 49,
    volume: 2100000,
  },
]

const mockPositions: Position[] = [
  {
    id: "1",
    marketId: "1",
    marketQuestion: "Will BTC exceed $100k in 2024?",
    outcome: "yes",
    shares: 100,
    buyPrice: 65,
    currentPrice: 68,
    value: 100,
    profit: 4.6,
  },
  {
    id: "2",
    marketId: "5",
    marketQuestion: "Will the Democrats win the 2024 US election?",
    outcome: "no",
    shares: 200,
    buyPrice: 52,
    currentPrice: 49,
    value: 200,
    profit: 5.8,
  },
]

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "deposit",
    amount: 500,
    date: "2024-02-15T10:30:00Z",
  },
  {
    id: "2",
    type: "bet",
    amount: 100,
    marketId: "1",
    outcome: "yes",
    date: "2024-02-16T14:22:00Z",
  },
  {
    id: "3",
    type: "bet",
    amount: 200,
    marketId: "5",
    outcome: "no",
    date: "2024-02-18T09:15:00Z",
  },
  {
    id: "4",
    type: "withdrawal",
    amount: 50,
    date: "2024-02-20T16:45:00Z",
  },
]

export async function fetchMarkets(): Promise<Market[]> {
  // In a real app, this would fetch from the Polymarket API
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
  return mockMarkets
}

export async function fetchPortfolio(walletAddress: string) {
  // In a real app, this would fetch from the Polymarket API using the wallet address
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

  return {
    positions: mockPositions,
    balance: {
      available: 350,
      locked: 300,
    },
  }
}

export async function fetchTransactionHistory(walletAddress: string): Promise<Transaction[]> {
  // In a real app, this would fetch from the Polymarket API using the wallet address
  await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate network delay
  return mockTransactions
}

interface BetParams {
  marketId: string
  outcome: "yes" | "no"
  amount: number
  walletAddress: string
}

export async function placeBet(params: BetParams): Promise<void> {
  // In a real app, this would call the Polymarket API to place a bet
  console.log("Placing bet:", params)
  await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

  // Simulate success or failure
  if (Math.random() > 0.1) {
    return Promise.resolve()
  } else {
    return Promise.reject(new Error("Transaction failed"))
  }
}

