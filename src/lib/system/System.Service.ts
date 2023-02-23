import { SystemRepository } from "./System.Repository";

export class SystemService {
    private repository = new SystemRepository()

    async List() {
        return this.repository.List();
    }

    async Get(id: number) {
        return this.repository.Get(id);
    }
}