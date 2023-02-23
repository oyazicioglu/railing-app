import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const system1 = await prisma.system.upsert({
        where: { id: 1 },
        create: {
            name: "Paris",
            id: 1,
            type: 0
        },
        update: {}
    })

    const system2 = await prisma.system.upsert({
        where: { id: 2 },
        create: {
            name: "Bodrum",
            id: 2,
            type: 1
        },
        update: {}
    })

    for (const index of Array(40).keys()) {
        await prisma.project.upsert({
            where: { id: index + 1 },
            update: {},
            create: {
                name: `Proje ${index + 1}`,
                createdAt: new Date(Date.now()),
                system: {
                    connectOrCreate: {
                        create: index % 2 ? system1 : system2,
                        where: { id: index % 2 ? 1 : 2 }
                    }
                }
            },
        })
    }

    /* const newProject = await prisma.project.upsert({
        where: { id: index },
        update: {},
        create: {
            name: `Proje ${index}`,
            createdAt: new Date(Date.now()),
            system: {
                connectOrCreate: {
                    create: index % 2 ? system1 : system2,
                    where: { id: index % 2 ? 1 : 2 }
                }
            }
        },
    }) */

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