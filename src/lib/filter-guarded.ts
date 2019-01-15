const filterGuarded = (record: any, guarded = []) => {
  guarded.forEach(field => {
    if (record[field]) {
      delete record[field];
    }
  });
};

export {
  filterGuarded
}
