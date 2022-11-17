import { DocumentGateway } from "../../coreLogic/gateways/documentGateway";
import { Document } from "../../coreLogic/usecases/documents-listing/document";
import { UuidGenerator } from "../../coreLogic/gateways/uuidGenerator";

export class DocumentDoesNotExistsError extends Error {
  constructor(id: string) {
    super(`Document ${id} does not exists`);
  }
}

export class InMemoryDocumentGateway implements DocumentGateway {
  private documents: Array<Document> = [];
  private uuidGenerator: UuidGenerator;

  constructor(uuidGenerator: UuidGenerator) {
    this.uuidGenerator = uuidGenerator;
  }

  feedWith(...documents: Array<Document>) {
    this.documents = documents;
  }

  async listAll(): Promise<Array<Document>> {
    return Promise.resolve(this.documents);
  }

  async getById(id: string): Promise<Document> {
    const res = this.documents.find((p) => p.id === id);
    if (!res) {
      throw new DocumentDoesNotExistsError(id);
    }
    return res;
  }

  async create(
    name: string,
    type: string,
    fileName: string,
    client_id: number
  ): Promise<Document> {
    const newDocument = {
      id: this.uuidGenerator.generate(),
      name,
      type,
      fileName,
      client_id,
    };
    this.documents.push(newDocument);
    return Promise.resolve(newDocument);
  }

  async deleteById(id: string): Promise<void> {
    const index = this.documents.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new DocumentDoesNotExistsError(id);
    }
    this.documents.splice(index, 1);
  }

  async updateById(
    id: string,
    name: string,
    type: string,
    fileName: string,
    client_id: number
  ): Promise<Document> {
    const res = this.documents.find((p) => p.id === id);
    if (!res) {
      throw new DocumentDoesNotExistsError(id);
    }

    res.name = name;
    res.type = type;
    res.fileName = fileName;
    res.client_id = client_id;
    return res;
  }

  async listAllByClientId(client_id: number): Promise<Array<Document>> {
    const res = this.documents.filter((p) => p.client_id === client_id);
    return res;
  }
}
