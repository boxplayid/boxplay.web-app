'use client'

import DashboardShell from '@/components/DashboardShell'
import { Building2, Users, TrendingUp, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useApp } from '@/contexts/AppContext'

export default function InvestorDashboard() {
  const { branches, members, transactions } = useApp()

  const stats = [
    { label: 'Total Outlet', value: branches.length, icon: Building2, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Total Member', value: members.length, icon: Users, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Total Transaksi', value: transactions.length, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Pendapatan Bulanan', value: 'Rp 5.200.000', icon: DollarSign, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  ]

  return (
    <DashboardShell title="Investor Dashboard" icon={<Building2 className="w-6 h-6 text-white" />}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions (For Investor View) */}
      <Card>
        <CardHeader>
          <CardTitle>Transaksi Terbaru dari Semua Outlet</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Belum ada transaksi</p>
          ) : (
            <div className="space-y-3">
              {transactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-card/50 rounded-xl border border-border">
                  <div>
                    <p className="font-semibold">{tx.customer}</p>
                    <p className="text-xs text-muted-foreground">{tx.outlet} • {tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{tx.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tx.status === 'Success' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
