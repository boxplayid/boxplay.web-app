'use client'

import DashboardShell from '@/components/DashboardShell'
import { Gamepad2, CreditCard, Users, Coffee, PlayCircle, CheckCircle2, Clock, Wallet, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useApp } from '@/contexts/AppContext'

export default function OperatorDashboard() {
  const { members } = useApp()
  const totalDeposit = members.reduce((sum, member) => sum + member.totalDepositAmount, 0)
  const totalMainBalance = members.reduce((sum, member) => sum + member.mainTimeBalance, 0)

  return (
    <DashboardShell title="Operator Dashboard" icon={<Gamepad2 className="w-6 h-6 text-white" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Unit Aktif', value: '2', icon: Gamepad2, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Total Member', value: String(members.length), icon: Users, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Deposit Member', value: `Rp ${totalDeposit.toLocaleString('id-ID')}`, icon: CreditCard, color: 'text-green-400', bg: 'bg-green-400/10' },
          { label: 'Saldo Jam Utama', value: `${Number(totalMainBalance.toFixed(2))} Jam`, icon: Wallet, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-7">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link href="/operator/billing">
              <Button variant="accent" className="w-full h-24 flex flex-col gap-2">
                <PlayCircle className="w-8 h-8" />
                Mulai Billing
              </Button>
            </Link>
            <Link href="/operator/customers">
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                <CheckCircle2 className="w-8 h-8" />
                Check-In Customer
              </Button>
            </Link>
            <Link href="/operator/fnb">
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                <Coffee className="w-8 h-8" />
                Pesan F&B
              </Button>
            </Link>
            <Link href="/operator/membership">
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                <Users className="w-8 h-8" />
                Daftar Member
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Membership</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {members.slice(0, 3).map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 bg-card/50 rounded-xl border border-border">
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.memberNumber} · {member.level}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-primary justify-end">
                    <Award className="w-4 h-4" />
                    <p className="font-semibold">{member.bonusTimeBalance}J Bonus</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{member.mainTimeBalance}J utama</p>
                </div>
              </div>
            ))}
            {members.length === 0 && (
              <p className="text-sm text-muted-foreground">Belum ada member yang terdaftar.</p>
            )}
            <Link href="/operator/membership">
              <Button variant="outline" className="w-full">
                Kelola Registrasi & Deposit Member
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
