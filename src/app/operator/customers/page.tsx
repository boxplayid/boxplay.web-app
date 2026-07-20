'use client'

import DashboardShell from '@/components/DashboardShell'
import { Users, UserPlus, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const customers = [
  { id: 1, name: 'Andi Pratama', checkIn: '14:00', checkOut: null, status: 'Active', unit: 'PlayStation 5 - 02' },
  { id: 2, name: 'Siti Nurhaliza', checkIn: '14:15', checkOut: null, status: 'Active', unit: 'PlayStation 4 - 01' },
  { id: 3, name: 'Rizky Firmansyah', checkIn: '10:00', checkOut: '12:30', status: 'Completed' },
]

export default function OperatorCustomersPage() {
  return (
    <DashboardShell title="Customer Check-In" icon={<Users className="w-6 h-6 text-white" />}>
      <div className="flex justify-end mb-6">
        <Button variant="accent">
          <UserPlus className="w-5 h-5 mr-2" /> Check-In Baru
        </Button>
      </div>

      <div className="space-y-4">
        {customers.map(customer => (
          <Card key={customer.id} className="hover:border-primary/30 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{customer.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {customer.status === 'Active' ? `Check-In: ${customer.checkIn}` : `Check-In: ${customer.checkIn} • Check-Out: ${customer.checkOut}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {customer.status === 'Active' && <p className="text-sm text-primary font-semibold">{customer.unit}</p>}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    customer.status === 'Active' ? 'bg-green-400/10 text-green-400' : 'bg-muted text-muted-foreground'
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
