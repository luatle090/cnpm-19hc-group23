const db = require('../utils/db');

module.exports = {
  all: () => {
    const sql = 'select * from loaixe';
    return db.load(sql);
  },

  loadById: id => {
    const sql = `select * from loaixe where id = ${id}`;
    return db.load(sql);
  },

  add: entity => db.add(entity, 'loaixe'),
  del: id => db.del({ id: id }, 'loaixe'),
  patch: (id, entity) => {
    delete entity.id;
    return db.patch(entity, { id: id }, 'loaixe')
  },
};
