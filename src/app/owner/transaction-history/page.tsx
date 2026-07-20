'use client'

import DashboardShell from '@/components/DashboardShell'
import { Search, Filter, Trash2, FileText, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useState } from 'react'
import { useApp } from '@/contexts/AppContext'

export default function TransactionHistoryPage() {
  const { transactions, deleteTransaction } = useApp()
  const [search, setSearch] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null)

  const filteredTransactions = transactions.filter(tx => 
    tx.id.toLowerCase().includes(search.toLowerCase()) ||
    tx.customer.toLowerCase().includes(search.toLowerCase()) ||
    (tx.customerPhone && tx.customerPhone.toLowerCase().includes(search.toLowerCase())) ||
    (tx.paketName && tx.paketName.toLowerCase().includes(search.toLowerCase())) ||
    tx.outlet.toLowerCase().includes(search.toLowerCase())
  )

  const handleDeleteClick = (id: string) => {
    setTransactionToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete)
      setIsDeleteDialogOpen(false)
      setTransactionToDelete(null)
    }
  }

  return (
    <DashboardShell title="Riwayat Transaksi" icon={<FileText className="w-6 h-6 text-white" />}>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari transaksi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <Button variant="accent">
          <Download className="w-5 h-5 mr-2" /> Export Data
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle>Data Transaksi</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-card/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Paket</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Metode Bayar</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Outlet</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Jumlah</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-card/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{tx.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div>{tx.customer}</div>
                      {tx.customerPhone && <div className="text-xs text-muted-foreground">{tx.customerPhone}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.paketName || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.paymentMethod}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.outlet}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">{tx.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        tx.status === 'Success' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(tx.id)}
                      >
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-muted-foreground">
                      Tidak ada transaksi ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Transaksi</DialogTitle>
            <DialogDescription>
              Apakah kamu yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="accent" className="bg-red-500 hover:bg-red-600" type="button" onClick={confirmDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
