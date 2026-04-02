import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../data/mockData'

const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]

export default function TransactionFilters() {
  const { state, setFilter, resetFilters } = useApp()
  const { filters } = state

  const hasActiveFilters =
    filters.search ||
    filters.category !== 'all' ||
    filters.type !== 'all' ||
    filters.dateRange !== 'all' ||
    filters.sortBy !== 'date-desc'

  return (
    <div className="glass-card rounded-2xl p-10 shadow-card">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate2-500" />
          <input
            className="form-input !pl-10"
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={e => setFilter('search', e.target.value)}
          />
        </div>

        {/* Type */}
        <select
          value={filters.type}
          onChange={e => setFilter('type', e.target.value)}
          className="form-input w-auto min-w-[110px]"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category */}
        <select
          value={filters.category}
          onChange={e => setFilter('category', e.target.value)}
          className="form-input w-auto min-w-[140px]"
        >
          <option value="all">All Categories</option>
          {ALL_CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Date Range */}
        <select
          value={filters.dateRange}
          onChange={e => setFilter('dateRange', e.target.value)}
          className="form-input w-auto min-w-[140px]"
        >
          <option value="all">All Time</option>
          <option value="this-month">This Month</option>
          <option value="last-month">Last 2 Months</option>
          <option value="last-3-months">Last 3 Months</option>
          <option value="last-6-months">Last 6 Months</option>
        </select>

        {/* Sort */}
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal size={14} className="text-slate2-400" />
          <select
            value={filters.sortBy}
            onChange={e => setFilter('sortBy', e.target.value)}
            className="form-input w-auto min-w-[140px]"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-xs text-expense-light hover:text-expense px-3 py-2 rounded-xl hover:bg-expense/10 border border-expense/20 transition-all"
          >
            <X size={12} />
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
