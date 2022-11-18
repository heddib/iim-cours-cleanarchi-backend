import { ClientGateway } from '../../gateways/clientGateway'
import { Client } from '../clients-listing/client'

export const getClient = async(id: string, clientGateway: ClientGateway): Promise<Client> => {
  return await clientGateway.getById(id)
}
