// ZIGChain Summit 2026 — Reddit Outreach Intelligence Data
// Design: Onchain Intelligence Brief — editorial, institutional, action-oriented

export interface RedditConversation {
  id: number;
  subreddit: string;
  title: string;
  url: string;
  age: string;
  ageHours: number; // for sorting
  category: string;
  categoryColor: string;
  relevanceScore: number; // 1-10
  context: string;
  opportunity: string;
  suggestedReply: string;
  engagementPotential: "High" | "Medium" | "Moderate";
  userAdded?: boolean;
}

export const summitInfo = {
  name: "ZIGChain Summit 2026",
  tagline: "Wealth at Scale · Onchain Capital",
  headline: "Wealth Compounds When Ecosystems Move Together",
  date: "April 28, 2026",
  location: "Dubai, UAE",
  venue: "Venue TBC",
  url: "https://summit.zigchain.com/2026",
  stats: {
    speakers: "50+",
    attendees: "2,000+",
    liveDapps: "10+",
    ecosystemFund: "$100M+",
  },
  themes: [
    "Tokenized funds and real-world assets",
    "Asset management onchain",
    "Institutional-grade financial infrastructure",
    "Regulation and compliance",
    "Market-defining announcements",
  ],
  speakers: [
    { name: "Dino Ibric", role: "Deputy CEO", org: "Swissquote MEA" },
    { name: "Christiane El Habre", role: "Regional MD – ME", org: "Apex Group" },
    { name: "Bashir Kazour", role: "Managing Director", org: "Taurus Group" },
    { name: "Tole R. Bordallo", role: "CEO & Co-Founder", org: "ZIGChain" },
    { name: "Abdul Rafay Gadit", role: "Co-Founder", org: "ZIGChain" },
    { name: "Jez Mohideen", role: "CEO & Co-Founder", org: "Laser Digital" },
    { name: "Dr. Bhaskar Dasgupta", role: "Chairman & Advisor", org: "Apex & ZIGChain" },
    { name: "Imran Sayeed", role: "Lecturer & Advisor", org: "MIT & Disrupt" },
  ],
};

