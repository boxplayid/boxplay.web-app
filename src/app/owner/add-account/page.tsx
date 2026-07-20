'use client'

import DashboardShell from '@/components/DashboardShell'
import { Users, UserPlus, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { useState } from 'react'

interface AccountFormData {
  name: string
  email: string
  password: string
  phone: string
}

export default function AddAccountPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [formData, setFormData] = useState<AccountFormData>({ name: '', email: '', password: '', phone: '' })
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const roles = [
    { id: 'mitra', name: 'Mitra', desc: 'Tambah akun mitra baru', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'investor', name: 'Investor', desc: 'Tambah akun investor baru', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 'operator', name: 'Operator', desc: 'Tambah akun operator baru', color: 'text-green-400', bg: 'bg-green-400/10' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setSelectedRole(null)
        setFormData({ name: '', email: '', password: '', phone: '' })
      }, 2000)
    }, 1000)
  }

  return (
    <DashboardShell title="Tambah Akun" icon={<Users className="w-6 h-6 text-white" />}>
      {isSuccess && selectedRole ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 bg-green-400/20 rounded-full flex items-center justify-center mb-6 neon-glow-blue">
            <CheckCircle2 className="w-12 h-12 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Akun Berhasil Ditambahkan!</h3>
          <p className="text-muted-foreground">Akun {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} baru telah berhasil dibuat.</p>
        </div>
      ) : !selectedRole ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Card key={role.id} className="cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${role.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <UserPlus className={`w-8 h-8 ${role.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{role.name}</h3>
                <p className="text-muted-foreground">{role.desc}</p>
                <Button variant="accent" className="w-full mt-6" onClick={() => setSelectedRole(role.id)}>
                  Pilih
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Tambah {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="phone">No. Telepon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08123456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-6 border-t border-border">
                <Button variant="outline" onClick={() => setSelectedRole(null)} disabled={loading}>
                  Batal
                </Button>
                <Button variant="accent" disabled={loading}>
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  ) : null}
                  {loading ? 'Menyimpan...' : 'Simpan Akun'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </DashboardShell>
  )
}
