'use client'

import DashboardShell from '@/components/DashboardShell'
import { Building2, Plus, Edit, Trash2, MapPin, CheckCircle2, Upload } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { useState, useRef } from 'react'
import { useApp } from '@/contexts/AppContext'
import { fileToBase64 } from '@/lib/utils'

export default function BranchesPage() {
  const { branches, addBranch, updateBranch, deleteBranch } = useApp()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [currentBranch, setCurrentBranch] = useState<typeof branches[0] | null>(null)
  const [formData, setFormData] = useState<{ name: string; city: string; address: string; status: 'Active' | 'Coming Soon' | 'Inactive'; units: number; qrisUrl: string; googleMapsUrl?: string }>({ name: '', city: '', address: '', status: 'Active', units: 0, qrisUrl: '', googleMapsUrl: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const addQrisInputRef = useRef<HTMLInputElement>(null)
  const editQrisInputRef = useRef<HTMLInputElement>(null)

  const handleAddQrisUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const base64 = await fileToBase64(file)
        setFormData({ ...formData, qrisUrl: base64 })
      } catch (error) {
        console.error('Error uploading QRIS:', error)
      }
    }
  }

  const handleEditQrisUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const base64 = await fileToBase64(file)
        setFormData({ ...formData, qrisUrl: base64 })
      } catch (error) {
        console.error('Error uploading QRIS:', error)
      }
    }
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      addBranch(formData)
      setLoading(false)
      setIsAddOpen(false)
      setSuccess('Cabang berhasil ditambahkan!')
      setTimeout(() => setSuccess(''), 3000)
      setFormData({ name: '', city: '', address: '', status: 'Active', units: 0, qrisUrl: '', googleMapsUrl: '' })
    }, 800)
  }

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentBranch) return
    setLoading(true)
    setTimeout(() => {
      updateBranch(currentBranch.id, formData)
      setLoading(false)
      setIsEditOpen(false)
      setSuccess('Cabang berhasil diperbarui!')
      setTimeout(() => setSuccess(''), 3000)
    }, 800)
  }

  const handleDeleteConfirm = () => {
    if (!currentBranch) return
    setLoading(true)
    setTimeout(() => {
      deleteBranch(currentBranch.id)
      setLoading(false)
      setIsDeleteOpen(false)
      setSuccess('Cabang berhasil dihapus!')
      setTimeout(() => setSuccess(''), 3000)
    }, 800)
  }

  const openEditDialog = (branch: typeof branches[0]) => {
    setCurrentBranch(branch)
    setFormData({
      ...branch,
      qrisUrl: branch.qrisUrl || '',
      googleMapsUrl: branch.googleMapsUrl || ''
    })
    setIsEditOpen(true)
  }

  const openDeleteDialog = (branch: typeof branches[0]) => {
    setCurrentBranch(branch)
    setIsDeleteOpen(true)
  }

  return (
    <DashboardShell title="Cabang" icon={<Building2 className="w-6 h-6 text-white" />}>
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
              <Plus className="w-5 h-5 mr-2" /> Tambah Cabang
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Cabang Baru</DialogTitle>
              <DialogDescription>Masukkan detail cabang baru.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Cabang</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="BoxPlay [Kota]"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Kota</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Padang"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Jl. Sudirman No. 123"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="units">Jumlah Unit</Label>
                <Input
                  id="units"
                  type="number"
                  value={formData.units}
                  onChange={(e) => setFormData({ ...formData, units: parseInt(e.target.value) || 0 })}
                  placeholder="10"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full h-12 bg-card border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="Active">Active</option>
                  <option value="Coming Soon">Coming Soon</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>QRIS</Label>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="addQrisUrl">URL QRIS</Label>
                    <Input
                      id="addQrisUrl"
                      value={formData.qrisUrl}
                      onChange={(e) => setFormData({ ...formData, qrisUrl: e.target.value })}
                      placeholder="https://example.com/qris.jpg"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Atau Upload File</Label>
                    <input
                      ref={addQrisInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAddQrisUpload}
                    />
                    <Button
                      variant="outline"
                      onClick={() => addQrisInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Pilih File QRIS
                    </Button>
                  </div>
                </div>
                {formData.qrisUrl && (
                  <img
                    src={formData.qrisUrl}
                    alt="QRIS Preview"
                    className="w-40 h-40 object-contain rounded mx-auto mt-2 border border-border"
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="addGoogleMapsUrl">URL Google Maps (Embed)</Label>
                <Input
                  id="addGoogleMapsUrl"
                  value={formData.googleMapsUrl}
                  onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                  placeholder="https://www.google.com/maps/embed?pb=..."
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
        {branches.map((branch) => (
          <Card key={branch.id} className="hover:border-primary/30 transition-all">
            <CardContent className="p-7">
              <div className="flex justify-between items-start mb-5">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-accent" />
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(branch)}>
                    <Edit className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(branch)}>
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </Button>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">{branch.name}</h3>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                <MapPin className="w-4 h-4" />
                {branch.city}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{branch.address}</p>
              {branch.qrisUrl && (
                <div className="mt-4 p-3 bg-card/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">QRIS</p>
                  <img
                    src={branch.qrisUrl}
                    alt="QRIS"
                    className="w-24 h-24 object-contain rounded mx-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/QR_Code_Example.svg/200px-QR_Code_Example.svg.png'
                    }}
                  />
                </div>
              )}
              <div className="mt-5 flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground">Jumlah Unit</p>
                  <p className="text-2xl font-bold">{branch.units}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  branch.status === 'Active' ? 'bg-green-400/10 text-green-400' :
                  branch.status === 'Coming Soon' ? 'bg-yellow-400/10 text-yellow-400' :
                  'bg-red-400/10 text-red-400'
                }`}>
                  {branch.status}
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
            <DialogTitle>Edit Cabang</DialogTitle>
            <DialogDescription>Perbarui detail cabang.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nama Cabang</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="BoxPlay [Kota]"
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-city">Kota</Label>
              <Input
                id="edit-city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Padang"
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">Alamat</Label>
              <Input
                id="edit-address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Jl. Sudirman No. 123"
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-units">Jumlah Unit</Label>
              <Input
                id="edit-units"
                type="number"
                value={formData.units}
                onChange={(e) => setFormData({ ...formData, units: parseInt(e.target.value) || 0 })}
                placeholder="10"
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <select
                id="edit-status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full h-12 bg-card border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="Active">Active</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="space-y-2">
                <Label>QRIS</Label>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editQrisUrl">URL QRIS</Label>
                    <Input
                      id="editQrisUrl"
                      value={formData.qrisUrl}
                      onChange={(e) => setFormData({ ...formData, qrisUrl: e.target.value })}
                      placeholder="https://example.com/qris.jpg"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Atau Upload File</Label>
                    <input
                      ref={editQrisInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleEditQrisUpload}
                    />
                    <Button
                      variant="outline"
                      onClick={() => editQrisInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Pilih File QRIS
                    </Button>
                  </div>
                </div>
                {formData.qrisUrl && (
                  <img
                    src={formData.qrisUrl}
                    alt="QRIS Preview"
                    className="w-40 h-40 object-contain rounded mx-auto mt-2 border border-border"
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="editGoogleMapsUrl">URL Google Maps (Embed)</Label>
                <Input
                  id="editGoogleMapsUrl"
                  value={formData.googleMapsUrl}
                  onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                  placeholder="https://www.google.com/maps/embed?pb=..."
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
            <DialogTitle>Hapus Cabang</DialogTitle>
            <DialogDescription>
              Apakah kamu yakin ingin menghapus cabang "{currentBranch?.name}"? Tindakan ini tidak dapat dibatalkan.
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
