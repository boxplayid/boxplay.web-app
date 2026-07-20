'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { MemberLevel, DepositHistoryItem } from './AuthContext'

interface Branch {
  id: number
  name: string
  city: string
  address: string
  status: 'Active' | 'Coming Soon' | 'Inactive'
  units: number
  qrisUrl?: string
  googleMapsUrl?: string
}

interface Unit {
  id: number
  code: string
  name: string
  type: string
  status: 'Available' | 'In Use' | 'Maintenance'
  branchId: number
  branchName: string
  currentCustomer?: string
  timeRemaining?: string
}

interface Paket {
  id: number
  name: string
  duration: string
  price: number
}

interface Transaction {
  id: string
  date: string
  customer: string
  customerPhone?: string
  outlet: string
  paketId?: number
  paketName?: string
  amount: string
  paymentMethod: 'Cash' | 'QRIS'
  status: 'Success' | 'Pending'
  unitId?: number
  unitName?: string
}

interface PortfolioItem {
  id: number
  name: string
  desc: string
  status: 'Active' | 'Coming Soon' | 'Completed'
  image: string
}

interface DashboardStats {
  totalOutlet: number
  totalMitra: number
  totalInvestor: number
  monthlyRevenue: string
}

interface GalleryImage {
  src: string
  alt: string
}

interface HomepageData {
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  heroImage: string
  aboutText: string
  aboutImage: string
  companyName: string
  companyEmail: string
  companyPhone: string
  companyAddress: string
  galleryImages: GalleryImage[]
  galleryTitle: string
  galleryDescription: string
}

interface MemberAccount {
  id: number
  name: string
  phone: string
  email: string
  nik: string
  memberNumber: string
  branchId: number
  branchName: string
  assignedUnitCode: string
  level: MemberLevel
  discountPercent: number
  totalDepositAmount: number
  mainTimeBalance: number
  bonusTimeBalance: number
  depositHistory: DepositHistoryItem[]
  createdAt: string
}

interface RegisterMemberInput {
  name: string
  phone: string
  email: string
  nik: string
  branchId: number
  branchName: string
  assignedUnitCode: string
  level: MemberLevel
}

interface DepositResult {
  success: boolean
  message: string
}

interface AppContextType {
  branches: Branch[]
  units: Unit[]
  transactions: Transaction[]
  portfolioItems: PortfolioItem[]
  dashboardStats: DashboardStats
  homepage: HomepageData
  pakets: Paket[]
  members: MemberAccount[]
  addBranch: (branch: Omit<Branch, 'id'>) => void
  updateBranch: (id: number, branch: Partial<Branch>) => void
  deleteBranch: (id: number) => void
  addUnit: (unit: Omit<Unit, 'id'>) => void
  updateUnit: (id: number, unit: Partial<Unit>) => void
  deleteUnit: (id: number) => void
  getUnitsByBranch: (branchId: number) => Unit[]
  updateHomepage: (data: Partial<HomepageData>) => void
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  deleteTransaction: (id: string) => void
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void
  updatePortfolioItem: (id: number, item: Partial<PortfolioItem>) => void
  deletePortfolioItem: (id: number) => void
  updateDashboardStats: (stats: Partial<DashboardStats>) => void
  addPaket: (paket: Omit<Paket, 'id'>) => void
  updatePaket: (id: number, paket: Partial<Paket>) => void
  deletePaket: (id: number) => void
  registerMember: (member: RegisterMemberInput) => MemberAccount
  processMemberDeposit: (memberId: number, amount: number, processedBy: string) => DepositResult
  getMemberByEmail: (email: string) => MemberAccount | undefined
}

