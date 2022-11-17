import { RealUuidGenerator } from './src/adapters/secondary/realUuidGenerator'
import { InMemoryClientGateway } from './src/adapters/client/inMemoryClientGateway'
import { ClientGateway } from './src/coreLogic/gateways/clientGateway'
import { JsonServerClientGateway } from './src/adapters/secondary/JsonServerClientGateway'

export const clientGateway = (): ClientGateway => {
  return new JsonServerClientGateway()
}
