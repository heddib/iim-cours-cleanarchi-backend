import { Client } from "../clients-listing/client";
import { InMemoryClientGateway } from "../../../adapters/client/inMemoryClientGateway";
import { searchClient } from "./searchClient";
import { FakeUuidGenerator } from "../../../adapters/uuid/fakeUuidGenerator";

describe("Search client", () => {
  let clientGateway: InMemoryClientGateway;
  const client1: Client = {
    id: "1",
    firstname: "Heddi",
    lastname: "Brahiti",
  };

  beforeEach(() => {
    const uuidGenerator = new FakeUuidGenerator();
    clientGateway = new InMemoryClientGateway(uuidGenerator);
    givenSomeExistingClients(client1);
  });
  it("should return one or more existing clients when search query is correct", async () => {
    const res = await searchClient("Heddi", clientGateway);
    expect(res).toEqual([client1]);
  });
  it("should not list any client when search query is wrong", async () => {
    const res = await searchClient("NotExisting", clientGateway);
    expect(res).toEqual([]);
  });
  const givenSomeExistingClients = (...clients: Array<Client>) => {
    clientGateway.feedWith(...clients);
  };
});
