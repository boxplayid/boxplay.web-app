'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Building2, TrendingUp, Headphones, ShieldCheck, BarChart3, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function GabungMittraPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    experience: '',
    businessType: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        experience: '',
        businessType: '',
        message: ''
      })
      setSubmitted(false)
    }, 3000)
  }

  const benefits = [
    { icon: BarChart3, title: 'Dashboard Modern', desc: 'Monitor penjualan real-time dengan analytics lengkap' },
    { icon: TrendingUp, title: 'ROI Menarik', desc: 'Peluang keuntungan hingga 25% per tahun' },
    { icon: ShieldCheck, title: 'Dukungan Penuh', desc: 'Tim support 24/7 siap membantu operasional' },
    { icon: Headphones, title: 'Training Gratis', desc: 'Pelatihan lengkap untuk staff dan operator' },
    { icon: Building2, title: 'Brand Nasional', desc: 'Dukung brand BoxPlay.id yang terus berkembang' },
    { icon: Users, title: 'Komunitas Mitra', desc: 'Networking dengan mitra lainnya di seluruh Indonesia' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glassmorphism border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Bergabung Menjadi <span className="text-gradient">Mitra BoxPlay.id</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Jadilah bagian dari ekosistem gaming modern Indonesia dan kembangkan bisnis Anda bersama kami
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 bg-secondary-background/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
          >
            Keuntungan Menjadi Mitra
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <benefit.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
          >
            Persyaratan Mitra
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            <Card className="neon-glow-blue">
              <CardContent className="pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { req: 'Lokasi strategis dengan lalu lintas tinggi' },
                    { req: 'Luas minimal 100-200 m²' },
                    { req: 'Investasi awal sesuai dengan paket' },
                    { req: 'Komitmen jangka panjang (3-5 tahun)' },
                    { req: 'Tim operasional berpengalaman' },
                    { req: 'Menjalankan SOP BoxPlay.id dengan konsisten' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <p className="text-sm">{item.req}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 sm:py-20 bg-secondary-background/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Daftar Menjadi Mitra Sekarang
            </h2>

            {submitted ? (
              <Card className="neon-glow-blue">
                <CardContent className="pt-12 pb-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Terima Kasih!</h3>
                    <p className="text-muted-foreground mb-6">
                      Data Anda sudah kami terima. Tim kami akan menghubungi Anda dalam 24 jam untuk diskusi lebih lanjut.
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="Nama Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">No. Telepon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="+62 8xx xxxx xxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Kota</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="Kota Anda"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Pengalaman Bisnis</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                      <option value="">Pilih pengalaman</option>
                      <option value="pemula">Pemula (0-2 tahun)</option>
                      <option value="menengah">Menengah (2-5 tahun)</option>
                      <option value="berpengalaman">Berpengalaman (5+ tahun)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tipe Bisnis</label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                      <option value="">Pilih tipe bisnis</option>
                      <option value="gaming">Gaming Center</option>
                      <option value="fnb">Food & Beverage</option>
                      <option value="entertainment">Entertainment Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Pesan / Pertanyaan</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    placeholder="Ceritakan tentang lokasi dan rencana bisnis Anda..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button type="submit" size="lg" className="flex-1">
                    Kirim Aplikasi
                  </Button>
                  <Link href="/" className="flex-1">
                    <Button type="button" variant="outline" size="lg" className="w-full">
                      Kembali
                    </Button>
                  </Link>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            Ada pertanyaan? Hubungi tim kami di <span className="text-primary font-semibold">contact@boxplay.id</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Atau call +62 812-3456-7890 untuk konsultasi langsung
          </p>
        </div>
      </section>
    </div>
  )
}
