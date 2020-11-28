import { createConnection } from 'typeorm';
import { cleanUpData } from '../../testHelpers/test.helpers';
import { ExampleEntity } from '../ExampleEntity.entity';

describe('ExampleEntity', () => {
  beforeAll(async () => {
    await createConnection();
  });

  beforeEach(async () => {
    await cleanUpData();
  });

  it('works', async () => {
    const record = await ExampleEntity.create({
      definition: JSON.stringify({ cat: 'hat' }),
    }).save();
    expect(record.id).toHaveLength(36);
  });
});
