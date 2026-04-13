/**
 * ZIGChain Summit 2026 — Reddit Outreach Intelligence Dashboard
 * Design: "Onchain Intelligence Brief"
 * - Gradient background (Violet → Emerald), premium typography
 * - Playfair Display headings, DM Sans body, DM Mono for data
 * - Asymmetric layout: left sidebar + main content area
 * - Interactive: filter by category, expand replies, copy to clipboard, track engaged conversations
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
  Users,
  Zap,
  Filter,
  TrendingUp,
  Clock,
  MessageSquare,
  CheckCircle2,
  Circle,
  Archive,
  RotateCcw,
} from "lucide-react";

// ─── Sub-components ──────────────────────────────────────────────────────────

function SummitBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#05D9A0]/20 bg-gradient-to-br from-[#1a1f35] via-[#0f1629] to-[#0a0e1a] p-6 md:p-8 mb-8">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
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
              className="text-center p-3 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="font-display text-xl font-bold text-[#05D9A0]">
                {stat.value}
              </div>
              <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatsBar({ filtered, engaged }: { filtered: RedditConversation[]; engaged: number }) {
  const highCount = filtered.filter((c) => c.engagementPotential === "High").length;
  const avgRelevance = filtered.length
    ? Math.round(filtered.reduce((s, c) => s + c.relevanceScore, 0) / filtered.length * 10) / 10
    : 0;
  const freshCount = filtered.filter((c) => c.ageHours <= 24).length;

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
          className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3"
        >
          <div className="p-2 rounded-lg bg-[#05D9A0]/15 text-[#05D9A0]">
            {s.icon}
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-white">{s.value}</div>
            <div className="text-xs text-white/50">{s.label}</div>
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
      <span className="flex items-center gap-1.5 text-xs text-white/40 mr-1">
        <Filter size={12} /> Filter:
      </span>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
            active === cat
              ? "bg-[#05D9A0] text-[#0a0e1a] border-[#05D9A0]"
              : "bg-white/5 text-white/60 border-white/15 hover:border-white/30 hover:text-white/80"
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
                : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-white/40 font-mono-custom">{score}/10</span>
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
      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#05D9A0]/30 transition-all duration-300 group"
    >
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <button
            onClick={() => onToggleEngaged(conv.id)}
            className="flex-shrink-0 mt-0.5 text-white/40 hover:text-[#05D9A0] transition-colors"
            title="Mark as engaged"
          >
            <Circle size={18} />
          </button>
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <span className="font-mono-custom text-xs text-[#05D9A0] font-medium">
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
          </div>
          <span className="text-xs text-white/35 whitespace-nowrap font-mono-custom flex-shrink-0">
            {conv.age}
          </span>
        </div>

        <h3 className="font-display text-base font-semibold text-white/90 leading-snug mb-3 group-hover:text-white transition-colors">
          {conv.title}
        </h3>

        <div className="flex items-center justify-between">
          <RelevanceBar score={conv.relevanceScore} />
          <a
            href={conv.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-white/35 hover:text-[#05D9A0] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={12} />
            View Thread
          </a>
        </div>
      </div>

      {/* Context & Opportunity */}
      <div className="px-5 pb-4">
        <div className="bg-white/3 border border-white/8 rounded-lg p-3 mb-3">
          <p className="text-xs text-white/55 leading-relaxed">
            <span className="text-white/35 uppercase tracking-wide text-[10px] font-mono-custom block mb-1">
              Thread Context
            </span>
            {conv.context}
          </p>
        </div>

        <div className="bg-white/3 border border-white/8 rounded-lg p-3 mb-3">
          <p className="text-xs text-white/55 leading-relaxed">
            <span className="text-white/35 uppercase tracking-wide text-[10px] font-mono-custom block mb-1">
              Outreach Opportunity
            </span>
            {conv.opportunity}
          </p>
        </div>

        {/* Suggested Reply Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#4E30C6]/20 border border-[#4E30C6]/40 text-[#05D9A0] text-xs font-medium hover:bg-[#4E30C6]/30 transition-colors mb-3"
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
              className="bg-white/3 border border-white/8 rounded-lg p-3 mb-3 overflow-hidden"
            >
              <p className="text-xs text-white/70 leading-relaxed font-mono-custom mb-3 whitespace-pre-wrap">
                {conv.suggestedReply}
              </p>
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#05D9A0]/20 border border-[#05D9A0]/40 text-[#05D9A0] text-xs font-medium hover:bg-[#05D9A0]/30 transition-colors"
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
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 text-xs font-medium hover:border-white/20 hover:text-white/70 transition-colors"
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
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 size={14} className="text-[#05D9A0]" />
        <h3 className="font-display text-sm font-semibold text-white/80">
          Engagement History
        </h3>
        <span className="ml-auto text-xs text-white/40 font-mono-custom">
          {engaged.length}
        </span>
      </div>
      {engaged.length === 0 ? (
        <p className="text-xs text-white/40 text-center py-4">
          No engaged conversations yet
        </p>
      ) : (
        <div className="space-y-2">
          {engaged.map((conv) => (
            <div
              key={conv.id}
              className="flex items-start justify-between gap-2 p-2 rounded-lg bg-white/3 border border-white/8 hover:border-white/15 transition-all group"
            >
              <div className="min-w-0 flex-1">
                <a
                  href={conv.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/70 truncate font-medium hover:text-[#05D9A0] transition-colors block"
                >
                  {conv.title}
                </a>
                <p className="text-[10px] text-white/40 font-mono-custom">
                  {conv.subreddit}
                </p>
              </div>
              <button
                onClick={() => onRemove(conv.id)}
                className="flex-shrink-0 p-1.5 rounded text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors"
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
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Archive size={14} className="text-[#05D9A0]" />
        <h3 className="font-display text-sm font-semibold text-white/80">
          Archived
        </h3>
        <span className="ml-auto text-xs text-white/40 font-mono-custom">
          {archived.length}
        </span>
      </div>
      {archived.length === 0 ? (
        <p className="text-xs text-white/40 text-center py-4">
          No archived conversations yet
        </p>
      ) : (
        <div className="space-y-2">
          {archived.map((conv) => (
            <div
              key={conv.id}
              className="flex items-start justify-between gap-2 p-2 rounded-lg bg-white/3 border border-white/8 hover:border-white/15 transition-all group"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs text-white/70 truncate font-medium">
                  {conv.title}
                </p>
                <p className="text-[10px] text-white/40 font-mono-custom">
                  {conv.subreddit}
                </p>
              </div>
              <button
                onClick={() => onRestore(conv.id)}
                className="flex-shrink-0 p-1.5 rounded text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors"
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

function SummitThemesSidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h3 className="font-display text-sm font-semibold text-white/80 mb-3">
          Summit Themes
        </h3>
        <div className="space-y-2">
          {summitInfo.themes.map((theme, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="font-mono-custom text-[#05D9A0] text-xs mt-0.5 flex-shrink-0">
                0{i + 1}
              </span>
              <span className="text-xs text-white/60 leading-relaxed">{theme}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h3 className="font-display text-sm font-semibold text-white/80 mb-3">
          Key Speakers
        </h3>
        <div className="space-y-2.5">
          {summitInfo.speakers.slice(0, 6).map((speaker) => (
            <div key={speaker.name} className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-[#05D9A0]/20 border border-[#05D9A0]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[8px] font-bold text-[#05D9A0]">
                  {speaker.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="text-xs font-medium text-white/80">{speaker.name}</div>
                <div className="text-[10px] text-white/40">{speaker.role} · {speaker.org}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ArchiveSidebar archived={[]} onRestore={() => {}} />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Relevance");
  const [engaged, setEngaged] = useState<number[]>([]);
  const [archived, setArchived] = useState<number[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedEngaged = localStorage.getItem("zigchain-engaged");
    const savedArchived = localStorage.getItem("zigchain-archived");
    if (savedEngaged) setEngaged(JSON.parse(savedEngaged));
    if (savedArchived) setArchived(JSON.parse(savedArchived));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("zigchain-engaged", JSON.stringify(engaged));
  }, [engaged]);

  useEffect(() => {
    localStorage.setItem("zigchain-archived", JSON.stringify(archived));
  }, [archived]);

  const filtered = useMemo(() => {
    let result = conversations.filter(
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
  }, [filter, sortBy, engaged, archived]);

  const engagedConversations = useMemo(
    () => conversations.filter((c) => engaged.includes(c.id)),
    [engaged]
  );

  const archivedConversations = useMemo(
    () => conversations.filter((c) => archived.includes(c.id)),
    [archived]
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
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#1a1f35] to-[#0f1629]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#05D9A0]" />
            <span className="text-xs text-white/40 font-mono-custom">Live Research</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white">
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
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-display text-sm font-semibold text-white/80 mb-4">
                  Conversations by Category
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#ffffff99" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#ffffff99" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1f35",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#05D9A0" }}
                    />
                    <Bar dataKey="count" fill="#05D9A0" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-display text-sm font-semibold text-white/80 mb-4">
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
                        backgroundColor: "#1a1f35",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#05D9A0" }}
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
                      <span className="text-white/60">
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
              <div className="flex items-center gap-2 text-xs text-white/40">
                <TrendingUp size={12} /> Sort by:
                {["Relevance", "Freshness"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={`px-2 py-1 rounded transition-colors ${
                      sortBy === option
                        ? "text-[#05D9A0] font-medium"
                        : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversations */}
            <div>
              <h2 className="font-display text-sm font-semibold text-white/80 mb-4">
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
              <div className="border-t border-white/10 pt-6">
                <h2 className="font-display text-sm font-semibold text-white/80 mb-4">
                  Engagement History ({engagedConversations.length} completed)
                </h2>
                <div className="space-y-2">
                  {engagedConversations.map((conv) => (
                    <div
                      key={conv.id}
                      className="flex items-start justify-between gap-2 p-3 rounded-lg bg-white/3 border border-white/8 hover:border-white/15 transition-all group"
                    >
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <CheckCircle2 size={14} className="text-[#05D9A0] mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <a
                            href={conv.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-white/70 font-medium hover:text-[#05D9A0] transition-colors block truncate"
                          >
                            {conv.title}
                          </a>
                          <p className="text-[10px] text-white/40 font-mono-custom">
                            {conv.subreddit}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setEngaged((prev) => prev.filter((x) => x !== conv.id))
                        }
                        className="flex-shrink-0 p-1.5 rounded text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors"
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
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-display text-sm font-semibold text-white/80 mb-3">
                  Summit Themes
                </h3>
                <div className="space-y-2">
                  {summitInfo.themes.map((theme, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="font-mono-custom text-[#05D9A0] text-xs mt-0.5 flex-shrink-0">
                        0{i + 1}
                      </span>
                      <span className="text-xs text-white/60 leading-relaxed">{theme}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-display text-sm font-semibold text-white/80 mb-3">
                  Key Speakers
                </h3>
                <div className="space-y-2.5">
                  {summitInfo.speakers.slice(0, 6).map((speaker) => (
                    <div key={speaker.name} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#05D9A0]/20 border border-[#05D9A0]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[8px] font-bold text-[#05D9A0]">
                          {speaker.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white/80">{speaker.name}</div>
                        <div className="text-[10px] text-white/40">{speaker.role} · {speaker.org}</div>
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
      <div className="border-t border-white/10 mt-12 py-6 text-center text-xs text-white/40">
        All conversations identified are less than 7 days old as of April 9, 2026. Reply
        suggestions are crafted to be contextually relevant and non-promotional in tone.
        Always review and personalize before posting.
      </div>
    </div>
  );
}
