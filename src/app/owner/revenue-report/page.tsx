'use client'

import DashboardShell from '@/components/DashboardShell'
import { BarChart3, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Button } from '@/components/ui/button'

const data = [
  { month: 'Jan', outlet: 80, mitra: 40, total: 120 },
  { month: 'Feb', outlet: 70, mitra: 50, total: 120 },
  { month: 'Mar', outlet: 90, mitra: 60, total: 150 },
  { month: 'Apr', outlet: 85, mitra: 55, total: 140 },
  { month: 'Mei', outlet: 100, mitra: 70, total: 170 },
  { month: 'Jun', outlet: 110, mitra: 80, total: 190 },
]

export default function RevenueReportPage() {
  return (
    <DashboardShell title="Laporan Pendapatan" icon={<BarChart3 className="w-6 h-6 text-white" />}>
      <div className="flex justify-end mb-6">
        <Button variant="accent">
          <Download className="w-5 h-5 mr-2" /> Export PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Pendapatan Bulan Ini', value: 'Rp 190M', color: 'text-primary' },
          { label: 'Pendapatan Outlet', value: 'Rp 110M', color: 'text-accent' },
          { label: 'Pendapatan Mitra', value: 'Rp 80M', color: 'text-green-400' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trend Pendapatan 6 Bulan Terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis dataKey="month" stroke="#BDBDBD" />
                <YAxis stroke="#BDBDBD" />
                <Tooltip contentStyle={{ backgroundColor: '#121212', border: '1px solid #2A2A2A', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="outlet" fill="#2196F3" name="Outlet" />
                <Bar dataKey="mitra" fill="#9C27B0" name="Mitra" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
