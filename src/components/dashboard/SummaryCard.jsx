import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

/**
 * SummaryCard
 * Props: title, value, subtitle, icon, variant ('default'|'income'|'expense'|'warn'), change (number)
 */
export default function SummaryCard({ title, value, subtitle, icon: Icon, variant = 'default', change, index = 0 }) {
  const variantStyles = {
    default: {
      iconBg: 'bg-accent/10 border-accent/20',
      iconColor: 'text-accent-light',
      border: 'border-slate2-700/30',
      glow: '',
    },
    income: {
      iconBg: 'bg-income/10 border-income/20',
      iconColor: 'text-income-light',
      border: 'border-income/10',
      glow: 'shadow-income',
    },
    expense: {
      iconBg: 'bg-expense/10 border-expense/20',
      iconColor: 'text-expense-light',
      border: 'border-expense/10',
      glow: 'shadow-expense',
    },
    warn: {
      iconBg: 'bg-warn/10 border-warn/20',
      iconColor: 'text-warn',
      border: 'border-warn/10',
      glow: '',
    },
  }

  const s = variantStyles[variant]

  const ChangeIcon = change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus
  const changeColor = variant === 'expense'
    ? (change > 0 ? 'text-expense-light' : 'text-income-light')
    : (change > 0 ? 'text-income-light' : 'text-expense-light')

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-5
        glass-card ${s.border}
        card-hover shadow-card
        animate-stagger
      `}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Background gradient blob */}
      <div
        className={`
          absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 blur-2xl
          ${variant === 'income' ? 'bg-income' : variant === 'expense' ? 'bg-expense' : variant === 'warn' ? 'bg-warn' : 'bg-accent'}
        `}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${s.iconBg}`}>
            <Icon size={18} className={s.iconColor} />
          </div>

          {typeof change === 'number' && (
            <div className={`flex items-center gap-1 text-xs font-medium ${changeColor}`}>
              <ChangeIcon size={12} />
              <span>{Math.abs(change).toFixed(1)}%</span>
            </div>
          )}
        </div>

        <p className="text-xs text-slate2-400 uppercase tracking-widest mb-1 font-medium">{title}</p>

        <p className="font-mono text-xl font-semibold text-slate2-100 num-animate leading-tight">
          {value}
        </p>

        {subtitle && (
          <p className="text-xs text-slate2-400 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
