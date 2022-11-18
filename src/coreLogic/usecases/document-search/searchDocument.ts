import { DocumentGateway } from '../../gateways/documentGateway'
import { Document } from '../documents-listing/document'

export const searchDocument = async(query: string, documentGateway: DocumentGateway): Promise<Array<Document>> => {
  return await documentGateway.search(query)
}
