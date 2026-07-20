'use client'

import DashboardShell from '@/components/DashboardShell'
import { User, Wallet, Award, CreditCard, Clock3, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { useApp } from '@/contexts/AppContext'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)

const formatHours = (value: number) => `${Number(value.toFixed(2))} Jam`

export default function MemberDashboard() {
  const { user } = useAuth()
  const { getMemberByEmail } = useApp()
  const member = user?.email ? getMemberByEmail(user.email) : undefined

  return (
    <DashboardShell title="Member Dashboard" icon={<User className="w-6 h-6 text-white" />}>
      {!member ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">
              Data member belum tersedia. Silakan minta operator mendaftarkan akun dan deposit Anda terlebih dahulu.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Level Akun', value: member.level, icon: Award, color: 'text-yellow-300', bg: 'bg-yellow-400/10' },
              { label: 'Total Deposit', value: formatCurrency(member.totalDepositAmount), icon: CreditCard, color: 'text-green-400', bg: 'bg-green-400/10' },
              { label: 'Saldo Utama', value: formatHours(member.mainTimeBalance), icon: Wallet, color: 'text-primary', bg: 'bg-primary/10' },
              { label: 'Saldo Bonus', value: formatHours(member.bonusTimeBalance), icon: Clock3, color: 'text-accent', bg: 'bg-accent/10' },
            ].map(stat => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg}`}>
                      <stat.icon className={`h-7 w-7 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Akun Member</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Nama Member: <span className="text-white">{member.name}</span></p>
                <p>Email: <span className="text-white">{member.email}</span></p>
                <p>Cabang: <span className="text-white">{member.branchName}</span></p>
                <p>Nomor Member: <span className="text-white">{member.memberNumber}</span></p>
                <p>NIK Sistem: <span className="text-white">{member.nik}</span></p>
                <p>Kode Unit: <span className="text-white">{member.assignedUnitCode}</span></p>
                <p>Diskon Personal: <span className="text-white">{member.discountPercent}%</span></p>
                <p>Tanggal Registrasi: <span className="text-white">{member.createdAt}</span></p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aturan Penggunaan Deposit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="rounded-xl border border-border bg-card/50 p-4">
                  <p className="font-semibold text-white">Ketentuan Saldo Waktu</p>
                  <p className="mt-2">Saldo utama wajib dihabiskan terlebih dahulu sebelum bonus time dapat digunakan.</p>
                </div>
                <div className="rounded-xl border border-border bg-card/50 p-4">
                  <p className="font-semibold text-white">Diskon Personal</p>
                  <p className="mt-2">Diskon 5% berlaku saat member bermain secara personal di luar pemakaian bonus time.</p>
                </div>
                <div className="rounded-xl border border-border bg-card/50 p-4">
                  <p className="font-semibold text-white">Otorisasi Deposit</p>
                  <p className="mt-2">Semua proses deposit hanya dapat dilakukan oleh actor operator.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Riwayat Deposit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {member.depositHistory.length === 0 && (
                <div className="rounded-xl border border-border bg-card/40 p-4 text-sm text-muted-foreground">
                  Belum ada riwayat deposit pada akun ini.
                </div>
              )}

              {member.depositHistory.map(history => (
                <div key={history.id} className="rounded-xl border border-border bg-card/40 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-white">{formatCurrency(history.amount)}</p>
                      <p className="text-xs text-muted-foreground">
                        Diproses oleh {history.processedBy} · {new Date(history.date).toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div className="rounded-lg bg-background/60 px-3 py-2">
                        <p className="text-xs text-muted-foreground">Level</p>
                        <p className="font-semibold text-white">{history.level}</p>
                      </div>
                      <div className="rounded-lg bg-background/60 px-3 py-2">
                        <p className="text-xs text-muted-foreground">Saldo Utama</p>
                        <p className="font-semibold text-white">+{formatHours(history.mainTimeAdded)}</p>
                      </div>
                      <div className="rounded-lg bg-background/60 px-3 py-2">
                        <p className="text-xs text-muted-foreground">Bonus Time</p>
                        <p className="font-semibold text-white">+{formatHours(history.bonusTimeAdded)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="mt-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="flex items-start gap-4 p-6">
                <ShieldCheck className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold text-white">Rangkuman Benefit Member</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    GOLD minimal deposit Rp 500.000 mendapatkan 35 jam saldo utama dan 15 jam bonus.
                    PLATINUM minimal deposit Rp 1.000.000 mendapatkan 70 jam saldo utama dan 30 jam bonus.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </DashboardShell>
  )
}
