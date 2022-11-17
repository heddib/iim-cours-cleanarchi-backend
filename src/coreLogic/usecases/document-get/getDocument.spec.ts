import { Document } from '../documents-listing/document'
import { InMemoryDocumentGateway, DocumentDoesNotExistsError } from '../../../adapters/document/inMemoryDocumentGateway'
import { getDocument } from './getDocument'
import { FakeUuidGenerator } from '../../../adapters/uuid/fakeUuidGenerator'
 
describe('Get document', () => {
  let documentGateway: InMemoryDocumentGateway
  const document1: Document = { id: '1', name: 'Document 1', type: 'pdf', fileName: 'document1.pdf', client_id: 1 }

  beforeEach(() => {
    const uuidGenerator = new FakeUuidGenerator()
    documentGateway = new InMemoryDocumentGateway(uuidGenerator)
    givenSomeExistingDocuments(document1)
  })
  it('should return an existing document', async () => {
    const res = await getDocument('1', documentGateway)
    expect(res).toEqual(document1)
  })
  it('should throw an error if the document does not exists', async () => {
    await expect(getDocument('notExisting', documentGateway)).rejects.toThrow(DocumentDoesNotExistsError)
  })
  const givenSomeExistingDocuments = (...documents: Array<Document>) => {
    documentGateway.feedWith(...documents)
  }
})
