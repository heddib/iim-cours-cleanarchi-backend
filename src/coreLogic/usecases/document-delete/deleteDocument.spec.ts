import { Document } from '../documents-listing/document'
import { InMemoryDocumentGateway, DocumentDoesNotExistsError } from '../../../adapters/document/inMemoryDocumentGateway'
import { deleteDocument } from './deleteDocument'
import { FakeUuidGenerator } from '../../../adapters/uuid/fakeUuidGenerator'

describe('Delete document', () => {
  let documentGateway: InMemoryDocumentGateway
  const document1: Document = { id: '1', name: 'Document 1', type: 'pdf', fileName: 'document1.pdf', client_id: 1 }

  beforeEach(() => {
    const uuidGenerator = new FakeUuidGenerator()
    documentGateway = new InMemoryDocumentGateway(uuidGenerator)
    givenSomeExistingDocuments(document1)
  })
  it('should delete an existing document', async () => {
    await deleteDocument('1', documentGateway)
    await expect(documentGateway.getById('1')).rejects.toThrow(DocumentDoesNotExistsError)
  })
  it('should throw an error if the document does not exists', async () => {
    await expect(deleteDocument('notExisting', documentGateway)).rejects.toThrow(DocumentDoesNotExistsError)
  })
  const givenSomeExistingDocuments = (...documents: Array<Document>) => {
    documentGateway.feedWith(...documents)
  }
})
