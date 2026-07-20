'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Gamepad2, Users, Building2, Zap, BarChart3, 
  Star, ArrowRight, Menu, X, Phone, Mail, MapPin, 
  Instagram, Facebook, Twitter, Linkedin, 
  PlayCircle, HeadphonesIcon, 
  Layers, FileText, Handshake, GraduationCap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useApp } from '@/contexts/AppContext'

const timelineData = [
  { year: '2024', title: 'Ide BoxPlay.id', desc: 'Konsep awal platform gaming modern Indonesia' },
  { year: '2025', title: 'Outlet Pertama', desc: 'BoxPlay Padang mulai beroperasi' },
  { year: '2026', title: 'Ekspansi Mitra', desc: 'Mulai menerima kemitraan nasional' },
  { year: '2027', title: 'Penguatan Sistem', desc: 'Sistem operasional terintegrasi penuh' },
  { year: '2028', title: 'Target 100 Outlet', desc: 'Jaringan nasional 100 outlet gaming' },
]

const services = [
  { icon: Gamepad2, title: 'Gaming Center', desc: 'Layanan gaming center profesional dengan console terbaru' },
  { icon: Handshake, title: 'Kemitraan', desc: 'Program kemitraan dengan sistem manajemen terintegrasi' },
  { icon: GraduationCap, title: 'Training & Konsultasi', desc: 'Pelatihan dan konsultasi operasional gaming center' },
  { icon: Building2, title: 'Franchise Management', desc: 'Sistem manajemen franchise terpusat dan modern' },
]

const whyChoose = [
  { icon: Layers, title: 'Sistem Terintegrasi' },
  { icon: Zap, title: 'Monitoring Realtime' },
  { icon: Star, title: 'Branding Nasional' },
  { icon: HeadphonesIcon, title: 'Support Operasional' },
  { icon: FileText, title: 'Laporan Transparan' },
  { icon: BarChart3, title: 'Dashboard Modern' },
  { icon: Building2, title: 'Manajemen Outlet Terpusat' },
]

const testimonials = [
  { name: 'Andi Pratama', city: 'Padang', type: 'Mitra', review: 'Sistem BoxPlay.id sangat membantu manajemen outlet saya.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { name: 'Siti Nurhaliza', city: 'Bukittinggi', type: 'Customer', review: 'Tempat gaming yang nyaman dan modern.', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { name: 'Rizky Firmansyah', city: 'Pekanbaru', type: 'Customer', review: 'Tempat gaming yang nyaman dan modern.', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
]

const AnimatedCounter = ({ target, duration = 2000, suffix = '' }: { target: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | undefined
    let animationFrame: number | undefined

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const currentCount = Math.floor(progress * target)
      setCount(currentCount)
      if (progress < 1) animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [target, duration])

  return <span>{count}{suffix}</span>
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  const handleDashboardClick = () => {
    router.push('/login')
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: 'Home', href: '#' },
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Portofolio', href: '#portfolio' },
    { name: 'Produk & Layanan', href: '#services' },
    { name: 'Blog', href: '#blog' },
    { name: 'Kontak', href: '#contact' },
  ]

  const PremiumDashboardButton = () => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleDashboardClick}
      className="relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden group"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
      {/* Neon glow */}
      <div className="absolute inset-0 -z-10 rounded-xl shadow-[0_0_20px_rgba(33,150,243,0.5),0_0_40px_rgba(156,39,176,0.3)] group-hover:shadow-[0_0_30px_rgba(33,150,243,0.7),0_0_60px_rgba(156,39,176,0.5)] transition-shadow duration-300" />
      {/* Border */}
      <div className="absolute inset-0 rounded-xl border-2 border-accent/50" />
      {/* Content */}
      <div className="relative flex items-center gap-2">
        <Gamepad2 className="w-5 h-5" />
        <span>Dashboard Owner</span>
      </div>
    </motion.button>
  )

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glassmorphism border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center neon-glow-blue">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">BOXPLAY.ID</span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-muted-foreground hover:text-white transition-colors font-medium"
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <PremiumDashboardButton />
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden pb-6"
          >
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <div className="relative w-full">
                  <PremiumDashboardButton />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

