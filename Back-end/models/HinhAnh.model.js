const db = require('../utils/db');

module.exports = {
  all: () => {
    const sql = 'select * from hinhanh';
    return db.load(sql);
  },

  loadById: id => {
    const sql = `select * from hinhanh where id = ${id}`;
    return db.load(sql);
  },

  add: entity => db.add(entity, 'hinhanh'),
  del: id => db.del({ id: id }, 'hinhanh'),
  patch: (id, entity) => {
    delete entity.id;
    return db.patch(entity, { id: id }, 'hinhanh')
  },
};
