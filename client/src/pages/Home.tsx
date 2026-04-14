/**
 * ZIGChain Summit 2026 — Reddit Outreach Intelligence Dashboard
 * Design: "Onchain Intelligence Brief" — Light Mode
 * - Brand palette: Violet (#4E30C6) + Emerald (#05D9A0)
 * - Light background with white cards, violet borders, brand accents
 * - Summit Banner kept dark (deep violet) for premium contrast
 */

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  conversations,
  summitInfo,
  categories,
  categoryColors,
  engagementColors,
  type RedditConversation,
} from "@/lib/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
  Zap,
  Filter,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  Circle,
  Archive,
  RotateCcw,
  Plus,
  Loader2,
} from "lucide-react";

// ─── Helpers for user-added conversations ────────────────────────────────────

function parseRedditUrl(url: string): { subreddit: string; postId: string } | null {
  const match = url.match(/reddit\.com\/r\/([^/]+)\/comments\/([a-zA-Z0-9]+)/);
  if (!match) return null;
  return { subreddit: match[1], postId: match[2] };
}

async function fetchRedditPost(subreddit: string, postId: string): Promise<any> {
  const res = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`);
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data[0].data.children[0].data;
}

function formatAge(createdUtc: number): { age: string; ageHours: number } {
  const ageHours = (Date.now() - createdUtc * 1000) / 3_600_000;
  let age: string;
  if (ageHours < 1) age = "just now";
  else if (ageHours < 24) age = `${Math.floor(ageHours)} hours ago`;
  else {
    const days = Math.floor(ageHours / 24);
    age = days === 1 ? "1 day ago" : `${days} days ago`;
  }
  return { age, ageHours };
}

function detectCategory(subreddit: string, title: string): { category: string; categoryColor: string } {
  const text = (subreddit + " " + title).toLowerCase();
  if (/event|conference|summit|meetup/.test(text)) return { category: "Events & Conferences", categoryColor: "teal" };
  if (/dubai|uae|middle.east|gulf/.test(text)) return { category: "Dubai & UAE", categoryColor: "green" };
  if (/institutional|fund|asset.manag|blackrock/.test(text)) return { category: "Institutional Finance", categoryColor: "purple" };
  if (/defi|onchain|yield|liquidity|protocol|decentralized/.test(text)) return { category: "DeFi & Onchain Finance", categoryColor: "blue" };
  return { category: "Tokenization & RWA", categoryColor: "amber" };
}

function buildConversationFromPost(post: any, url: string): RedditConversation {
  const { age, ageHours } = formatAge(post.created_utc);
  const { category, categoryColor } = detectCategory(post.subreddit || "", post.title || "");
  const score: number = post.score ?? 0;
  const numComments: number = post.num_comments ?? 0;
  const engagementPotential: "High" | "Moderate" | "Medium" =
    score > 100 || numComments > 50 ? "High" : score > 20 || numComments > 10 ? "Moderate" : "Medium";
  const keywords = ["defi","blockchain","crypto","web3","zigchain","token","rwa","asset","finance","fund","institutional","summit","dubai","onchain"];
  const blob = (post.title + " " + (post.selftext ?? "") + " " + (post.subreddit ?? "")).toLowerCase();
  const hits = keywords.filter((k) => blob.includes(k)).length;
  const relevanceScore = Math.min(10, Math.max(3, Math.round(hits * 1.2 + 3)));
  const subredditLabel = post.subreddit_name_prefixed ?? `r/${post.subreddit}`;
  const context =
    post.selftext && post.selftext.length > 20
      ? post.selftext.slice(0, 220) + (post.selftext.length > 220 ? "..." : "")
      : `Thread in ${subredditLabel} with ${score} upvotes and ${numComments} comments.`;
  return {
    id: Date.now(),
    subreddit: subredditLabel,
    title: post.title,
    url,
    age,
    ageHours,
    category,
    categoryColor,
    relevanceScore,
    context,
    opportunity: `This thread in ${subredditLabel} is an opportunity to connect the community with ZIGChain Summit 2026's focus on onchain capital, tokenized funds, and institutional-grade DeFi infrastructure.`,
    suggestedReply: `This connects directly to what **ZIGChain Summit 2026** is addressing on April 28 in Dubai — onchain capital, tokenized funds, and institutional-grade financial infrastructure.\n\nSpeakers include executives from Swissquote MEA, Apex Group, and Taurus Group.\n\nFree virtual pass: https://summit.zigchain.com/2026`,
    engagementPotential,
    userAdded: true,
  };
}

