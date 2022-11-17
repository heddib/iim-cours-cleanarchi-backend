import { Client } from '../clients-listing/client'
import { ClientGateway } from '../../gateways/clientGateway'

export const createClient = async (firstname: string, lastname: string, clientGateway: ClientGateway): Promise<Client> => {
  return await clientGateway.create(firstname, lastname)
}
