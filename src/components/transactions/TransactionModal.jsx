import { useState, useEffect } from 'react'
import { X, Save, Plus } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../data/mockData'

const EMPTY_FORM = {
  date: new Date().toISOString().split('T')[0],
  amount: '',
  type: 'expense',
  category: 'Food & Dining',
  description: '',
  merchant: '',
}

export default function TransactionModal({ isOpen, onClose, transaction }) {
  const { addTransaction, editTransaction } = useApp()
  const isEdit = !!transaction

  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  // Populate form when editing
  useEffect(() => {
    if (transaction) {
      setForm({ ...transaction, amount: String(transaction.amount) })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [transaction, isOpen])

  if (!isOpen) return null

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: null }))
  }

  const validate = () => {
    const errs = {}
    if (!form.date) errs.date = 'Date is required'
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) errs.amount = 'Enter a valid amount'
    if (!form.description.trim()) errs.description = 'Description is required'
    if (!form.merchant.trim()) errs.merchant = 'Merchant is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const txn = {
      ...form,
      amount: Number(form.amount),
      id: isEdit ? form.id : `txn_${Date.now()}`,
    }
    if (isEdit) editTransaction(txn)
    else addTransaction(txn)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in">
      <div
        className="w-full max-w-md rounded-2xl bg-navy-800 border border-slate2-700/50 shadow-card animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate2-700/30">
          <div>
            <h2 className="text-base font-semibold text-slate2-100">
              {isEdit ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
            <p className="text-xs text-slate2-400 mt-0.5">
              {isEdit ? 'Update the transaction details' : 'Enter new transaction details'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate2-400 hover:text-slate2-200 hover:bg-navy-700 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Type toggle */}
          <div>
            <label className="block text-xs text-slate2-400 mb-2 font-medium uppercase tracking-wider">
              Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['income', 'expense'].map(t => (
                <button
                  key={t}
                  onClick={() => {
                    set('type', t)
                    set('category', t === 'income' ? 'Salary' : 'Food & Dining')
                  }}
                  className={`
                    py-2.5 rounded-xl text-sm font-medium border transition-all
                    ${form.type === t
                      ? t === 'income'
                        ? 'bg-income/15 border-income/30 text-income-light'
                        : 'bg-expense/15 border-expense/30 text-expense-light'
                      : 'bg-navy-900 border-slate2-700/40 text-slate2-400 hover:text-slate2-200'
                    }
                  `}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Date + Amount */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate2-400 mb-1.5 font-medium">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
                className={`form-input ${errors.date ? 'border-expense/60' : ''}`}
              />
              {errors.date && <p className="text-xs text-expense-light mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-xs text-slate2-400 mb-1.5 font-medium">Amount (₹)</label>
              <input
                type="number"
                value={form.amount}
                onChange={e => set('amount', e.target.value)}
                placeholder="0"
                min="1"
                className={`form-input font-mono ${errors.amount ? 'border-expense/60' : ''}`}
              />
              {errors.amount && <p className="text-xs text-expense-light mt-1">{errors.amount}</p>}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs text-slate2-400 mb-1.5 font-medium">Category</label>
            <select
              value={form.category}
              onChange={e => set('category', e.target.value)}
              className="form-input"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs text-slate2-400 mb-1.5 font-medium">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="What was this for?"
              className={`form-input ${errors.description ? 'border-expense/60' : ''}`}
            />
            {errors.description && <p className="text-xs text-expense-light mt-1">{errors.description}</p>}
          </div>

          {/* Merchant */}
          <div>
            <label className="block text-xs text-slate2-400 mb-1.5 font-medium">Merchant</label>
            <input
              type="text"
              value={form.merchant}
              onChange={e => set('merchant', e.target.value)}
              placeholder="Where did you spend?"
              className={`form-input ${errors.merchant ? 'border-expense/60' : ''}`}
            />
            {errors.merchant && <p className="text-xs text-expense-light mt-1">{errors.merchant}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate2-700/40 text-slate2-400 hover:text-slate2-200 hover:bg-navy-700 text-sm font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent hover:bg-accent-dark text-white text-sm font-semibold transition-all shadow-accent"
          >
            {isEdit ? <Save size={15} /> : <Plus size={15} />}
            {isEdit ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}