function buildConversationFromUrl(url: string, parsed: { subreddit: string; postId: string }): RedditConversation {
  const slug = url.split("/").filter(Boolean).pop() ?? "";
  const title = slug.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || `Thread from r/${parsed.subreddit}`;
  const { category, categoryColor } = detectCategory(parsed.subreddit, title);
  return {
    id: Date.now(),
    subreddit: `r/${parsed.subreddit}`,
    title,
    url,
    age: "recently added",
    ageHours: 0,
    category,
    categoryColor,
    relevanceScore: 5,
    context: `User-added thread from r/${parsed.subreddit}.`,
    opportunity: `This thread in r/${parsed.subreddit} may be an opportunity to highlight ZIGChain Summit 2026.`,
    suggestedReply: `This is relevant to **ZIGChain Summit 2026** on April 28 in Dubai — focused on onchain capital and institutional DeFi. Free virtual pass: https://summit.zigchain.com/2026`,
    engagementPotential: "Medium",
    userAdded: true,
  };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SummitBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#3D25A8]/40 bg-gradient-to-br from-[#3D25A8] via-[#2D1880] to-[#1a0f60] p-6 md:p-8 mb-8 shadow-lg">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#05D9A0 1px, transparent 1px), linear-gradient(90deg, #05D9A0 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#05D9A0]/15 border border-[#05D9A0]/40 text-[#05D9A0] text-xs font-medium tracking-wide uppercase">
              <Zap size={10} />
              Live Research Brief
            </span>
            <span className="text-xs text-white/40 font-mono-custom">April 9, 2026</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
            ZIGChain Summit 2026
          </h1>
          <p className="text-[#05D9A0] font-medium text-lg mb-4">
            {summitInfo.tagline}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#05D9A0]" />
              {summitInfo.date}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#05D9A0]" />
              {summitInfo.location} · {summitInfo.venue}
            </span>
            <a
              href={summitInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#05D9A0] hover:text-white transition-colors"
            >
              <ExternalLink size={14} />
              summit.zigchain.com/2026
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: "Speakers", value: "12+" },
            { label: "Attendees", value: summitInfo.stats.attendees },
            { label: "Live DApps", value: summitInfo.stats.liveDapps },
            { label: "Ecosystem Fund", value: summitInfo.stats.ecosystemFund },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-3 rounded-lg bg-white/10 border border-white/20"
            >
              <div className="font-display text-xl font-bold text-[#05D9A0]">
                {stat.value}
              </div>
              <div className="text-xs text-white/60 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatsBar({ filtered, engaged }: { filtered: RedditConversation[]; engaged: number }) {
  const highCount = filtered.filter((c) => c.engagementPotential === "High").length;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[
        {
          icon: <MessageSquare size={16} />,
          label: "Remaining",
          value: filtered.length,
          sub: "active threads",
        },
        {
          icon: <CheckCircle2 size={16} />,
          label: "Engaged",
          value: engaged,
          sub: "completed",
        },
        {
          icon: <TrendingUp size={16} />,
          label: "High Priority",
          value: highCount,
          sub: "in remaining",
        },
      ].map((s) => (
        <div
          key={s.label}
          className="bg-white border border-[#4E30C6]/10 rounded-xl p-4 flex items-center gap-3 shadow-sm"
        >
          <div className="p-2 rounded-lg bg-[#05D9A0]/15 text-[#028A6B]">
            {s.icon}
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-[#1a1f35]">{s.value}</div>
            <div className="text-xs text-[#9CA3AF]">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF] mr-1">
        <Filter size={12} /> Filter:
      </span>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
            active === cat
              ? "bg-[#05D9A0] text-[#1a1f35] border-[#05D9A0]"
              : "bg-[#4E30C6]/5 text-[#4E30C6]/70 border-[#4E30C6]/20 hover:border-[#4E30C6]/40 hover:text-[#4E30C6]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function RelevanceBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-sm ${
              i < score
                ? "bg-[#05D9A0]"
                : "bg-[#4E30C6]/10"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-[#9CA3AF] font-mono-custom">{score}/10</span>
    </div>
  );
}

function ConversationCard({
  conv,
  index,
  onToggleEngaged,
  onArchive,
}: {
  conv: RedditConversation;
  index: number;
  onToggleEngaged: (id: number) => void;
  onArchive: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(conv.suggestedReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="bg-white border border-[#4E30C6]/10 rounded-xl overflow-hidden hover:border-[#05D9A0]/50 hover:shadow-md transition-all duration-300 group shadow-sm"
    >
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <button
            onClick={() => onToggleEngaged(conv.id)}
            className="flex-shrink-0 mt-0.5 text-[#9CA3AF] hover:text-[#05D9A0] transition-colors"
            title="Mark as engaged"
          >
            <Circle size={18} />
          </button>
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <span className="font-mono-custom text-xs text-[#4E30C6] font-medium">
              {conv.subreddit}
            </span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${
                categoryColors[conv.categoryColor]
              }`}
            >
              {conv.category}
            </span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${
                engagementColors[conv.engagementPotential]
              }`}
            >
              {conv.engagementPotential} Engagement
            </span>
            {conv.userAdded && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-[#4E30C6]/10 text-[#4E30C6] border border-[#4E30C6]/25 font-medium">
                ✦ Added by you
              </span>
            )}
          </div>
          <span className="text-xs text-[#9CA3AF] whitespace-nowrap font-mono-custom flex-shrink-0">
            {conv.age}
          </span>
        </div>

        <h3 className="font-display text-base font-semibold text-[#1a1f35] leading-snug mb-3 group-hover:text-[#4E30C6] transition-colors">
          {conv.title}
        </h3>

        <div className="flex items-center justify-between">
          <RelevanceBar score={conv.relevanceScore} />
          <a
            href={conv.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-[#9CA3AF] hover:text-[#4E30C6] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={12} />
            View Thread
          </a>
        </div>
      </div>

      {/* Context & Opportunity */}
      <div className="px-5 pb-4">
        <div className="bg-[#4E30C6]/3 border border-[#4E30C6]/8 rounded-lg p-3 mb-3">
          <p className="text-xs text-[#4B5563] leading-relaxed">
            <span className="text-[#9CA3AF] uppercase tracking-wide text-[10px] font-mono-custom block mb-1">
              Thread Context
            </span>
            {conv.context}
          </p>
        </div>

        <div className="bg-[#4E30C6]/3 border border-[#4E30C6]/8 rounded-lg p-3 mb-3">
          <p className="text-xs text-[#4B5563] leading-relaxed">
            <span className="text-[#9CA3AF] uppercase tracking-wide text-[10px] font-mono-custom block mb-1">
              Outreach Opportunity
            </span>
            {conv.opportunity}
          </p>
        </div>

        {/* Suggested Reply Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#4E30C6]/8 border border-[#4E30C6]/20 text-[#4E30C6] text-xs font-medium hover:bg-[#4E30C6]/12 transition-colors mb-3"
        >
          <span>Suggested Reply</span>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {/* Expanded Reply */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F0EEFF] border border-[#4E30C6]/15 rounded-lg p-3 mb-3 overflow-hidden"
            >
              <p className="text-xs text-[#374151] leading-relaxed font-mono-custom mb-3 whitespace-pre-wrap">
                {conv.suggestedReply}
              </p>
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#05D9A0]/15 border border-[#05D9A0]/40 text-[#028A6B] text-xs font-medium hover:bg-[#05D9A0]/25 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={12} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    Copy
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onArchive(conv.id)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#4E30C6]/5 border border-[#4E30C6]/15 text-[#6B7280] text-xs font-medium hover:border-[#4E30C6]/25 hover:text-[#4E30C6] transition-colors"
            title="Archive this conversation"
          >
            <Archive size={12} />
            Archive
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function EngagementHistorySidebar({
  engaged,
  onRemove,
}: {
  engaged: RedditConversation[];
  onRemove: (id: number) => void;
}) {
  return (
    <div className="bg-white border border-[#4E30C6]/10 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 size={14} className="text-[#05D9A0]" />
        <h3 className="font-display text-sm font-semibold text-[#1a1f35]">
          Engagement History
        </h3>
        <span className="ml-auto text-xs text-[#9CA3AF] font-mono-custom">
          {engaged.length}
        </span>
      </div>
      {engaged.length === 0 ? (
        <p className="text-xs text-[#9CA3AF] text-center py-4">
          No engaged conversations yet
        </p>
      ) : (
        <div className="space-y-2">
          {engaged.map((conv) => (
            <div
              key={conv.id}
              className="flex items-start justify-between gap-2 p-2 rounded-lg bg-[#4E30C6]/3 border border-[#4E30C6]/8 hover:border-[#4E30C6]/20 transition-all group"
            >
              <div className="min-w-0 flex-1">
                <a
                  href={conv.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#374151] truncate font-medium hover:text-[#4E30C6] transition-colors block"
                >
                  {conv.title}
                </a>
                <p className="text-[10px] text-[#9CA3AF] font-mono-custom">
                  {conv.subreddit}
                </p>
              </div>
              <button
                onClick={() => onRemove(conv.id)}
                className="flex-shrink-0 p-1.5 rounded text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#4E30C6]/8 transition-colors"
                title="Remove from engagement history"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ArchiveSidebar({
  archived,
  onRestore,
}: {
  archived: RedditConversation[];
  onRestore: (id: number) => void;
}) {
  return (
    <div className="bg-white border border-[#4E30C6]/10 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Archive size={14} className="text-[#05D9A0]" />
        <h3 className="font-display text-sm font-semibold text-[#1a1f35]">
          Archived
        </h3>
        <span className="ml-auto text-xs text-[#9CA3AF] font-mono-custom">
          {archived.length}
        </span>
      </div>
      {archived.length === 0 ? (
        <p className="text-xs text-[#9CA3AF] text-center py-4">
          No archived conversations yet
        </p>
      ) : (
        <div className="space-y-2">
          {archived.map((conv) => (
            <div
              key={conv.id}
              className="flex items-start justify-between gap-2 p-2 rounded-lg bg-[#4E30C6]/3 border border-[#4E30C6]/8 hover:border-[#4E30C6]/20 transition-all group"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs text-[#374151] truncate font-medium">
                  {conv.title}
                </p>
                <p className="text-[10px] text-[#9CA3AF] font-mono-custom">
                  {conv.subreddit}
                </p>
              </div>
              <button
                onClick={() => onRestore(conv.id)}
                className="flex-shrink-0 p-1.5 rounded text-[#9CA3AF] hover:text-[#4E30C6] hover:bg-[#4E30C6]/8 transition-colors"
                title="Restore this conversation"
              >
                <RotateCcw size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddConversationForm({ onAdd }: { onAdd: (conv: RedditConversation) => void }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAdd = async () => {
    setError("");
    setSuccess(false);
    const trimmed = url.trim();
    if (!trimmed) { setError("Please paste a Reddit URL."); return; }
    const parsed = parseRedditUrl(trimmed);
    if (!parsed) { setError("Please paste a valid Reddit thread URL (reddit.com/r/.../comments/...)."); return; }
    setLoading(true);
    try {
      const post = await fetchRedditPost(parsed.subreddit, parsed.postId);
      onAdd(buildConversationFromPost(post, trimmed));
    } catch {
      onAdd(buildConversationFromUrl(trimmed, parsed));
    } finally {
      setLoading(false);
      setUrl("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="bg-white border border-[#4E30C6]/10 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-[#4E30C6]/10">
          <Plus size={14} className="text-[#4E30C6]" />
        </div>
        <h3 className="font-display text-sm font-semibold text-[#1a1f35]">Add a Conversation</h3>
        <span className="text-xs text-[#9CA3AF] ml-1">Paste a Reddit thread URL to generate a card</span>
      </div>
      <div className="flex gap-2">
        <input
          type="url"
          placeholder="https://www.reddit.com/r/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && handleAdd()}
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-[#4E30C6]/15 bg-[#F8F7FF] text-[#1a1f35] placeholder-[#9CA3AF] focus:outline-none focus:border-[#4E30C6]/40 focus:ring-1 focus:ring-[#4E30C6]/20 transition-colors"
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4E30C6] text-white text-sm font-medium hover:bg-[#3D25A8] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
          {loading ? "Fetching…" : "Add"}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      {success && <p className="text-emerald-600 text-xs mt-2">✓ Conversation added successfully!</p>}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Relevance");
  const [engaged, setEngaged] = useState<number[]>([]);
  const [archived, setArchived] = useState<number[]>([]);
  const [customConversations, setCustomConversations] = useState<RedditConversation[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedEngaged = localStorage.getItem("zigchain-engaged");
    const savedArchived = localStorage.getItem("zigchain-archived");
    const savedCustom = localStorage.getItem("zigchain-custom");
    if (savedEngaged) setEngaged(JSON.parse(savedEngaged));
    if (savedArchived) setArchived(JSON.parse(savedArchived));
    if (savedCustom) setCustomConversations(JSON.parse(savedCustom));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("zigchain-engaged", JSON.stringify(engaged));
  }, [engaged]);

  useEffect(() => {
    localStorage.setItem("zigchain-archived", JSON.stringify(archived));
  }, [archived]);

  useEffect(() => {
    localStorage.setItem("zigchain-custom", JSON.stringify(customConversations));
  }, [customConversations]);

  const allConversations = useMemo(
    () => [...conversations, ...customConversations],
    [customConversations]
  );

  const filtered = useMemo(() => {
    let result = allConversations.filter(
      (c) => !engaged.includes(c.id) && !archived.includes(c.id)
    );
    if (filter !== "All") {
      result = result.filter((c) => c.category === filter);
    }
    if (sortBy === "Freshness") {
      result.sort((a, b) => a.ageHours - b.ageHours);
    } else {
      result.sort((a, b) => b.relevanceScore - a.relevanceScore);
    }
    return result;
  }, [filter, sortBy, engaged, archived, allConversations]);

  const engagedConversations = useMemo(
    () => allConversations.filter((c) => engaged.includes(c.id)),
    [allConversations, engaged]
  );

  const archivedConversations = useMemo(
    () => allConversations.filter((c) => archived.includes(c.id)),
    [allConversations, archived]
  );

  const chartData = useMemo(() => {
    const counts = categories.map((cat) => ({
      name: cat,
      count: filtered.filter((c) => c.category === cat).length,
    }));
    return counts;
  }, [filtered]);

  const engagementData = useMemo(() => {
    const high = filtered.filter((c) => c.engagementPotential === "High").length;
    const moderate = filtered.filter((c) => c.engagementPotential === "Moderate").length;
    const medium = filtered.filter((c) => c.engagementPotential === "Medium").length;
    return [
      { name: "High", value: high, fill: "#05D9A0" },
      { name: "Moderate", value: moderate, fill: "#379C82" },
      { name: "Medium", value: medium, fill: "#4E30C6" },
    ];
  }, [filtered]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0EEFF] via-[#F8F7FF] to-[#EDFAF5]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#05D9A0]" />
            <span className="text-xs text-[#9CA3AF] font-mono-custom">Live Research</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-[#1a1f35]">
            ZIGChain Outreach Intelligence
          </h1>
        </div>

        {/* Summit Banner */}
        <SummitBanner />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <StatsBar filtered={filtered} engaged={engaged.length} />

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-[#4E30C6]/10 rounded-xl p-4 shadow-sm">
                <h3 className="font-display text-sm font-semibold text-[#1a1f35] mb-4">
                  Conversations by Category
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6B7280" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid rgba(78,48,198,0.15)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(78,48,198,0.08)",
                      }}
                      labelStyle={{ color: "#4E30C6" }}
                    />
                    <Bar dataKey="count" fill="#05D9A0" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-[#4E30C6]/10 rounded-xl p-4 shadow-sm">
                <h3 className="font-display text-sm font-semibold text-[#1a1f35] mb-4">
                  Engagement Potential Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid rgba(78,48,198,0.15)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(78,48,198,0.08)",
                      }}
                      labelStyle={{ color: "#4E30C6" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 text-xs mt-3">
                  {engagementData.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className="text-[#6B7280]">
                        {item.name} {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter & Sort */}
            <div className="space-y-3">
              <CategoryFilter active={filter} onChange={setFilter} />
              <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                <TrendingUp size={12} /> Sort by:
                {["Relevance", "Freshness"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={`px-2 py-1 rounded transition-colors ${
                      sortBy === option
                        ? "text-[#4E30C6] font-medium"
                        : "text-[#9CA3AF] hover:text-[#6B7280]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Conversation */}
            <AddConversationForm
              onAdd={(conv) => setCustomConversations((prev) => [conv, ...prev])}
            />

            {/* Conversations */}
            <div>
              <h2 className="font-display text-sm font-semibold text-[#374151] mb-4">
                {filtered.length} Conversations Remaining
              </h2>
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filtered.map((conv, i) => (
                    <ConversationCard
                      key={conv.id}
                      conv={conv}
                      index={i}
                      onToggleEngaged={(id) => {
                        setEngaged((prev) =>
                          prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
                        );
                      }}
                      onArchive={(id) => {
                        setArchived((prev) => [...prev, id]);
                      }}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Engagement History */}
            {engagedConversations.length > 0 && (
              <div className="border-t border-[#4E30C6]/10 pt-6">
                <h2 className="font-display text-sm font-semibold text-[#374151] mb-4">
                  Engagement History ({engagedConversations.length} completed)
                </h2>
                <div className="space-y-2">
                  {engagedConversations.map((conv) => (
                    <div
                      key={conv.id}
                      className="flex items-start justify-between gap-2 p-3 rounded-lg bg-white border border-[#4E30C6]/10 hover:border-[#4E30C6]/20 transition-all group shadow-sm"
                    >
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <CheckCircle2 size={14} className="text-[#05D9A0] mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <a
                            href={conv.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#374151] font-medium hover:text-[#4E30C6] transition-colors block truncate"
                          >
                            {conv.title}
                          </a>
                          <p className="text-[10px] text-[#9CA3AF] font-mono-custom">
                            {conv.subreddit}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setEngaged((prev) => prev.filter((x) => x !== conv.id))
                        }
                        className="flex-shrink-0 p-1.5 rounded text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#4E30C6]/8 transition-colors"
                        title="Remove from engagement history"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <div className="bg-white border border-[#4E30C6]/10 rounded-xl p-4 shadow-sm">
                <h3 className="font-display text-sm font-semibold text-[#1a1f35] mb-3">
                  Summit Themes
                </h3>
                <div className="space-y-2">
                  {summitInfo.themes.map((theme, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="font-mono-custom text-[#4E30C6] text-xs mt-0.5 flex-shrink-0">
                        0{i + 1}
                      </span>
                      <span className="text-xs text-[#4B5563] leading-relaxed">{theme}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#4E30C6]/10 rounded-xl p-4 shadow-sm">
                <h3 className="font-display text-sm font-semibold text-[#1a1f35] mb-3">
                  Key Speakers
                </h3>
                <div className="space-y-2.5">
                  {summitInfo.speakers.slice(0, 6).map((speaker) => (
                    <div key={speaker.name} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#4E30C6]/10 border border-[#4E30C6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[8px] font-bold text-[#4E30C6]">
                          {speaker.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-[#1a1f35]">{speaker.name}</div>
                        <div className="text-[10px] text-[#9CA3AF]">{speaker.role} · {speaker.org}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <ArchiveSidebar
                archived={archivedConversations}
                onRestore={(id) => {
                  setArchived((prev) => prev.filter((x) => x !== id));
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#4E30C6]/10 mt-12 py-6 text-center text-xs text-[#9CA3AF]">
        All conversations identified are less than 7 days old as of April 9, 2026. Reply
        suggestions are crafted to be contextually relevant and non-promotional in tone.
        Always review and personalize before posting.
      </div>
    </div>
  );
}
