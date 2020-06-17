const db = require('../utils/db');

module.exports = {
  all: () => {
    const sql = 'select * from dongxe';
    return db.load(sql);
  },

  loadById: id => {
    const sql = `select * from dongxe where id = ${id}`;
    return db.load(sql);
  },

  add: entity => db.add(entity, 'dongxe'),
  del: id => db.del({ id: id }, 'dongxe'),
  patch: (id, entity) => {
    delete entity.id;
    return db.patch(entity, { id: id }, 'dongxe')
  },
};
