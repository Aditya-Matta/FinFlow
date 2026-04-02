import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'
import { useApp } from './context/AppContext'

// Layout wraps every page
function Layout({ children }) {
  const { state } = useApp()
  const { sidebarOpen } = state

  return (
    <div className="min-h-screen bg-navy-950 text-slate2-100 font-outfit">
      <Sidebar />
      {/* Main content shifts right based on sidebar width */}
      <div
        className={`transition-all duration-300 ease-in-out min-h-screen flex flex-col ${
          sidebarOpen ? 'lg:pl-60' : 'lg:pl-16'
        }`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/transactions"
            element={
              <Layout>
                <Transactions />
              </Layout>
            }
          />
          <Route
            path="/insights"
            element={
              <Layout>
                <Insights />
              </Layout>
            }
          />
          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <Layout>
                <div className="flex items-center justify-center h-[60vh] flex-col gap-3">
                  <p className="text-6xl font-bold gradient-text">404</p>
                  <p className="text-slate2-400">Page not found</p>
                  <a href="/" className="mt-2 text-sm text-accent-light hover:underline">
                    ← Back to Dashboard
                  </a>
                </div>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
