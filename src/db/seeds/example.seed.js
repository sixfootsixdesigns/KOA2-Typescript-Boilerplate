exports.seed = async (knex) => {
  const records = [
    {
      name: 'Test'
    }
  ];
  return knex('example').insert(records);
};
