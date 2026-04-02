import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { useApp } from '../../context/AppContext'
import { formatCurrency } from '../../data/mockData'

// Custom tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card rounded-xl p-3 text-xs shadow-card border border-slate2-700/50">
      <p className="text-slate2-300 font-semibold mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate2-400 capitalize">{p.name}:</span>
          <span className="text-slate2-100 font-medium font-mono">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function BalanceTrendChart() {
  const { getMonthlyData } = useApp()
  const data = getMonthlyData()

  const formatYAxis = (val) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(0)}L`
    if (val >= 1000)   return `₹${(val / 1000).toFixed(0)}K`
    return `₹${val}`
  }

  return (
    <div className="glass-card rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-slate2-100">Balance Trend</h2>
          <p className="text-xs text-slate2-400 mt-0.5">Oct 2025 — Mar 2026</p>
        </div>
        <div className="flex gap-4 text-xs text-slate2-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-income rounded-full inline-block" />
            Income
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-expense rounded-full inline-block" />
            Expense
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-accent rounded-full inline-block" />
            Balance
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#10B981" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#F43F5E" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2B44" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#6B7EA8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fill: '#6B7EA8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={52}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            name="income"
            stroke="#10B981"
            strokeWidth={2}
            fill="url(#incomeGrad)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="expense"
            name="expense"
            stroke="#F43F5E"
            strokeWidth={2}
            fill="url(#expenseGrad)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="balance"
            name="balance"
            stroke="#6366F1"
            strokeWidth={2.5}
            fill="url(#balanceGrad)"
            dot={{ r: 4, fill: '#6366F1', strokeWidth: 2, stroke: '#0C1530' }}
            activeDot={{ r: 6, fill: '#818CF8', strokeWidth: 2, stroke: '#0C1530' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
