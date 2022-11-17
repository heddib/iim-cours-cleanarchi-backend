import { DocumentGateway } from '../../gateways/documentGateway'
import { Document } from './document'

export const listDocuments = async (documentGateway: DocumentGateway): Promise<Array<Document>> => {
  return await documentGateway.listAll()
}

export const listDocumentsByClientId = async (client_id: number, documentGateway: DocumentGateway): Promise<Array<Document>> => {
  return await documentGateway.listAllByClientId(client_id)
}
