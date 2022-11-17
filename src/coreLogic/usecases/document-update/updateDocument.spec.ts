import { Document } from '../documents-listing/document'
import { InMemoryDocumentGateway, DocumentDoesNotExistsError } from '../../../adapters/document/inMemoryDocumentGateway'
import { updateDocument } from './updateDocument'
import { FakeUuidGenerator } from '../../../adapters/uuid/fakeUuidGenerator'

describe('Update document', () => {
  let documentGateway: InMemoryDocumentGateway
  const document1: Document = { id: '1', name: 'Document 1', type: 'pdf', fileName: 'document1.pdf', client_id: 1 }

  beforeEach(() => {
    const uuidGenerator = new FakeUuidGenerator()
    documentGateway = new InMemoryDocumentGateway(uuidGenerator)
    givenSomeExistingDocuments(document1)
  })
  it('should update an existing document', async () => {
    const res = await updateDocument('1', 'Document 1 updated', 'pdf', 'document1.pdf', 1, documentGateway)
    expect(res).toEqual(document1)
  })
  it('should throw an error if the document does not exists', async () => {
    await expect(updateDocument('notExisting', 'Not existing document', 'none', 'notexisting', -1, documentGateway)).rejects.toThrow(DocumentDoesNotExistsError)
  })
  const givenSomeExistingDocuments = (...documents: Array<Document>) => {
    documentGateway.feedWith(...documents)
  }
})