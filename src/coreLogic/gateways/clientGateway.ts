import { Client } from '../usecases/clients-listing/client'

export interface ClientGateway {
  listAll(): Promise<Array<Client>>
  getById(id: string): Promise<Client>
  create(firstname: string, lastname: string): Promise<Client>
  deleteById(id: string): Promise<void>
  updateById(id: string, firstname: string, lastname: string): Promise<Client>
}
