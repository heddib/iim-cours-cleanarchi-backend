import { ClientGateway } from '../../gateways/clientGateway'

export const getClient = async(id: string, clientGateway: ClientGateway) => {
  return clientGateway.getById(id)
}
