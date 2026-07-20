'use client'

import DashboardShell from '@/components/DashboardShell'
import {
  LayoutDashboard, Building2, Users, TrendingUp, DollarSign,
  Activity, ArrowUpRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, LineChart, Line, BarChart, Bar
} from 'recharts'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'

const revenueData = [
  { month: 'Jan', revenue: 4000, profit: 2400 },
  { month: 'Feb', revenue: 3000, profit: 1398 },
  { month: 'Mar', revenue: 5000, profit: 3800 },
  { month: 'Apr', revenue: 4780, profit: 3908 },
  { month: 'Mei', revenue: 5890, profit: 4800 },
  { month: 'Jun', revenue: 6390, profit: 5300 },
]

const membershipGrowthData = [
  { month: 'Jan', new: 45, active: 120 },
  { month: 'Feb', new: 52, active: 160 },
  { month: 'Mar', new: 68, active: 210 },
  { month: 'Apr', new: 75, active: 270 },
  { month: 'Mei', new: 80, active: 320 },
  { month: 'Jun', new: 95, active: 390 },
]

const branchRevenueData = [
  { name: 'Padang', revenue: 8000000 },
  { name: 'Bukittinggi', revenue: 6500000 },
  { name: 'Pekanbaru', revenue: 3200000 },
  { name: 'Jakarta', revenue: 4500000 },
  { name: 'Bandung', revenue: 3800000 },
]

export default function OwnerDashboard() {
  const { branches, units, transactions } = useApp()

  // Calculate total revenue
  const totalRevenue = transactions.reduce((sum, tx) => {
    const amount = parseInt(tx.amount.replace(/[^0-9]/g, ''))
    return sum + (isNaN(amount) ? 0 : amount)
  }, 0)

  // Get recent transactions (last 5)
  const recentTransactions = transactions.slice(0, 5).map(tx => ({
    id: `#${tx.id}`,
    customer: tx.customer,
    amount: tx.amount,
    status: tx.status,
    date: tx.date
  }))

  return (
    <DashboardShell title="Owner Dashboard" icon={<LayoutDashboard className="w-6 h-6 text-white" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Outlet', value: branches.length.toString(), icon: Building2, color: 'text-primary', bg: 'bg-primary/10', trend: '+2 this month' },
          { label: 'Total Unit', value: units.length.toString(), icon: Users, color: 'text-accent', bg: 'bg-accent/10', trend: '+1 this month' },
          { label: 'Total Transaksi', value: transactions.length.toString(), icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10', trend: '+3 this month' },
          { label: 'Total Revenue', value: `Rp ${totalRevenue.toLocaleString('id-ID')}`, icon: DollarSign, color: 'text-yellow-400', bg: 'bg-yellow-400/10', trend: '+12% this month' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-7">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                      <stat.icon className={`w-7 h-7 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-xs">
                    <ArrowUpRight className="w-4 h-4" />
                    {stat.trend}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2196F3" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2196F3" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9C27B0" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#9C27B0" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis dataKey="month" stroke="#BDBDBD" />
                    <YAxis stroke="#BDBDBD" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#121212', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="#2196F3"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      name="Profit"
                      stroke="#9C27B0"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorProfit)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Branch Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={branchRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis dataKey="name" stroke="#BDBDBD" />
                    <YAxis stroke="#BDBDBD" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#121212', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                      formatter={(value) => [`Rp ${Number(value).toLocaleString()}`, 'Revenue']}
                    />
                    <Bar dataKey="revenue" fill="#2196F3" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Membership Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={membershipGrowthData}>
                    <defs>
                      <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00E676" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00E676" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis dataKey="month" stroke="#BDBDBD" />
                    <YAxis stroke="#BDBDBD" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#121212', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="new"
                      name="New Members"
                      stroke="#00E676"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="active"
                      name="Active Members"
                      stroke="#2196F3"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTransactions.map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-card/50 rounded-xl border border-border hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Activity className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{tx.customer}</p>
                      <p className="text-sm text-muted-foreground">{tx.id} • {tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{tx.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tx.status === 'Success' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
              {recentTransactions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Belum ada transaksi.
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardShell>
  )
}
