import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const proje1 = await prisma.project.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Proje 1',
            createdAt: new Date(Date.now())
        },
    })

    const proje2 = await prisma.project.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'Proje 2',
            active: false,
            createdAt: new Date(Date.now())
        },
    })

    const proje3 = await prisma.project.upsert({
        where: { id: 3 },
        update: {},
        create: {
            name: 'Proje 3',
            active: true,
            createdAt: new Date(Date.now())
        },
    })

    const proje4 = await prisma.project.upsert({
        where: { id: 4 },
        update: {},
        create: {
            name: 'Proje 4',
            active: true,
            createdAt: new Date(Date.now())
        },
    })
}

main()

    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })