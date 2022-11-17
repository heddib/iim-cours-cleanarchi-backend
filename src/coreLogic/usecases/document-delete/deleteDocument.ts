import { DocumentGateway } from '../../gateways/documentGateway'

export const deleteDocument = async(id: string, documentGateway: DocumentGateway) => {
  return documentGateway.deleteById(id)
}
