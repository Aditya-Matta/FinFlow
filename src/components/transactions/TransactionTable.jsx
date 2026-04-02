import { useState } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatCurrency, CATEGORY_COLORS } from '../../data/mockData'

const PAGE_SIZE = 10

export default function TransactionTable({ onEdit }) {
  const { state, getFilteredTransactions, deleteTransaction } = useApp()
  const { role } = state

  const [page, setPage] = useState(1)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const allFiltered = getFilteredTransactions()
  const totalPages = Math.ceil(allFiltered.length / PAGE_SIZE)
  const transactions = allFiltered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleDelete = (id) => {
    if (deleteConfirm === id) {
      deleteTransaction(id)
      setDeleteConfirm(null)
      // If last item on page, go back
      if (transactions.length === 1 && page > 1) setPage(page - 1)
    } else {
      setDeleteConfirm(id)
    }
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: '2-digit',
    })
  }

  if (allFiltered.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 shadow-card text-center">
        <div className="w-16 h-16 rounded-2xl bg-navy-700 flex items-center justify-center mx-auto mb-4">
          <ArrowUpRight size={28} className="text-slate2-500" />
        </div>
        <p className="text-slate2-300 font-medium">No transactions found</p>
        <p className="text-slate2-500 text-sm mt-1">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-2xl shadow-card overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate2-700/30">
              <th className="text-left px-5 py-3.5 text-xs text-slate2-400 font-medium uppercase tracking-wider">Date</th>
              <th className="text-left px-5 py-3.5 text-xs text-slate2-400 font-medium uppercase tracking-wider">Description</th>
              <th className="text-left px-5 py-3.5 text-xs text-slate2-400 font-medium uppercase tracking-wider hidden md:table-cell">Category</th>
              <th className="text-left px-5 py-3.5 text-xs text-slate2-400 font-medium uppercase tracking-wider hidden lg:table-cell">Merchant</th>
              <th className="text-right px-5 py-3.5 text-xs text-slate2-400 font-medium uppercase tracking-wider">Amount</th>
              {role === 'admin' && (
                <th className="text-right px-5 py-3.5 text-xs text-slate2-400 font-medium uppercase tracking-wider">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate2-700/20">
            {transactions.map(txn => (
              <tr
                key={txn.id}
                className="hover:bg-navy-700/40 transition-colors duration-150 group"
              >
                {/* Date */}
                <td className="px-5 py-3.5 text-xs text-slate2-400 font-mono whitespace-nowrap">
                  {formatDate(txn.date)}
                </td>

                {/* Description + type icon */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`
                      w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center
                      ${txn.type === 'income' ? 'bg-income/10' : 'bg-expense/10'}
                    `}>
                      {txn.type === 'income'
                        ? <ArrowDownLeft size={13} className="text-income" />
                        : <ArrowUpRight size={13} className="text-expense" />
                      }
                    </div>
                    <div>
                      <p className="text-sm text-slate2-100 font-medium leading-tight">{txn.description}</p>
                      <p className="text-xs text-slate2-500 md:hidden">{txn.category}</p>
                    </div>
                  </div>
                </td>

                {/* Category badge */}
                <td className="px-5 py-3.5 hidden md:table-cell">
                  <span
                    className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: `${CATEGORY_COLORS[txn.category] || '#6366F1'}18`,
                      color: CATEGORY_COLORS[txn.category] || '#818CF8',
                    }}
                  >
                    {txn.category}
                  </span>
                </td>

                {/* Merchant */}
                <td className="px-5 py-3.5 text-xs text-slate2-400 hidden lg:table-cell">
                  {txn.merchant}
                </td>

                {/* Amount */}
                <td className="px-5 py-3.5 text-right">
                  <span className={`font-mono font-semibold text-sm ${txn.type === 'income' ? 'text-income-light' : 'text-expense-light'}`}>
                    {txn.type === 'income' ? '+' : '−'}{formatCurrency(txn.amount)}
                  </span>
                </td>

                {/* Actions (Admin only) */}
                {role === 'admin' && (
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(txn)}
                        className="p-1.5 rounded-lg text-slate2-400 hover:text-accent-light hover:bg-accent/10 transition-all"
                        title="Edit"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(txn.id)}
                        className={`p-1.5 rounded-lg transition-all ${
                          deleteConfirm === txn.id
                            ? 'text-white bg-expense'
                            : 'text-slate2-400 hover:text-expense-light hover:bg-expense/10'
                        }`}
                        title={deleteConfirm === txn.id ? 'Click again to confirm' : 'Delete'}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate2-700/30">
          <p className="text-xs text-slate2-400">
            Showing <span className="text-slate2-200">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, allFiltered.length)}</span> of <span className="text-slate2-200">{allFiltered.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg text-slate2-400 hover:text-slate2-200 hover:bg-navy-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .map((p, idx, arr) => (
                <span key={p}>
                  {idx > 0 && arr[idx - 1] !== p - 1 && (
                    <span className="px-1 text-slate2-500 text-xs">…</span>
                  )}
                  <button
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
                      p === page
                        ? 'bg-accent text-white shadow-accent'
                        : 'text-slate2-400 hover:text-slate2-200 hover:bg-navy-700'
                    }`}
                  >
                    {p}
                  </button>
                </span>
              ))
            }
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg text-slate2-400 hover:text-slate2-200 hover:bg-navy-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
