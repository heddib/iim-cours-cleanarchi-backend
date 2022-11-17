import { Client } from '../clients-listing/client'
import { InMemoryClientGateway, ClientDoesNotExistsError } from '../../../adapters/client/inMemoryClientGateway'
import { getClient } from './getClient'
import { FakeUuidGenerator } from '../../../adapters/uuid/fakeUuidGenerator'

describe('Get client', () => {
  let clientGateway: InMemoryClientGateway
  const heddi: Client = { id: '1', firstname: 'Heddi', lastname: 'Brahiti' }

  beforeEach(() => {
    const uuidGenerator = new FakeUuidGenerator()
    clientGateway = new InMemoryClientGateway(uuidGenerator)
    givenSomeExistingClients(heddi)
  })
  it('should return an existing client', async () => {
    const res = await getClient('1', clientGateway)
    expect(res).toEqual(heddi)
  })
  it('should throw an error if the client does not exists', async () => {
    await expect(getClient('notExisting', clientGateway)).rejects.toThrow(ClientDoesNotExistsError)
  })
  const givenSomeExistingClients = (...clients: Array<Client>) => {
    clientGateway.feedWith(...clients)
  }
})
