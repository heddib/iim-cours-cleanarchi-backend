import { Document } from '../documents-listing/document'
import { DocumentGateway } from '../../gateways/documentGateway'

export const createDocument = async (name: string, type: string, fileName: string, client_id: number, documentGateway: DocumentGateway): Promise<Document> => {
  return await documentGateway.create(name, type, fileName, client_id)
}