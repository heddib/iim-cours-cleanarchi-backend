import { DocumentGateway } from '../../gateways/documentGateway'

export const deleteDocument = async(id: string, documentGateway: DocumentGateway): Promise<void> => {
  return await documentGateway.deleteById(id)
}
