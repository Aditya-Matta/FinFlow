import { useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, Shield, Eye, RefreshCw, Bell } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const PAGE_TITLES = {
  '/':             { title: 'Dashboard',    subtitle: 'Your financial overview' },
  '/transactions': { title: 'Transactions', subtitle: 'Manage your transactions' },
  '/insights':     { title: 'Insights',     subtitle: 'Understand your spending' },
}

export default function Header() {
  const { state, setRole, toggleDarkMode, toggleSidebar, resetData } = useApp()
  const { role, darkMode } = state
  const location = useLocation()

  const { title, subtitle } = PAGE_TITLES[location.pathname] || PAGE_TITLES['/']

  return (
    <header className="
      h-16 flex items-center justify-between px-4 lg:px-6
      border-b border-slate2-700/30
      bg-navy-900/80 backdrop-blur-md
      sticky top-0 z-10
    ">
      {/* Left — mobile menu + page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate2-400 hover:text-slate2-200 hover:bg-navy-700 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-base font-semibold text-slate2-100 leading-tight">{title}</h1>
          <p className="text-xs text-slate2-400 hidden sm:block">{subtitle}</p>
        </div>
      </div>

      {/* Right — controls */}
      <div className="flex items-center gap-2">

        {/* Role switcher */}
        <div className="flex cursor-pointer items-center gap-1.5 bg-navy-800 border border-slate2-700/40 rounded-xl px-3 py-1.5">
          {role === 'admin'
            ? <Shield size={14} className="text-accent-light" />
            : <Eye size={14} className="text-warn" />
          }
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="
              bg-navy-800 text-xs font-medium outline-none 
              text-slate2-200 cursor-pointer
            "
          >
            <option  value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        {/* Reset data */}
        <button
          onClick={resetData}
          title="Reset to original data"
          className="
            hidden sm:flex items-center justify-center
            w-8 h-8 rounded-xl
            text-slate2-400 hover:text-slate2-200
            hover:bg-navy-700 border border-transparent
            hover:border-slate2-700/40 transition-all duration-200
          "
        >
          <RefreshCw size={15} />
        </button>

        {/* Dark mode toggle */}
        {/* <button
          onClick={toggleDarkMode}
          className="
            flex items-center justify-center
            w-8 h-8 rounded-xl
            text-slate2-400 hover:text-slate2-200
            hover:bg-navy-700 border border-transparent
            hover:border-slate2-700/40 transition-all duration-200
          "
        >
          {darkMode ? <Sun size={15} /> : <Moon size={15} />}
        </button> */}

        {/* Avatar */}
        <div className="
          w-8 h-8 rounded-xl bg-accent/20 border border-accent/30
          flex items-center justify-center text-xs font-semibold text-accent-light
          cursor-pointer
        ">
          {role === 'admin' ? 'AD' : 'VW'}
        </div>
      </div>
    </header>
  )
}
