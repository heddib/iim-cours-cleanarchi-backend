import { ClientGateway } from '../../gateways/clientGateway'

export const deleteClient = async(id: string, clientGateway: ClientGateway): Promise<void> => {
  return await clientGateway.deleteById(id)
}
