import { Document } from "../documents-listing/document";
import {
  InMemoryDocumentGateway,
  DocumentDoesNotExistsError,
} from "../../../adapters/document/inMemoryDocumentGateway";
import { searchDocument } from "./searchDocument";
import { FakeUuidGenerator } from "../../../adapters/uuid/fakeUuidGenerator";

describe("Search document", () => {
  let documentGateway: InMemoryDocumentGateway;
  const document1: Document = {
    id: "1",
    name: "Document 1",
    type: "pdf",
    fileName: "document1.pdf",
    client_id: 1,
  };

  beforeEach(() => {
    const uuidGenerator = new FakeUuidGenerator();
    documentGateway = new InMemoryDocumentGateway(uuidGenerator);
    givenSomeExistingDocuments(document1);
  });
  it("should return one or more existing documents when search query is correct", async () => {
    const res = await searchDocument("1", documentGateway);
    expect(res).toEqual([document1]);
  });
  it("should not list any document when search query is wrong", async () => {
    const res = await searchDocument("NotExisting", documentGateway);
    expect(res).toEqual([]);
  });
  const givenSomeExistingDocuments = (...documents: Array<Document>) => {
    documentGateway.feedWith(...documents);
  };
});
