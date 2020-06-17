const db = require('../utils/db');

module.exports = {
  loadByCode: id => {
    const sql = `select * from tinhtrang where id = ?`;

    return db.select(sql, [id]);
  },

  add: entity => db.add(entity, 'tinhtrang'),
  del: id => db.del({ id: id }, 'tinhtrang'),
  patch: (id, entity) => {
    delete entity.id;
    return db.patch(entity, { id: id }, 'tinhtrang')
  },
};
