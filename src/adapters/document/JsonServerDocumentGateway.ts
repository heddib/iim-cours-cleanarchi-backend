import { DocumentGateway } from "../../coreLogic/gateways/documentGateway";
import { Document } from "../../coreLogic/usecases/documents-listing/document";
import fetch from "node-fetch";

export class JsonServerDocumentGateway implements DocumentGateway {
  create(
    name: string,
    type: string,
    fileName: string,
    client_id: number
  ): Promise<Document> {
    return Promise.resolve({
      id: "default",
      name,
      type,
      fileName,
      client_id,
    });
  }

  async getById(id: string): Promise<Document> {
    const res = await fetch(`http://localhost:3008/documents/${id}`);
    const json = await res.json();
    return json as Document;
  }

  async listAll(): Promise<Array<Document>> {
    const res = await fetch("http://localhost:3008/documents");
    const json = await res.json();
    return json as Document[];
  }

  async deleteById(id: string): Promise<void> {
    await fetch(`http://localhost:3008/documents/${id}`, { method: "DELETE" });
  }

  async updateById(
    id: string,
    name: string,
    type: string,
    fileName: string,
    client_id: number
  ): Promise<Document> {
    await fetch(`http://localhost:3008/documents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, type, fileName, client_id }),
    });
    return { id, name, type, fileName, client_id };
  }

  async listAllByClientId(client_id: number): Promise<Document[]> {
    const res = await fetch(`http://localhost:3008/documents?client_id=${client_id}`);
    const json = await res.json();
    return json as Document[];
  }
}
