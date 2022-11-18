import { ClientGateway } from '../../gateways/clientGateway'
import { Client } from '../clients-listing/client'

export const searchClient = async(query: string, clientGateway: ClientGateway): Promise<Array<Client>> => {
  return await clientGateway.search(query)
}
