import { PrismaClient, UserRole, MemberLevel } from '@/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seeding...')

  // 1. Buat Homepage content default
  const homepage = await prisma.homepageContent.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      heroTitle: 'Selamat Datang di BoxPlay.id',
      heroSubtitle: 'Tempat bermain yang nyaman dan modern',
      aboutTitle: 'Tentang Kami',
      aboutText: 'BoxPlay.id adalah platform gaming dan entertainment terpercaya',
      galleryTitle: 'Galeri BoxPlay',
      galleryImages: [],
    },
  })
  console.log('🏠 Homepage content created:', homepage.id)

  // 2. Buat Cabang default
  const branch = await prisma.branch.upsert({
    where: { unitCode: 'BOX-001' },
    update: {},
    create: {
      name: 'BoxPlay Cabang Utama',
      address: 'Jl. Gaming No. 123',
      phone: '081234567890',
      unitCode: 'BOX-001',
    },
  })
  console.log('🏢 Branch created:', branch.id)

  // 3. Buat User demo
  const users = [
    {
      name: 'Owner BoxPlay',
      email: 'owner@boxplay.id',
      password: 'owner123', // dalam production harus di-hash!
      role: UserRole.OWNER,
    },
    {
      name: 'Admin BoxPlay',
      email: 'admin@boxplay.id',
      password: 'admin123',
      role: UserRole.ADMIN,
    },
    {
      name: 'Operator BoxPlay',
      email: 'operator@boxplay.id',
      password: 'operator123',
      role: UserRole.OPERATOR,
      branchId: branch.id,
    },
    {
      name: 'Member BoxPlay',
      email: 'member@boxplay.id',
      password: 'member123',
      role: UserRole.MEMBER,
    },
  ]

  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    })
    console.log('👤 User created:', user.email, user.role)

    // 4. Buat Member Profile untuk member
    if (user.role === UserRole.MEMBER) {
      const memberProfile = await prisma.memberProfile.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          memberId: 'MBR-001',
          level: MemberLevel.GOLD,
          mainTimeBalance: 0,
          bonusTimeBalance: 0,
          totalDeposit: 0,
          branchId: branch.id,
          registeredBy: (await prisma.user.findFirst({ where: { role: UserRole.OPERATOR } }))!.id,
        },
      })
      console.log('👥 Member profile created:', memberProfile.memberId)
    }
  }

  console.log('✅ Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
