import { listDocuments, listDocumentsByClientId } from './listDocuments'
import { InMemoryDocumentGateway } from '../../../adapters/document/inMemoryDocumentGateway'
import { Document } from './document'
import { FakeUuidGenerator } from '../../../adapters/uuid/fakeUuidGenerator'

describe('List documents', () => {
  let documentGateway: InMemoryDocumentGateway
  beforeEach(() => {
    const uuidGenerator = new FakeUuidGenerator()
    documentGateway = new InMemoryDocumentGateway(uuidGenerator)
  })
  it('should not list any document when no one is available', async () => {
    const res = await listDocuments(documentGateway)
    expect(res).toEqual([])
  })
  it('should list all documents when there is available documents', async () => {
    const document1: Document = { id: '1', name: 'Document 1', type: 'pdf', fileName: 'document1.pdf', client_id: 1 }
    const document2: Document = { id: '2', name: 'Document 2', type: 'pdf', fileName: 'document2.pdf', client_id: 1 }
    givenSomeExistingDocuments(document1, document2)
    const res = await listDocuments(documentGateway)
    expect(res).toEqual([document1, document2])
  })
  const givenSomeExistingDocuments = (...documents: Array<Document>) => {
    documentGateway.feedWith(...documents)
  }
})

describe('List documents for a client', () => {
  let documentGateway: InMemoryDocumentGateway
  const clientId = 1
  beforeEach(() => {
    const uuidGenerator = new FakeUuidGenerator()
    documentGateway = new InMemoryDocumentGateway(uuidGenerator)
  })
  it('should not list any document when no one is available for this client', async () => {
    const res = await listDocumentsByClientId(clientId, documentGateway)
    expect(res).toEqual([])
  })
  it('should list all documents when there is available documents for this client', async () => {
    const document1: Document = { id: '1', name: 'Document 1', type: 'pdf', fileName: 'document1.pdf', client_id: 1 }
    const document2: Document = { id: '2', name: 'Document 2', type: 'pdf', fileName: 'document2.pdf', client_id: 1 }
    givenSomeExistingDocuments(document1, document2)
    const res = await listDocumentsByClientId(clientId, documentGateway)
    expect(res).toEqual([document1, document2])
  })
  const givenSomeExistingDocuments = (...documents: Array<Document>) => {
    documentGateway.feedWith(...documents)
  }
})