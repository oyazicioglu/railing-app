import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const profile1 = await prisma.profile.upsert({
        create: {
            code: 'KM14079',
            weight: 5718,
            depth: 34,
            height: 50,
            width: 6000,
            objectPath: '/path/to/KM14079',
            price: 2
        },
        update: {},
        where: {
            id: 1
        }
    })

    const accessory1 = await prisma.accessory.upsert({
        create: {
            code: 'KM2050',
            price: 1,
            objectPath: '/path/to/KM2050'
        },
        update: {},
        where: {
            id: 1
        }
    })

    const system1 = await prisma.system.upsert({
        where: { id: 1 },
        create: {
            name: "Paris",
            id: 1,
            type: "Paris",
            accessories: {
                connectOrCreate: {
                    create: accessory1,
                    where: { id: 1 }
                }
            },
            profiles: {
                connectOrCreate: {
                    create: profile1,
                    where: { id: 1 }
                }
            }

        },
        update: {}
    })

    const system2 = await prisma.system.upsert({
        where: { id: 2 },
        create: {
            name: "Bodrum",
            id: 2,
            type: "Bodrum",
            accessories: {
                connectOrCreate: {
                    create: accessory1,
                    where: { id: 1 }
                }
            },
            profiles: {
                connectOrCreate: {
                    create: profile1,
                    where: { id: 1 }
                }
            }
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