import { ClientGateway } from '../../gateways/clientGateway'
import { Client } from './client'

export const listClients = async (clientGateway: ClientGateway): Promise<Array<Client>> => {
  return await clientGateway.listAll()
}
