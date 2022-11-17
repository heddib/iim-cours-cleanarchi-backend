import { listClients } from './listClients'
import { InMemoryClientGateway } from '../../../adapters/client/inMemoryClientGateway'
import { Client } from './client'
import { FakeUuidGenerator } from '../../../adapters/uuid/fakeUuidGenerator'

describe('List clients', () => {
  let clientGateway: InMemoryClientGateway
  beforeEach(() => {
    const uuidGenerator = new FakeUuidGenerator()
    clientGateway = new InMemoryClientGateway(uuidGenerator)
  })
  it('should not list any client when no one is available', async () => {
    const res = await listClients(clientGateway)
    expect(res).toEqual([])
  })
  it('should list all clients when there is available clients', async () => {
    const heddi: Client = { id: '1', firstname: 'Heddi', lastname: 'Brahiti' }
    const antoine: Client = { id: '2', firstname: 'Antoine', lastname: 'Puech' }
    givenSomeExistingClients(heddi, antoine)
    const res = await listClients(clientGateway)
    expect(res).toEqual([heddi, antoine])
  })
  const givenSomeExistingClients = (...clients: Array<Client>) => {
    clientGateway.feedWith(...clients)
  }
})