export const conversations: RedditConversation[] = [
  {
    id: 1,
    subreddit: "r/Web3andFXEvents",
    title: "Web3 Meets Forex This April. Here Are 5 Events That Might Actually Be Worth It",
    url: "https://www.reddit.com/r/Web3andFXEvents/comments/1sdw4hu/web3_meets_forex_this_april_here_are_5_events/",
    age: "3 days ago",
    ageHours: 72,
    category: "Events & Conferences",
    categoryColor: "teal",
    relevanceScore: 10,
    context: "A curated list of 5 April 2026 web3/forex events covering Hong Kong Web3 Festival, Paris Blockchain Week, iFX Expo Asia, Blockchain Life Forum, and Forex Traders Summit. The post specifically highlights RWA tokenization and regulation as key discussion themes. ZIGChain Summit is absent from the list.",
    opportunity: "Perfect thread to add ZIGChain Summit as a 6th notable event. The post's audience is actively seeking events with an onchain finance and RWA angle — exactly ZIGChain's positioning.",
    suggestedReply: `Great list — one more worth adding if you're tracking April events with a serious onchain finance angle: **ZIGChain Summit 2026** on **April 28 in Dubai**.

It's a one-day summit focused specifically on tokenized funds, real-world assets, and institutional-grade onchain infrastructure. The speaker lineup includes names from Swissquote MEA, Apex Group, Taurus Group, and Laser Digital — so it's less of a retail/influencer event and more of a capital and builder convergence.

Given that you mentioned RWA tokenization and regulation getting more focus this month, this one fits right in. Free virtual pass available too: https://summit.zigchain.com/2026`,
    engagementPotential: "High",
  },
  {
    id: 2,
    subreddit: "r/TickerTalkByLiam",
    title: "Everyone talks about tokenizing assets, but who makes them trustworthy?",
    url: "https://www.reddit.com/r/TickerTalkByLiam/comments/1sfsrrp/everyone_talks_about_tokenizing_assets_but_who/",
    age: "18 hours ago",
    ageHours: 18,
    category: "Tokenization & RWA",
    categoryColor: "amber",
    relevanceScore: 9,
    context: "A thoughtful post about the 'trust layer' problem in tokenization — how to price private credit, real estate, and structured products in real time across jurisdictions. The author notes the RWA market is at $28B as of April 2026 and asks who builds the infrastructure to make tokenized assets trustworthy.",
    opportunity: "ZIGChain Summit directly addresses this — institutional-grade financial infrastructure, private credit onchain, and the trust/compliance layer are core themes. The summit speakers are building exactly what this author is asking about.",
    suggestedReply: `You're asking exactly the right question. The trust layer — pricing, verification, compliance across jurisdictions — is the bottleneck that most tokenization narratives skip over.

If this is something you're actively thinking about, there's a summit happening in Dubai on **April 28** that's specifically focused on this: **ZIGChain Summit 2026**. The agenda covers institutional-grade financial infrastructure, private credit onchain, and the regulatory frameworks that make tokenized assets actually usable by funds and asset managers.

Speakers include people from Apex Group, Taurus Group, and Laser Digital — institutions that are building the "trust layer" you're describing, not just issuing tokens. Worth checking out: https://summit.zigchain.com/2026`,
    engagementPotential: "High",
  },
  {
    id: 3,
    subreddit: "r/investing_discussion",
    title: "The Tokenization Market Just Crossed 28B and Something Is Still Missing",
    url: "https://www.reddit.com/r/investing_discussion/comments/1sftbdh/the_tokenization_market_just_crossed_28b_and/",
    age: "18 hours ago",
    ageHours: 18,
    category: "Tokenization & RWA",
    categoryColor: "amber",
    relevanceScore: 9,
    context: "Post about the RWA market reaching $28B, tokenized Treasuries at $12.8B, and the gap in pricing private credit, real estate, and structured products. Nasdaq and NYSE are building tokenized infrastructure but the 'missing piece' for complex assets remains unsolved. Closes with 'Who do you think solves pricing at scale?'",
    opportunity: "ZIGChain Summit is directly relevant — it focuses on onchain capital, private credit, and institutional infrastructure. The closing question is an open invitation to mention the summit.",
    suggestedReply: `The gap you're describing — consistent pricing for private credit, real estate, and structured products — is exactly what's being discussed at the institutional level right now.

On **April 28 in Dubai**, **ZIGChain Summit 2026** is bringing together the people actively working on this: asset managers, infrastructure builders, and capital allocators focused on onchain finance. The summit covers tokenized funds, RWA infrastructure, and the compliance frameworks that let these assets actually trade at scale.

Speakers include executives from Swissquote MEA, Apex Group, and Taurus Group. If you're tracking where the "missing piece" is being built, this might be worth following. Free virtual pass: https://summit.zigchain.com/2026`,
    engagementPotential: "High",
  },
  {
    id: 4,
    subreddit: "r/defi",
    title: "another day, another 'real world assets onchain' thread - 10-20% APY from boring businesses",
    url: "https://www.reddit.com/r/defi/comments/1sefw0u/another_day_another_real_world_assets_onchain/",
    age: "2 days ago",
    ageHours: 48,
    category: "DeFi & Onchain Finance",
    categoryColor: "blue",
    relevanceScore: 7,
    context: "A skeptical but thoughtful post about RWA onchain narratives cycling through the same story. The author notes that the framing tends to matter more than the underlying asset, and that real businesses like claw machines have been doing this for decades — just wrapped in different stories each cycle.",
    opportunity: "Acknowledge the skepticism, then pivot to ZIGChain Summit as a place where the substance (not just the narrative) is being built — institutional speakers, real capital, real infrastructure.",
    suggestedReply: `Fair point — the framing has been recycled a lot, and you're right that the narrative often outpaces the actual infrastructure.

The events worth watching are the ones where the conversation shifts from storytelling to actual capital deployment. **ZIGChain Summit 2026** (April 28, Dubai) is one of those — it's focused on institutional-grade onchain finance, with speakers from Swissquote MEA, Apex Group, and Taurus Group. Less "10-20% APY from claw machines," more "how does a regulated fund manager actually allocate capital onchain."

Virtual access is free if you want to see whether the substance matches the framing: https://summit.zigchain.com/2026`,
    engagementPotential: "Moderate",
  },
  {
    id: 5,
    subreddit: "r/AlgorandOfficial",
    title: "Tokenization is reshaping regulated finance by moving assets onto programmable ledgers",
    url: "https://www.reddit.com/r/AlgorandOfficial/comments/1sc0u88/tokenization_is_reshaping_regulated_finance_by/",
    age: "5 days ago",
    ageHours: 120,
    category: "Tokenization & RWA",
    categoryColor: "amber",
    relevanceScore: 8,
    context: "Post about IMF notes on tokenization covering atomic settlement, programmable compliance, and fractional ownership. The author argues Algorand has had these features from day one and asks whether IMF recognition will drive institutional momentum for the chain.",
    opportunity: "ZIGChain Summit brings together the institutional and regulatory voices shaping how tokenization plays out in practice. Adds event context to the broader institutional momentum discussion.",
    suggestedReply: `The IMF note is a strong signal that this is no longer a fringe conversation. Atomic settlement, programmable compliance, fractional ownership — these are now being discussed at the policy level, which changes the trajectory significantly.

On the events side, **ZIGChain Summit 2026** (April 28, Dubai) is bringing together exactly the institutional and regulatory voices that are shaping how this plays out in practice. Speakers include executives from Apex Group, Taurus Group, and Laser Digital — all working at the intersection of regulation, compliance, and onchain infrastructure.

Worth keeping an eye on if you're tracking where institutional tokenization is heading: https://summit.zigchain.com/2026`,
    engagementPotential: "Medium",
  },
  {
    id: 6,
    subreddit: "r/RWATimes",
    title: "RWA Tokenization for Institutional Fund Managers: Structure, Regulation, and Getting It Right",
    url: "https://www.reddit.com/r/RWATimes/comments/1segc3m/rwa_tokenization_for_institutional_fund_managers/",
    age: "2 days ago",
    ageHours: 48,
    category: "Institutional Finance",
    categoryColor: "purple",
    relevanceScore: 9,
    context: "Article about tokenization becoming operational reality for institutional fund managers. Focus on legal frameworks, asset types (T-bills), and regulatory compliance. The community is specifically focused on RWA news for institutional audiences.",
    opportunity: "ZIGChain Summit directly addresses institutional fund managers with speakers from Apex Group, Taurus Group, and Swissquote MEA. The community is the ideal target audience.",
    suggestedReply: `Great piece — the shift from "is this viable?" to "how do we structure it correctly?" is exactly where the serious operators are now.

For anyone in this community tracking where these conversations are happening in person: **ZIGChain Summit 2026** is on **April 28 in Dubai**, focused specifically on tokenized funds, RWA infrastructure, and institutional compliance. The speaker lineup includes Christiane El Habre (Apex Group Regional MD for ME), Bashir Kazour (Taurus Group MD), and Jez Mohideen (Laser Digital CEO) — all names that matter in the institutional RWA space.

In-person access is limited, but a free virtual pass is available: https://summit.zigchain.com/2026`,
    engagementPotential: "High",
  },
  {
    id: 7,
    subreddit: "r/TheRaceTo10Million",
    title: "Exchanges Are Ready for Tokenization, But Something Is Missing",
    url: "https://www.reddit.com/r/TheRaceTo10Million/comments/1sfrgjb/exchanges_are_ready_for_tokenization_but/",
    age: "19 hours ago",
    ageHours: 19,
    category: "Tokenization & RWA",
    categoryColor: "amber",
    relevanceScore: 8,
    context: "Post about Nasdaq, NYSE, and crypto platforms preparing for a tokenized future, but the 'trust and pricing layer' for private credit and real estate is still missing. The RWA market is approaching $30B. Asks 'If exchanges solve distribution, who ends up solving the trust and pricing layer at scale?'",
    opportunity: "ZIGChain Summit addresses exactly this gap — institutional infrastructure, private credit onchain. The closing question is an open invitation.",
    suggestedReply: `The distribution layer (Nasdaq, NYSE, crypto platforms) is clearly moving fast. The trust and pricing layer for private credit and real estate is the harder problem — and it's where most of the interesting infrastructure work is happening right now.

**ZIGChain Summit 2026** (April 28, Dubai) is specifically focused on this gap — institutional-grade financial infrastructure, private credit onchain, and the compliance layer that makes tokenized assets usable by regulated entities. Speakers include people from Taurus Group, Apex Group, and Swissquote MEA who are building exactly what you're describing.

Free virtual pass if you want to follow the conversation: https://summit.zigchain.com/2026`,
    engagementPotential: "High",
  },
  {
    id: 8,
    subreddit: "r/NFT",
    title: "Why the UAE's 'Trapped Equity' is the next major Frontier for Real World Assets (RWA)",
    url: "https://www.reddit.com/r/NFT/comments/1sabuib/why_the_uaes_trapped_equity_is_the_next_major/",
    age: "7 days ago",
    ageHours: 168,
    category: "Dubai & UAE",
    categoryColor: "green",
    relevanceScore: 8,
    context: "Discussion about UAE as a frontier for RWA tokenization, focusing on illiquid prestige assets like license plates. The author argues blockchain can unlock trapped equity in the region and that a 'million-dirham milestone' would provide the proof-of-concept institutional funds need.",
    opportunity: "ZIGChain Summit is happening in Dubai and focuses on RWA and onchain capital — directly relevant to UAE blockchain community thinking about regional opportunities.",
    suggestedReply: `The UAE trapped equity thesis is interesting — and you're right that the proof-of-concept moment is what unlocks institutional attention. The region has a unique combination of high-value illiquid assets and a regulatory environment that's actively trying to enable tokenization.

On that note: **ZIGChain Summit 2026** is happening in **Dubai on April 28**, focused on onchain capital and RWA infrastructure. Given that you're thinking about the UAE as a frontier for this, it might be worth following — speakers include regional executives from Apex Group and Swissquote MEA who are building the institutional layer for this market.

More info: https://summit.zigchain.com/2026`,
    engagementPotential: "Medium",
  },
  {
    id: 9,
    subreddit: "r/SECZ",
    title: "Carlos Domingo on why institutions like BlackRock are moving into tokenization",
    url: "https://www.reddit.com/r/SECZ/comments/1se3mtp/carlos_domingo_on_why_institutions_like_blackrock/",
    age: "3 days ago",
    ageHours: 72,
    category: "Institutional Finance",
    categoryColor: "purple",
    relevanceScore: 8,
    context: "Discussion about institutional interest in tokenization shifting from 'why tokenize?' to 'what should we tokenize?' Carlos Domingo (Securitize CEO) explains that asset managers, banks, and exchanges see tokenization as infrastructure upgrade — lower costs, better product design, reaching underserved markets.",
    opportunity: "ZIGChain Summit brings together exactly these institutional voices in Dubai. The discussion is warm and open to event suggestions.",
    suggestedReply: `Carlos frames it well — the conversation has genuinely shifted from "should we tokenize?" to "what's the right structure?" That's a meaningful change in how institutions are approaching this.

If you're tracking where these institutional conversations are happening in person, **ZIGChain Summit 2026** (April 28, Dubai) is bringing together asset managers, infrastructure builders, and capital allocators focused on exactly this. Speakers include executives from Apex Group, Taurus Group, and Laser Digital — institutions that are operationalizing tokenization, not just theorizing about it.

Free virtual pass available: https://summit.zigchain.com/2026`,
    engagementPotential: "Medium",
  },
  {
    id: 10,
    subreddit: "r/DecentralizedFinance",
    title: "ETF Capital Is Flowing In — How Does It Eventually Reach DeFi?",
    url: "https://www.reddit.com/r/DecentralizedFinance/comments/1sgal8r/etf_capital_is_flowing_in_how_does_it_eventually/",
    age: "7 hours ago",
    ageHours: 7,
    category: "DeFi & Onchain Finance",
    categoryColor: "blue",
    relevanceScore: 7,
    context: "Discussion about ~$2B Bitcoin ETF inflows and how capital eventually flows from TradFi into DeFi. Covers stablecoins as intermediate layer, infrastructure friction (bridging, wallets), and asks when downstream rotation into DeFi will become visible.",
    opportunity: "ZIGChain Summit addresses the infrastructure needed to bridge TradFi and onchain finance. The thread is very fresh (7 hours) with active engagement.",
    suggestedReply: `The stablecoin intermediate layer point is well made — that's historically been the bridge between TradFi inflows and onchain activity. The friction you're describing (bridging, wallets, multi-platform navigation) is a real structural gap.

The events worth watching on the infrastructure side: **ZIGChain Summit 2026** (April 28, Dubai) is specifically focused on how institutional capital moves onchain — covering tokenized funds, RWA infrastructure, and the compliance layer that makes TradFi-to-DeFi rotation more seamless. Speakers from Swissquote MEA, Apex Group, and Laser Digital are all working on different parts of this bridge.

Free virtual pass: https://summit.zigchain.com/2026`,
    engagementPotential: "High",
  },
  {
    id: 11,
    subreddit: "r/investing_discussion",
    title: "Tokenization probably becomes important in the least exciting way possible",
    url: "https://www.reddit.com/r/investing_discussion/comments/1sakmge/tokenization_probably_becomes_important_in_the/",
    age: "7 days ago",
    ageHours: 168,
    category: "Tokenization & RWA",
    categoryColor: "amber",
    relevanceScore: 7,
    context: "Thoughtful post arguing tokenization's real value is in upgrading existing liquid markets (Treasuries, equities), not in novelty assets. Discusses settlement, interoperability, and capital efficiency as the real opportunity. Argues illiquid assets don't become foundational just because they're tokenized.",
    opportunity: "ZIGChain Summit's focus on institutional-grade infrastructure and onchain capital aligns with this thesis. The author would appreciate the summit's substance-over-hype positioning.",
    suggestedReply: `This is one of the sharper takes on tokenization I've seen — the "infrastructure upgrade" framing is much more durable than the "novelty asset" framing, and you're right that liquid, standardized markets are where the real value gets unlocked first.

For anyone following where this thesis is being built out in practice: **ZIGChain Summit 2026** (April 28, Dubai) is focused on exactly this — institutional-grade onchain finance, tokenized funds, and the infrastructure that makes capital markets work better. Less about which obscure asset gets tokenized next, more about how the system improves.

Virtual pass is free: https://summit.zigchain.com/2026`,
    engagementPotential: "Medium",
  },
  {
    id: 12,
    subreddit: "r/RWATimes",
    title: "MetaSoilVerse Protocol Brings RWA Infrastructure On-Chain with Staking and LBank Listing",
    url: "https://www.reddit.com/r/RWATimes/comments/1sc5k9p/metasoilverse_protocol_brings_rwa_infrastructure/",
    age: "5 days ago",
    ageHours: 120,
    category: "Dubai & UAE",
    categoryColor: "green",
    relevanceScore: 7,
    context: "Dubai-based RWA tokenization protocol (MetaSoilVerse Protocol) announcing its staking program and LBank listing. The r/RWATimes community is focused on RWA news for institutional and retail audiences.",
    opportunity: "ZIGChain Summit is a Dubai event focused on RWA — highly relevant to this community and specifically to Dubai-based RWA projects.",
    suggestedReply: `Interesting launch — the staking + exchange listing combination is a common path for RWA protocols trying to build liquidity early.

For the Dubai-based RWA community specifically: **ZIGChain Summit 2026** is happening on **April 28 in Dubai**, focused on onchain capital, tokenized funds, and institutional RWA infrastructure. Given that MSVP is based in Dubai, this might be a relevant event to follow — speakers include executives from Apex Group, Taurus Group, and Laser Digital.

More info and free virtual pass: https://summit.zigchain.com/2026`,
    engagementPotential: "Medium",
  },
];

export const categoryColors: Record<string, string> = {
  teal: "bg-teal-50 text-teal-700 border-teal-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export const engagementColors: Record<string, string> = {
  High: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Moderate: "bg-slate-100 text-slate-600 border-slate-200",
};

export const categories = [
  "All",
  "Events & Conferences",
  "Tokenization & RWA",
  "DeFi & Onchain Finance",
  "Institutional Finance",
  "Dubai & UAE",
];
