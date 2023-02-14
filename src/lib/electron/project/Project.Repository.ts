import { PrismaClient } from '@prisma/client';

export class ProjectRepository {
    async List() {
        const client = new PrismaClient();
        const projects = await client.project.findMany().finally(() => {
            client.$disconnect();
        });

        return projects;
    }
}
