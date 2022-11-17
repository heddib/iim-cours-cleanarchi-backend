import { InMemoryClientGateway } from '../../../adapters/client/inMemoryClientGateway'
import { Client } from '../clients-listing/client'
import { FakeUuidGenerator } from '../../../adapters/uuid/fakeUuidGenerator'
import { createClient } from './createClient'

describe('Create client', () => {
  describe('Create one client', () => {
    const expectedClient: Client = {
      id: '1',
      firstname: 'Heddi',
      lastname: 'Brahiti'
    }
    let res: Client
    let clientGateway
    beforeEach(async () => {
      const uuidGenerator = new FakeUuidGenerator()
      clientGateway = new InMemoryClientGateway(uuidGenerator)
      uuidGenerator.setNextUuids('1')
      res = await createClient('Heddi', 'Brahiti', clientGateway)
    })
    it('should return the created client', () => {
      expect(res).toEqual(expectedClient)
    })
    it('should save the created client', async () => {
      expect(await clientGateway.getById(expectedClient.id)).toEqual(expectedClient)
    })
  })
})
