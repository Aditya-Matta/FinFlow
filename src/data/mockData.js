// ─── Category Colors ───────────────────────────────────────────────────────
export const CATEGORY_COLORS = {
  'Housing':        '#6366F1',
  'Food & Dining':  '#F59E0B',
  'Shopping':       '#EC4899',
  'Entertainment':  '#8B5CF6',
  'Transportation': '#06B6D4',
  'Healthcare':     '#10B981',
  'Utilities':      '#64748B',
  'Education':      '#3B82F6',
  'Travel':         '#F97316',
  'Subscriptions':  '#A855F7',
  'Salary':         '#10B981',
  'Freelance':      '#34D399',
  'Investments':    '#60A5FA',
  'Dividends':      '#4ADE80',
  'Other Income':   '#A3E635',
}

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Shopping',
  'Entertainment',
  'Transportation',
  'Healthcare',
  'Utilities',
  'Housing',
  'Education',
  'Travel',
  'Subscriptions',
]

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investments',
  'Dividends',
  'Other Income',
]

// ─── Transactions ─────────────────────────────────────────────────────────
export const INITIAL_TRANSACTIONS = [
  // ── October 2025 ─────────────────
  { id: 'txn_001', date: '2025-10-01', amount: 85000, type: 'income',  category: 'Salary',         description: 'Monthly Salary',        merchant: 'Acme Technologies' },
  { id: 'txn_002', date: '2025-10-03', amount: 2400,  type: 'expense', category: 'Food & Dining',  description: 'Weekly Groceries',      merchant: 'DMart' },
  { id: 'txn_003', date: '2025-10-05', amount: 350,   type: 'expense', category: 'Transportation', description: 'Cab Rides',             merchant: 'Uber' },
  { id: 'txn_004', date: '2025-10-08', amount: 649,   type: 'expense', category: 'Subscriptions',  description: 'Streaming Plan',        merchant: 'Netflix' },
  { id: 'txn_005', date: '2025-10-10', amount: 1800,  type: 'expense', category: 'Food & Dining',  description: 'Team Lunch',            merchant: 'Social Offline' },
  { id: 'txn_006', date: '2025-10-12', amount: 3200,  type: 'expense', category: 'Shopping',       description: 'Household Items',       merchant: 'Amazon' },
  { id: 'txn_007', date: '2025-10-15', amount: 15000, type: 'income',  category: 'Freelance',      description: 'Website Project',       merchant: 'Client A' },
  { id: 'txn_008', date: '2025-10-18', amount: 1800,  type: 'expense', category: 'Utilities',      description: 'Electricity Bill',      merchant: 'BSES Delhi' },
  { id: 'txn_009', date: '2025-10-20', amount: 2000,  type: 'expense', category: 'Healthcare',     description: 'Gym Membership',        merchant: 'Cult.fit' },
  { id: 'txn_010', date: '2025-10-22', amount: 800,   type: 'expense', category: 'Entertainment',  description: 'Movie Night',           merchant: 'PVR Cinemas' },
  { id: 'txn_011', date: '2025-10-25', amount: 25000, type: 'expense', category: 'Housing',        description: 'Monthly Rent',          merchant: 'Landlord' },
  { id: 'txn_012', date: '2025-10-28', amount: 1200,  type: 'expense', category: 'Food & Dining',  description: 'Weekend Brunch',        merchant: 'Cafe Coffee Day' },

  // ── November 2025 ─────────────────
  { id: 'txn_013', date: '2025-11-01', amount: 85000, type: 'income',  category: 'Salary',         description: 'Monthly Salary',        merchant: 'Acme Technologies' },
  { id: 'txn_014', date: '2025-11-03', amount: 2600,  type: 'expense', category: 'Food & Dining',  description: 'Weekly Groceries',      merchant: 'BigBasket' },
  { id: 'txn_015', date: '2025-11-05', amount: 420,   type: 'expense', category: 'Transportation', description: 'Cab Rides',             merchant: 'Ola' },
  { id: 'txn_016', date: '2025-11-08', amount: 119,   type: 'expense', category: 'Subscriptions',  description: 'Music Streaming',       merchant: 'Spotify' },
  { id: 'txn_017', date: '2025-11-10', amount: 2100,  type: 'expense', category: 'Food & Dining',  description: 'Dinner with Friends',   merchant: 'Smoke House Deli' },
  { id: 'txn_018', date: '2025-11-12', amount: 4500,  type: 'expense', category: 'Shopping',       description: 'Diwali Shopping',       merchant: 'Flipkart' },
  { id: 'txn_019', date: '2025-11-15', amount: 8000,  type: 'income',  category: 'Investments',    description: 'Mutual Fund Returns',   merchant: 'Zerodha' },
  { id: 'txn_020', date: '2025-11-18', amount: 999,   type: 'expense', category: 'Utilities',      description: 'Internet Bill',         merchant: 'Airtel' },
  { id: 'txn_021', date: '2025-11-20', amount: 1500,  type: 'expense', category: 'Healthcare',     description: 'Doctor Consultation',   merchant: 'Max Healthcare' },
  { id: 'txn_022', date: '2025-11-22', amount: 2500,  type: 'expense', category: 'Entertainment',  description: 'Stand-Up Comedy Show',  merchant: 'BookMyShow' },
  { id: 'txn_023', date: '2025-11-25', amount: 25000, type: 'expense', category: 'Housing',        description: 'Monthly Rent',          merchant: 'Landlord' },
  { id: 'txn_024', date: '2025-11-28', amount: 20000, type: 'income',  category: 'Freelance',      description: 'App Development',       merchant: 'Client B' },

  // ── December 2025 ─────────────────
  { id: 'txn_025', date: '2025-12-01', amount: 85000, type: 'income',  category: 'Salary',         description: 'Monthly Salary',        merchant: 'Acme Technologies' },
  { id: 'txn_026', date: '2025-12-03', amount: 3200,  type: 'expense', category: 'Food & Dining',  description: 'Holiday Groceries',     merchant: 'Nature\'s Basket' },
  { id: 'txn_027', date: '2025-12-05', amount: 2400,  type: 'expense', category: 'Travel',         description: 'Train to Jaipur',       merchant: 'IRCTC' },
  { id: 'txn_028', date: '2025-12-08', amount: 1499,  type: 'expense', category: 'Subscriptions',  description: 'Annual OTT Plan',       merchant: 'Amazon Prime' },
  { id: 'txn_029', date: '2025-12-10', amount: 3500,  type: 'expense', category: 'Food & Dining',  description: 'Christmas Dinner',      merchant: 'The Piano Man' },
  { id: 'txn_030', date: '2025-12-12', amount: 6000,  type: 'expense', category: 'Shopping',       description: 'Winter Clothing',       merchant: 'Myntra' },
  { id: 'txn_031', date: '2025-12-15', amount: 5000,  type: 'income',  category: 'Dividends',      description: 'Quarterly Dividend',    merchant: 'HDFC Mutual Fund' },
  { id: 'txn_032', date: '2025-12-18', amount: 2200,  type: 'expense', category: 'Utilities',      description: 'Electricity Bill',      merchant: 'BSES Delhi' },
  { id: 'txn_033', date: '2025-12-20', amount: 8000,  type: 'expense', category: 'Travel',         description: 'Hotel Booking',         merchant: 'MakeMyTrip' },
  { id: 'txn_034', date: '2025-12-22', amount: 4000,  type: 'expense', category: 'Entertainment',  description: 'NYE Party',             merchant: 'Kitty Su' },
  { id: 'txn_035', date: '2025-12-25', amount: 25000, type: 'expense', category: 'Housing',        description: 'Monthly Rent',          merchant: 'Landlord' },
  { id: 'txn_036', date: '2025-12-28', amount: 3000,  type: 'expense', category: 'Education',      description: 'Online Course',         merchant: 'Coursera' },

  // ── January 2026 ─────────────────
  { id: 'txn_037', date: '2026-01-01', amount: 85000, type: 'income',  category: 'Salary',         description: 'Monthly Salary',        merchant: 'Acme Technologies' },
  { id: 'txn_038', date: '2026-01-03', amount: 2200,  type: 'expense', category: 'Food & Dining',  description: 'Weekly Groceries',      merchant: 'DMart' },
  { id: 'txn_039', date: '2026-01-05', amount: 500,   type: 'expense', category: 'Transportation', description: 'Metro Card Recharge',   merchant: 'Delhi Metro' },
  { id: 'txn_040', date: '2026-01-08', amount: 649,   type: 'expense', category: 'Subscriptions',  description: 'Streaming Plan',        merchant: 'Netflix' },
  { id: 'txn_041', date: '2026-01-10', amount: 1500,  type: 'expense', category: 'Food & Dining',  description: 'Lunch Meeting',         merchant: 'Barbeque Nation' },
  { id: 'txn_042', date: '2026-01-12', amount: 2800,  type: 'expense', category: 'Shopping',       description: 'New Year Essentials',   merchant: 'Amazon' },
  { id: 'txn_043', date: '2026-01-15', amount: 18000, type: 'income',  category: 'Freelance',      description: 'UI Design Project',     merchant: 'Client C' },
  { id: 'txn_044', date: '2026-01-18', amount: 400,   type: 'expense', category: 'Utilities',      description: 'Water Bill',            merchant: 'Delhi Jal Board' },
  { id: 'txn_045', date: '2026-01-20', amount: 800,   type: 'expense', category: 'Healthcare',     description: 'Pharmacy',              merchant: 'Apollo Pharmacy' },
  { id: 'txn_046', date: '2026-01-22', amount: 600,   type: 'expense', category: 'Education',      description: 'Books Purchase',        merchant: 'Amazon Books' },
  { id: 'txn_047', date: '2026-01-25', amount: 25000, type: 'expense', category: 'Housing',        description: 'Monthly Rent',          merchant: 'Landlord' },
  { id: 'txn_048', date: '2026-01-28', amount: 450,   type: 'expense', category: 'Entertainment',  description: 'OTT Subscription',      merchant: 'Hotstar' },

  // ── February 2026 ─────────────────
  { id: 'txn_049', date: '2026-02-01', amount: 85000, type: 'income',  category: 'Salary',         description: 'Monthly Salary',        merchant: 'Acme Technologies' },
  { id: 'txn_050', date: '2026-02-03', amount: 2100,  type: 'expense', category: 'Food & Dining',  description: 'Weekly Groceries',      merchant: 'BigBasket' },
  { id: 'txn_051', date: '2026-02-05', amount: 300,   type: 'expense', category: 'Transportation', description: 'Bike Rides',            merchant: 'Rapido' },
  { id: 'txn_052', date: '2026-02-08', amount: 299,   type: 'expense', category: 'Subscriptions',  description: 'Streaming Plan',        merchant: 'Disney+ Hotstar' },
  { id: 'txn_053', date: '2026-02-10', amount: 2800,  type: 'expense', category: 'Food & Dining',  description: 'Valentine\'s Dinner',   merchant: 'Indian Accent' },
  { id: 'txn_054', date: '2026-02-12', amount: 12000, type: 'expense', category: 'Shopping',       description: 'Gift Jewellery',        merchant: 'Tanishq' },
  { id: 'txn_055', date: '2026-02-15', amount: 6000,  type: 'income',  category: 'Investments',    description: 'Stock Dividend',        merchant: 'Zerodha' },
  { id: 'txn_056', date: '2026-02-18', amount: 1600,  type: 'expense', category: 'Utilities',      description: 'Electricity Bill',      merchant: 'BSES Delhi' },
  { id: 'txn_057', date: '2026-02-20', amount: 2000,  type: 'expense', category: 'Healthcare',     description: 'Monthly Gym',           merchant: 'Cult.fit' },
  { id: 'txn_058', date: '2026-02-22', amount: 700,   type: 'expense', category: 'Entertainment',  description: 'Movie Date',            merchant: 'INOX' },
  { id: 'txn_059', date: '2026-02-25', amount: 25000, type: 'expense', category: 'Housing',        description: 'Monthly Rent',          merchant: 'Landlord' },
  { id: 'txn_060', date: '2026-02-28', amount: 1500,  type: 'expense', category: 'Education',      description: 'Udemy Course',          merchant: 'Udemy' },

  // ── March 2026 ─────────────────
  { id: 'txn_061', date: '2026-03-01', amount: 85000, type: 'income',  category: 'Salary',         description: 'Monthly Salary',        merchant: 'Acme Technologies' },
  { id: 'txn_062', date: '2026-03-03', amount: 2500,  type: 'expense', category: 'Food & Dining',  description: 'Weekly Groceries',      merchant: 'DMart' },
  { id: 'txn_063', date: '2026-03-05', amount: 450,   type: 'expense', category: 'Transportation', description: 'Cab Rides',             merchant: 'Uber' },
  { id: 'txn_064', date: '2026-03-08', amount: 649,   type: 'expense', category: 'Subscriptions',  description: 'Streaming Plan',        merchant: 'Netflix' },
  { id: 'txn_065', date: '2026-03-10', amount: 1800,  type: 'expense', category: 'Food & Dining',  description: 'Team Outing',           merchant: 'Farzi Cafe' },
  { id: 'txn_066', date: '2026-03-12', amount: 3100,  type: 'expense', category: 'Shopping',       description: 'Spring Wardrobe',       merchant: 'Amazon' },
  { id: 'txn_067', date: '2026-03-15', amount: 22000, type: 'income',  category: 'Freelance',      description: 'Dashboard Project',     merchant: 'Client D' },
  { id: 'txn_068', date: '2026-03-18', amount: 999,   type: 'expense', category: 'Utilities',      description: 'Internet Bill',         merchant: 'Airtel' },
  { id: 'txn_069', date: '2026-03-20', amount: 2000,  type: 'expense', category: 'Healthcare',     description: 'Health Checkup',        merchant: 'Fortis Hospital' },
  { id: 'txn_070', date: '2026-03-22', amount: 499,   type: 'expense', category: 'Entertainment',  description: 'Gaming Subscription',   merchant: 'PlayStation' },
  { id: 'txn_071', date: '2026-03-25', amount: 25000, type: 'expense', category: 'Housing',        description: 'Monthly Rent',          merchant: 'Landlord' },
  { id: 'txn_072', date: '2026-03-28', amount: 800,   type: 'expense', category: 'Education',      description: 'Books',                 merchant: 'Flipkart' },
]

// ─── Helper: Format Currency ───────────────────────────────────────────────
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// ─── Helper: Get month label ───────────────────────────────────────────────
export const MONTH_LABELS = {
  '2025-10': 'Oct 25',
  '2025-11': 'Nov 25',
  '2025-12': 'Dec 25',
  '2026-01': 'Jan 26',
  '2026-02': 'Feb 26',
  '2026-03': 'Mar 26',
}
