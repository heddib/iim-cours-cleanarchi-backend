import { ClientGateway } from '../../gateways/clientGateway'

export const deleteClient = async(id: string, clientGateway: ClientGateway) => {
  return clientGateway.deleteById(id)
}
