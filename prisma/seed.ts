import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const system1 = await prisma.system.upsert({
        where: { id: 1 },
        create: {
            name: "Milas",
            id: 1
        },
        update: {}
    })

    const system2 = await prisma.system.upsert({
        where: { id: 2 },
        create: {
            name: "Bodrum",
            id: 2
        },
        update: {}
    })

    const proje1 = await prisma.project.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Proje 1',
            createdAt: new Date(Date.now()),
            system: {
                connectOrCreate: {
                    create: system1,
                    where: { id: 1 }
                }
            }
        },
    })

    const proje2 = await prisma.project.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'Proje 2',
            active: false,
            createdAt: new Date(Date.now()),
            system: {
                connectOrCreate: {
                    create: system2,
                    where: { id: 2 }
                }
            }
        },
    })

    const proje3 = await prisma.project.upsert({
        where: { id: 3 },
        update: {},
        create: {
            name: 'Proje 3',
            active: true,
            createdAt: new Date(Date.now()),
            system: {
                connectOrCreate: {
                    create: system1,
                    where: { id: 1 }
                }
            }
        },
    })

    const proje4 = await prisma.project.upsert({
        where: { id: 4 },
        update: {},
        create: {
            name: 'Proje 4',
            active: true,
            createdAt: new Date(Date.now()),
            system: {
                connectOrCreate: {
                    create: system2,
                    where: { id: 2 }
                }
            }
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