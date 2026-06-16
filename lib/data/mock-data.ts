export const cashFlowData = [
  { month: "Oct", income: 420000, expense: 310000, forecast: 430000 },
  { month: "Nov", income: 380000, expense: 350000, forecast: 410000 },
  { month: "Dec", income: 510000, expense: 420000, forecast: 490000 },
  { month: "Jan", income: 480000, expense: 390000, forecast: 520000 },
  { month: "Feb", income: 550000, expense: 410000, forecast: 580000 },
  { month: "Mar", income: 620000, expense: 430000, forecast: 650000 },
]

export const kpiMetrics = [
  {
    title: "Cash on Hand",
    value: "$2,482,900.00",
    description: "+12.4% vs last month",
    trend: { value: "12.4%", positive: true },
  },
  {
    title: "Avg. Burn Rate",
    value: "$142,500.00",
    description: "Runway: 17.4 Months",
    trend: { value: "2.1%", positive: false },
  },
  {
    title: "Partner Credits",
    value: "$840,000.00",
    description: "3 Pending Requests",
  },
  {
    title: "Client Receivables",
    value: "$1,104,250.00",
    description: "82% On-Time Collection",
    trend: { value: "5.2%", positive: true },
  },
]

export const recentTransactions = [
  {
    id: "TX-921",
    entity: "Sterling Plaza Reno",
    type: "Milestone Payment",
    amount: "+$42,000.00",
    status: "PAID",
    date: "2024-03-22",
  },
  {
    id: "TX-441",
    entity: "Material Vendor #04",
    type: "Procurement",
    amount: "-$12,850.00",
    status: "PENDING",
    date: "2024-03-21",
  },
  {
    id: "TX-001",
    entity: "Azure Cloud Systems",
    type: "SaaS Expense",
    amount: "-$4,200.00",
    status: "PAID",
    date: "2024-03-20",
  },
]

export const clients = [
  { id: "CL-01", name: "Nexus Landscapes Ltd.", billing: 840000, received: 720000, outstanding: 120000, status: "ACTIVE" },
  { id: "CL-02", name: "Meridian Hospitality", billing: 1250000, received: 1250000, outstanding: 0, status: "INACTIVE" },
  { id: "CL-03", name: "Vanguard Tech Hub", billing: 450000, received: 150000, outstanding: 300000, status: "ACTIVE" },
  { id: "CL-04", name: "Summit Construction", billing: 320000, received: 310000, outstanding: 10000, status: "ACTIVE" },
  { id: "CL-05", name: "Beacon Properties", billing: 1720000, received: 1400000, outstanding: 320000, status: "ACTIVE" },
]

export const projects = [
  { 
    id: "ARCH-921", 
    name: "Horizon Center Redevelopment", 
    client: "Vanguard Urban Holdings",
    budget: 4850000,
    spent: 3120450,
    profit: 1729550,
    margin: 35.6,
    status: "ON TRACK",
    phase: "Phase 04",
  },
  { 
    id: "ARCH-042", 
    name: "Nexus Quantum Labs", 
    client: "Nexus Landscapes Ltd.",
    budget: 1200000,
    spent: 850000,
    profit: 350000,
    margin: 29.2,
    status: "ON TRACK",
    phase: "Phase 02",
  },
  { 
    id: "ARCH-118", 
    name: "The Obsidian Spire", 
    client: "Beacon Properties",
    budget: 2500000,
    spent: 2550000,
    profit: -50000,
    margin: -2.0,
    status: "OVER BUDGET",
    phase: "Phase 06",
  },
]

