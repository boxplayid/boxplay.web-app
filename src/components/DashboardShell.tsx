'use client'

import { motion } from 'framer-motion'
import { useAuth, ROLE_REDIRECTS } from '@/contexts/AuthContext'
import { usePathname } from 'next/navigation'
import {
  Gamepad2,
  LayoutDashboard,
  Building2,
  Users,
  TrendingUp,
  Settings,
  LogOut,
  BarChart3,
  CreditCard,
  ShieldCheck,
  Handshake,
  DollarSign,
  Menu,
  X,
  FileText,
  Package,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

type DashboardShellProps = {
  children: React.ReactNode
  title: string
  icon: React.ReactNode
}

export default function DashboardShell({ children, title, icon }: DashboardShellProps) {
  const { user, logout, isLoading, isLoggingOut } = useAuth()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null // Will be handled by AuthProvider redirect
  }

  const roleNavItems: Record<string, { href: string; label: string; icon: React.ReactNode }[]> = {
    owner: [
      { href: '/owner', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { href: '/owner/revenue-report', label: 'Laporan Pendapatan', icon: <BarChart3 className="w-5 h-5" /> },
      { href: '/owner/transaction-history', label: 'Riwayat Transaksi', icon: <FileText className="w-5 h-5" /> },
      { href: '/owner/units', label: 'Unit', icon: <Gamepad2 className="w-5 h-5" /> },
      { href: '/owner/branches', label: 'Cabang', icon: <Building2 className="w-5 h-5" /> },
      { href: '/owner/paket', label: 'Paket', icon: <Package className="w-5 h-5" /> },
      { href: '/owner/add-account', label: 'Tambah Akun', icon: <Users className="w-5 h-5" /> },
      { href: '/owner/attendance-report', label: 'Laporan Absensi', icon: <FileText className="w-5 h-5" /> },
      { href: '/owner/edit-homepage', label: 'Edit Beranda', icon: <LayoutDashboard className="w-5 h-5" /> },
      { href: '/owner/portfolio', label: 'Portofolio & Statistik', icon: <TrendingUp className="w-5 h-5" /> },
      { href: '/owner/print', label: 'Cetak', icon: <FileText className="w-5 h-5" /> },
      { href: '/owner/settings', label: 'Pengaturan', icon: <Settings className="w-5 h-5" /> },
    ],
    admin: [
      { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { href: '/admin/users', label: 'Pengguna', icon: <Users className="w-5 h-5" /> },
      { href: '/admin/settings', label: 'Pengaturan', icon: <Settings className="w-5 h-5" /> },
    ],
    mitra: [
      { href: '/mitra', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { href: '/mitra/outlet', label: 'Outlet', icon: <Building2 className="w-5 h-5" /> },
      { href: '/mitra/membership', label: 'Membership', icon: <Users className="w-5 h-5" /> },
      { href: '/mitra/reports', label: 'Laporan', icon: <FileText className="w-5 h-5" /> },
      { href: '/mitra/support', label: 'Support Ticket', icon: <ShieldCheck className="w-5 h-5" /> },
    ],
    investor: [
      { href: '/investor', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { href: '/investor/investments', label: 'Investasi', icon: <DollarSign className="w-5 h-5" /> },
      { href: '/investor/reports', label: 'Laporan', icon: <FileText className="w-5 h-5" /> },
      { href: '/investor/portfolio', label: 'Portofolio', icon: <TrendingUp className="w-5 h-5" /> },
    ],
    operator: [
      { href: '/operator', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { href: '/operator/billing', label: 'Billing', icon: <CreditCard className="w-5 h-5" /> },
      { href: '/operator/customers', label: 'Customer Check-In', icon: <Users className="w-5 h-5" /> },
      { href: '/operator/membership', label: 'Membership', icon: <Users className="w-5 h-5" /> },
      { href: '/operator/fnb', label: 'Food & Beverage', icon: <Gamepad2 className="w-5 h-5" /> },
    ],
    member: [
      { href: '/member', label: 'Dashboard Member', icon: <LayoutDashboard className="w-5 h-5" /> },
    ],
  }

  const navItems = roleNavItems[user.role] || []

  const handleLogout = async () => {
    setIsSidebarOpen(false)
    await logout('Anda telah keluar. Silakan login kembali dengan akun lain.')
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Mobile Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-3 bg-card border border-border rounded-xl shadow-lg"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-72 bg-card border-r border-border p-6">
        <Link href="/" className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center neon-glow-blue">
            <Gamepad2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-gradient">BOXPLAY.ID</span>
        </Link>

        <div className="space-y-2 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                pathname === item.href
                  ? 'bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-primary/20'
                  : 'text-muted-foreground hover:bg-card/70 hover:text-white border border-transparent hover:border-border'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* User info & Logout */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="px-4 py-3 mb-3 bg-secondary-background/30 rounded-xl">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-4 px-4 py-3 w-full text-muted-foreground hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border p-6 flex flex-col"
      >
        <Link href="/" className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center neon-glow-blue">
            <Gamepad2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-gradient">BOXPLAY.ID</span>
        </Link>

        <div className="space-y-2 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                pathname === item.href
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:bg-card/70 hover:text-white border border-transparent hover:border-border'
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* User info & Logout */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="px-4 py-3 mb-3 bg-secondary-background/30 rounded-xl">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-4 px-4 py-3 w-full text-muted-foreground hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main content overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {isLoggingOut && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="rounded-2xl border border-border bg-card/95 px-8 py-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
            <p className="text-lg font-semibold text-white">Sedang keluar...</p>
            <p className="mt-2 text-sm text-muted-foreground">Anda akan diarahkan ke halaman login.</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 pt-24 lg:pt-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center neon-glow-blue">
              {icon}
            </div>
            <h1 className="text-4xl font-bold text-white">{title}</h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
