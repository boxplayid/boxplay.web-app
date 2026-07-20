'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

type UserRole = 'owner' | 'admin' | 'mitra' | 'investor' | 'operator' | 'member'
type MemberLevel = 'GOLD' | 'PLATINUM'

interface DepositHistoryItem {
  id: string
  date: string
  amount: number
  level: MemberLevel
  mainTimeAdded: number // in hours
  bonusTimeAdded: number // in hours
  processedBy: string // operator name/ID
}

interface MemberData {
  level: MemberLevel
  memberId: string // NIK or member number
  mainTimeBalance: number // in hours
  bonusTimeBalance: number // in hours
  depositHistory: DepositHistoryItem[]
}

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  branchId?: number
  branchName?: string
  memberData?: MemberData
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isLoggingOut: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: (message?: string) => Promise<void>
}

// Mock users for testing
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'owner@boxplay.id': {
    password: 'owner123',
    user: { id: '1', name: 'Owner BoxPlay', email: 'owner@boxplay.id', role: 'owner' },
  },
  'admin@boxplay.id': {
    password: 'admin123',
    user: { id: '2', name: 'Admin BoxPlay', email: 'admin@boxplay.id', role: 'admin' },
  },
  'mitra@boxplay.id': {
    password: 'mitra123',
    user: { id: '3', name: 'Mitra BoxPlay', email: 'mitra@boxplay.id', role: 'mitra' },
  },
  'investor@boxplay.id': {
    password: 'investor123',
    user: { id: '4', name: 'Investor BoxPlay', email: 'investor@boxplay.id', role: 'investor' },
  },
  'operator@boxplay.id': {
    password: 'operator123',
    user: { id: '5', name: 'Operator BoxPlay Padang', email: 'operator@boxplay.id', role: 'operator', branchId: 1, branchName: 'BoxPlay Padang' },
  },
  'member@boxplay.id': {
    password: 'member123',
    user: { 
      id: '6', 
      name: 'Member BoxPlay', 
      email: 'member@boxplay.id', 
      role: 'member',
      memberData: {
        level: 'GOLD',
        memberId: 'MBR-001',
        mainTimeBalance: 0,
        bonusTimeBalance: 0,
        depositHistory: []
      }
    },
  },
}

const ROLE_REDIRECTS: Record<UserRole, string> = {
  owner: '/owner',
  admin: '/admin',
  mitra: '/mitra',
  investor: '/investor',
  operator: '/operator',
  member: '/member',
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize from localStorage synchronously to avoid loading state
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('boxplay_user')
      if (storedUser) {
        try {
          return JSON.parse(storedUser)
        } catch {
          return null
        }
      }
    }
    return null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isLoading) return

    // Protected routes and redirect logic
    const isLoginPage = pathname === '/login'
    const isDashboardRoute = ['/owner', '/admin', '/mitra', '/investor', '/operator', '/member'].some(
      (route) => pathname.startsWith(route)
    )

    if (isDashboardRoute && !user) {
      // Redirect to login if trying to access dashboard without being logged in
      router.push('/login?message=Silakan login terlebih dahulu untuk mengakses dashboard.')
    } else if (isLoginPage && user) {
      // Redirect to dashboard if already logged in
      router.push(ROLE_REDIRECTS[user.role])
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

    const userData = MOCK_USERS[email.toLowerCase()]
    if (!userData || userData.password !== password) {
      return { success: false, message: 'Email atau password salah!' }
    }

    // Store user in state and localStorage
    setUser(userData.user)
    localStorage.setItem('boxplay_user', JSON.stringify(userData.user))
    return { success: true }
  }

  const logout = async (message = 'Anda telah keluar. Silakan login kembali dengan akun lain.') => {
    setIsLoggingOut(true)
    setUser(null)
    localStorage.removeItem('boxplay_user')

    await new Promise((resolve) => setTimeout(resolve, 350))
    router.replace(`/login?message=${encodeURIComponent(message)}`)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isLoggingOut, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { ROLE_REDIRECTS }
export type { UserRole, MemberLevel, DepositHistoryItem, MemberData, User }
