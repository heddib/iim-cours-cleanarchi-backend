import { Client } from '../clients-listing/client'
import { InMemoryClientGateway, ClientDoesNotExistsError } from '../../../adapters/client/inMemoryClientGateway'
import { updateClient } from './updateClient'
import { FakeUuidGenerator } from '../../../adapters/uuid/fakeUuidGenerator'

describe('Update client', () => {
  let clientGateway: InMemoryClientGateway
  const heddi: Client = { id: '1', firstname: 'Heddi', lastname: 'Brahiti' }

  beforeEach(() => {
    const uuidGenerator = new FakeUuidGenerator()
    clientGateway = new InMemoryClientGateway(uuidGenerator)
    givenSomeExistingClients(heddi)
  })
  it('should update an existing client', async () => {
    const res = await updateClient('1', 'Heddi', 'Brahiti', clientGateway)
    expect(res).toEqual(heddi)
  })
  it('should throw an error if the client does not exists', async () => {
    await expect(updateClient('notExisting', 'Not', 'Existing', clientGateway)).rejects.toThrow(ClientDoesNotExistsError)
  })
  const givenSomeExistingClients = (...clients: Array<Client>) => {
    clientGateway.feedWith(...clients)
  }
})