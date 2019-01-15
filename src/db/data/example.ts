import * as connection from '../connect';
import { filterGuarded } from '../../lib/filter-guarded';

const guarded = ['deleted_at', 'updated_at', 'created_at'];

const examples = () => {
  return connection.connect()('example');
};

const all = (withDeleted = false) => {
  const q = examples();
  if (!withDeleted) {
    q.whereNull('deleted_at');
  }
  return q;
};

const create = record => {
  filterGuarded(record, guarded);
  return examples().insert(record, '*');
};

const update = (id: number, record) => {
  filterGuarded(record, guarded);
  record.updated_at = new Date().toUTCString();
  return examples()
    .where({ id })
    .update(record, '*');
};

const restore = (id: number) => {
  return examples()
    .where({ id })
    .update(
      {
        updated_at: new Date().toUTCString(),
        deleted_at: null
      },
      ['id']
    );
};

const getById = (id: number, withDeleted = false) => {
  const q = examples()
    .where({ id })
    .returning('*')
    .first();
  if (!withDeleted) {
    q.whereNull('deleted_at');
  }
  return q;
};

const softDelete = (id: number) => {
  return examples()
    .where({ id })
    .update(
      {
        updated_at: new Date().toUTCString(),
        deleted_at: new Date().toUTCString()
      },
      ['id']
    );
};

const destroy = (id: number) => {
  return examples()
    .where({ id })
    .del();
};

export const exampleData = {
  all,
  getById,
  create,
  destroy,
  restore,
  softDelete,
  update
};
