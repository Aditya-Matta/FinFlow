# FinFlow — Finance Dashboard
🔗 **Live:** [FinFlow](https://fin-flow-am.vercel.app/)

> A clean, interactive finance dashboard built with **React**, **Tailwind CSS**, and **Recharts**. Designed to help users track their financial activity, visualize spending patterns, and gain actionable insights.

---

## 🚀 Quick Start

```bash
# 1. Clone or unzip the project
cd finance-dashboard

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| **React 18** (JavaScript) | UI library and component architecture |
| **React Router v6** | Client-side page navigation |
| **Tailwind CSS v3** | Utility-first styling |
| **Recharts** | Charting library (Area, Bar, Pie charts) |
| **Lucide React** | Icon library |
| **Context API + useReducer** | Global state management |
| **localStorage** | Data persistence across sessions |
| **Vite** | Build tool and dev server |

---

## 📁 Project Structure

```
src/
├── context/
│   └── AppContext.jsx        # Global state (Context API + useReducer)
├── data/
│   └── mockData.js          # 72 mock transactions + helper constants
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx      # Collapsible navigation sidebar
│   │   └── Header.jsx       # Top bar with role switcher + controls
│   ├── dashboard/
│   │   ├── SummaryCard.jsx  # KPI metric cards
│   │   ├── BalanceTrendChart.jsx  # Area chart (income/expense/balance)
│   │   └── SpendingChart.jsx     # Donut + grouped bar chart
│   ├── transactions/
│   │   ├── TransactionFilters.jsx  # Search, filter, sort controls
│   │   ├── TransactionTable.jsx    # Paginated transaction list
│   │   └── TransactionModal.jsx    # Add/Edit transaction modal
│   └── insights/
│       └── (used inside Insights page)
└── pages/
    ├── Dashboard.jsx     # Overview with summary + charts
    ├── Transactions.jsx  # Full transaction management
    └── Insights.jsx      # Spending analysis + observations
```

---

## ✨ Features

### 1. Dashboard Overview
- **4 Summary Cards** — Total Balance, Monthly Income, Monthly Expenses, Savings Rate
- **Balance Trend Chart** — Area chart showing 6-month income/expense/balance trend
- **Spending Breakdown** — Donut chart (by category) + monthly grouped bar chart
- **Recent Activity** — Quick preview of latest 5 transactions

### 2. Transactions
- **72 mock transactions** spanning Oct 2025 – Mar 2026 across 15+ categories
- **Search** — by description, merchant, or category
- **Filters** — by type (income/expense), category, and date range
- **Sorting** — newest, oldest, highest/lowest amount
- **Pagination** — 10 transactions per page
- **Export CSV** — download filtered transactions as CSV

### 3. Role-Based UI
Switched via the **role dropdown in the header** — no login required.

| Feature | Admin | Viewer |
|---------|-------|--------|
| View dashboard | ✅ | ✅ |
| Browse transactions | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Delete transaction | ✅ | ❌ |
| Export CSV | ✅ | ✅ |

> In Viewer mode, Add/Edit/Delete buttons are hidden and a banner informs the user of their restricted access.

### 4. Insights
- **KPI Cards** — Top spend category, best/worst savings month, avg. daily spend, savings rate
- **Monthly Savings Chart** — Bar chart with green/red bars for profit/deficit months
- **Top Merchants** — Horizontal bar chart of top 5 merchants by spend
- **Category Breakdown** — Progress bars showing % spend per category
- **Observations** — 5 auto-generated financial observations from the data

### 5. State Management (Context API)
All state lives in `AppContext.jsx`:
- `useReducer` handles all state transitions with clearly defined action types
- **localStorage** persists transactions, role, and dark mode across sessions
- Helper functions (`getSummary`, `getMonthlyData`, `getInsights`, etc.) compute derived data from the single source of truth

### 6. UI/UX Details
- **Dark/Light mode** toggle (defaults to dark — the "Midnight Ledger" theme)
- **Collapsible sidebar** — collapses to icon-only on desktop, slides over on mobile
- **Responsive layout** — works on mobile, tablet, and desktop
- **Staggered animations** — cards animate in sequentially on page load
- **Empty states** — gracefully handled when no transactions match filters
- **Delete confirmation** — requires double-click to prevent accidental deletion
- **Form validation** — modal validates all fields before saving
- **Reset button** — restores original mock data (useful for demo/testing)

---

## 🎨 Design System

**Theme: "Midnight Ledger"** — Professional dark fintech aesthetic

| Token | Value | Use |
|-------|-------|-----|
| `navy-950` | `#040A18` | App background |
| `navy-900` | `#070E21` | Sidebar background |
| `navy-800` | `#0C1530` | Card backgrounds |
| `accent` | `#6366F1` (Indigo) | Primary CTA, active states |
| `income` | `#10B981` (Emerald) | Income indicators |
| `expense` | `#F43F5E` (Rose) | Expense indicators |
| `warn` | `#F59E0B` (Amber) | Warnings, highlights |

**Fonts:**
- `Outfit` — headings and UI text (loaded from Google Fonts)
- `JetBrains Mono` — financial numbers and code-like values

---

## 📊 Mock Data

Located in `src/data/mockData.js`:
- **72 transactions** from Oct 2025 to Mar 2026
- **Income categories:** Salary, Freelance, Investments, Dividends
- **Expense categories:** Housing, Food & Dining, Shopping, Entertainment, Transportation, Healthcare, Utilities, Education, Travel, Subscriptions
- Realistic merchants and amounts set in the Indian context (₹ INR)

---

## 🔧 Available Scripts

```bash
npm run dev      # Start dev server on http://localhost:5173
npm run build    # Build for production (output to /dist)
npm run preview  # Preview the production build locally
```

---

## 💡 Assumptions Made

1. Currency is **Indian Rupee (₹ INR)** — the number formatting uses `en-IN` locale
2. "Current month" is **March 2026** — since mock data ends there
3. Role switching is **frontend-only** — no backend authentication
4. Data resets to mock state via the **Reset button** in the header (the circular arrow icon)
5. Dark mode is the **default theme**; light mode can be toggled from the header

---

## 📝 Notes for Reviewers

- State management with **Context API + useReducer** was chosen over Redux as it's sufficient for this scale and requires no additional dependencies
- All computed/derived data (summaries, chart data, insights) is calculated from the single `transactions` array — no duplicated state
- The `getFilteredTransactions()` function serves both the Transactions page (with all filters) and the Dashboard's recent activity view
- Components are kept focused and single-responsibility — layout, data, and UI are cleanly separated
