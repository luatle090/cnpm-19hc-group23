const db = require('../utils/db');

module.exports = {
  loadByCode: code => {
    const sql = `select idTinhTrang, moTa from tinhtrang where code = '${code}'`;

    return db.load(sql);
  },

  add: entity => db.add(entity, 'tinhtrang'),
  del: id => db.del({ id: id }, 'tinhtrang'),
  patch: (id, entity) => {
    delete entity.id;
    return db.patch(entity, { id: id }, 'tinhtrang')
  },
};
