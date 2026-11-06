// Operator facts for 1baraban.com.
// Every fact carries its source and the date it was checked. A null value means
// we could not verify it on the check date; the page must say so, never guess.
// Compliance baseline: Great Britain (see docs/PLAN.md). Only operators with an
// active UK Gambling Commission licence get an outbound /go/<slug> link.

export type Vertical = "casino" | "sportsbook" | "bingo" | "poker";

export type Source = {
  label: string;
  url: string;
  /** primary = regulator register or the operator's own pages */
  primary: boolean;
};

export type Fact<T> = {
  value: T | null;
  sources: Source[];
  checked: string;
  note?: string;
};

export type Licence = {
  regulator: string;
  number: string | null;
  holder: string | null;
  status: string;
  verifyUrl: string | null;
  source: Source;
};

export type RegulatoryAction = {
  date: string;
  regulator: string;
  amount: string;
  summary: string;
  source: Source;
};

export type GbStatus = "licensed" | "surrendered" | "not-licensed";

export type Operator = {
  slug: string;
  name: string;
  /** site address shown to readers (GB domain for GB-licensed brands) */
  domain: string;
  gbStatus: GbStatus;
  /** plain-language summary written by the editorial team from the facts below */
  summary: string;
  verdict: string;
  legalName: Fact<string>;
  registration: Fact<string>;
  owner: Fact<string>;
  launchYear: Fact<number>;
  licences: Licence[];
  verticals: Fact<Vertical[]>;
  paymentMethods: Fact<string[]>;
  welcomeBonus: Fact<string>;
  restrictions: Fact<string>;
  safer: Fact<string[]>;
  regulatoryActions: RegulatoryAction[];
  otherFacts: { text: string; source: Source }[];
  notVerified: string[];
  /** official site the /go/<slug> redirect points to; only for gbStatus "licensed" */
  goTarget?: string;
  lastChecked: string;
};

export const CHECKED = "2026-11-07";

const ukgc = (id: number): Source => ({
  label: `UK Gambling Commission public register, account ${id}`,
  url: `https://www.gamblingcommission.gov.uk/public-register/business/detail/${id}`,
  primary: true,
});
const ukgcDomains = (id: number): Source => ({
  label: `UKGC register, domain names for account ${id}`,
  url: `https://www.gamblingcommission.gov.uk/public-register/business/detail/domain-names/${id}`,
  primary: true,
});
const wiki = (page: string, title: string): Source => ({
  label: `Wikipedia: ${title}`,
  url: `https://en.wikipedia.org/wiki/${page}`,
  primary: false,
});
const ukgcRules: Source = {
  label: "UKGC: gambling promotions rules from 19 January 2026",
  url: "https://www.gamblingcommission.gov.uk/news/article/gambling-promotions-to-be-safer-and-simpler-for-consumers",
  primary: true,
};

const gbBonusNote =
  "Not listed. The GB site was not reachable from our check location, and offers change often. Since 19 January 2026 UK rules cap bonus wagering at 10x. Check the current offer and its full terms on the operator's site before you sign up.";
const gbPayNote =
  "Not verified. The operator's GB site was not reachable from our check location on the check date.";
const offshoreBonusNote =
  "Not listed. We do not publish bonus offers for operators that are not licensed in Great Britain.";

