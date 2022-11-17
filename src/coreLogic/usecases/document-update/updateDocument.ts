import { DocumentGateway } from '../../gateways/documentGateway'
import { Document } from '../documents-listing/document'

export const updateDocument = async(id: string, name: string, type: string, fileName: string, client_id: number, documentGateway: DocumentGateway): Promise<Document> => {
  return await documentGateway.updateById(id, name, type, fileName, client_id)
}