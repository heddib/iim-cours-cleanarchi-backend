import { Client } from '../clients-listing/client'
import { InMemoryClientGateway, ClientDoesNotExistsError } from '../../../adapters/client/inMemoryClientGateway'
import { deleteClient } from './deleteClient'
import { FakeUuidGenerator } from '../../../adapters/uuid/fakeUuidGenerator'

describe('Delete client', () => {
  let clientGateway: InMemoryClientGateway
  const heddi: Client = { id: '1', firstname: 'Heddi', lastname: 'Brahiti' }

  beforeEach(() => {
    const uuidGenerator = new FakeUuidGenerator()
    clientGateway = new InMemoryClientGateway(uuidGenerator)
    givenSomeExistingClients(heddi)
  })
  it('should delete an existing client', async () => {
    await deleteClient('1', clientGateway)
    await expect(clientGateway.getById('1')).rejects.toThrow(ClientDoesNotExistsError)
  })
  it('should throw an error if the client does not exists', async () => {
    await expect(deleteClient('notExisting', clientGateway)).rejects.toThrow(ClientDoesNotExistsError)
  })
  const givenSomeExistingClients = (...clients: Array<Client>) => {
    clientGateway.feedWith(...clients)
  }
})
