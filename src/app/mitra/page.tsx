'use client'

import DashboardShell from '@/components/DashboardShell'
import { Handshake, Building2, TrendingUp, DollarSign, Users, Gamepad2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useApp } from '@/contexts/AppContext'

export default function MitraDashboard() {
  const { branches, units, transactions } = useApp()

  // Simulate mitra's own branches (for demo, take first 2)
  const myBranches = branches.slice(0, 2)
  const myUnits = units.filter(u => myBranches.some(b => b.id === u.branchId))
  const myTransactions = transactions.slice(0, 5)

  const stats = [
    { label: 'Total Outlet', value: myBranches.length, icon: Building2, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Total Unit', value: myUnits.length, icon: Gamepad2, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Total Transaksi', value: myTransactions.length, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Pendapatan Bulanan', value: 'Rp 2.500.000', icon: DollarSign, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  ]

  return (
    <DashboardShell title="Mitra Dashboard" icon={<Handshake className="w-6 h-6 text-white" />}>
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

      {/* My Branches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Outlet Saya</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {myBranches.map((branch) => (
              <div key={branch.id} className="p-4 bg-card/50 rounded-xl border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{branch.name}</p>
                    <p className="text-sm text-muted-foreground">{branch.city}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${branch.status === 'Active' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'}`}>
                    {branch.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Unit Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {myUnits.slice(0, 5).map((unit) => (
              <div key={unit.id} className="flex items-center justify-between p-3 bg-card/50 rounded-xl border border-border">
                <div>
                  <p className="font-semibold">{unit.code} • {unit.name}</p>
                  <p className="text-xs text-muted-foreground">{unit.branchName}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  unit.status === 'Available' ? 'bg-green-400/10 text-green-400' :
                  unit.status === 'In Use' ? 'bg-primary/10 text-primary' :
                  'bg-yellow-400/10 text-yellow-400'
                }`}>
                  {unit.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transaksi Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          {myTransactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Belum ada transaksi</p>
          ) : (
            <div className="space-y-3">
              {myTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-card/50 rounded-xl border border-border">
                  <div>
                    <p className="font-semibold">{tx.customer}</p>
                    <p className="text-xs text-muted-foreground">{tx.paketName || 'Pesan Langsung'} • {tx.outlet}</p>
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
