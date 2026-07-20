'use client'

import DashboardShell from '@/components/DashboardShell'
import { Gamepad2, Plus, Edit, Trash2, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { useState } from 'react'
import { useApp } from '@/contexts/AppContext'

export default function UnitsPage() {
  const { units, branches, addUnit, updateUnit, deleteUnit } = useApp()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [currentUnit, setCurrentUnit] = useState<typeof units[0] | null>(null)
  const [formData, setFormData] = useState<{ code: string; name: string; type: string; status: 'Available' | 'In Use' | 'Maintenance'; branchId: number }>({ code: '', name: '', type: '', status: 'Available', branchId: 0 })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const branch = branches.find(b => b.id === formData.branchId)
      if (branch) {
        addUnit({
          ...formData,
          branchName: branch.name,
          status: formData.status as any
        })
        setLoading(false)
        setIsAddOpen(false)
        setSuccess('Unit berhasil ditambahkan!')
        setTimeout(() => setSuccess(''), 3000)
        setFormData({ code: '', name: '', type: '', status: 'Available', branchId: 0 })
      }
    }, 800)
  }

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUnit) return
    setLoading(true)
    setTimeout(() => {
      const branch = branches.find(b => b.id === formData.branchId)
      if (branch) {
        updateUnit(currentUnit.id, {
          ...formData,
          branchName: branch.name,
          status: formData.status as any
        })
        setLoading(false)
        setIsEditOpen(false)
        setSuccess('Unit berhasil diperbarui!')
        setTimeout(() => setSuccess(''), 3000)
      }
    }, 800)
  }

  const handleDeleteConfirm = () => {
    if (!currentUnit) return
    setLoading(true)
    setTimeout(() => {
      deleteUnit(currentUnit.id)
      setLoading(false)
      setIsDeleteOpen(false)
      setSuccess('Unit berhasil dihapus!')
      setTimeout(() => setSuccess(''), 3000)
    }, 800)
  }

  const openEditDialog = (unit: typeof units[0]) => {
    setCurrentUnit(unit)
    setFormData({
      code: unit.code,
      name: unit.name,
      type: unit.type,
      status: unit.status,
      branchId: unit.branchId
    })
    setIsEditOpen(true)
  }

  const openDeleteDialog = (unit: typeof units[0]) => {
    setCurrentUnit(unit)
    setIsDeleteOpen(true)
  }

  return (
    <DashboardShell title="Unit" icon={<Gamepad2 className="w-6 h-6 text-white" />}>
      {success && (
        <div className="mb-6 flex items-center gap-2 bg-green-400/10 border border-green-400/30 rounded-xl px-4 py-3 text-green-400">
          <CheckCircle2 className="w-5 h-5" />
          {success}
        </div>
      )}

      <div className="flex justify-end mb-8">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button variant="accent">
              <Plus className="w-5 h-5 mr-2" /> Tambah Unit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Unit Baru</DialogTitle>
              <DialogDescription>Masukkan detail unit gaming baru.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Kode Unit</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="PS5-01"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nama Unit</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="PlayStation 5"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipe Unit</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="PS5/PS4/Xbox"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchId">Cabang</Label>
                <select
                  id="branchId"
                  value={formData.branchId}
                  onChange={(e) => setFormData({ ...formData, branchId: Number(e.target.value) })}
                  className="w-full h-12 bg-card border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                >
                  <option value={0}>Pilih Cabang</option>
                  {branches.map(branch => (
                    <option key={branch.id} value={branch.id}>{branch.name} ({branch.city})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full h-12 bg-card border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="Available">Available</option>
                  <option value="In Use">In Use</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddOpen(false)} disabled={loading}>
                  Batal
                </Button>
                <Button variant="accent" type="submit" disabled={loading}>
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit) => (
          <Card key={unit.id} className="hover:border-primary/30 transition-all">
            <CardContent className="p-7">
              <div className="flex justify-between items-start mb-5">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Gamepad2 className="w-7 h-7 text-primary" />
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(unit)}>
                    <Edit className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(unit)}>
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-primary font-semibold mb-1">{unit.code}</p>
              <h3 className="text-xl font-semibold mb-1">{unit.name}</h3>
              <p className="text-muted-foreground mb-1">{unit.type}</p>
              <p className="text-muted-foreground">{unit.branchName}</p>
              <div className="mt-5">
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  unit.status === 'Available' ? 'bg-green-400/10 text-green-400' :
                  unit.status === 'In Use' ? 'bg-primary/10 text-primary' :
                  'bg-yellow-400/10 text-yellow-400'
                }`}>
                  {unit.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Unit</DialogTitle>
            <DialogDescription>Perbarui detail unit.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-code">Kode Unit</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="PS5-01"
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nama Unit</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="PlayStation 5"
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-type">Tipe Unit</Label>
              <Input
                id="edit-type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="PS5/PS4/Xbox"
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-branchId">Cabang</Label>
              <select
                id="edit-branchId"
                value={formData.branchId}
                onChange={(e) => setFormData({ ...formData, branchId: Number(e.target.value) })}
                className="w-full h-12 bg-card border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              >
                <option value={0}>Pilih Cabang</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>{branch.name} ({branch.city})</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <select
                id="edit-status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full h-12 bg-card border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsEditOpen(false)} disabled={loading}>
                Batal
              </Button>
              <Button variant="accent" type="submit" disabled={loading}>
                {loading ? 'Menyimpan...' : 'Perbarui'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Unit</DialogTitle>
            <DialogDescription>
              Apakah kamu yakin ingin menghapus unit "{currentUnit?.code} - {currentUnit?.name}"? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setIsDeleteOpen(false)} disabled={loading}>
              Batal
            </Button>
            <Button variant="accent" className="bg-red-500 hover:bg-red-600" type="button" onClick={handleDeleteConfirm} disabled={loading}>
              {loading ? 'Menghapus...' : 'Hapus'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
