const db = require('../utils/db');

module.exports = {
  all: () => {
    const sql = 'select * from chitietbaoduong';
    return db.load(sql);
  },

  loadById: id => {
    const sql = `select * from chitietbaoduong where id = ${id}`;
    return db.load(sql);
  },

  add: entity => db.add(entity, 'chitietbaoduong'),
  del: id => db.del({ id: id }, 'chitietbaoduong'),
  patch: (id, entity) => {
    delete entity.idHopDong;
    return db.patch(entity, { idHopDong: id }, 'chitietbaoduong')
  },
};
