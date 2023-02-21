import { Prisma, PrismaClient, Project } from '@prisma/client';

export class ProjectRepository {
    async List() {
        const client = new PrismaClient();
        const projects = await client.project
            .findMany({
                orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
                include: {
                    system: true
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                client.$disconnect();
            });

        return projects;
    }

    async Add(project: Project) {
        const client = new PrismaClient();
        project.createdAt = new Date(Date.now());
        const result = await client.project
            .create({
                data: project,
            })
            .finally(() => {
                client.$disconnect();
            });

        return result;
    }

    async Get(projectId: number) {
        const client = new PrismaClient();
        const project = await client.project
            .findFirst({
                where: {
                    id: projectId,
                },
            })
            .finally(() => {
                client.$disconnect();
            });

        return project;
    }

    async Delete(projectId: number) {
        const client = new PrismaClient();
        const project = await client.project
            .delete({
                where: {
                    id: projectId,
                },
            })
            .finally(() => {
                client.$disconnect();
            });

        return project;
    }

    async Update(project: Project) {
        const client = new PrismaClient();
        const updatedProject = await client.project
            .update({
                data: project,
                where: {
                    id: project.id,
                },
            })
            .finally(() => {
                client.$disconnect();
            });

        return updatedProject;
    }
}
