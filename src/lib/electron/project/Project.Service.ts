import { ProjectRepository } from './Project.Repository';

export class ProjectService {
    private repository = new ProjectRepository();

    async List() {
        return this.repository.List();
    }
}
