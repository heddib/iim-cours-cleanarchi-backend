import { Document } from '../usecases/documents-listing/document'

export interface DocumentGateway {
  listAll(): Promise<Array<Document>>
  getById(id: string): Promise<Document>
  create(name: string, type: string, filenmae: string, client_id: number): Promise<Document>
  deleteById(id: string): Promise<void>
  updateById(id: string, name: string, type: string, filenmae: string, client_id: number): Promise<Document>
  listAllByClientId(client_id: number): Promise<Array<Document>>
  search(query: string): Promise<Array<Document>>
}
