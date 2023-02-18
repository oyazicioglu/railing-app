import { Project } from '@prisma/client';
import { ProjectRepository } from './Project.Repository';

export class ProjectService {
    private repository = new ProjectRepository();

    async List() {
        return this.repository.List();
    }

    async Add(project: Project) {
        return this.repository.Add(project);
    }

    async Update(project: Project) {
        return this.repository.Update(project);
    }

    async Get(id: number) {
        return this.repository.Get(id);
    }
    async Delete(id: number) {
        return this.repository.Delete(id);
    }
}
