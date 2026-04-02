import { useState } from 'react'
import { Plus, Download } from 'lucide-react'
import { useApp } from '../context/AppContext'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionTable from '../components/transactions/TransactionTable'
import TransactionModal from '../components/transactions/TransactionModal'
import { formatCurrency } from '../data/mockData'

export default function Transactions() {
  const { state, getFilteredTransactions } = useApp()
  const { role } = state

  const [modalOpen, setModalOpen] = useState(false)
  const [editingTxn, setEditingTxn] = useState(null)

  const filtered = getFilteredTransactions()
  const totalIncome  = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExpense = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)

  const openAdd  = () => { setEditingTxn(null); setModalOpen(true) }
  const openEdit = (txn) => { setEditingTxn(txn); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditingTxn(null) }

  // Export as CSV
  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Merchant', 'Category', 'Type', 'Amount']
    const rows = filtered.map(t => [t.date, t.description, t.merchant, t.category, t.type, t.amount])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transactions.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 lg:p-6 space-y-4 animate-fade-in">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate2-400 mt-0.5">
            <span className="text-slate2-200 font-medium">{filtered.length}</span> transactions found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate2-700/40 text-xs text-slate2-400 hover:text-slate2-200 hover:bg-navy-700 transition-all"
          >
            <Download size={13} />
            Export CSV
          </button>
          {role === 'admin' && (
            <button
              onClick={openAdd}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent hover:bg-accent-dark text-white text-sm font-medium transition-all shadow-accent"
            >
              <Plus size={15} />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters />

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Income', value: formatCurrency(totalIncome), color: 'text-income-light' },
          { label: 'Total Expenses', value: formatCurrency(totalExpense), color: 'text-expense-light' },
          { label: 'Net', value: formatCurrency(totalIncome - totalExpense), color: totalIncome >= totalExpense ? 'text-income-light' : 'text-expense-light' },
        ].map(item => (
          <div key={item.label} className="glass-card rounded-xl px-4 py-3 shadow-card text-center">
            <p className="text-xs text-slate2-400 mb-1">{item.label}</p>
            <p className={`font-mono font-semibold text-sm ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <TransactionTable onEdit={openEdit} />

      {/* Modal */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={closeModal}
        transaction={editingTxn}
      />
    </div>
  )
}
