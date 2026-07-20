'use client'

import DashboardShell from '@/components/DashboardShell'
import { LayoutDashboard, Save, Upload, CheckCircle2, Image, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useRef } from 'react'
import { useApp } from '@/contexts/AppContext'
import { fileToBase64 } from '@/lib/utils'

interface GalleryImage {
  src: string
  alt: string
}

export default function EditHomepagePage() {
  const { homepage, updateHomepage } = useApp()
  const [heroTitle, setHeroTitle] = useState(homepage.heroTitle)
  const [heroSubtitle, setHeroSubtitle] = useState(homepage.heroSubtitle)
  const [heroDescription, setHeroDescription] = useState(homepage.heroDescription)
  const [heroImage, setHeroImage] = useState(homepage.heroImage)
  const [aboutText, setAboutText] = useState(homepage.aboutText)
  const [aboutImage, setAboutImage] = useState(homepage.aboutImage)
  const [companyName, setCompanyName] = useState(homepage.companyName)
  const [companyEmail, setCompanyEmail] = useState(homepage.companyEmail)
  const [companyPhone, setCompanyPhone] = useState(homepage.companyPhone)
  const [companyAddress, setCompanyAddress] = useState(homepage.companyAddress)
  const [galleryTitle, setGalleryTitle] = useState(homepage.galleryTitle)
  const [galleryDescription, setGalleryDescription] = useState(homepage.galleryDescription)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(homepage.galleryImages)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const heroImageInputRef = useRef<HTMLInputElement>(null)
  const aboutImageInputRef = useRef<HTMLInputElement>(null)
  const galleryImageInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const base64 = await fileToBase64(file)
        setHeroImage(base64)
      } catch (error) {
        console.error('Error uploading hero image:', error)
      }
    }
  }

  const handleAboutImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const base64 = await fileToBase64(file)
        setAboutImage(base64)
      } catch (error) {
        console.error('Error uploading about image:', error)
      }
    }
  }

  const handleGalleryImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const base64 = await fileToBase64(file)
        const newImages = [...galleryImages]
        newImages[index].src = base64
        setGalleryImages(newImages)
      } catch (error) {
        console.error('Error uploading gallery image:', error)
      }
    }
  }

  const handleAddGalleryImage = () => {
    setGalleryImages([...galleryImages, { src: '', alt: '' }])
  }

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index))
  }

  const handleUpdateGalleryImage = (index: number, field: 'src' | 'alt', value: string) => {
    const newImages = [...galleryImages]
    newImages[index][field] = value
    setGalleryImages(newImages)
  }

  const handleSave = () => {
    updateHomepage({
      heroTitle,
      heroSubtitle,
      heroDescription,
      heroImage,
      aboutText,
      aboutImage,
      companyName,
      companyEmail,
      companyPhone,
      companyAddress,
      galleryTitle,
      galleryDescription,
      galleryImages,
    })
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <DashboardShell title="Edit Beranda" icon={<LayoutDashboard className="w-6 h-6 text-white" />}>
      {saveSuccess && (
        <div className="mb-6 flex items-center gap-2 bg-green-400/10 border border-green-400/30 rounded-xl px-4 py-3 text-green-400">
          <CheckCircle2 className="w-5 h-5" />
          Perubahan berhasil disimpan!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Judul Hero</Label>
                <Input
                  id="heroTitle"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Subjudul Hero</Label>
                <textarea
                  id="heroSubtitle"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroDescription">Deskripsi Hero</Label>
                <textarea
                  id="heroDescription"
                  value={heroDescription}
                  onChange={(e) => setHeroDescription(e.target.value)}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Gambar Hero</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="heroImageUrl">URL Gambar</Label>
                    <Input
                      id="heroImageUrl"
                      value={heroImage}
                      onChange={(e) => setHeroImage(e.target.value)}
                      placeholder="BOXPLAY.NEW/iamage/logo.png"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Atau Upload File</Label>
                    <input
                      ref={heroImageInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleHeroImageUpload}
                    />
                    <Button
                      variant="outline"
                      onClick={() => heroImageInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Pilih File
                    </Button>
                  </div>
                </div>
                {heroImage && (
                  <img
                    src={heroImage}
                    alt="Hero Preview"
                    className="w-full h-48 object-cover rounded-xl mt-2 border border-border"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aboutText">Deskripsi About</Label>
                <textarea
                  id="aboutText"
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[150px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Gambar About</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="aboutImageUrl">URL Gambar</Label>
                    <Input
                      id="aboutImageUrl"
                      value={aboutImage}
                      onChange={(e) => setAboutImage(e.target.value)}
                      placeholder="https://example.com/about.jpg"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Atau Upload File</Label>
                    <input
                      ref={aboutImageInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAboutImageUpload}
                    />
                    <Button
                      variant="outline"
                      onClick={() => aboutImageInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Pilih File
                    </Button>
                  </div>
                </div>
                {aboutImage && (
                  <img
                    src={aboutImage}
                    alt="About Preview"
                    className="w-full h-48 object-cover rounded-xl mt-2 border border-border"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informasi Perusahaan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nama Perusahaan</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyEmail">Email Perusahaan</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyPhone">Telepon Perusahaan</Label>
                <Input
                  id="companyPhone"
                  type="tel"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyAddress">Alamat Perusahaan</Label>
                <textarea
                  id="companyAddress"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Gallery (BOXPLAY.ID MOMENT)</CardTitle>
              <Button variant="outline" onClick={handleAddGalleryImage}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Gambar
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="galleryTitle">Judul Gallery</Label>
                <Input
                  id="galleryTitle"
                  value={galleryTitle}
                  onChange={(e) => setGalleryTitle(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="galleryDescription">Deskripsi Gallery</Label>
                <textarea
                  id="galleryDescription"
                  value={galleryDescription}
                  onChange={(e) => setGalleryDescription(e.target.value)}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]"
                />
              </div>
              <div className="space-y-4">
                {galleryImages.map((img, index) => (
                  <Card key={index} className="border border-border">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Gambar {index + 1}</Label>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleRemoveGalleryImage(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label>Upload Gambar</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`gallery-image-src-${index}`}>URL Gambar</Label>
                            <Input
                              id={`gallery-image-src-${index}`}
                              value={img.src}
                              onChange={(e) => handleUpdateGalleryImage(index, 'src', e.target.value)}
                              placeholder="https://example.com/image.jpg"
                              className="h-12"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Atau Upload File</Label>
                            <input
                              ref={(el) => {
                                galleryImageInputRefs.current[index] = el;
                              }}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleGalleryImageUpload(index, e)}
                            />
                            <Button
                              variant="outline"
                              onClick={() => galleryImageInputRefs.current[index]?.click()}
                              className="w-full"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Pilih File
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`gallery-image-alt-${index}`}>Deskripsi Gambar</Label>
                        <Input
                          id={`gallery-image-alt-${index}`}
                          value={img.alt}
                          onChange={(e) => handleUpdateGalleryImage(index, 'alt', e.target.value)}
                          placeholder="Deskripsi gambar..."
                          className="h-12"
                        />
                      </div>
                      {img.src && (
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-40 object-cover rounded-lg border border-border"
                        />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview Beranda</CardTitle>
            </CardHeader>
            <CardContent className="p-4 bg-secondary-background/30 rounded-xl space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">🎮</span>
                </div>
                <h3 className="text-xl font-bold text-gradient">{heroTitle}</h3>
                <p className="text-sm text-muted-foreground mt-1">{heroSubtitle}</p>
              </div>
              {heroImage && (
                <img
                  src={heroImage}
                  alt="Hero Preview"
                  className="w-full h-32 object-cover rounded-xl mt-2 border border-border"
                />
              )}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">{heroDescription}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Button variant="accent" className="w-full" onClick={handleSave}>
                <Save className="w-5 h-5 mr-2" />
                Simpan Perubahan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
