// Mock operator data for MVP frontend.
// Replaced by Strapi API when backend ships.

export type Vertical = "casino" | "sportsbook" | "poker" | "slot";

export type SubScore = {
  label: string;
  score: number;
  weight: number;
  count?: number;
};

export type Bonus = {
  type: "welcome" | "no_deposit" | "free_spins" | "reload" | "cashback";
  headline: string;
  bonusEur?: number;
  freeSpins?: number;
  wagering?: number;
  minDeposit?: number;
  expiryDays?: number;
  termsUrl?: string;
};

export type Operator = {
  slug: string;
  name: string;
  legalName?: string;
  founded: number;
  parent?: string;
  websiteUrl: string;
  affiliateUrl: string;
  logo?: string;
  tagline: string;
  tldr: string;
  score: number;
  scorePrev?: number;
  subScores: SubScore[];
  verticals: Vertical[];
  licenses: {
    authority: string;
    number?: string;
    registerUrl: string;
    tier: "tier1" | "tier2" | "offshore";
  }[];
  acceptedCountries: string[];
  paymentMethods: string[];
  cryptoSupported: boolean;
  payoutSpeedHours: number;
  minDepositEur: number;
  kycLevel: "none" | "soft" | "full";
  liveChat247: boolean;
  bonuses: Bonus[];
  pros: string[];
  cons: string[];
  tags: string[];
  lastVerified: string;
  nextReviewDue: string;
  reviewer: {
    name: string;
    initials: string;
    credentials: string;
    href: string;
  };
};

