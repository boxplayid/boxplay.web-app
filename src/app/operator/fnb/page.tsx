'use client'

import DashboardShell from '@/components/DashboardShell'
import { Coffee, Plus, ShoppingCart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const menuItems = [
  { id: 1, name: 'Nasi Goreng Gaming', price: 'Rp 25.000', category: 'Makanan', image: '🍚' },
  { id: 2, name: 'Mie Goreng Spesial', price: 'Rp 20.000', category: 'Makanan', image: '🍜' },
  { id: 3, name: 'Teh Botol', price: 'Rp 5.000', category: 'Minuman', image: '🍵' },
  { id: 4, name: 'Es Kopi Susu', price: 'Rp 10.000', category: 'Minuman', image: '☕' },
  { id: 5, name: 'Keripik Kentang', price: 'Rp 8.000', category: 'Snack', image: '🍟' },
  { id: 6, name: 'Air Mineral', price: 'Rp 3.000', category: 'Minuman', image: '💧' },
]

export default function OperatorFNBPage() {
  return (
    <DashboardShell title="Food & Beverage" icon={<Coffee className="w-6 h-6 text-white" />}>
      <div className="flex justify-end mb-6">
        <Button variant="accent">
          <ShoppingCart className="w-5 h-5 mr-2" /> Keranjang
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map(item => (
          <Card key={item.id} className="hover:border-primary/30 transition-all">
            <CardContent className="p-6">
              <div className="text-6xl mb-4">{item.image}</div>
              <h4 className="text-lg font-semibold mb-1">{item.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{item.category}</p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-primary">{item.price}</p>
                <Button variant="accent" size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Tambah
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
