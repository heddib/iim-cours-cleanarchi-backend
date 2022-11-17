import { InMemoryDocumentGateway } from '../../../adapters/document/inMemoryDocumentGateway'
import { Document } from '../documents-listing/document'
import { FakeUuidGenerator } from '../../../adapters/uuid/fakeUuidGenerator'
import { createDocument } from './createDocument'

describe('Create document', () => {
  describe('Create one document', () => {
    const expectedDocument: Document = {
      id: '1',
      name: 'Document 1',
      type: 'pdf',
      fileName: 'document1.pdf',
      client_id: 1,
    }
    let res: Document
    let documentGateway: InMemoryDocumentGateway
    beforeEach(async () => {
      const uuidGenerator = new FakeUuidGenerator()
      documentGateway = new InMemoryDocumentGateway(uuidGenerator)
      uuidGenerator.setNextUuids('1')
      res = await createDocument('Document 1', 'pdf', 'document1.pdf', 1, documentGateway)
    })
    it('should return the created document', () => {
      expect(res).toEqual(expectedDocument)
    })
    it('should save the created document', async () => {
      expect(await documentGateway.getById(expectedDocument.id)).toEqual(expectedDocument)
    })
  })
})