export const mockOperators: Operator[] = [
  {
    slug: "stake",
    name: "Stake",
    legalName: "Medium Rare N.V.",
    founded: 2017,
    parent: "Easygo Entertainment",
    websiteUrl: "https://stake.com",
    affiliateUrl: "https://stake.com/?c=1baraban",
    tagline: "The home of crypto-native gambling",
    tldr: "Stake is a Curaçao-licensed online casino and sportsbook founded in 2017, built around crypto-first banking with sub-1-hour withdrawals on most chains. It offers 5,000+ slots, 90+ live tables, an in-house sportsbook, and a strong original-games suite. Best suited to crypto-native players who value fast payouts and minimal KYC friction at moderate stakes.",
    score: 8.7,
    scorePrev: 8.4,
    subScores: [
      { label: "License & Safety", score: 7.5, weight: 30 },
      { label: "Banking & Payouts", score: 9.4, weight: 20 },
      { label: "Bonuses (true value)", score: 7.8, weight: 15 },
      { label: "Player Experience", score: 9.2, weight: 15 },
      { label: "Support", score: 8.9, weight: 10 },
      { label: "Complaints", score: 8.4, weight: 10, count: 38 },
    ],
    verticals: ["casino", "sportsbook", "slot"],
    licenses: [
      {
        authority: "Curaçao Gaming Control Board",
        number: "8048/JAZ2020-013",
        registerUrl: "https://gamingcontrolcuracao.org/",
        tier: "offshore",
      },
    ],
    acceptedCountries: ["CA", "NZ", "BR", "JP", "KR"],
    paymentMethods: [
      "Bitcoin",
      "Ethereum",
      "USDT",
      "Litecoin",
      "Solana",
      "Tron",
    ],
    cryptoSupported: true,
    payoutSpeedHours: 1,
    minDepositEur: 1,
    kycLevel: "soft",
    liveChat247: true,
    bonuses: [
      {
        type: "welcome",
        headline: "200% up to $2,000 + Stake Cash",
        bonusEur: 2000,
        wagering: 40,
        minDeposit: 20,
        expiryDays: 30,
      },
    ],
    pros: [
      "Sub-1-hour crypto withdrawals consistently observed",
      'Original "Stake-only" games are genuinely fun',
      "No KYC for low-volume play under €5k",
      "24/7 live chat with real human escalation",
    ],
    cons: [
      "Curaçao license, not EU-tier",
      "Restricted in UK, US, parts of EU",
      "Wagering on welcome bonus is on the high end",
      "No fiat withdrawals",
    ],
    tags: ["crypto", "no-kyc", "fast-withdrawal", "slots", "sportsbook"],
    lastVerified: "2026-04-28",
    nextReviewDue: "2026-07-28",
    reviewer: {
      name: "Anna K.",
      initials: "AK",
      credentials: "UKGC compliance, 6 yrs",
      href: "/authors/anna-k",
    },
  },
  {
    slug: "bcgame",
    name: "BC.Game",
    legalName: "BlockDance B.V.",
    founded: 2017,
    websiteUrl: "https://bc.game",
    affiliateUrl: "https://bc.game/i/1baraban",
    tagline: "The crypto casino with the deepest game library",
    tldr: 'BC.Game is a Curaçao-licensed crypto casino founded in 2017, supporting 150+ cryptocurrencies and offering 9,000+ games from 80+ providers. Notable for its in-house "BCD" rewards token, frequent 100k+ jackpots, and active community. Best suited to crypto enthusiasts and slot players who want maximum game variety with crypto-native banking.',
    score: 8.2,
    scorePrev: 8.0,
    subScores: [
      { label: "License & Safety", score: 7.0, weight: 30 },
      { label: "Banking & Payouts", score: 9.1, weight: 20 },
      { label: "Bonuses (true value)", score: 7.4, weight: 15 },
      { label: "Player Experience", score: 8.8, weight: 15 },
      { label: "Support", score: 8.1, weight: 10 },
      { label: "Complaints", score: 7.9, weight: 10, count: 52 },
    ],
    verticals: ["casino", "slot"],
    licenses: [
      {
        authority: "Curaçao Gaming Control Board",
        number: "5536/JAZ",
        registerUrl: "https://gamingcontrolcuracao.org/",
        tier: "offshore",
      },
    ],
    acceptedCountries: ["CA", "BR", "JP", "IN", "PH"],
    paymentMethods: ["Bitcoin", "Ethereum", "USDT", "150+ altcoins"],
    cryptoSupported: true,
    payoutSpeedHours: 2,
    minDepositEur: 1,
    kycLevel: "soft",
    liveChat247: true,
    bonuses: [
      {
        type: "welcome",
        headline: "Up to 360% on first 4 deposits",
        wagering: 40,
        minDeposit: 10,
        expiryDays: 30,
      },
      {
        type: "no_deposit",
        headline: "Daily faucet free spins",
        freeSpins: 5,
        wagering: 30,
      },
    ],
    pros: [
      "9,000+ games — largest crypto-casino library",
      "150+ cryptocurrencies supported",
      "Active community + reward token",
      'Strong in-house "BC Originals" suite',
    ],
    cons: [
      "Curaçao-only licensing",
      "Welcome bonus structure is complex",
      "Site occasionally laggy on mobile",
      "KYC kicks in above €5k",
    ],
    tags: ["crypto", "slots", "community", "altcoins"],
    lastVerified: "2026-04-22",
    nextReviewDue: "2026-07-22",
    reviewer: {
      name: "Marek S.",
      initials: "MS",
      credentials: "iGaming analyst, 8 yrs",
      href: "/authors/marek-s",
    },
  },
  {
    slug: "bitstarz",
    name: "BitStarz",
    legalName: "Direx N.V.",
    founded: 2014,
    websiteUrl: "https://bitstarz.com",
    affiliateUrl: "https://bitstarz.com/?af_id=1baraban",
    tagline: "The award-winning crypto casino with hybrid fiat support",
    tldr: 'BitStarz is a Curaçao-licensed casino founded in 2014, one of the longest-running hybrid crypto-fiat operators. It offers 4,000+ slots and live tables, both crypto and fiat banking with same-day withdrawals, and has won multiple "Casino of the Year" awards from industry press. Best suited to slot players who want crypto-fast withdrawals without abandoning fiat options.',
    score: 8.5,
    scorePrev: 8.3,
    subScores: [
      { label: "License & Safety", score: 7.8, weight: 30 },
      { label: "Banking & Payouts", score: 9.0, weight: 20 },
      { label: "Bonuses (true value)", score: 8.2, weight: 15 },
      { label: "Player Experience", score: 8.9, weight: 15 },
      { label: "Support", score: 9.0, weight: 10 },
      { label: "Complaints", score: 8.4, weight: 10, count: 24 },
    ],
    verticals: ["casino", "slot"],
    licenses: [
      {
        authority: "Curaçao Gaming Control Board",
        number: "8048/JAZ",
        registerUrl: "https://gamingcontrolcuracao.org/",
        tier: "offshore",
      },
    ],
    acceptedCountries: ["CA", "AU", "NZ", "JP", "BR", "NO"],
    paymentMethods: [
      "Bitcoin",
      "Ethereum",
      "USDT",
      "Visa",
      "Mastercard",
      "Skrill",
      "Neteller",
    ],
    cryptoSupported: true,
    payoutSpeedHours: 4,
    minDepositEur: 20,
    kycLevel: "soft",
    liveChat247: true,
    bonuses: [
      {
        type: "welcome",
        headline: "100% up to €100 + 180 free spins",
        bonusEur: 100,
        freeSpins: 180,
        wagering: 40,
        minDeposit: 20,
        expiryDays: 7,
      },
    ],
    pros: [
      "Hybrid crypto + fiat works seamlessly",
      "10+ years of operation, low complaint volume",
      "180 free spins is a genuinely fair welcome offer",
      "Live chat answers in under 90 seconds",
    ],
    cons: [
      "Curaçao license, EU regulators don't recognise",
      "Wagering 40x is industry-average, not a discount",
      "No sports betting",
      "Free spins limited to specific Pragmatic titles",
    ],
    tags: ["crypto", "fiat", "slots", "free-spins", "fast-withdrawal"],
    lastVerified: "2026-04-25",
    nextReviewDue: "2026-07-25",
    reviewer: {
      name: "Anna K.",
      initials: "AK",
      credentials: "UKGC compliance, 6 yrs",
      href: "/authors/anna-k",
    },
  },
  {
    slug: "leovegas",
    name: "LeoVegas",
    legalName: "LeoVegas Gaming plc",
    founded: 2011,
    parent: "MGM Resorts International",
    websiteUrl: "https://leovegas.com",
    affiliateUrl: "https://leovegas.com/?aff=1baraban",
    tagline: "The mobile-first king with full EU licensing",
    tldr: "LeoVegas is a UKGC- and MGA-licensed casino owned by MGM Resorts (since 2022), founded in Sweden in 2011. It pioneered mobile-first casino UX and offers 3,000+ slots, sportsbook, and live casino with full EU and UK regulatory coverage. Best suited to UK and EU players who prioritise tier-1 licensing, fiat banking, and a polished mobile app over crypto support.",
    score: 9.1,
    scorePrev: 9.0,
    subScores: [
      { label: "License & Safety", score: 9.6, weight: 30 },
      { label: "Banking & Payouts", score: 8.7, weight: 20 },
      { label: "Bonuses (true value)", score: 7.9, weight: 15 },
      { label: "Player Experience", score: 9.4, weight: 15 },
      { label: "Support", score: 9.0, weight: 10 },
      { label: "Complaints", score: 9.2, weight: 10, count: 17 },
    ],
    verticals: ["casino", "sportsbook", "slot"],
    licenses: [
      {
        authority: "UK Gambling Commission",
        number: "38582",
        registerUrl: "https://www.gamblingcommission.gov.uk/public-register",
        tier: "tier1",
      },
      {
        authority: "Malta Gaming Authority",
        number: "MGA/B2C/213/2011",
        registerUrl: "https://www.mga.org.mt/licensee-register/",
        tier: "tier1",
      },
    ],
    acceptedCountries: ["GB", "IE", "MT", "SE", "DE", "NL", "CA", "NZ"],
    paymentMethods: [
      "Visa",
      "Mastercard",
      "Trustly",
      "Skrill",
      "Neteller",
      "PayPal",
      "Bank transfer",
    ],
    cryptoSupported: false,
    payoutSpeedHours: 12,
    minDepositEur: 10,
    kycLevel: "full",
    liveChat247: true,
    bonuses: [
      {
        type: "welcome",
        headline: "Up to £100 cash + 50 spins on Book of Dead",
        bonusEur: 100,
        freeSpins: 50,
        wagering: 35,
        minDeposit: 10,
        expiryDays: 30,
      },
    ],
    pros: [
      "Tier-1 UKGC + MGA licensing",
      "Mobile app is best-in-class",
      "Owned by MGM — corporate stability",
      "Self-exclusion + responsible gambling tools are exemplary",
    ],
    cons: [
      "No crypto support",
      "12-hour withdrawal SLA is slower than crypto-native ops",
      "Wagering on bonus is moderate but not generous",
      "Fewer game providers than crypto-only competitors",
    ],
    tags: ["ukgc", "mga", "fiat", "mobile", "tier1", "eu"],
    lastVerified: "2026-04-30",
    nextReviewDue: "2026-07-30",
    reviewer: {
      name: "Anna K.",
      initials: "AK",
      credentials: "UKGC compliance, 6 yrs",
      href: "/authors/anna-k",
    },
  },
  {
    slug: "mr-green",
    name: "Mr Green",
    legalName: "Hero Gaming Ltd",
    founded: 2008,
    parent: "William Hill (888 Holdings)",
    websiteUrl: "https://mrgreen.com",
    affiliateUrl: "https://mrgreen.com/?af=1baraban",
    tagline: "The gentleman of online casinos",
    tldr: 'Mr Green is a UKGC- and MGA-licensed casino founded in 2008 and now owned by 888 Holdings. Distinctive for its "Green Gaming" responsible-gambling toolkit — predictive limits, reality checks, and self-assessment. Offers 1,500+ slots and live casino with fiat-first banking. Best suited to UK and EU players who value premium presentation and best-in-class responsible gambling tools.',
    score: 8.8,
    scorePrev: 8.6,
    subScores: [
      { label: "License & Safety", score: 9.5, weight: 30 },
      { label: "Banking & Payouts", score: 8.4, weight: 20 },
      { label: "Bonuses (true value)", score: 7.6, weight: 15 },
      { label: "Player Experience", score: 9.0, weight: 15 },
      { label: "Support", score: 8.7, weight: 10 },
      { label: "Complaints", score: 9.0, weight: 10, count: 11 },
    ],
    verticals: ["casino", "slot"],
    licenses: [
      {
        authority: "UK Gambling Commission",
        number: "39264",
        registerUrl: "https://www.gamblingcommission.gov.uk/public-register",
        tier: "tier1",
      },
      {
        authority: "Malta Gaming Authority",
        number: "MGA/B2C/231/2012",
        registerUrl: "https://www.mga.org.mt/licensee-register/",
        tier: "tier1",
      },
    ],
    acceptedCountries: ["GB", "IE", "MT", "SE", "DE", "AT"],
    paymentMethods: [
      "Visa",
      "Mastercard",
      "Trustly",
      "Skrill",
      "Neteller",
      "PayPal",
      "Bank transfer",
    ],
    cryptoSupported: false,
    payoutSpeedHours: 24,
    minDepositEur: 10,
    kycLevel: "full",
    liveChat247: false,
    bonuses: [
      {
        type: "welcome",
        headline: "100% up to £100 + 200 free spins",
        bonusEur: 100,
        freeSpins: 200,
        wagering: 35,
        minDeposit: 20,
        expiryDays: 60,
      },
    ],
    pros: [
      "Best-in-class Green Gaming RG tools (industry benchmark)",
      "UKGC + MGA tier-1 licensing",
      "Premium brand presentation, no clutter",
      "Long, fair bonus expiry (60 days)",
    ],
    cons: [
      "No 24/7 live chat (07:00–23:00 only)",
      "No crypto",
      "24-hour withdrawal SLA is slower than peers",
      "Smaller game library than newer competitors",
    ],
    tags: ["ukgc", "mga", "fiat", "responsible-gambling", "premium", "eu"],
    lastVerified: "2026-04-26",
    nextReviewDue: "2026-07-26",
    reviewer: {
      name: "Marek S.",
      initials: "MS",
      credentials: "iGaming analyst, 8 yrs",
      href: "/authors/marek-s",
    },
  },
];

export const operatorsBySlug = (): Record<string, Operator> =>
  Object.fromEntries(mockOperators.map((op) => [op.slug, op]));

export const operatorsByVertical = (vertical: Vertical): Operator[] =>
  mockOperators
    .filter((op) => op.verticals.includes(vertical))
    .sort((a, b) => b.score - a.score);
