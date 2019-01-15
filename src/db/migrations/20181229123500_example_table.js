exports.up = knex => {
  return knex.schema
    .createTable('example', table => {
      table.increments('id');
      table.string('name').nullable();
      table.timestamps(true, true);
      table.timestamp('deleted_at').nullable();

      // indices
      table.index('id');
      table.index('deleted_at');
      table.index('name');
    })
    .then(() => {
      console.log('example table has been created');
    });
};

exports.down = knex => {
  return knex.schema.dropTable('example').then(() => {
    console.log('example table dropped');
  });
};