const initialBranches: Branch[] = [
  { id: 1, name: 'BoxPlay Padang', city: 'Padang', address: 'Jl. Sudirman No. 123, Padang', status: 'Active', units: 3, qrisUrl: 'https://example.com/qris-padang', googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.283456789!2d100.3643!3d-0.9471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwNTYnNDkuNiJTIDEwMMKwMjEnNTEuNSJF!5e0!3m2!1sen!2sid!4v1234567890' },
  { id: 2, name: 'BoxPlay Bukittinggi', city: 'Bukittinggi', address: 'Jl. Ahmad Yani No. 45, Bukittinggi', status: 'Active', units: 2, qrisUrl: 'https://example.com/qris-bukittinggi', googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.283456789!2d100.3643!3d-0.9471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwNTYnNDkuNiJTIDEwMMKwMjEnNTEuNSJF!5e0!3m2!1sen!2sid!4v1234567890' },
]

const initialUnits: Unit[] = [
  { id: 1, code: 'PS5-01', name: 'PlayStation 5', type: 'PS5', status: 'Available', branchId: 1, branchName: 'BoxPlay Padang' },
  { id: 2, code: 'PS5-02', name: 'PlayStation 5', type: 'PS5', status: 'In Use', branchId: 1, branchName: 'BoxPlay Padang', currentCustomer: 'Andi Pratama', timeRemaining: '1h 30m' },
  { id: 3, code: 'PS4-01', name: 'PlayStation 4', type: 'PS4', status: 'In Use', branchId: 1, branchName: 'BoxPlay Padang', currentCustomer: 'Siti Nurhaliza', timeRemaining: '45m' },
  { id: 4, code: 'PS4-02', name: 'PlayStation 4', type: 'PS4', status: 'Maintenance', branchId: 2, branchName: 'BoxPlay Bukittinggi' },
  { id: 5, code: 'PS5-03', name: 'PlayStation 5', type: 'PS5', status: 'Available', branchId: 2, branchName: 'BoxPlay Bukittinggi' },
]

const initialPakets: Paket[] = [
  { id: 1, name: 'Paket 1 Jam', duration: '60 Menit', price: 50000 },
  { id: 2, name: 'Paket 2 Jam', duration: '120 Menit', price: 90000 },
  { id: 3, name: 'Paket 3 Jam', duration: '180 Menit', price: 130000 },
  { id: 4, name: 'Paket Harian', duration: '24 Jam', price: 300000 },
]

const initialTransactions: Transaction[] = [
  { id: 'TRX001', date: '2026-06-14', customer: 'Andi Pratama', customerPhone: '081234567890', outlet: 'BoxPlay Padang', paketId: 1, paketName: 'Paket 1 Jam', amount: 'Rp 50.000', paymentMethod: 'Cash', status: 'Success' },
  { id: 'TRX002', date: '2026-06-14', customer: 'Siti Nurhaliza', customerPhone: '081298765432', outlet: 'BoxPlay Bukittinggi', paketId: 2, paketName: 'Paket 2 Jam', amount: 'Rp 90.000', paymentMethod: 'QRIS', status: 'Success' },
  { id: 'TRX003', date: '2026-06-13', customer: 'Rizky Firmansyah', customerPhone: '081345678901', outlet: 'BoxPlay Padang', paketId: 1, paketName: 'Paket 1 Jam', amount: 'Rp 50.000', paymentMethod: 'Cash', status: 'Pending' },
]

const initialPortfolioItems: PortfolioItem[] = [
  { id: 1, name: 'BoxPlay Padang', desc: 'Outlet pertama di Padang', status: 'Active', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop' },
  { id: 2, name: 'BoxPlay Bukittinggi', desc: 'Outlet di Bukittinggi', status: 'Active', image: 'https://images.unsplash.com/photo-1493711662062-fa541f7601d5?w=400&h=300&fit=crop' },
  { id: 3, name: 'BoxPlay Pekanbaru', desc: 'Outlet di Pekanbaru', status: 'Coming Soon', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop' },
  { id: 4, name: 'Turnamen Nasional', desc: 'Event gaming besar', status: 'Completed', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop' },
  { id: 5, name: 'Instalasi Mitra Baru', desc: 'Setup outlet baru', status: 'Active', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop' },
]

const initialDashboardStats: DashboardStats = {
  totalOutlet: 2,
  totalMitra: 10,
  totalInvestor: 25,
  monthlyRevenue: 'Rp 50M+'
}

const initialHomepage: HomepageData = {
  heroTitle: 'BOXPLAY.ID',
  heroSubtitle: 'Transformasi Bisnis Gaming Modern Indonesia',
  heroDescription: 'Membangun ekosistem gaming center, rental console, dan entertainment berbasis teknologi dengan sistem terintegrasi untuk mitra dan investor.',
  heroImage: '/iphone_boxplay.png',
  aboutText: 'BoxPlay.id adalah platform gaming dan entertainment modern yang menghadirkan konsep gaming center profesional dengan sistem operasional terintegrasi, monitoring real-time, serta peluang kemitraan dan investasi yang transparan.',
  aboutImage: 'https://images.unsplash.com/photo-1493711662062-fa541f7601d5?w=800&h=600&fit=crop',
  companyName: 'BOXPLAY.ID',
  companyEmail: 'info@boxplay.id',
  companyPhone: '+62 812-3456-7890',
  companyAddress: 'Jl. Sudirman No. 123, Padang, Sumatera Barat',
  galleryTitle: 'BOXPLAY.ID MOMENT',
  galleryDescription: 'Serangkaian momen energik dari komunitas dan pengalaman BoxPlay.',
  galleryImages: [
    { src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop', alt: 'Gaming Room' },
    { src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=500&fit=crop', alt: 'Tournament' },
    { src: 'https://images.unsplash.com/photo-1493711662062-fa541f7601d5?w=400&h=300&fit=crop', alt: 'Customer Activity' },
    { src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop', alt: 'New Outlet Setup' },
    { src: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop', alt: 'Community Gathering' },
  ],
}

const initialMembers: MemberAccount[] = [
  {
    id: 1,
    name: 'Member BoxPlay',
    phone: '081234567890',
    email: 'member@boxplay.id',
    nik: 'PS5-01',
    memberNumber: 'PS5-01',
    branchId: 1,
    branchName: 'BoxPlay Padang',
    assignedUnitCode: 'PS5-01',
    level: 'GOLD',
    discountPercent: 5,
    totalDepositAmount: 0,
    mainTimeBalance: 0,
    bonusTimeBalance: 0,
    depositHistory: [],
    createdAt: '2026-07-18',
  },
]

function calculateDepositBenefits(level: MemberLevel, amount: number) {
  const minimumDeposit = level === 'GOLD' ? 500000 : 1000000

  if (amount < minimumDeposit) {
    return {
      valid: false,
      minimumDeposit,
      mainTimeAdded: 0,
      bonusTimeAdded: 0,
    }
  }

  const multiplier = amount / 500000

  return {
    valid: true,
    minimumDeposit,
    mainTimeAdded: multiplier * 35,
    bonusTimeAdded: multiplier * 15,
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [branches, setBranches] = useState<Branch[]>(initialBranches)
  const [units, setUnits] = useState<Unit[]>(initialUnits)
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(initialPortfolioItems)
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>(initialDashboardStats)
  const [homepage, setHomepage] = useState<HomepageData>(initialHomepage)
  const [pakets, setPakets] = useState<Paket[]>(initialPakets)
  const [members, setMembers] = useState<MemberAccount[]>(initialMembers)

  // Load data from localStorage on initial render
  useEffect(() => {
    try {
      const storedBranches = localStorage.getItem('boxplay_branches')
      const storedUnits = localStorage.getItem('boxplay_units')
      const storedTransactions = localStorage.getItem('boxplay_transactions')
      const storedPortfolioItems = localStorage.getItem('boxplay_portfolioItems')
      const storedDashboardStats = localStorage.getItem('boxplay_dashboardStats')
      const storedHomepage = localStorage.getItem('boxplay_homepage')
      const storedPakets = localStorage.getItem('boxplay_pakets')
      const storedMembers = localStorage.getItem('boxplay_members')
      if (storedBranches) {
        setBranches(JSON.parse(storedBranches))
      }
      if (storedUnits) {
        setUnits(JSON.parse(storedUnits))
      }
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions))
      }
      if (storedPortfolioItems) {
        setPortfolioItems(JSON.parse(storedPortfolioItems))
      }
      if (storedDashboardStats) {
        setDashboardStats(JSON.parse(storedDashboardStats))
      }
      if (storedHomepage) {
        setHomepage(JSON.parse(storedHomepage))
      }
      if (storedPakets) {
        setPakets(JSON.parse(storedPakets))
      }
      if (storedMembers) {
        setMembers(JSON.parse(storedMembers))
      }
    } catch (e) {
      console.error('Error loading from localStorage:', e)
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('boxplay_branches', JSON.stringify(branches))
    localStorage.setItem('boxplay_units', JSON.stringify(units))
    localStorage.setItem('boxplay_transactions', JSON.stringify(transactions))
    localStorage.setItem('boxplay_portfolioItems', JSON.stringify(portfolioItems))
    localStorage.setItem('boxplay_dashboardStats', JSON.stringify(dashboardStats))
    localStorage.setItem('boxplay_homepage', JSON.stringify(homepage))
    localStorage.setItem('boxplay_pakets', JSON.stringify(pakets))
    localStorage.setItem('boxplay_members', JSON.stringify(members))
  }, [branches, units, transactions, portfolioItems, dashboardStats, homepage, pakets, members])

  const addBranch = (branch: Omit<Branch, 'id'>) => {
    const newBranch: Branch = { ...branch, id: Date.now() }
    setBranches([...branches, newBranch])
  }

  const updateBranch = (id: number, branch: Partial<Branch>) => {
    setBranches(branches.map(b => b.id === id ? { ...b, ...branch } : b))
  }

  const deleteBranch = (id: number) => {
    setBranches(branches.filter(b => b.id !== id))
    setUnits(units.filter(u => u.branchId !== id))
  }

  const addUnit = (unit: Omit<Unit, 'id'>) => {
    const newUnit: Unit = { ...unit, id: Date.now() }
    setUnits([...units, newUnit])
    // Update branch unit count
    updateBranch(unit.branchId, { units: (branches.find(b => b.id === unit.branchId)?.units || 0) + 1 })
  }

  const updateUnit = (id: number, unit: Partial<Unit>) => {
    setUnits(units.map(u => u.id === id ? { ...u, ...unit } : u))
  }

  const deleteUnit = (id: number) => {
    const unitToDelete = units.find(u => u.id === id)
    if (unitToDelete) {
      updateBranch(unitToDelete.branchId, { units: Math.max(0, (branches.find(b => b.id === unitToDelete.branchId)?.units || 0) - 1) })
    }
    setUnits(units.filter(u => u.id !== id))
  }

  const getUnitsByBranch = (branchId: number) => {
    return units.filter(u => u.branchId === branchId)
  }

  const updateHomepage = (data: Partial<HomepageData>) => {
    setHomepage(prev => ({ ...prev, ...data }))
  }

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = { 
      ...transaction, 
      id: `TRX${String(transactions.length + 1).padStart(3, '0')}` 
    }
    setTransactions([newTransaction, ...transactions])
  }

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(tx => tx.id !== id))
  }

  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = { ...item, id: Date.now() }
    setPortfolioItems([...portfolioItems, newItem])
  }

  const updatePortfolioItem = (id: number, item: Partial<PortfolioItem>) => {
    setPortfolioItems(portfolioItems.map(i => i.id === id ? { ...i, ...item } : i))
  }

  const deletePortfolioItem = (id: number) => {
    setPortfolioItems(portfolioItems.filter(i => i.id !== id))
  }

  const updateDashboardStats = (stats: Partial<DashboardStats>) => {
    setDashboardStats(prev => ({ ...prev, ...stats }))
  }

  const addPaket = (paket: Omit<Paket, 'id'>) => {
    const newPaket: Paket = { ...paket, id: Date.now() }
    setPakets([...pakets, newPaket])
  }

  const updatePaket = (id: number, paket: Partial<Paket>) => {
    setPakets(pakets.map(p => p.id === id ? { ...p, ...paket } : p))
  }

  const deletePaket = (id: number) => {
    setPakets(pakets.filter(p => p.id !== id))
  }

  const registerMember = (member: RegisterMemberInput) => {
    const uniqueSuffix = String(Date.now()).slice(-4)
    const memberNumber = `${member.assignedUnitCode}-${uniqueSuffix}`
    const newMember: MemberAccount = {
      id: Date.now(),
      ...member,
      memberNumber,
      discountPercent: 5,
      totalDepositAmount: 0,
      mainTimeBalance: 0,
      bonusTimeBalance: 0,
      depositHistory: [],
      createdAt: new Date().toISOString().split('T')[0],
    }

    setMembers(prev => [...prev, newMember])
    return newMember
  }

  const processMemberDeposit = (memberId: number, amount: number, processedBy: string): DepositResult => {
    const member = members.find(item => item.id === memberId)

    if (!member) {
      return { success: false, message: 'Member tidak ditemukan.' }
    }

    const benefits = calculateDepositBenefits(member.level, amount)

    if (!benefits.valid) {
      return {
        success: false,
        message: `Deposit minimum untuk ${member.level} adalah Rp ${benefits.minimumDeposit.toLocaleString('id-ID')}.`,
      }
    }

    const depositEntry: DepositHistoryItem = {
      id: `DEP-${Date.now()}`,
      date: new Date().toISOString(),
      amount,
      level: member.level,
      mainTimeAdded: benefits.mainTimeAdded,
      bonusTimeAdded: benefits.bonusTimeAdded,
      processedBy,
    }

    setMembers(prev =>
      prev.map(item =>
        item.id === memberId
          ? {
              ...item,
              totalDepositAmount: item.totalDepositAmount + amount,
              mainTimeBalance: item.mainTimeBalance + benefits.mainTimeAdded,
              bonusTimeBalance: item.bonusTimeBalance + benefits.bonusTimeAdded,
              depositHistory: [depositEntry, ...item.depositHistory],
            }
          : item
      )
    )

    return {
      success: true,
      message: `Deposit berhasil diproses. Saldo utama +${benefits.mainTimeAdded} jam dan bonus +${benefits.bonusTimeAdded} jam.`,
    }
  }

  const getMemberByEmail = (email: string) => {
    return members.find(member => member.email.toLowerCase() === email.toLowerCase())
  }

  return (
    <AppContext.Provider value={{
      branches,
      units,
      transactions,
      portfolioItems,
      dashboardStats,
      homepage,
      pakets,
      members,
      addBranch,
      updateBranch,
      deleteBranch,
      addUnit,
      updateUnit,
      deleteUnit,
      getUnitsByBranch,
      updateHomepage,
      addTransaction,
      deleteTransaction,
      addPortfolioItem,
      updatePortfolioItem,
      deletePortfolioItem,
      updateDashboardStats,
      addPaket,
      updatePaket,
      deletePaket,
      registerMember,
      processMemberDeposit,
      getMemberByEmail
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
