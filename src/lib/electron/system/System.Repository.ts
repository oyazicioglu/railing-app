import { PrismaClient } from "@prisma/client";

export class SystemRepository {
    constructor() { }

    async List() {
        const client = new PrismaClient();

        const systems = client.system.findMany().finally(() => {
            client.$disconnect()
        })

        return systems;
    }

    async Get(systemId: number) {
        const client = new PrismaClient();
        const system = await client.system.findFirst({
            where: {
                id: systemId
            },
            include: {
                accessories: true,
                profiles: true
            }
        })

        return system;
    }
}