'use client'

import DashboardShell from '@/components/DashboardShell'
import { CreditCard, Gamepad2, PlayCircle, PauseCircle, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useApp } from '@/contexts/AppContext'

export default function OperatorBillingPage() {
  const { user } = useAuth()
  const { units, getUnitsByBranch, updateUnit, addTransaction, pakets, branches } = useApp()
  const [selectedUnit, setSelectedUnit] = useState<typeof units[0] | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [formData, setFormData] = useState<{ customerName: string, customerPhone: string, paketId: number, paymentMethod: 'Cash' | 'QRIS' }>({ customerName: '', customerPhone: '', paketId: 0, paymentMethod: 'Cash' })

  const filteredUnits = user?.branchId ? getUnitsByBranch(user.branchId) : []
  const currentBranch = user?.branchId ? branches.find(b => b.id === user.branchId) : null

  const handleStartBilling = (unit: typeof units[0]) => {
    setSelectedUnit(unit)
    setFormData({ customerName: '', customerPhone: '', paketId: pakets.length > 0 ? pakets[0].id : 0, paymentMethod: 'Cash' })
    setIsAddOpen(true)
  }

  const handleConfirmStart = () => {
    if (!selectedUnit) return
    const selectedPaket = pakets.find(p => p.id === formData.paketId)
    updateUnit(selectedUnit.id, {
      status: 'In Use',
      currentCustomer: formData.customerName || 'Customer Baru',
      timeRemaining: selectedPaket?.duration || '1h'
    })
    setIsAddOpen(false)
  }

  const handleStopBilling = (unit: typeof units[0]) => {
    setSelectedUnit(unit)
    setIsCheckoutOpen(true)
  }

  const handleConfirmStop = () => {
    if (!selectedUnit) return
    const selectedPaket = pakets.find(p => p.id === formData.paketId) || pakets[0]
    const amount = `Rp ${selectedPaket.price.toLocaleString('id-ID')}`
    
    addTransaction({
      date: new Date().toISOString().split('T')[0],
      customer: formData.customerName || selectedUnit.currentCustomer || 'Customer Baru',
      customerPhone: formData.customerPhone,
      outlet: selectedUnit.branchName,
      paketId: selectedPaket.id,
      paketName: selectedPaket.name,
      amount,
      paymentMethod: formData.paymentMethod,
      status: 'Success',
      unitId: selectedUnit.id,
      unitName: selectedUnit.name
    })
    
    updateUnit(selectedUnit.id, {
      status: 'Available',
      currentCustomer: undefined,
      timeRemaining: undefined
    })
    setIsCheckoutOpen(false)
  }

  return (
    <DashboardShell title={`Billing ${user?.branchName || 'PlayStation'}`} icon={<CreditCard className="w-6 h-6 text-white" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUnits.map(unit => (
          <Card key={unit.id} className="hover:border-primary/30 transition-all">
            <CardContent className="p-7">
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Gamepad2 className="w-7 h-7 text-primary" />
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  unit.status === 'Available' ? 'bg-green-400/10 text-green-400' :
                  unit.status === 'In Use' ? 'bg-primary/10 text-primary' :
                  'bg-yellow-400/10 text-yellow-400'
                }`}>
                  {unit.status}
                </span>
              </div>
              <p className="text-sm text-primary font-semibold mb-1">{unit.code}</p>
              <h3 className="text-xl font-semibold mb-1">{unit.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{unit.type}</p>
              
              {unit.status === 'In Use' && unit.currentCustomer && (
                <div className="mb-4 p-3 bg-secondary-background/30 rounded-lg">
                  <p className="text-sm"><span className="font-semibold">Customer:</span> {unit.currentCustomer}</p>
                  <p className="text-sm text-primary"><span className="font-semibold">Sisa Waktu:</span> {unit.timeRemaining}</p>
                </div>
              )}

              <div className="flex gap-2">
                {unit.status === 'Available' && (
                  <Button variant="accent" className="w-full" onClick={() => handleStartBilling(unit)}>
                    <PlayCircle className="w-5 h-5 mr-2" /> Mulai Billing
                  </Button>
                )}
                {unit.status === 'In Use' && (
                  <Button className="w-full bg-red-500 hover:bg-red-600" onClick={() => handleStopBilling(unit)}>
                    <PauseCircle className="w-5 h-5 mr-2" /> Selesai
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredUnits.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            Tidak ada unit tersedia untuk cabang ini.
          </div>
        )}
      </div>

      {/* Start Billing Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mulai Billing {selectedUnit?.code} - {selectedUnit?.name}</DialogTitle>
            <DialogDescription>Masukkan data customer untuk memulai sesi billing.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customer-name">Nama Customer</Label>
              <Input
                id="customer-name"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="Masukkan nama customer"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-phone">Nomor Telepon</Label>
              <Input
                id="customer-phone"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                placeholder="081234567890"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paket">Pilih Paket</Label>
              <select
                id="paket"
                value={formData.paketId}
                onChange={(e) => setFormData({ ...formData, paketId: parseInt(e.target.value) })}
                className="w-full h-12 bg-card border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {pakets.map(paket => (
                  <option key={paket.id} value={paket.id}>{paket.name} - {paket.duration} - Rp {paket.price.toLocaleString('id-ID')}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Metode Pembayaran</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash"
                    checked={formData.paymentMethod === 'Cash'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                    className="w-4 h-4 text-primary"
                  />
                  <span>Cash</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="QRIS"
                    checked={formData.paymentMethod === 'QRIS'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                    className="w-4 h-4 text-primary"
                  />
                  <span>QRIS</span>
                </label>
              </div>
            </div>
            {formData.paymentMethod === 'QRIS' && currentBranch?.qrisUrl && (
              <div className="p-4 bg-card/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Scan QRIS di bawah ini:</p>
                <img
                  src={currentBranch.qrisUrl}
                  alt="QRIS"
                  className="mx-auto w-48 h-48 object-contain rounded-lg border border-border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/QR_Code_Example.svg/200px-QR_Code_Example.svg.png'
                  }}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Batal</Button>
            <Button variant="accent" onClick={handleConfirmStart}>
              <CheckCircle2 className="w-5 h-5 mr-2" /> Konfirmasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stop Billing Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selesaikan Billing {selectedUnit?.code} - {selectedUnit?.name}</DialogTitle>
            <DialogDescription>Konfirmasi untuk mengakhiri sesi billing customer ini.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-card/50 rounded-lg mb-4">
              <p className="text-sm text-muted-foreground">Customer: <span className="font-semibold text-white">{selectedUnit?.currentCustomer}</span></p>
              <p className="text-sm text-muted-foreground">Paket: <span className="font-semibold text-white">{pakets.find(p => p.id === formData.paketId)?.name || 'Paket 1 Jam'}</span></p>
              <p className="text-sm text-muted-foreground">Metode Pembayaran: <span className="font-semibold text-white">{formData.paymentMethod}</span></p>
              <p className="text-xl font-bold text-primary mt-2">
                Total: {pakets.find(p => p.id === formData.paketId) ? `Rp ${pakets.find(p => p.id === formData.paketId)!.price.toLocaleString('id-ID')}` : 'Rp 50.000'}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>Batal</Button>
            <Button variant="accent" className="bg-green-500 hover:bg-green-600" onClick={handleConfirmStop}>
              <CheckCircle2 className="w-5 h-5 mr-2" /> Selesaikan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
