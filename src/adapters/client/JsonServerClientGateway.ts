import { ClientGateway } from '../../coreLogic/gateways/clientGateway'
import { Client } from '../../coreLogic/usecases/clients-listing/client'
import fetch from 'node-fetch'

export class JsonServerClientGateway implements ClientGateway {
  create(firstname: string, lastname: string): Promise<Client> {
    return Promise.resolve({ id:'default', firstname: firstname, lastname: lastname })
  }

  async getById(id: string): Promise<Client> {
    const res = await fetch(`http://localhost:3008/clients/${id}`)
    const json = await res.json()
    return json as Client
  }

  async listAll(): Promise<Array<Client>> {
    const res = await fetch('http://localhost:3008/clients')
    const json = await res.json()
    return json as Client[]
  }

  async deleteById(id: string): Promise<void> {
    await fetch(`http://localhost:3008/clients/${id}`, { method: 'DELETE' })
  }

  async updateById(id: string, firstname: string, lastname: string): Promise<Client> {
    await fetch(`http://localhost:3008/clients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstname, lastname }),
    })
    return { id, firstname, lastname }
  }

  async search(query: string): Promise<Client[]> {
    const res = await fetch(`http://localhost:3008/clients?q=${query}`)
    const json = await res.json()
    return json as Client[]
  }
}
