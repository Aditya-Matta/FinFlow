import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import { useApp } from '../../context/AppContext'
import { CATEGORY_COLORS, formatCurrency } from '../../data/mockData'

// ─── Donut Tooltip ────────────────────────────────────────────────────────────
const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div className="glass-card rounded-xl p-3 text-xs shadow-card border border-slate2-700/50">
      <p className="text-slate2-100 font-semibold">{name}</p>
      <p className="text-slate2-300 font-mono mt-1">{formatCurrency(value)}</p>
    </div>
  )
}

// ─── Custom donut label ───────────────────────────────────────────────────────
const RADIAN = Math.PI / 180
const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.06) return null
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fill="white" fontSize={10} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

// ─── Bar Tooltip ──────────────────────────────────────────────────────────────
const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card rounded-xl p-3 text-xs shadow-card border border-slate2-700/50">
      <p className="text-slate2-300 font-semibold mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
          <span className="text-slate2-400 capitalize">{p.name}:</span>
          <span className="text-slate2-100 font-medium font-mono">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function SpendingChart() {
  const { getCategoryBreakdown, getMonthlyData } = useApp()
  const categories = getCategoryBreakdown().slice(0, 7) // top 7
  const monthly = getMonthlyData()

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {/* Donut — Spending Breakdown */}
      <div className="glass-card rounded-2xl p-5 shadow-card">
        <h2 className="text-sm font-semibold text-slate2-100 mb-1">Spending Breakdown</h2>
        <p className="text-xs text-slate2-400 mb-4">By category (all time)</p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Chart */}
          <div className="flex-shrink-0">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                  label={<CustomLabel />}
                >
                  {categories.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={CATEGORY_COLORS[entry.name] || '#6366F1'}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <ul className="flex-1 space-y-2 text-xs min-w-0">
            {categories.map(cat => {
              const total = categories.reduce((s, c) => s + c.value, 0)
              const pct = ((cat.value / total) * 100).toFixed(1)
              return (
                <li key={cat.name} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                    style={{ background: CATEGORY_COLORS[cat.name] || '#6366F1' }}
                  />
                  <span className="text-slate2-300 truncate flex-1">{cat.name}</span>
                  <span className="text-slate2-400 font-mono">{pct}%</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Bar — Monthly Income vs Expense */}
      <div className="glass-card rounded-2xl p-5 shadow-card">
        <h2 className="text-sm font-semibold text-slate2-100 mb-1">Monthly Comparison</h2>
        <p className="text-xs text-slate2-400 mb-4">Income vs Expenses</p>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthly} barGap={4} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2B44" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#6B7EA8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#6B7EA8', fontSize: 10 }}
              tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`}
              axisLine={false}
              tickLine={false}
              width={44}
            />
            <Tooltip content={<BarTooltip />} />
            <Bar dataKey="income"  name="income"  fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={28} />
            <Bar dataKey="expense" name="expense" fill="#F43F5E" radius={[4, 4, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
