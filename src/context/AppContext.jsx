import { createContext, useContext, useReducer, useEffect } from 'react'
import { INITIAL_TRANSACTIONS } from '../data/mockData'

// ─── Initial State ───────────────────────────────────────────────────────────
const initialState = {
  transactions: INITIAL_TRANSACTIONS,
  role: 'admin',        // 'admin' | 'viewer'
  darkMode: true,
  sidebarOpen: true,
  filters: {
    search: '',
    category: 'all',
    type: 'all',
    dateRange: 'all',
    sortBy: 'date-desc',
  },
}

// ─── Reducer ─────────────────────────────────────────────────────────────────
function appReducer(state, action) {
  switch (action.type) {

    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload }

    case 'ADD_TRANSACTION': {
      const updated = [action.payload, ...state.transactions]
      return { ...state, transactions: updated }
    }

    case 'EDIT_TRANSACTION': {
      const updated = state.transactions.map(txn =>
        txn.id === action.payload.id ? action.payload : txn
      )
      return { ...state, transactions: updated }
    }

    case 'DELETE_TRANSACTION': {
      const updated = state.transactions.filter(txn => txn.id !== action.payload)
      return { ...state, transactions: updated }
    }

    case 'SET_ROLE':
      return { ...state, role: action.payload }

    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode }

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.value },
      }

    case 'RESET_FILTERS':
      return {
        ...state,
        filters: { ...initialState.filters },
      }

    default:
      return state
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
const AppContext = createContext(null)

