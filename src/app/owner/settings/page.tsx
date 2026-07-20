'use client'

import DashboardShell from '@/components/DashboardShell'
import { Settings, Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  return (
    <DashboardShell title="Pengaturan" icon={<Settings className="w-6 h-6 text-white" />}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Umum</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Nama Perusahaan</label>
              <input type="text" defaultValue="BOXPLAY.ID" className="w-full bg-card border border-border rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Email Kontak</label>
              <input type="email" defaultValue="info@boxplay.id" className="w-full bg-card border border-border rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">No. Telepon</label>
              <input type="tel" defaultValue="+62 812-3456-7890" className="w-full bg-card border border-border rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Notifikasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifikasi</p>
                <p className="text-sm text-muted-foreground">Terima email untuk transaksi baru</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded border-border bg-card text-primary focus:ring-primary" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">WhatsApp Notifikasi</p>
                <p className="text-sm text-muted-foreground">Terima WA untuk laporan harian</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded border-border bg-card text-primary focus:ring-primary" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button variant="accent">
            <Save className="w-5 h-5 mr-2" /> Simpan Pengaturan
          </Button>
        </div>
      </div>
    </DashboardShell>
  )
}
