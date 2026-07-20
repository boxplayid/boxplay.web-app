'use client'

import DashboardShell from '@/components/DashboardShell'
import { FileText, Printer, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function PrintPage() {
  return (
    <DashboardShell title="Cetak" icon={<FileText className="w-6 h-6 text-white" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:border-primary/50 transition-all cursor-pointer">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Laporan Transaksi</h3>
            <p className="text-muted-foreground mb-6">Cetak laporan riwayat transaksi</p>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <input type="date" className="flex-1 bg-card border border-border rounded-lg py-2 px-3 text-sm" placeholder="Dari Tanggal" />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <input type="date" className="flex-1 bg-card border border-border rounded-lg py-2 px-3 text-sm" placeholder="Sampai Tanggal" />
              </div>
              <Button variant="accent" className="w-full">
                <Printer className="w-5 h-5 mr-2" /> Cetak Laporan
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-accent/50 transition-all cursor-pointer">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Laporan Absensi</h3>
            <p className="text-muted-foreground mb-6">Cetak laporan kehadiran karyawan</p>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <input type="date" className="flex-1 bg-card border border-border rounded-lg py-2 px-3 text-sm" placeholder="Dari Tanggal" />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <input type="date" className="flex-1 bg-card border border-border rounded-lg py-2 px-3 text-sm" placeholder="Sampai Tanggal" />
              </div>
              <Button variant="accent" className="w-full">
                <Printer className="w-5 h-5 mr-2" /> Cetak Laporan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
