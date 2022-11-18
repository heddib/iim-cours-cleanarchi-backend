import { ClientGateway } from "../../coreLogic/gateways/clientGateway";
import { Client } from "../../coreLogic/usecases/clients-listing/client";
import { UuidGenerator } from "../../coreLogic/gateways/uuidGenerator";

export class ClientDoesNotExistsError extends Error {
  constructor(id: string) {
    super(`Client ${id} does not exists`);
  }
}

export class InMemoryClientGateway implements ClientGateway {
  private clients: Array<Client> = [];
  private uuidGenerator: UuidGenerator;

  constructor(uuidGenerator: UuidGenerator) {
    this.uuidGenerator = uuidGenerator;
  }

  feedWith(...clients: Array<Client>) {
    this.clients = clients;
  }

  async listAll(): Promise<Array<Client>> {
    return Promise.resolve(this.clients);
  }

  async getById(id: string): Promise<Client> {
    const res = this.clients.find((p) => p.id === id);
    if (!res) {
      throw new ClientDoesNotExistsError(id);
    }
    return res;
  }

  async create(firstname: string, lastname: string): Promise<Client> {
    const newClient = {
      id: this.uuidGenerator.generate(),
      firstname,
      lastname,
    };
    this.clients.push(newClient);
    return Promise.resolve(newClient);
  }

  async deleteById(id: string): Promise<void> {
    const index = this.clients.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new ClientDoesNotExistsError(id);
    }
    this.clients.splice(index, 1);
  }

  async updateById(
    id: string,
    firstname: string,
    lastname: string
  ): Promise<Client> {
    const res = this.clients.find((p) => p.id === id);
    if (!res) {
      throw new ClientDoesNotExistsError(id);
    }

    res.firstname = firstname;
    res.lastname = lastname;
    return res;
  }

  async search(query: string): Promise<Array<Client>> {
    return this.clients.filter((client) =>
      client.firstname.toLowerCase().includes(query.toLowerCase()) ||
      client.lastname.toLowerCase().includes(query.toLowerCase())
    );
  }
}
