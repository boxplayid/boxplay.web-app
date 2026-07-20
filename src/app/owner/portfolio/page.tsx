'use client'

import DashboardShell from '@/components/DashboardShell'
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useRef } from 'react'
import { useApp } from '@/contexts/AppContext'
import { fileToBase64 } from '@/lib/utils'

export default function PortfolioPage() {
  const { portfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem, dashboardStats, updateDashboardStats } = useApp()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isStatsDialogOpen, setIsStatsDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [formData, setFormData] = useState<{ name: string; desc: string; status: 'Active' | 'Coming Soon' | 'Completed'; image: string }>({ name: '', desc: '', status: 'Active', image: '' })
  const [statsFormData, setStatsFormData] = useState(dashboardStats)
  const addImageInputRef = useRef<HTMLInputElement>(null)
  const editImageInputRef = useRef<HTMLInputElement>(null)

  const handleAddImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const base64 = await fileToBase64(file)
        setFormData({ ...formData, image: base64 })
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    }
  }

  const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const base64 = await fileToBase64(file)
        setFormData({ ...formData, image: base64 })
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    }
  }

  const handleAddItem = () => {
    addPortfolioItem(formData)
    setFormData({ name: '', desc: '', status: 'Active', image: '' })
    setIsAddDialogOpen(false)
  }

  const handleEditItem = () => {
    if (selectedItem) {
      updatePortfolioItem(selectedItem.id, formData)
      setSelectedItem(null)
      setFormData({ name: '', desc: '', status: 'Active', image: '' })
      setIsEditDialogOpen(false)
    }
  }

  const handleOpenEditDialog = (item: any) => {
    setSelectedItem(item)
    setFormData(item)
    setIsEditDialogOpen(true)
  }

  const handleSaveStats = () => {
    updateDashboardStats(statsFormData)
    setIsStatsDialogOpen(false)
  }

  return (
    <DashboardShell title="Portofolio & Statistik" icon={<Edit className="w-6 h-6 text-white" />}>
      <div className="space-y-6">
        {/* Dashboard Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Statistik Dashboard</CardTitle>
            <Button variant="accent" onClick={() => { setStatsFormData(dashboardStats); setIsStatsDialogOpen(true) }}>
              <Edit className="w-5 h-5 mr-2" /> Edit Statistik
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-card/50 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground">Total Outlet</p>
                <p className="text-2xl font-bold">{dashboardStats.totalOutlet}</p>
              </div>
              <div className="p-4 bg-card/50 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground">Total Mitra</p>
                <p className="text-2xl font-bold">{dashboardStats.totalMitra}</p>
              </div>
              <div className="p-4 bg-card/50 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground">Total Investor</p>
                <p className="text-2xl font-bold">{dashboardStats.totalInvestor}</p>
              </div>
              <div className="p-4 bg-card/50 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground">Revenue Bulanan</p>
                <p className="text-2xl font-bold">{dashboardStats.monthlyRevenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Items */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Daftar Portofolio</CardTitle>
            <Button variant="accent" onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="w-5 h-5 mr-2" /> Tambah Item
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold">{item.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Active' ? 'bg-success/20 text-success' :
                        item.status === 'Coming Soon' ? 'bg-warning/20 text-warning' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleOpenEditDialog(item)}>
                        <Edit className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500" onClick={() => deletePortfolioItem(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {portfolioItems.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  Belum ada item portofolio.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Item Portofolio</DialogTitle>
            <DialogDescription>Tambahkan item baru ke portofolio Anda.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masukkan nama item"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Deskripsi</Label>
              <Input
                id="desc"
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                placeholder="Masukkan deskripsi"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full bg-card border border-border rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="Active">Active</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Gambar</Label>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image">URL Gambar</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Atau Upload File</Label>
                  <input
                    ref={addImageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAddImageUpload}
                  />
                  <Button
                    variant="outline"
                    onClick={() => addImageInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Pilih File Gambar
                  </Button>
                </div>
              </div>
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-xl mt-2 border border-border"
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              <X className="w-5 h-5 mr-2" /> Batal
            </Button>
            <Button variant="accent" onClick={handleAddItem}>
              <Save className="w-5 h-5 mr-2" /> Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item Portofolio</DialogTitle>
            <DialogDescription>Edit item portofolio Anda.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nama</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-desc">Deskripsi</Label>
              <Input
                id="edit-desc"
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <select
                id="edit-status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full bg-card border border-border rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="Active">Active</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Gambar</Label>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-image">URL Gambar</Label>
                  <Input
                    id="edit-image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Atau Upload File</Label>
                  <input
                    ref={editImageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleEditImageUpload}
                  />
                  <Button
                    variant="outline"
                    onClick={() => editImageInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Pilih File Gambar
                  </Button>
                </div>
              </div>
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-xl mt-2 border border-border"
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              <X className="w-5 h-5 mr-2" /> Batal
            </Button>
            <Button variant="accent" onClick={handleEditItem}>
              <Save className="w-5 h-5 mr-2" /> Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats Dialog */}
      <Dialog open={isStatsDialogOpen} onOpenChange={setIsStatsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Statistik Dashboard</DialogTitle>
            <DialogDescription>Edit statistik yang akan ditampilkan di halaman utama.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="totalOutlet">Total Outlet</Label>
              <Input
                id="totalOutlet"
                type="number"
                value={statsFormData.totalOutlet}
                onChange={(e) => setStatsFormData({ ...statsFormData, totalOutlet: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalMitra">Total Mitra</Label>
              <Input
                id="totalMitra"
                type="number"
                value={statsFormData.totalMitra}
                onChange={(e) => setStatsFormData({ ...statsFormData, totalMitra: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalInvestor">Total Investor</Label>
              <Input
                id="totalInvestor"
                type="number"
                value={statsFormData.totalInvestor}
                onChange={(e) => setStatsFormData({ ...statsFormData, totalInvestor: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyRevenue">Revenue Bulanan</Label>
              <Input
                id="monthlyRevenue"
                value={statsFormData.monthlyRevenue}
                onChange={(e) => setStatsFormData({ ...statsFormData, monthlyRevenue: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatsDialogOpen(false)}>
              <X className="w-5 h-5 mr-2" /> Batal
            </Button>
            <Button variant="accent" onClick={handleSaveStats}>
              <Save className="w-5 h-5 mr-2" /> Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