export const operators: Operator[] = [
  {
    slug: "leovegas",
    name: "LeoVegas",
    domain: "leovegas.co.uk",
    gbStatus: "licensed",
    summary:
      "LeoVegas is a Swedish-founded online casino and sportsbook, owned by MGM Resorts International since 2022. Its GB site, leovegas.co.uk, runs under UK Gambling Commission account 39198 held by LeoVegas Gaming PLC.",
    verdict:
      "Licensed in Great Britain for casino, bingo and betting, with an active register entry on our check date. The Commission fined the group in 2022 for anti-money laundering and social responsibility failures. We have not tested deposits, withdrawals or support.",
    legalName: {
      value: "LeoVegas Gaming PLC",
      sources: [ukgc(39198)],
      checked: CHECKED,
      note: "Head office in Sliema, Malta.",
    },
    registration: {
      value: "Malta, C59314",
      sources: [
        {
          label: "Swedish Gambling Authority decision listing",
          url: "https://www.spelinspektionen.se/",
          primary: false,
        },
      ],
      checked: CHECKED,
      note: "Taken from a Swedish regulator document; not checked against the Malta Business Registry.",
    },
    owner: {
      value: "MGM Resorts International (acquired in 2022)",
      sources: [wiki("LeoVegas", "LeoVegas")],
      checked: CHECKED,
      note: "Secondary source only.",
    },
    launchYear: {
      value: 2011,
      sources: [wiki("LeoVegas", "LeoVegas")],
      checked: CHECKED,
      note: "Sources differ (2011 or 2012). The UKGC casino licence is active from 1 November 2014.",
    },
    licences: [
      {
        regulator: "UK Gambling Commission",
        number: "39198",
        holder: "LeoVegas Gaming PLC",
        status:
          "Active: remote casino (from 1 Nov 2014), bingo (26 Feb 2018), betting real events (29 Apr 2016), virtual events (23 Apr 2025)",
        verifyUrl:
          "https://www.gamblingcommission.gov.uk/public-register/business/detail/39198",
        source: ukgc(39198),
      },
    ],
    verticals: {
      value: ["casino", "sportsbook", "bingo"],
      sources: [ukgc(39198)],
      checked: CHECKED,
      note: "Based on the licence activities on the register.",
    },
    paymentMethods: {
      value: null,
      sources: [],
      checked: CHECKED,
      note: gbPayNote,
    },
    welcomeBonus: {
      value: null,
      sources: [ukgcRules],
      checked: CHECKED,
      note: gbBonusNote,
    },
    restrictions: {
      value:
        "The GB-licensed domain is leovegas.co.uk. The register lists leovegas.com as inactive for GB customers.",
      sources: [ukgcDomains(39198)],
      checked: CHECKED,
    },
    safer: {
      value: null,
      sources: [],
      checked: CHECKED,
      note: "Not verified on the operator's site. UKGC licensees must offer deposit limits, time-outs and GAMSTOP self-exclusion.",
    },
    regulatoryActions: [
      {
        date: "2022-08-03",
        regulator: "UK Gambling Commission",
        amount: "£1.32m",
        summary:
          "Financial penalty, official warning and audit for anti-money laundering and social responsibility failures.",
        source: {
          label: "UKGC news",
          url: "https://www.gamblingcommission.gov.uk/news/article/online-operator-leovegas-fined-gbp1-2-million",
          primary: true,
        },
      },
    ],
    otherFacts: [
      {
        text: "Trading names on the same GB licence include Pink Casino, Slotboss, BetMGM UK, 21.co.uk and BetUK.",
        source: ukgcDomains(39198),
      },
    ],
    notVerified: [
      "Payment methods",
      "Current welcome offer and its terms",
      "Withdrawal times",
      "Malta Gaming Authority licence number",
    ],
    goTarget: "https://www.leovegas.co.uk/",
    lastChecked: CHECKED,
  },
  {
    slug: "888casino",
    name: "888casino",
    domain: "888casino.com",
    gbStatus: "licensed",
    summary:
      "888casino is one of the oldest online casino brands, operated for GB players by 888 UK Limited under UK Gambling Commission account 39028. The group, formerly 888 Holdings, has traded as Evoke plc since 2024.",
    verdict:
      "Licensed in Great Britain for casino, bingo and betting on our check date. It also has the longest enforcement record in this set: a £9.4m penalty in 2022 and three smaller penalties in 2024 and 2025. We have not tested deposits, withdrawals or support.",
    legalName: {
      value: "888 UK Limited",
      sources: [ukgc(39028)],
      checked: CHECKED,
      note: "Head office at Europort, Gibraltar.",
    },
    registration: {
      value: null,
      sources: [ukgc(39028)],
      checked: CHECKED,
      note: "Not shown on the UKGC register; Gibraltar registry not checked.",
    },
    owner: {
      value: "Evoke plc (formerly 888 Holdings, renamed 2024)",
      sources: [wiki("888casino", "888casino")],
      checked: CHECKED,
      note: "Secondary source only.",
    },
    launchYear: {
      value: 1997,
      sources: [wiki("888casino", "888casino")],
      checked: CHECKED,
      note: "1997 is the launch of Casino-on-Net, the predecessor brand. The 888casino name came later.",
    },
    licences: [
      {
        regulator: "UK Gambling Commission",
        number: "39028",
        holder: "888 UK Limited",
        status:
          "Active: remote casino, bingo, betting real events (all from 1 Nov 2014), virtual events (16 Apr 2020)",
        verifyUrl:
          "https://www.gamblingcommission.gov.uk/public-register/business/detail/39028",
        source: ukgc(39028),
      },
    ],
    verticals: {
      value: ["casino", "sportsbook", "bingo"],
      sources: [ukgc(39028)],
      checked: CHECKED,
      note: "Sportsbook runs as 888sport. Based on the licence activities on the register.",
    },
    paymentMethods: {
      value: null,
      sources: [],
      checked: CHECKED,
      note: gbPayNote,
    },
    welcomeBonus: {
      value: null,
      sources: [ukgcRules],
      checked: CHECKED,
      note: "Not listed. The promotions page we could reach showed a euro offer that we could not confirm as the GB offer. Since 19 January 2026 UK rules cap bonus wagering at 10x.",
    },
    restrictions: {
      value: "888casino.com is an active GB domain on the register.",
      sources: [ukgcDomains(39028)],
      checked: CHECKED,
    },
    safer: {
      value: null,
      sources: [],
      checked: CHECKED,
      note: "Not verified on the operator's site. UKGC licensees must offer deposit limits, time-outs and GAMSTOP self-exclusion.",
    },
    regulatoryActions: [
      {
        date: "2022-03-01",
        regulator: "UK Gambling Commission",
        amount: "£9.4m",
        summary:
          "Penalty for social responsibility and anti-money laundering failures.",
        source: {
          label: "UKGC news",
          url: "https://www.gamblingcommission.gov.uk/news/article/gbp9-4m-fine-for-online-operator-888",
          primary: true,
        },
      },
      {
        date: "2024-08-19",
        regulator: "UK Gambling Commission",
        amount: "£23,000",
        summary: "Penalty linked to the credit card licence condition.",
        source: {
          label: "UKGC register, regulatory actions for account 39028",
          url: "https://www.gamblingcommission.gov.uk/public-register/business/detail/actions/39028",
          primary: true,
        },
      },
      {
        date: "2025-08-07",
        regulator: "UK Gambling Commission",
        amount: "£33,075",
        summary: "Penalty under social responsibility code provision 3.9.1.",
        source: {
          label: "UKGC register, regulatory action 272",
          url: "https://www.gamblingcommission.gov.uk/public-register/regulatory-action/detail/272",
          primary: true,
        },
      },
      {
        date: "2025-11-18",
        regulator: "UK Gambling Commission",
        amount: "£86,843",
        summary: "Penalty relating to self-exclusion (code provision 3.5.3).",
        source: {
          label: "UKGC register, regulatory actions for account 39028",
          url: "https://www.gamblingcommission.gov.uk/public-register/business/detail/actions/39028",
          primary: true,
        },
      },
    ],
    otherFacts: [],
    notVerified: [
      "Payment methods",
      "Current GB welcome offer and its terms",
      "Withdrawal times",
      "Gibraltar licence number",
      "Company registration number",
    ],
    goTarget: "https://www.888casino.com/",
    lastChecked: CHECKED,
  },
  {
    slug: "betway",
    name: "Betway",
    domain: "betway.com",
    gbStatus: "licensed",
    summary:
      "Betway is a sportsbook and online casino run for GB players by Betway Limited under UK Gambling Commission account 39372. It is part of Super Group (SGHC) Limited, listed on the New York Stock Exchange since 2022.",
    verdict:
      "Licensed in Great Britain for casino and betting on our check date. In 2020 Betway paid £11.6m over failings linked to VIP customers, one of the larger settlements of that period. We have not tested deposits, withdrawals or support.",
    legalName: {
      value: "Betway Limited",
      sources: [ukgc(39372)],
      checked: CHECKED,
      note: "Head office in Gzira, Malta.",
    },
    registration: {
      value: "Malta, C39710",
      sources: [
        {
          label: "OpenCorporates",
          url: "https://opencorporates.com/companies/mt/C39710",
          primary: false,
        },
      ],
      checked: CHECKED,
      note: "Not checked against the Malta Business Registry.",
    },
    owner: {
      value: "Super Group (SGHC) Limited",
      sources: [wiki("Betway", "Betway")],
      checked: CHECKED,
      note: "Secondary source only.",
    },
    launchYear: {
      value: 2006,
      sources: [wiki("Betway", "Betway")],
      checked: CHECKED,
      note: "UKGC licences active from 1 November 2014.",
    },
    licences: [
      {
        regulator: "UK Gambling Commission",
        number: "39372",
        holder: "Betway Limited",
        status:
          "Active: remote casino (from 1 Nov 2014), betting real events (1 Nov 2014), virtual events (9 Jun 2017)",
        verifyUrl:
          "https://www.gamblingcommission.gov.uk/public-register/business/detail/39372",
        source: ukgc(39372),
      },
    ],
    verticals: {
      value: ["sportsbook", "casino"],
      sources: [ukgc(39372)],
      checked: CHECKED,
      note: "No bingo or poker activity on the register.",
    },
    paymentMethods: {
      value: null,
      sources: [],
      checked: CHECKED,
      note: gbPayNote,
    },
    welcomeBonus: {
      value: null,
      sources: [ukgcRules],
      checked: CHECKED,
      note: "Not listed. The operator's site was not reachable, and third-party sites quote conflicting terms. Since 19 January 2026 UK rules cap bonus wagering at 10x.",
    },
    restrictions: {
      value:
        "Active GB domains include betway.com and its casino, sports and vegas subdomains, plus Jackpot City and Spin Casino domains.",
      sources: [ukgcDomains(39372)],
      checked: CHECKED,
    },
    safer: {
      value: null,
      sources: [],
      checked: CHECKED,
      note: "Not verified on the operator's site. UKGC licensees must offer deposit limits, time-outs and GAMSTOP self-exclusion.",
    },
    regulatoryActions: [
      {
        date: "2020-03-12",
        regulator: "UK Gambling Commission",
        amount: "£11.6m",
        summary:
          "Payment in lieu of a penalty plus divestment, over social responsibility and anti-money laundering failings linked to VIP customers.",
        source: {
          label: "UKGC public statement",
          url: "https://www.gamblingcommission.gov.uk/public-register/public-statement/detail/betway-public-statement",
          primary: true,
        },
      },
    ],
    otherFacts: [
      {
        text: "Trading names on the same GB licence include Hippodrome Online, Jackpot City and Spin Casino.",
        source: ukgc(39372),
      },
    ],
    notVerified: [
      "Payment methods",
      "Current welcome offer and its terms",
      "Withdrawal times",
      "Malta Gaming Authority licence number",
    ],
    goTarget: "https://betway.com/en-gb",
    lastChecked: CHECKED,
  },
  {
    slug: "mr-green",
    name: "Mr Green",
    domain: "mrgreen.com",
    gbStatus: "surrendered",
    summary:
      "Mr Green is a Malta-based online casino brand, part of the William Hill group that Evoke plc (formerly 888 Holdings) now owns. Mr Green Limited held UK Gambling Commission account 39264 until it surrendered the licence on 28 October 2024.",
    verdict:
      "Not available to GB players: the UK licence was surrendered in October 2024 and no GB domain appears on the register. We keep this profile so readers who knew the brand can see what changed. No outbound link.",
    legalName: {
      value: "Mr Green Limited",
      sources: [ukgc(39264)],
      checked: CHECKED,
      note: "Former UKGC licence holder, head office in Sliema, Malta.",
    },
    registration: {
      value: null,
      sources: [],
      checked: CHECKED,
      note: "Not shown on the UKGC register; Malta registry not checked.",
    },
    owner: {
      value:
        "Evoke plc, through William Hill (which bought Mr Green in January 2019)",
      sources: [wiki("Mr_Green_(company)", "Mr Green (company)")],
      checked: CHECKED,
      note: "Secondary source only.",
    },
    launchYear: {
      value: 2008,
      sources: [wiki("Mr_Green_(company)", "Mr Green (company)")],
      checked: CHECKED,
      note: "Sources give 2007 for the company and 2008 for the site.",
    },
    licences: [
      {
        regulator: "UK Gambling Commission",
        number: "39264",
        holder: "Mr Green Limited",
        status:
          "Surrendered on 28 Oct 2024 (previously remote casino from 1 Nov 2014, bingo from 7 Jul 2017)",
        verifyUrl:
          "https://www.gamblingcommission.gov.uk/public-register/business/detail/39264",
        source: ukgc(39264),
      },
      {
        regulator: "Malta Gaming Authority and other EU regulators",
        number: null,
        holder: null,
        status:
          "mrgreen.com lists MGA, Danish and Swedish licences; numbers not captured on our check date.",
        verifyUrl: null,
        source: {
          label: "Mr Green responsible gaming page",
          url: "https://www.mrgreen.com/en/responsible-gaming/",
          primary: true,
        },
      },
    ],
    verticals: {
      value: ["casino"],
      sources: [ukgc(39264)],
      checked: CHECKED,
      note: "From the former GB licence; current offer outside GB not verified.",
    },
    paymentMethods: {
      value: null,
      sources: [],
      checked: CHECKED,
      note: "Not verified. No GB offering.",
    },
    welcomeBonus: {
      value: null,
      sources: [],
      checked: CHECKED,
      note: offshoreBonusNote,
    },
    restrictions: {
      value:
        "Not available in Great Britain since the UK licence was surrendered on 28 October 2024.",
      sources: [ukgc(39264)],
      checked: CHECKED,
    },
    safer: {
      value: null,
      sources: [],
      checked: CHECKED,
      note: "Not verified.",
    },
    regulatoryActions: [
      {
        date: "2020-02-27",
        regulator: "UK Gambling Commission",
        amount: "£3m",
        summary:
          "Regulatory settlement for anti-money laundering and social responsibility failures.",
        source: {
          label: "UKGC news",
          url: "https://www.gamblingcommission.gov.uk/news/article/mr-green-to-pay-gbp3-million-for-regulatory-failures",
          primary: true,
        },
      },
    ],
    otherFacts: [],
    notVerified: [
      "Current licence numbers outside GB",
      "Payment methods",
      "Company registration number",
    ],
    lastChecked: CHECKED,
  },
  {
    slug: "stake",
    name: "Stake",
    domain: "stake.com",
    gbStatus: "not-licensed",
    summary:
      "Stake is a crypto-first online casino and sportsbook launched in 2017, linked to the Australian company Easygo. Its terms name Medium Rare N.V. of Curaçao as operator. It is not licensed in Great Britain, and its former UK site, run by a separate licensee, closed in 2025.",
    verdict:
      "Not licensed in Great Britain and not available to GB players. Its Curaçao licence status was unclear on our check date. We publish these facts for information only, with no outbound link and no bonus details.",
    legalName: {
      value: "Medium Rare N.V.",
      sources: [
        {
          label: "DegenOwl review quoting Stake's terms",
          url: "https://www.degenowl.com/reviews/stake-casino-review",
          primary: false,
        },
      ],
      checked: CHECKED,
      note: "stake.com was not reachable from our check location, so this comes from a secondary source.",
    },
    registration: {
      value: "Curaçao, 145353",
      sources: [
        {
          label: "DegenOwl review quoting Stake's terms",
          url: "https://www.degenowl.com/reviews/stake-casino-review",
          primary: false,
        },
      ],
      checked: CHECKED,
      note: "Not checked against the Curaçao Chamber of Commerce.",
    },
    owner: {
      value: "Linked to Easygo (founders Ed Craven and Bijan Tehrani)",
      sources: [wiki("Stake_(online_casino)", "Stake (online casino)")],
      checked: CHECKED,
      note: "Wikipedia describes Easygo as the technology provider; the ownership of Medium Rare N.V. is not verified from a registry.",
    },
    launchYear: {
      value: 2017,
      sources: [wiki("Stake_(online_casino)", "Stake (online casino)")],
      checked: CHECKED,
    },
    licences: [
      {
        regulator: "Curaçao Gaming Authority",
        number: "OGL/2024/1451/0918",
        holder: "Medium Rare N.V.",
        status:
          "Status unclear: the licence certificate reportedly shows Active, while the authority's register (dated 2026-09-21) reportedly shows 'assessment in progress'. Not confirmed by us.",
        verifyUrl: null,
        source: {
          label: "DegenOwl review",
          url: "https://www.degenowl.com/reviews/stake-casino-review",
          primary: false,
        },
      },
    ],
    verticals: {
      value: ["casino", "sportsbook"],
      sources: [wiki("Stake_(online_casino)", "Stake (online casino)")],
      checked: CHECKED,
    },
    paymentMethods: {
      value: [
        "Cryptocurrencies (BTC, ETH, USDT, SOL and others)",
        "Cards and bank transfer in selected local currencies",
      ],
      sources: [
        {
          label: "DegenOwl review summarising Stake's help centre",
          url: "https://www.degenowl.com/reviews/stake-casino-review",
          primary: false,
        },
      ],
      checked: CHECKED,
      note: "Secondary source.",
    },
    welcomeBonus: {
      value: null,
      sources: [],
      checked: CHECKED,
      note: offshoreBonusNote,
    },
    restrictions: {
      value:
        "Terms reportedly list 45 prohibited jurisdictions, including the United States, Ireland and Ontario. Not available in GB. Blocked by regulators in Belgium, Poland and France.",
      sources: [
        {
          label: "DegenOwl review",
          url: "https://www.degenowl.com/reviews/stake-casino-review",
          primary: false,
        },
        wiki("Stake_(online_casino)", "Stake (online casino)"),
      ],
      checked: CHECKED,
      note: "Full list not retrieved from the operator.",
    },
    safer: {
      value: [
        "Deposit, loss and wager limits",
        "Break in play",
        "Product exclusion",
        "Self-exclusion",
      ],
      sources: [
        {
          label: "DegenOwl review",
          url: "https://www.degenowl.com/reviews/stake-casino-review",
          primary: false,
        },
      ],
      checked: CHECKED,
      note: "Secondary source.",
    },
    regulatoryActions: [],
    otherFacts: [
      {
        text: "In February 2025 the UK Gambling Commission warned Everton FC, a Stake shirt sponsor, that club officers could be liable for promoting an unlicensed gambling business.",
        source: wiki("Stake_(online_casino)", "Stake (online casino)"),
      },
      {
        text: "TGP Europe, the separate licensee that ran the UK-facing Stake site, surrendered its UK licence in May 2025.",
        source: {
          label: "DegenOwl review citing UKGC",
          url: "https://www.degenowl.com/reviews/stake-casino-review",
          primary: false,
        },
      },
    ],
    notVerified: [
      "Current Curaçao licence status",
      "Operator details from stake.com itself (blocked from our location)",
      "Full list of restricted countries",
    ],
    lastChecked: CHECKED,
  },
  {
    slug: "bcgame",
    name: "BC.Game",
    domain: "bc.game",
    gbStatus: "not-licensed",
    summary:
      "BC.Game is a crypto casino and sportsbook running since 2017. Its homepage names Twocent Technology Limited as operator, under a licence from Anjouan (Union of Comoros). It is not licensed in Great Britain and closed its UK-facing site in December 2024.",
    verdict:
      "Not licensed in Great Britain and not available to GB players. Its earlier Curaçao licence was reported revoked in late 2024. We publish these facts for information only, with no outbound link and no bonus details.",
    legalName: {
      value: "Twocent Technology Limited",
      sources: [
        { label: "bc.game homepage", url: "https://bc.game/", primary: true },
      ],
      checked: CHECKED,
    },
    registration: {
      value: "Belize, 41939",
      sources: [
        {
          label: "BC.Game terms (whitepaper copy)",
          url: "https://whitepaper.bc.game/bc-white-paper/appendix/general-terms-and-conditions",
          primary: true,
        },
      ],
      checked: CHECKED,
      note: "From the copy of the terms hosted on the operator's whitepaper site; not checked against the Belize registry.",
    },
    owner: {
      value: null,
      sources: [],
      checked: CHECKED,
      note: "Not verified: the operator does not name a parent group.",
    },
    launchYear: {
      value: 2017,
      sources: [
        { label: "bc.game homepage", url: "https://bc.game/", primary: true },
      ],
      checked: CHECKED,
    },
    licences: [
      {
        regulator: "Anjouan Gaming Authority (Union of Comoros)",
        number: "ALSI-202410011-FI1",
        holder: "Twocent Technology Limited",
        status:
          "Cited on the operator's homepage. A third-party register mirror reports it active until 2027-10-01; the official register did not load for us.",
        verifyUrl: "https://anjouangaming.com/license-register/",
        source: {
          label: "bc.game homepage",
          url: "https://bc.game/",
          primary: true,
        },
      },
      {
        regulator: "Curaçao (former regime)",
        number: "OGL/2023/118/0060",
        holder: "Small House B.V.",
        status:
          "Reported revoked. The regulator announced its intent to revoke on 26 Nov 2024 after Small House B.V. was declared bankrupt.",
        verifyUrl: null,
        source: {
          label: "Next.io",
          url: "https://next.io/news/casino/curacao-gambling-regulator-revoke-bc-game-licence/",
          primary: false,
        },
      },
    ],
    verticals: {
      value: ["casino", "sportsbook"],
      sources: [
        { label: "bc.game homepage", url: "https://bc.game/", primary: true },
      ],
      checked: CHECKED,
    },
    paymentMethods: {
      value: [
        "Cryptocurrencies (BTC, ETH, USDT, DOGE, TRX, XRP and others)",
        "Card purchase of crypto inside the site",
      ],
      sources: [
        { label: "bc.game homepage", url: "https://bc.game/", primary: true },
      ],
      checked: CHECKED,
    },
    welcomeBonus: {
      value: null,
      sources: [],
      checked: CHECKED,
      note: offshoreBonusNote,
    },
    restrictions: {
      value:
        "Terms list Aruba, Bonaire, Curaçao, France, the Netherlands, Saba, Statia, St Martin and the USA as prohibited. UK-facing site closed in December 2024.",
      sources: [
        {
          label: "BC.Game terms (whitepaper copy)",
          url: "https://whitepaper.bc.game/bc-white-paper/appendix/general-terms-and-conditions",
          primary: true,
        },
      ],
      checked: CHECKED,
      note: "The live terms page needs JavaScript and was not readable for us.",
    },
    safer: {
      value: ["Self-exclusion and limit tools in account settings"],
      sources: [
        { label: "bc.game homepage", url: "https://bc.game/", primary: true },
      ],
      checked: CHECKED,
      note: "Specific limit types not verified.",
    },
    regulatoryActions: [],
    otherFacts: [
      {
        text: "In November 2024 the Curaçao regulator announced its intent to revoke the licence of Small House B.V., the former BC.Game licence holder, after a court declared it bankrupt. BC.Game disputes liability.",
        source: {
          label: "Next.io",
          url: "https://next.io/news/casino/curacao-gambling-regulator-revoke-bc-game-licence/",
          primary: false,
        },
      },
    ],
    notVerified: [
      "Owner or parent group",
      "Official Anjouan register entry",
      "Minimum deposit and withdrawal limits",
    ],
    lastChecked: CHECKED,
  },
  {
    slug: "bitstarz",
    name: "BitStarz",
    domain: "bitstarz.com",
    gbStatus: "not-licensed",
    summary:
      "BitStarz is a crypto and fiat online casino founded in 2014. Its terms name Gareton B.V. of Curaçao as operator, under Curaçao Gaming Authority licence OGL/2024/165/0185. Its own terms bar real-money play from the UK and many EU countries.",
    verdict:
      "Not licensed in Great Britain, and its terms exclude UK players. We publish these facts for information only, with no outbound link and no bonus details.",
    legalName: {
      value: "Gareton B.V.",
      sources: [
        {
          label: "BitStarz terms, section 1.2",
          url: "https://bitstarz.com/terms",
          primary: true,
        },
      ],
      checked: CHECKED,
      note: "Registered office in Willemstad, Curaçao.",
    },
    registration: {
      value: "Curaçao, 160656",
      sources: [
        {
          label: "BitStarz terms, section 1.2",
          url: "https://bitstarz.com/terms",
          primary: true,
        },
      ],
      checked: CHECKED,
      note: "Not checked against the Curaçao registry.",
    },
    owner: {
      value: null,
      sources: [],
      checked: CHECKED,
      note: "Not verified: no parent group stated. The site says it was previously operated by Dama N.V.",
    },
    launchYear: {
      value: 2014,
      sources: [
        {
          label: "bitstarz.com homepage",
          url: "https://bitstarz.com/",
          primary: true,
        },
      ],
      checked: CHECKED,
    },
    licences: [
      {
        regulator: "Curaçao Gaming Authority",
        number: "OGL/2024/165/0185",
        holder: "Gareton B.V.",
        status:
          "Stated in the operator's terms. Not checked against the authority's register.",
        verifyUrl: null,
        source: {
          label: "BitStarz terms, section 1.2",
          url: "https://bitstarz.com/terms",
          primary: true,
        },
      },
    ],
    verticals: {
      value: ["casino"],
      sources: [
        {
          label: "bitstarz.com homepage",
          url: "https://bitstarz.com/",
          primary: true,
        },
      ],
      checked: CHECKED,
    },
    paymentMethods: {
      value: [
        "Cryptocurrencies (BTC incl. Lightning, ETH, SOL, USDT, USDC, LTC, DOGE and others)",
        "Visa and Mastercard",
      ],
      sources: [
        {
          label: "bitstarz.com homepage",
          url: "https://bitstarz.com/",
          primary: true,
        },
      ],
      checked: CHECKED,
    },
    welcomeBonus: {
      value: null,
      sources: [],
      checked: CHECKED,
      note: offshoreBonusNote,
    },
    restrictions: {
      value:
        "Terms section 3.6 bars real-money play from the USA, the UK and its territories, Spain, France, the Netherlands, Belgium, Portugal, Poland, Ukraine and many more.",
      sources: [
        {
          label: "BitStarz terms, section 3.6",
          url: "https://bitstarz.com/terms",
          primary: true,
        },
      ],
      checked: CHECKED,
    },
    safer: {
      value: [
        "Deposit, loss, wager and session limits",
        "Cooling-off break",
        "Self-exclusion",
      ],
      sources: [
        {
          label: "bitstarz.com homepage",
          url: "https://bitstarz.com/",
          primary: true,
        },
        {
          label: "BitStarz Play Safe page",
          url: "https://bitstarz.com/play-safe",
          primary: true,
        },
      ],
      checked: CHECKED,
      note: "The Play Safe page describes only self-exclusion through support, so the two pages disagree.",
    },
    regulatoryActions: [],
    otherFacts: [],
    notVerified: [
      "Curaçao Gaming Authority register entry",
      "Owner or parent group",
    ],
    lastChecked: CHECKED,
  },
];

export const gbLicensed = operators.filter((o) => o.gbStatus === "licensed");
export const notInGb = operators.filter((o) => o.gbStatus !== "licensed");

export const verticalLabels: Record<Vertical, string> = {
  casino: "Online casino",
  sportsbook: "Sports betting",
  bingo: "Bingo",
  poker: "Poker",
};

export const gbStatusLabel: Record<GbStatus, string> = {
  licensed: "UKGC licensed",
  surrendered: "UK licence surrendered",
  "not-licensed": "Not licensed in GB",
};

export function findOperator(slug: string) {
  return operators.find((o) => o.slug === slug);
}
