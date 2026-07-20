'use client'

import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Mail, Lock, Eye, EyeOff, AlertCircle, Crown, Shield, Handshake, DollarSign, Gamepad2 as Console, User } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth, ROLE_REDIRECTS } from '@/contexts/AuthContext'

const roleButtons = [
  { label: 'Owner', email: 'owner@boxplay.id', password: 'owner123', icon: Crown, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
  { label: 'Admin', email: 'admin@boxplay.id', password: 'admin123', icon: Shield, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30' },
  { label: 'Mitra', email: 'mitra@boxplay.id', password: 'mitra123', icon: Handshake, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30' },
  { label: 'Investor', email: 'investor@boxplay.id', password: 'investor123', icon: DollarSign, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30' },
  { label: 'Operator', email: 'operator@boxplay.id', password: 'operator123', icon: Console, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30' },
  { label: 'Member', email: 'member@boxplay.id', password: 'member123', icon: User, color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/30' },
]

function LoginContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(email, password)
    
    if (!result.success) {
      setError(result.message || 'Login gagal!')
      setIsLoading(false)
      return
    }
  }

  const handleQuickLogin = async (roleEmail: string, rolePassword: string) => {
    setEmail(roleEmail)
    setPassword(rolePassword)
    setError('')
    setIsLoading(true)
    const result = await login(roleEmail, rolePassword)
    if (!result.success) {
      setError(result.message || 'Login gagal!')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl relative z-10 flex flex-col lg:flex-row gap-8 items-center"
      >
        {/* Left side: Form */}
        <div className="w-full lg:w-1/2">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-4 neon-glow-blue"
            >
              <Gamepad2 className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gradient">BOXPLAY.ID</span>
            </h1>
            <h2 className="text-2xl font-semibold text-white mb-2">Selamat Datang Kembali</h2>
            <p className="text-muted-foreground">Silakan login untuk mengakses dashboard</p>
          </div>

          {/* Message/Error */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center gap-2 text-blue-300"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{message}</span>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-300"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <motion.div
            className="glassmorphism p-8 rounded-2xl border border-border"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email/Username */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                  Email / Username
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-card border border-border rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="email@boxplay.id"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-sm font-medium text-muted-foreground">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-card border border-border rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="Masukkan password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                <div className="absolute inset-0 -z-10 rounded-xl shadow-[0_0_20px_rgba(33,150,243,0.5)] group-hover:shadow-[0_0_30px_rgba(33,150,243,0.7)] transition-shadow duration-300" />
                <div className="absolute inset-0 rounded-xl border-2 border-accent/50" />
                <div className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Login'
                  )}
                </div>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Right side: Role buttons */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Login sebagai:</h3>
          <div className="grid grid-cols-2 gap-3">
            {roleButtons.map((role, idx) => (
              <motion.button
                key={role.label}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleQuickLogin(role.email, role.password)}
                disabled={isLoading}
                className={`p-4 rounded-xl border ${role.border} ${role.bg} flex flex-col items-center justify-center gap-2 transition-all`}
              >
                <role.icon className={`w-7 h-7 ${role.color}`} />
                <span className={`font-semibold ${role.color}`}>{role.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><Gamepad2 className="w-10 h-10 text-primary animate-pulse" /></div>}>
      <LoginContent />
    </Suspense>
  )
}
