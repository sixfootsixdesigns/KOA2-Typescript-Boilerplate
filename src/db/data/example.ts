import * as connection from '../connect';
import { filterGuarded } from '../../lib/filter-guarded';

const guarded = [
  'deleted_at',
  'updated_at',
  'created_at'
];

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

const create = (record) => {
  filterGuarded(record, guarded);
  return examples()
    .returning('*')
    .insert(record);
};

const update = (record) => {
  filterGuarded(record, guarded);
  return examples()
    .where({
      id: record.id
    })
    .update(record)
    .returning('*');
}

const restore = (id: number) => {
  return examples()
    .where({id})
    .update({
      deleted_at: null
    });
};

const byId = (id: number, withDeleted = false) => {
  const q = examples()
    .where({id})
    .returning('*')
    .first();
  if (!withDeleted) {
    q.whereNull('deleted_at');
  }
  return q;
};

const softDelete = (id: number) => {
  return examples()
    .where({id})
    .update({
      deleted_at: new Date().toISOString()
    });
};

const destroy = (id: number) => {
  return examples()
    .where({id})
    .del();
};

export const sitesData = {
  all,
  byId,
  create,
  destroy,
  restore,
  softDelete,
  update  
};
