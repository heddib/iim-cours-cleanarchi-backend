import { listClients } from "./src/coreLogic/usecases/clients-listing/listClients";
import { getClient } from "./src/coreLogic/usecases/client-get/getClient";
import { createClient } from "./src/coreLogic/usecases/client-creation/createClient";
import { clientGateway } from "./dependencies";

import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const clientGateway = clientGateway();

app.get("/clients", async (req: any, res) => {
  const clients = await listClients(clientGateway);
  res.send(JSON.stringify(clients));
});

app.get("/client/:id", async (req: any, res) => {
  try {
    const id = req.params.id;
    const client = await getClient(id, clientGateway);
    res.send(JSON.stringify(client));
  } catch (e: any) {
    res.status(404).send(e.message);
  }
});

app.post("/client/new", async (req: any, res) => {
  const { firstname, lastname } = req.body;
  const client = await createClient(firstname, lastname, clientGateway);
  res.send(JSON.stringify(client));
});

export default app;
