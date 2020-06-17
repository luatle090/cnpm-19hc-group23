const db = require('../utils/db');

module.exports = {
  all: () => {
    const sql = 'select * from hangxe';
    return db.load(sql);
  },

  loadById: id => {
    const sql = `select * from hangxe where id = ${id}`;
    return db.load(sql);
  },

  add: entity => db.add(entity, 'hangxe'),
  del: id => db.del({ id: id }, 'hangxe'),
  patch: (id, entity) => {
    delete entity.id;
    return db.patch(entity, { id: id }, 'hangxe')
  },
};
