import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatCurrency } from '../data/mockData'
import SummaryCard from '../components/dashboard/SummaryCard'
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart'
import SpendingChart from '../components/dashboard/SpendingChart'

export default function Dashboard() {
  const { getSummary, state } = useApp()
  const summary = getSummary()
  const { role } = state

  const cards = [
    {
      title: 'Total Balance',
      value: formatCurrency(summary.balance),
      subtitle: 'Cumulative net balance',
      icon: Wallet,
      variant: 'default',
    },
    {
      title: 'Monthly Income',
      value: formatCurrency(summary.monthIncome),
      subtitle: 'March 2026',
      icon: TrendingUp,
      variant: 'income',
    },
    {
      title: 'Monthly Expenses',
      value: formatCurrency(summary.monthExpense),
      subtitle: 'March 2026',
      icon: TrendingDown,
      variant: 'expense',
      change: summary.expenseChange,
    },
    {
      title: 'Savings Rate',
      value: `${summary.savingsRate.toFixed(1)}%`,
      subtitle: 'Of income saved this month',
      icon: PiggyBank,
      variant: 'warn',
    },
  ]

  return (
    <div className="p-4 lg:p-6 space-y-5 animate-fade-in">
      {/* Role banner */}
      {role === 'viewer' && (
        <div className="glass-card rounded-xl px-4 py-2.5 border-l-2 border-warn text-xs text-warn flex items-center gap-2">
          <span>👁️</span>
          <span>Viewer mode — you can browse data but cannot add or edit transactions.</span>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-stagger">
        {cards.map((card, i) => (
          <SummaryCard key={card.title} {...card} index={i} />
        ))}
      </div>

      {/* Balance trend */}
      <div className="animate-slide-up" style={{ animationDelay: '120ms' }}>
        <BalanceTrendChart />
      </div>

      {/* Spending charts */}
      <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
        <SpendingChart />
      </div>

      {/* Recent transactions quick view */}
      <RecentActivity />
    </div>
  )
}

function RecentActivity() {
  const { getFilteredTransactions } = useApp()
  const recent = getFilteredTransactions().slice(0, 5)
  const { formatCurrency: fmt } = { formatCurrency }

  return (
    <div className="glass-card rounded-2xl p-5 shadow-card animate-slide-up" style={{ animationDelay: '280ms' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate2-100">Recent Activity</h2>
        <a href="/Transactions.jsx" className="text-xs text-accent-light hover:text-accent transition-colors">
          View all →
        </a>
      </div>

      {recent.length === 0 ? (
        <p className="text-slate2-500 text-sm text-center py-4">No transactions yet</p>
      ) : (
        <ul className="space-y-2">
          {recent.map(txn => (
            <li key={txn.id} className="flex items-center justify-between py-2 border-b border-slate2-700/20 last:border-0">
              <div>
                <p className="text-sm text-slate2-200 font-medium">{txn.description}</p>
                <p className="text-xs text-slate2-500 mt-0.5">{txn.merchant} · {txn.category}</p>
              </div>
              <span className={`font-mono text-sm font-semibold ${txn.type === 'income' ? 'text-income-light' : 'text-expense-light'}`}>
                {txn.type === 'income' ? '+' : '−'}{formatCurrency(txn.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