// ─── Provider ────────────────────────────────────────────────────────────────
export function AppProvider({ children }) {
  // Load persisted state from localStorage
  const getInitialState = () => {
    try {
      const saved = localStorage.getItem('finflow_state')
      if (saved) {
        const parsed = JSON.parse(saved)
        return { ...initialState, ...parsed }
      }
    } catch (e) {
      // ignore parse errors
    }
    return initialState
  }

  const [state, dispatch] = useReducer(appReducer, undefined, getInitialState)

  // Persist to localStorage on state change
  useEffect(() => {
    const toSave = {
      transactions: state.transactions,
      role: state.role,
      darkMode: state.darkMode,
    }
    localStorage.setItem('finflow_state', JSON.stringify(toSave))
  }, [state.transactions, state.role, state.darkMode])

  // Apply dark mode class on html element
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [state.darkMode])

  // ─── Action Creators ──────────────────────────────────────────────────────
  const addTransaction = (txn) => dispatch({ type: 'ADD_TRANSACTION', payload: txn })
  const editTransaction = (txn) => dispatch({ type: 'EDIT_TRANSACTION', payload: txn })
  const deleteTransaction = (id) => dispatch({ type: 'DELETE_TRANSACTION', payload: id })
  const setRole = (role) => dispatch({ type: 'SET_ROLE', payload: role })
  const toggleDarkMode = () => dispatch({ type: 'TOGGLE_DARK_MODE' })
  const toggleSidebar = () => dispatch({ type: 'TOGGLE_SIDEBAR' })
  const setFilter = (key, value) => dispatch({ type: 'SET_FILTER', key, value })
  const resetFilters = () => dispatch({ type: 'RESET_FILTERS' })
  const resetData = () => dispatch({ type: 'SET_TRANSACTIONS', payload: INITIAL_TRANSACTIONS })

  // ─── Derived / Computed Values ─────────────────────────────────────────────
  const getFilteredTransactions = () => {
    let result = [...state.transactions]
    const { search, category, type, dateRange, sortBy } = state.filters

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        t =>
          t.description.toLowerCase().includes(q) ||
          t.merchant.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      )
    }

    // Type filter
    if (type !== 'all') result = result.filter(t => t.type === type)

    // Category filter
    if (category !== 'all') result = result.filter(t => t.category === category)

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date('2026-04-01')
      let cutoff = new Date(now)
      if (dateRange === 'this-month') cutoff = new Date('2026-03-01')
      else if (dateRange === 'last-month') {
        result = result.filter(t => t.date.startsWith('2026-02') || t.date.startsWith('2026-03'))
      }
      else if (dateRange === 'last-3-months') cutoff = new Date('2026-01-01')
      else if (dateRange === 'last-6-months') cutoff = new Date('2025-10-01')

      if (dateRange === 'this-month') {
        result = result.filter(t => new Date(t.date) >= cutoff)
      } else if (dateRange !== 'last-month') {
        result = result.filter(t => new Date(t.date) >= cutoff)
      }
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date)
      if (sortBy === 'date-asc')  return new Date(a.date) - new Date(b.date)
      if (sortBy === 'amount-desc') return b.amount - a.amount
      if (sortBy === 'amount-asc')  return a.amount - b.amount
      return 0
    })

    return result
  }

  const getSummary = () => {
    const all = state.transactions
    const totalIncome  = all.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const totalExpense = all.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    const balance      = totalIncome - totalExpense

    // Current month (March 2026)
    const thisMonth = all.filter(t => t.date.startsWith('2026-03'))
    const monthIncome  = thisMonth.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const monthExpense = thisMonth.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)

    // Previous month
    const lastMonth = all.filter(t => t.date.startsWith('2026-02'))
    const lastMonthExpense = lastMonth.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)

    const expenseChange = lastMonthExpense
      ? ((monthExpense - lastMonthExpense) / lastMonthExpense) * 100
      : 0

    const savingsRate = monthIncome > 0
      ? ((monthIncome - monthExpense) / monthIncome) * 100
      : 0

    return { balance, totalIncome, totalExpense, monthIncome, monthExpense, expenseChange, savingsRate }
  }

  const getMonthlyData = () => {
    const months = ['2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03']
    const labels = { '2025-10': 'Oct', '2025-11': 'Nov', '2025-12': 'Dec', '2026-01': 'Jan', '2026-02': 'Feb', '2026-03': 'Mar' }

    let runningBalance = 0

    return months.map(month => {
      const monthTxns = state.transactions.filter(t => t.date.startsWith(month))
      const income  = monthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
      const expense = monthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
      runningBalance += income - expense
      return {
        month: labels[month],
        income,
        expense,
        balance: runningBalance,
        savings: income - expense,
      }
    })
  }

  const getCategoryBreakdown = () => {
    const expenses = state.transactions.filter(t => t.type === 'expense')
    const breakdown = {}
    expenses.forEach(t => {
      breakdown[t.category] = (breakdown[t.category] || 0) + t.amount
    })
    return Object.entries(breakdown)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }

  const getInsights = () => {
    const monthly = getMonthlyData()
    const categoryBreakdown = getCategoryBreakdown()
    const topCategory = categoryBreakdown[0] || null
    const totalExpense = categoryBreakdown.reduce((s, c) => s + c.value, 0)

    const bestMonth = [...monthly].sort((a, b) => b.savings - a.savings)[0]
    const worstMonth = [...monthly].sort((a, b) => a.savings - b.savings)[0]

    // Top merchants by expense
    const merchantMap = {}
    state.transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        merchantMap[t.merchant] = (merchantMap[t.merchant] || 0) + t.amount
      })
    const topMerchants = Object.entries(merchantMap)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)

    // Average daily spend (total expense / ~180 days)
    const avgDailySpend = totalExpense / 180

    return { topCategory, categoryBreakdown, totalExpense, bestMonth, worstMonth, topMerchants, avgDailySpend }
  }

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        addTransaction,
        editTransaction,
        deleteTransaction,
        setRole,
        toggleDarkMode,
        toggleSidebar,
        setFilter,
        resetFilters,
        resetData,
        getFilteredTransactions,
        getSummary,
        getMonthlyData,
        getCategoryBreakdown,
        getInsights,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
