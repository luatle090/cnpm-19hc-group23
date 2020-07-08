const db = require('../utils/db');

module.exports = {
  all: () => {
    const sql = 'select * from chitietkiemtra';
    return db.load(sql);
  },

  loadById: id => {
    const sql = `select * from chitietkiemtra where id = ${id}`;
    return db.load(sql);
  },

  add: entity => db.add(entity, 'chitietkiemtra'),
  del: id => db.del({ id: id }, 'chitietkiemtra'),
  patch: (id, entity) => {
    delete entity.idHopDong;
    return db.patch(entity, { idHopDong: id }, 'chitietkiemtra')
  },
};