const Hero = () => {
  const router = useRouter()
  const { homepage } = useApp()

  const handleMasukDashboard = () => {
    router.push('/login')
  }

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-3 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6"
            >
              <PlayCircle className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent">PLAY WHILE YOU STAY</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">{homepage.heroTitle}</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-6">
              {homepage.heroSubtitle}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">
              {homepage.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="accent" size="lg" className="w-full sm:w-auto" onClick={handleMasukDashboard}>Dashboard Owner</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={homepage.heroImage}
              alt="Hero"
              loading="lazy"
              className="w-full h-[400px] object-cover rounded-2xl border border-border shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const About = () => {
  const { homepage, dashboardStats } = useApp()
  return (
    <section id="about" className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={homepage.aboutImage}
              alt="About BoxPlay.id"
              loading="lazy"
              className="w-full h-80 sm:h-96 object-cover rounded-2xl border border-border"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Gaming, Entertainment dan Bisnis Dalam Satu <span className="text-gradient">Ekosistem</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6">
              {homepage.aboutText}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Total Outlet', value: dashboardStats.totalOutlet, icon: Building2, suffix: '' },
            { label: 'Total Mitra', value: dashboardStats.totalMitra, icon: Users, suffix: '' },
            { label: 'Total Member', value: 5000, icon: Users, suffix: '+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-4 sm:pt-6 text-center">
                  <stat.icon className="w-8 sm:w-12 h-8 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
                  <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Portfolio = () => {
  const { branches } = useApp()
  const safeBranches = branches || []
  const [selectedBranch, setSelectedBranch] = useState<any>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const handleViewDetail = (branch: any) => {
    setSelectedBranch(branch)
    setIsDetailDialogOpen(true)
  }

  return (
    <section id="portfolio" className="py-16 sm:py-20 bg-secondary-background/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Outlet</span> Kami
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">Temukan outlet BoxPlay terdekat!</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {safeBranches.map((branch: any, index: number) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Gamepad2 className="w-16 h-16 text-white" />
                </div>
                <CardContent className="pt-4 sm:pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg sm:text-xl font-bold">{branch.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      branch.status === 'Active' ? 'bg-green-400/10 text-green-400' :
                      branch.status === 'Coming Soon' ? 'bg-yellow-400/10 text-yellow-400' :
                      'bg-red-400/10 text-red-400'
                    }`}>
                      {branch.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    {branch.city}
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">{branch.address}</p>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleViewDetail(branch)}>
                    Lihat Detail <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detail {selectedBranch?.name}</DialogTitle>
            </DialogHeader>
            {selectedBranch && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-bold">{selectedBranch.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {selectedBranch.city}
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedBranch.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-base"
                  >
                    {selectedBranch.address}
                  </a>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Jumlah Unit:</span>
                    <span className="font-bold">{selectedBranch.units}</span>
                  </div>
                </div>
                {selectedBranch.qrisUrl && (
                  <div className="p-4 bg-card/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground mb-2">QRIS</p>
                    <img
                      src={selectedBranch.qrisUrl}
                      alt="QRIS"
                      className="w-32 h-32 object-contain rounded mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/QR_Code_Example.svg/200px-QR_Code_Example.svg.png';
                      }}
                    />
                  </div>
                )}
                {selectedBranch.googleMapsUrl && (
                  <div className="p-1 bg-card/50 rounded-lg border border-border overflow-hidden">
                    <iframe
                      src={selectedBranch.googleMapsUrl}
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps"
                    ></iframe>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsDetailDialogOpen(false)}>
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

const Timeline = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Perjalanan <span className="text-gradient">BoxPlay.id</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">Membangun ekosistem gaming Indonesia</p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-accent" />
          
          <div className="space-y-8 sm:space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 md:gap-0"
              >
                {/* Mobile Left Padding */}
                <div className="hidden md:flex flex-1" />
                
                {/* Timeline Dot */}
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center z-10 neon-glow-blue mt-1">
                  <Star className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                
                {/* Content */}
                <div className="flex-1 pl-4 md:pl-0 md:px-4">
                  <Card>
                    <CardContent className="pt-4 sm:pt-6">
                      <span className="text-2xl sm:text-3xl font-bold text-gradient">{item.year}</span>
                      <h3 className="text-lg sm:text-xl font-bold mt-2 mb-2">{item.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const Services = () => {
  return (
    <section id="services" className="py-16 sm:py-20 bg-secondary-background/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Produk & Layanan</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">Solusi lengkap untuk bisnis gaming Anda</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-4 sm:pt-6">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-4">
                    <service.icon className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{service.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const WhyChoose = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Mengapa Memilih <span className="text-gradient">BoxPlay.id</span>?
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {whyChoose.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="text-center">
                <CardContent className="pt-4 sm:pt-6">
                  <feature.icon className="w-8 sm:w-10 h-8 sm:h-10 text-primary mx-auto mb-3" />
                  <h3 className="text-sm sm:text-base font-semibold">{feature.title}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 sm:py-20 bg-secondary-background/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Apa Kata <span className="text-gradient">Mereka</span>?
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 text-center">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 neon-glow-blue">
                  <AvatarImage src={testimonials[currentIndex].photo} />
                  <AvatarFallback>{testimonials[currentIndex].name[0]}</AvatarFallback>
                </Avatar>
                <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-muted-foreground italic">
                  "{testimonials[currentIndex].review}"
                </p>
                <h4 className="text-lg sm:text-xl font-bold">{testimonials[currentIndex].name}</h4>
                <p className="text-sm sm:text-base text-primary">{testimonials[currentIndex].city} · {testimonials[currentIndex].type}</p>
              </CardContent>
            </Card>
          </motion.div>
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  currentIndex === index ? 'bg-primary w-6 sm:w-8' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const Gallery = () => {
  const { homepage } = useApp()
  const [activeIndex, setActiveIndex] = useState(0)
  const galleryImages = homepage.galleryImages || []

  useEffect(() => {
    if (galleryImages.length === 0) return;
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length)
    }, 1000)

    return () => window.clearInterval(interval)
  }, [galleryImages.length])

  const activeImage = galleryImages[activeIndex] || { src: '', alt: '' }
  const progress = galleryImages.length > 0 ? ((activeIndex + 1) / galleryImages.length) * 100 : 0

  return (
    <section className="py-16 sm:py-20 bg-secondary-background/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gradient">{homepage.galleryTitle}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">{homepage.galleryDescription}</p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[28px] border border-border bg-card shadow-2xl group"
          >
            <motion.div
              key={activeImage.src}
              initial={{ opacity: 0, scale: 1.05, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="aspect-[4/5] overflow-hidden"
            >
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-black/20 z-10">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.95, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-primary to-accent"
              />
            </div>

            {/* Caption with animation */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <motion.p 
                className="text-xs sm:text-sm uppercase tracking-[0.4em] text-primary font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                BOXPLAY MOMENT
              </motion.p>
              <motion.h3 
                className="mt-2 text-2xl sm:text-3xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {activeImage.alt}
              </motion.h3>
            </motion.div>

            {/* Slide counter */}
            <div className="absolute top-6 right-6 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
              <p className="text-xs text-white font-semibold">
                {activeIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {galleryImages.map((img, index) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                  index === activeIndex
                    ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                    : 'border-border bg-card/70 hover:border-primary/40 hover:bg-card'
                }`}
              >
                <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                  <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{img.alt}</p>
                  <p className="text-xs text-muted-foreground">Slide {index + 1}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const CTA = () => {
  const router = useRouter()

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <Card className="glassmorphism neon-glow-blue">
          <CardContent className="py-12 sm:py-16 text-center px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Siap Menjadi Bagian dari <span className="text-gradient">BoxPlay.id</span>?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan ekosistem gaming modern Indonesia dan bangun masa depan bersama kami
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button variant="accent" size="lg" className="w-full sm:w-auto" onClick={() => router.push('/login')}>
                  Masuk ke Dashboard
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

const Footer = () => {
  const { homepage } = useApp()
  return (
    <footer id="contact" className="bg-secondary-background pt-12 sm:pt-16 pb-6 sm:pb-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">{homepage.companyName}</span>
            </div>
            <p className="text-muted-foreground mb-4">
              {homepage.heroSubtitle}
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-card rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Produk & Layanan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Program</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#services" className="hover:text-white transition-colors">Kemitraan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Franchise</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Kontak</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                {homepage.companyAddress}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                {homepage.companyPhone}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                {homepage.companyEmail}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 sm:pt-8 text-center text-muted-foreground">
          <p className="text-sm sm:text-base">&copy; 2024 {homepage.companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Timeline />
        <Services />
        <WhyChoose />
        <Testimonials />
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
