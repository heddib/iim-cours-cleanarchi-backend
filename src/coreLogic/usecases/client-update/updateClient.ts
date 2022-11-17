import { ClientGateway } from '../../gateways/clientGateway'
import { Client } from '../clients-listing/client'

export const updateClient = async(id: string, firstname: string, lastname: string, clientGateway: ClientGateway): Promise<Client> => {
  return await clientGateway.updateById(id, firstname, lastname)
}
