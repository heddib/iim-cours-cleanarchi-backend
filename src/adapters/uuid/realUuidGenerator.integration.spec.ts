import { RealUuidGenerator } from './realUuidGenerator'

const expectedUuid = 'the-expected-uuid'

jest.mock('nanoid', () => {
  return { nanoid: () => expectedUuid }
})

describe('Real uuid generator', () => {
  it('should give a random generated string', () => {
    const uuidGenerator = new RealUuidGenerator()
    expect(uuidGenerator.generate()).toEqual(expectedUuid)
  })
})
