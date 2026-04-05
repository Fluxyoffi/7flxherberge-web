export interface Product {
  id: string;
  name: string;
  category: "tweaks" | "bots" | "games" | "gfx";
  description: string;
  tier: "basic" | "premium";
  price?: number;
  icon: string;
  badge?: string;
  hasVersions?: boolean;
  versionPrices?: Record<string, number>;
  versionMonthlyPrices?: Record<string, number>;
  versionYearlyPrices?: Record<string, number>;
  versions?: string[];
  isSubscription?: boolean;
  isComingSoon?: boolean;
  monthly?: number;
  yearly?: number;
}

export interface CartItem {
  cartId: string;
  name: string;
  price: number;
  interval: string;
  quantity: number;
  tier: "basic" | "premium";
}

export const allProducts: Product[] = [
  {
    id: "1",
    name: "Performance Optimizer",
    category: "tweaks",
    description: "Deep-level optimizations tailored for your specific Windows version.",
    tier: "basic",
    price: 19.99,
    icon: "Zap",
    badge: "TWEAK",
    hasVersions: true,
    versionPrices: {
      "Windows 11": 24.99,
      "Windows 10": 19.99,
      "Windows 7": 14.99,
      "Windows XP": 9.99,
    },
    versions: ["Windows 11", "Windows 10", "Windows 7", "Windows XP"],
  },
  {
    id: "5",
    name: "Network Optimizer",
    category: "tweaks",
    description: "Optimized TCP/IP parameters for gaming stability.",
    tier: "basic",
    price: 14.99,
    icon: "Network",
    badge: "TWEAK",
  },
  {
    id: "h-bot",
    name: "Discord Bot Hosting",
    category: "bots",
    description: "Premium Linux containers with 24/7 uptime and Git integration.",
    tier: "premium",
    icon: "Bot",
    badge: "Hosting",
    isSubscription: true,
    hasVersions: true,
    versions: ["1 bot", ],
    versionMonthlyPrices: {
      "1 bot": 0.99,

    },
    versionYearlyPrices: {
      "1 bot": 11.75,
    },
  },
  {
    id: "g-minecraft",
    name: "Minecraft Hosting",
    category: "games",
    description: "High-performance Ryzen™ servers with DDR5 RAM and NVMe storage. Specialized for heavy modpacks.",
    tier: "premium",
    icon: "Box",
    isComingSoon: true,
    price: 0,
  },
    {
    id: "5",
    name: "Gfx Pack basic",
    category: "gfx",
    description: "Optimized TCP/IP parameters for gaming stability.",
    tier: "basic",
    price: 2.00,
    icon: "Network",
    badge: "Gfx",
  },
    {
    id: "5",
    name: "Gfx Pack premium",
    category: "gfx",
    description: "Optimized TCP/IP parameters for gaming stability.",
    tier: "premium",
    price: 5.00,
    icon: "Network",
    badge: "Gfx",
  },
      {
    id: "5",
    name: "Gfx Pack ultimate",
    category: "gfx",
    description: "Optimized TCP/IP parameters for gaming stability.",
    tier: "premium",
    price: 10.00,
    icon: "Network",
    badge: "Gfx",
  },
];
