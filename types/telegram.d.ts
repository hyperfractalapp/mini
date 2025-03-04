// Add TypeScript declarations for Telegram WebApp
interface TelegramWebApp {
  ready: () => void
  expand: () => void
  close: () => void
  isExpanded: boolean
  colorScheme: "light" | "dark"
  showPopup: (params: {
    title?: string
    message: string
    buttons?: Array<{
      type: string
      text?: string
      id?: string
    }>
  }) => void
  // Add other WebApp methods as needed
}

interface Telegram {
  WebApp: TelegramWebApp
}

interface Window {
  Telegram?: Telegram
}

