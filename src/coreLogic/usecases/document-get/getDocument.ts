import { DocumentGateway } from '../../gateways/documentGateway'
import { Document } from '../documents-listing/document'

export const getDocument = async(id: string, documentGateway: DocumentGateway): Promise<Document> => {
  return await documentGateway.getById(id)
}
