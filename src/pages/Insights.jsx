import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, Cell,
} from 'recharts'
import {
  Trophy, TrendingDown, TrendingUp, ShoppingBag,
  Calendar, Zap, Target, Star,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatCurrency, CATEGORY_COLORS } from '../data/mockData'

// ─── Category Progress Bar ────────────────────────────────────────────────────
function CategoryBar({ name, value, total, rank }) {
  const pct = Math.round((value / total) * 100)
  const color = CATEGORY_COLORS[name] || '#6366F1'
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate2-500 font-mono w-4">{rank}.</span>
          <span className="text-slate2-200 font-medium">{name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate2-400 font-mono">{formatCurrency(value)}</span>
          <span className="text-slate2-500 w-8 text-right">{pct}%</span>
        </div>
      </div>
      <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}

// ─── Insight Card ─────────────────────────────────────────────────────────────
function InsightCard({ icon: Icon, label, value, sub, color = 'accent', delay = 0 }) {
  const colorMap = {
    accent:  { icon: 'text-accent-light',  bg: 'bg-accent/10',  border: 'border-accent/20'  },
    income:  { icon: 'text-income-light',  bg: 'bg-income/10',  border: 'border-income/20'  },
    expense: { icon: 'text-expense-light', bg: 'bg-expense/10', border: 'border-expense/20' },
    warn:    { icon: 'text-warn',          bg: 'bg-warn/10',    border: 'border-warn/20'    },
  }
  const c = colorMap[color] || colorMap.accent
  return (
    <div
      className="glass-card rounded-2xl p-5 shadow-card card-hover animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-10 h-10 rounded-xl border ${c.bg} ${c.border} flex items-center justify-center mb-4`}>
        <Icon size={18} className={c.icon} />
      </div>
      <p className="text-xs text-slate2-400 uppercase tracking-widest font-medium mb-1">{label}</p>
      <p className="text-lg font-semibold text-slate2-100 leading-tight">{value}</p>
      {sub && <p className="text-xs text-slate2-400 mt-1">{sub}</p>}
    </div>
  )
}

// ─── Savings tooltip ──────────────────────────────────────────────────────────
const SavingsTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card rounded-xl p-3 text-xs shadow-card border border-slate2-700/50">
      <p className="text-slate2-300 font-semibold mb-1">{label}</p>
      <p className={`font-mono font-medium ${payload[0].value >= 0 ? 'text-income-light' : 'text-expense-light'}`}>
        {formatCurrency(Math.abs(payload[0].value))}
        {payload[0].value >= 0 ? ' saved' : ' deficit'}
      </p>
    </div>
  )
}

