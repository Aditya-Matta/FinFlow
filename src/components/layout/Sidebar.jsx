import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

const NAV_ITEMS = [
  { to: '/',              label: 'Dashboard',    Icon: LayoutDashboard },
  { to: '/transactions',  label: 'Transactions', Icon: ArrowLeftRight  },
  { to: '/insights',      label: 'Insights',     Icon: Lightbulb       },
]

export default function Sidebar() {
  const { state, toggleSidebar } = useApp()
  const { sidebarOpen } = state

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col
          border-r border-theme
          transition-all duration-300 ease-in-out
          w-60 bg-[#070E21]
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${sidebarOpen ? 'lg:w-60' : 'lg:w-16'}
        `}
        style={{ background: 'var(--bg-sidebar)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-slate2-700/30 overflow-hidden">
          <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-accent">
            <TrendingUp size={16} className="text-white" />
          </div>
          {sidebarOpen && (
            <span className="font-outfit font-700 text-lg text-slate2-100 whitespace-nowrap tracking-tight">
              Fin<span className="gradient-text">Flow</span>
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              onClick={() => { if (window.innerWidth < 1024) toggleSidebar() }}
              title={!sidebarOpen ? label : undefined}
              
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && (
                <span className="text-sm font-medium whitespace-nowrap">{label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="
            items-center hidden lg:flex justify-center m-3 p-2
            rounded-xl border border-slate2-700/40
            text-slate2-400 hover:text-slate2-200
            hover:bg-navy-700 transition-all duration-200
          "
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen
            ? <ChevronLeft size={16} />
            : <ChevronRight size={16} />
          }
        </button>
      </aside>
    </>
  )
}
