const db = require('../utils/db');

module.exports = {
  all: () => {
    const sql = 'select * from phutung';
    return db.load(sql);
  },

  loadById: id => {
    const sql = `select * from phutung where id = ${id}`;
    return db.load(sql);
  },

  add: entity => db.add(entity, 'phutung'),
  del: id => db.del({ id: id }, 'phutung'),
  patch: (id, entity) => {
    delete entity.id;
    return db.patch(entity, { id: id }, 'phutung')
  },
};
