'use client'

import DashboardShell from '@/components/DashboardShell'
import { Package, Plus, Edit, Trash2, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { useState } from 'react'
import { useApp } from '@/contexts/AppContext'

export default function PaketPage() {
  const { pakets, addPaket, updatePaket, deletePaket } = useApp()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [currentPaket, setCurrentPaket] = useState<typeof pakets[0] | null>(null)
  const [formData, setFormData] = useState({ name: '', duration: '', price: 0 })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      addPaket(formData)
      setLoading(false)
      setIsAddOpen(false)
      setSuccess('Paket berhasil ditambahkan!')
      setTimeout(() => setSuccess(''), 3000)
      setFormData({ name: '', duration: '', price: 0 })
    }, 800)
  }

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentPaket) return
    setLoading(true)
    setTimeout(() => {
      updatePaket(currentPaket.id, formData)
      setLoading(false)
      setIsEditOpen(false)
      setSuccess('Paket berhasil diperbarui!')
      setTimeout(() => setSuccess(''), 3000)
    }, 800)
  }

  const handleDeleteConfirm = () => {
    if (!currentPaket) return
    setLoading(true)
    setTimeout(() => {
      deletePaket(currentPaket.id)
      setLoading(false)
      setIsDeleteOpen(false)
      setSuccess('Paket berhasil dihapus!')
      setTimeout(() => setSuccess(''), 3000)
    }, 800)
  }

  const openEditDialog = (paket: typeof pakets[0]) => {
    setCurrentPaket(paket)
    setFormData(paket)
    setIsEditOpen(true)
  }

  const openDeleteDialog = (paket: typeof pakets[0]) => {
    setCurrentPaket(paket)
    setIsDeleteOpen(true)
  }

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(num)
  }

  return (
    <DashboardShell title="Paket" icon={<Package className="w-6 h-6 text-white" />}>
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
              <Plus className="w-5 h-5 mr-2" /> Tambah Paket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Paket Baru</DialogTitle>
              <DialogDescription>Masukkan detail paket baru.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Paket</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Paket 1 Jam"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Durasi</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="60 Menit"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Harga</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                  placeholder="50000"
                  required
                  className="h-12"
                />
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
        {pakets.map((paket) => (
          <Card key={paket.id} className="hover:border-primary/30 transition-all">
            <CardContent className="p-7">
              <div className="flex justify-between items-start mb-5">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <Package className="w-7 h-7 text-accent" />
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(paket)}>
                    <Edit className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(paket)}>
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </Button>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">{paket.name}</h3>
              <p className="text-muted-foreground mt-1">{paket.duration}</p>
              <div className="mt-5">
                <p className="text-xs text-muted-foreground">Harga</p>
                <p className="text-2xl font-bold text-primary">{formatRupiah(paket.price)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Paket</DialogTitle>
            <DialogDescription>Perbarui detail paket.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nama Paket</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Paket 1 Jam"
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-duration">Durasi</Label>
              <Input
                id="edit-duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="60 Menit"
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price">Harga</Label>
              <Input
                id="edit-price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                placeholder="50000"
                required
                className="h-12"
              />
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
            <DialogTitle>Hapus Paket</DialogTitle>
            <DialogDescription>
              Apakah kamu yakin ingin menghapus paket "{currentPaket?.name}"? Tindakan ini tidak dapat dibatalkan.
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