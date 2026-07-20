'use client'

import { useMemo, useState } from 'react'
import DashboardShell from '@/components/DashboardShell'
import { Users, Award, UserPlus, Wallet, CreditCard, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useApp } from '@/contexts/AppContext'
import { useAuth } from '@/contexts/AuthContext'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)

const formatHours = (value: number) => `${Number(value.toFixed(2))} Jam`

export default function OperatorMembershipPage() {
  const { members, branches, units, registerMember, processMemberDeposit } = useApp()
  const { user } = useAuth()
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [success, setSuccess] = useState('')
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null)
  const [depositAmount, setDepositAmount] = useState('')
  const [registerForm, setRegisterForm] = useState({
    name: '',
    phone: '',
    email: '',
    level: 'GOLD' as 'GOLD' | 'PLATINUM',
    branchId: branches[0]?.id ?? 0,
    assignedUnitCode: units[0]?.code ?? '',
  })

  const selectedBranch = branches.find(branch => branch.id === registerForm.branchId)
  const availableUnits = useMemo(
    () => units.filter(unit => unit.branchId === registerForm.branchId),
    [registerForm.branchId, units]
  )

  const totalDeposit = members.reduce((sum, member) => sum + member.totalDepositAmount, 0)
  const totalMainHours = members.reduce((sum, member) => sum + member.mainTimeBalance, 0)
  const totalBonusHours = members.reduce((sum, member) => sum + member.bonusTimeBalance, 0)

  const resetRegisterForm = () => {
    setRegisterForm({
      name: '',
      phone: '',
      email: '',
      level: 'GOLD',
      branchId: branches[0]?.id ?? 0,
      assignedUnitCode: units[0]?.code ?? '',
    })
  }

  const showSuccess = (message: string) => {
    setSuccess(message)
    window.setTimeout(() => setSuccess(''), 3500)
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const selectedUnit = availableUnits.find(unit => unit.code === registerForm.assignedUnitCode)
    if (!selectedBranch || !selectedUnit) return

    const newMember = registerMember({
      name: registerForm.name,
      phone: registerForm.phone,
      email: registerForm.email,
      nik: selectedUnit.code,
      branchId: selectedBranch.id,
      branchName: selectedBranch.name,
      assignedUnitCode: selectedUnit.code,
      level: registerForm.level,
    })

    setIsRegisterOpen(false)
    resetRegisterForm()
    showSuccess(`Member ${newMember.name} berhasil dibuat dengan nomor ${newMember.memberNumber}.`)
  }

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMemberId) return

    const result = processMemberDeposit(
      selectedMemberId,
      Number(depositAmount),
      user?.name || 'Operator'
    )

    if (!result.success) {
      showSuccess(result.message)
      return
    }

    setIsDepositOpen(false)
    setSelectedMemberId(null)
    setDepositAmount('')
    showSuccess(result.message)
  }

  return (
    <DashboardShell title="Membership" icon={<Award className="w-6 h-6 text-white" />}>
      {success && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-400/30 bg-green-400/10 px-4 py-3 text-green-300">
          <CheckCircle2 className="h-5 w-5" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Member', value: String(members.length), icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Total Deposit', value: formatCurrency(totalDeposit), icon: CreditCard, color: 'text-green-400', bg: 'bg-green-400/10' },
          { label: 'Saldo Utama', value: formatHours(totalMainHours), icon: Wallet, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Saldo Bonus', value: formatHours(totalBonusHours), icon: Award, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
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

      <div className="mb-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Kelola Member</CardTitle>
            <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
              <DialogTrigger asChild>
                <Button variant="accent">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Daftar Member Baru
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Registrasi Member</DialogTitle>
                  <DialogDescription>
                    Nomor member dan NIK sistem akan mengikuti kode unit yang dipilih operator.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="member-name">Nama Member</Label>
                    <Input
                      id="member-name"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Masukkan nama member"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-phone">Nomor HP</Label>
                    <Input
                      id="member-phone"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="08xxxxxxxxxx"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-email">Email</Label>
                    <Input
                      id="member-email"
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="member@boxplay.id"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="member-level">Level Akun</Label>
                      <select
                        id="member-level"
                        value={registerForm.level}
                        onChange={(e) =>
                          setRegisterForm(prev => ({ ...prev, level: e.target.value as 'GOLD' | 'PLATINUM' }))
                        }
                        className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="GOLD">GOLD</option>
                        <option value="PLATINUM">PLATINUM</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="member-branch">Cabang</Label>
                      <select
                        id="member-branch"
                        value={registerForm.branchId}
                        onChange={(e) => {
                          const nextBranchId = Number(e.target.value)
                          const nextUnits = units.filter(unit => unit.branchId === nextBranchId)
                          setRegisterForm(prev => ({
                            ...prev,
                            branchId: nextBranchId,
                            assignedUnitCode: nextUnits[0]?.code || '',
                          }))
                        }}
                        className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        {branches.map(branch => (
                          <option key={branch.id} value={branch.id}>
                            {branch.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-unit">Kode Unit / NIK Sistem</Label>
                    <select
                      id="member-unit"
                      value={registerForm.assignedUnitCode}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, assignedUnitCode: e.target.value }))}
                      className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {availableUnits.map(unit => (
                        <option key={unit.id} value={unit.code}>
                          {unit.code} - {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="rounded-xl border border-border bg-background/40 p-4 text-sm text-muted-foreground">
                    Deposit hanya dapat diproses oleh operator. Diskon personal member otomatis 5% di luar pemakaian bonus time.
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsRegisterOpen(false)}>
                      Batal
                    </Button>
                    <Button type="submit" variant="accent">
                      Simpan Member
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border bg-card/50 p-5">
              <h3 className="mb-3 text-lg font-semibold">Aturan Deposit</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>GOLD: minimal deposit Rp 500.000 untuk saldo utama 35 jam dan bonus 15 jam.</p>
                <p>PLATINUM: minimal deposit Rp 1.000.000 untuk saldo utama 70 jam dan bonus 30 jam.</p>
                <p>Saldo bonus hanya bisa dipakai setelah saldo utama habis.</p>
                <p>Diskon personal member 5% berlaku saat bermain di luar bonus time.</p>
              </div>
            </div>

            <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Proses Deposit Member</DialogTitle>
                  <DialogDescription>
                    Operator memproses deposit sesuai level akun member.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleDepositSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deposit-member">Pilih Member</Label>
                    <select
                      id="deposit-member"
                      value={selectedMemberId ?? ''}
                      onChange={(e) => setSelectedMemberId(Number(e.target.value))}
                      className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    >
                      <option value="" disabled>Pilih member</option>
                      {members.map(member => (
                        <option key={member.id} value={member.id}>
                          {member.name} - {member.level} - {member.memberNumber}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deposit-amount">Nominal Deposit</Label>
                    <Input
                      id="deposit-amount"
                      type="number"
                      min={0}
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="500000"
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDepositOpen(false)}>
                      Batal
                    </Button>
                    <Button type="submit" variant="accent">
                      Proses Deposit
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="w-full" onClick={() => setIsDepositOpen(true)}>
              <Wallet className="mr-2 h-5 w-5" />
              Input Deposit Member
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histori Deposit Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {members.flatMap(member =>
              member.depositHistory.slice(0, 1).map(history => ({
                ...history,
                memberName: member.name,
                memberNumber: member.memberNumber,
              }))
            ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5).map(history => (
              <div key={history.id} className="rounded-xl border border-border bg-card/50 p-4">
                <p className="font-semibold">{history.memberName}</p>
                <p className="text-xs text-muted-foreground">{history.memberNumber}</p>
                <p className="mt-2 text-sm text-green-300">{formatCurrency(history.amount)}</p>
                <p className="text-xs text-muted-foreground">
                  +{formatHours(history.mainTimeAdded)} utama, +{formatHours(history.bonusTimeAdded)} bonus
                </p>
              </div>
            ))}
            {members.every(member => member.depositHistory.length === 0) && (
              <p className="text-sm text-muted-foreground">
                Belum ada transaksi deposit. Proses deposit pertama dari operator.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {members.map(member => (
          <Card key={member.id} className="hover:border-primary/30 transition-all">
            <CardContent className="p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Users className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{member.name}</h4>
                    <p className="text-xs text-muted-foreground">{member.memberNumber}</p>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  member.level === 'PLATINUM'
                    ? 'bg-cyan-400/10 text-cyan-300'
                    : 'bg-yellow-400/10 text-yellow-300'
                }`}>
                  {member.level}
                </span>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Cabang: <span className="text-white">{member.branchName}</span></p>
                <p>Kode Unit / NIK: <span className="text-white">{member.assignedUnitCode}</span></p>
                <p>Saldo Utama: <span className="text-white">{formatHours(member.mainTimeBalance)}</span></p>
                <p>Saldo Bonus: <span className="text-white">{formatHours(member.bonusTimeBalance)}</span></p>
                <p>Total Deposit: <span className="text-white">{formatCurrency(member.totalDepositAmount)}</span></p>
                <p>Diskon Personal: <span className="text-white">{member.discountPercent}%</span></p>
              </div>

              <Button
                variant="accent"
                className="mt-5 w-full"
                onClick={() => {
                  setSelectedMemberId(member.id)
                  setDepositAmount(member.level === 'PLATINUM' ? '1000000' : '500000')
                  setIsDepositOpen(true)
                }}
              >
                Proses Deposit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
