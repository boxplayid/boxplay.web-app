'use client'

import DashboardShell from '@/components/DashboardShell'
import { FileText, Download, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const attendanceData = [
  { id: 1, name: 'Rizky Operator', outlet: 'BoxPlay Padang', date: '2026-06-14', checkIn: '08:00', checkOut: '17:00', status: 'Hadir' },
  { id: 2, name: 'Siti Operator', outlet: 'BoxPlay Bukittinggi', date: '2026-06-14', checkIn: '08:15', checkOut: null, status: 'Belum Pulang' },
  { id: 3, name: 'Budi Operator', outlet: 'BoxPlay Padang', date: '2026-06-13', checkIn: '09:00', checkOut: '18:00', status: 'Terlambat' },
]

export default function AttendanceReportPage() {
  const [selectedDate, setSelectedDate] = useState('2026-06-14')

  return (
    <DashboardShell title="Laporan Absensi" icon={<FileText className="w-6 h-6 text-white" />}>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-card border border-border rounded-xl py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <Button variant="accent">
          <Download className="w-5 h-5 mr-2" /> Export PDF
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle>Data Absensi</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-card/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Outlet</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Check In</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Check Out</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {attendanceData.map((att) => (
                  <tr key={att.id} className="hover:bg-card/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{att.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{att.outlet}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{att.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{att.checkIn}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{att.checkOut || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        att.status === 'Hadir' ? 'bg-green-400/10 text-green-400' :
                        att.status === 'Belum Pulang' ? 'bg-yellow-400/10 text-yellow-400' :
                        'bg-red-400/10 text-red-400'
                      }`}>
                        {att.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