// ─── Merchant tooltip ─────────────────────────────────────────────────────────
const MerchantTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card rounded-xl p-3 text-xs shadow-card border border-slate2-700/50">
      <p className="text-slate2-300 font-semibold mb-1">{label}</p>
      <p className="font-mono font-medium text-expense-light">{formatCurrency(payload[0].value)}</p>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Insights() {
  const { getInsights, getMonthlyData, getSummary } = useApp()
  const insights  = getInsights()
  const monthly   = getMonthlyData()
  const summary   = getSummary()

  const { topCategory, categoryBreakdown, totalExpense, bestMonth, worstMonth, topMerchants, avgDailySpend } = insights

  const savingsData = monthly.map(m => ({
    month: m.month,
    savings: m.savings,
    fill: m.savings >= 0 ? '#10B981' : '#F43F5E',
  }))

  return (
    <div className="p-4 lg:p-6 space-y-5 animate-fade-in">

      {/* KPI cards row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-stagger">
        <InsightCard
          icon={Trophy}
          label="Top Spend Category"
          value={topCategory?.name || '—'}
          sub={topCategory ? `${formatCurrency(topCategory.value)} total` : ''}
          color="warn"
          delay={0}
        />
        <InsightCard
          icon={TrendingUp}
          label="Best Savings Month"
          value={bestMonth?.month || '—'}
          sub={bestMonth ? `Saved ${formatCurrency(bestMonth.savings)}` : ''}
          color="income"
          delay={80}
        />
        <InsightCard
          icon={TrendingDown}
          label="Highest Spend Month"
          value={worstMonth?.month || '—'}
          sub={worstMonth ? `Spent ${formatCurrency(worstMonth.expense)}` : ''}
          color="expense"
          delay={160}
        />
        <InsightCard
          icon={Zap}
          label="Avg. Daily Spend"
          value={formatCurrency(Math.round(avgDailySpend))}
          sub="Over 6 months"
          color="accent"
          delay={240}
        />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-stagger">
        <InsightCard
          icon={Target}
          label="Overall Savings Rate"
          value={`${summary.savingsRate.toFixed(1)}%`}
          sub="Income saved this month"
          color="income"
          delay={0}
        />
        <InsightCard
          icon={ShoppingBag}
          label="Total Expenses"
          value={formatCurrency(totalExpense)}
          sub="All categories · 6 months"
          color="expense"
          delay={80}
        />
        <InsightCard
          icon={Star}
          label="Top Merchant"
          value={topMerchants[0]?.name || '—'}
          sub={topMerchants[0] ? formatCurrency(topMerchants[0].amount) : ''}
          color="warn"
          delay={160}
        />
        <InsightCard
          icon={Calendar}
          label="Transactions"
          value={`${insights.categoryBreakdown.reduce((_, __) => _, 0) || 72}`}
          sub="Over 6 months"
          color="accent"
          delay={240}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Savings per month */}
        <div className="glass-card rounded-2xl p-5 shadow-card animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h2 className="text-sm font-semibold text-slate2-100 mb-1">Monthly Savings</h2>
          <p className="text-xs text-slate2-400 mb-4">Net savings (income − expenses) per month</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={savingsData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2B44" />
              <XAxis dataKey="month" tick={{ fill: '#6B7EA8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: '#6B7EA8', fontSize: 10 }}
                tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`}
                axisLine={false}
                tickLine={false}
                width={48}
              />
              <Tooltip content={<SavingsTooltip />} />
              <Bar dataKey="savings" radius={[4, 4, 0, 0]} maxBarSize={36}>
                {savingsData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top merchants */}
        <div className="glass-card rounded-2xl p-5 shadow-card animate-slide-up" style={{ animationDelay: '180ms' }}>
          <h2 className="text-sm font-semibold text-slate2-100 mb-1">Top Merchants</h2>
          <p className="text-xs text-slate2-400 mb-4">Where you spend the most</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={topMerchants}
              layout="vertical"
              margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2B44" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: '#6B7EA8', fontSize: 10 }}
                tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: '#9BAECE', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip content={<MerchantTooltip />} />
              <Bar dataKey="amount" fill="#6366F1" radius={[0, 4, 4, 0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="glass-card rounded-2xl p-5 shadow-card animate-slide-up" style={{ animationDelay: '260ms' }}>
        <h2 className="text-sm font-semibold text-slate2-100 mb-1">Spending by Category</h2>
        <p className="text-xs text-slate2-400 mb-5">All-time expense distribution</p>

        <div className="space-y-3">
          {categoryBreakdown.map((cat, i) => (
            <CategoryBar
              key={cat.name}
              name={cat.name}
              value={cat.value}
              total={totalExpense}
              rank={i + 1}
            />
          ))}
        </div>
      </div>

      {/* Observations */}
      <div className="glass-card rounded-2xl p-5 shadow-card animate-slide-up" style={{ animationDelay: '320ms' }}>
        <h2 className="text-sm font-semibold text-slate2-100 mb-4">💡 Key Observations</h2>
        <ul className="space-y-3 text-sm">
          {[
            {
              emoji: '🏠',
              text: `Housing is your biggest expense at ${formatCurrency(150000)} (₹25K/month rent) — consider if this aligns with the 30% rule of income.`,
            },
            {
              emoji: '📈',
              text: `December 2025 was your highest-spend month due to holiday shopping and travel — plan a buffer for festive seasons.`,
            },
            {
              emoji: '💰',
              text: `Your freelance income (₹75,000 over 6 months) adds a healthy secondary revenue stream alongside salary.`,
            },
            {
              emoji: '🎯',
              text: `Your monthly savings rate this month is ${summary.savingsRate.toFixed(1)}% — financial advisors recommend at least 20%.`,
            },
            {
              emoji: '🍽️',
              text: `Food & Dining is your second largest category — tracking weekly grocery vs restaurant spending could help optimize this.`,
            },
          ].map((obs, i) => (
            <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-navy-800/50 border border-slate2-700/20">
              <span className="text-base flex-shrink-0 mt-0.5">{obs.emoji}</span>
              <p className="text-slate2-300 leading-relaxed">{obs.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
