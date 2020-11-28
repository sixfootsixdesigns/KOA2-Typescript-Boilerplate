import { buildResponseBody } from '../lib/response';
import { ExampleEntity } from '../entity';
import * as Koa from 'koa';
import { badData } from '@hapi/boom';

const create = async (ctx: any) => {
  const { ...body } = ctx.request.body;
  const data: Partial<ExampleEntity> = body;

  if (!data.definition) {
    throw badData('You must send a definition');
  }

  const record = await ExampleEntity.create({
    definition: data.definition,
  }).save();

  ctx.body = buildResponseBody(record);
};

const getById = async (ctx: Koa.Context) => {
  const record = await ExampleEntity.findOneOrFail(ctx.params.id, { withDeleted: false });
  ctx.body = buildResponseBody(record);
};

export const exampleController = {
  create,
  getById,
};
