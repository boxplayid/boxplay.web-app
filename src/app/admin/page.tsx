'use client'

import DashboardShell from '@/components/DashboardShell'
import { ShieldCheck, Users, Building2, TrendingUp, Activity, Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useApp } from '@/contexts/AppContext'

export default function AdminDashboard() {
  const { branches, units, members, transactions } = useApp()

  const stats = [
    { label: 'Total Cabang', value: branches.length, icon: Building2, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Total Unit', value: units.length, icon: Activity, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Total Member', value: members.length, icon: Users, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Total Transaksi', value: transactions.length, icon: TrendingUp, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  ]

  return (
    <DashboardShell title="Admin Dashboard" icon={<ShieldCheck className="w-6 h-6 text-white" />}>
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Manajemen Pengguna</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card/50 rounded-xl border border-border">
              <p className="font-semibold">Cabang Aktif</p>
              <p className="text-sm text-muted-foreground">{branches.filter(b => b.status === 'Active').length} dari {branches.length} cabang</p>
            </div>
            <div className="p-4 bg-card/50 rounded-xl border border-border">
              <p className="font-semibold">Unit Tersedia</p>
              <p className="text-sm text-muted-foreground">{units.filter(u => u.status === 'Available').length} dari {units.length} unit</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Sistem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-card/50 rounded-xl border border-border">
              <Settings className="w-6 h-6 text-primary" />
              <div>
                <p className="font-semibold">Pengaturan Umum</p>
                <p className="text-xs text-muted-foreground">Konfigurasi sistem dasar</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-card/50 rounded-xl border border-border">
              <ShieldCheck className="w-6 h-6 text-accent" />
              <div>
                <p className="font-semibold">Keamanan</p>
                <p className="text-xs text-muted-foreground">Pengaturan keamanan akun</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Members */}
      <Card>
        <CardHeader>
          <CardTitle>Member Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Belum ada member yang terdaftar</p>
          ) : (
            <div className="space-y-3">
              {members.slice(-5).reverse().map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-card/50 rounded-xl border border-border">
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.memberNumber} • {member.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{member.branchName}</p>
                    <p className="text-xs text-muted-foreground">{new Date(member.createdAt).toLocaleDateString('id-ID')}</p>
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
