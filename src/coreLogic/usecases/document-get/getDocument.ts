import { DocumentGateway } from '../../gateways/documentGateway'

export const getDocument = async(id: string, documentGateway: DocumentGateway) => {
  return documentGateway.getById(id)
}
