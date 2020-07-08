const db = require('../utils/db');

module.exports = {
  all: () => {
    const sql = 'select * from chitiethopdong';
    return db.load(sql);
  },

  loadById: id => {
    const sql = `select * from chitiethopdong where id = ${id}`;
    return db.load(sql);
  },

  loadByIdHopDong: id => {
    const sql = `select * from chitiethopdong where idHopDong = ${id}`;
    return db.load(sql);
  },

  add: entity => db.add(entity, 'chitiethopdong'),
  del: id => db.del({ id: id }, 'chitiethopdong'),
  patch: (id, entity) => {
    delete entity.idHopDong;
    return db.patch(entity, { idHopDong: id }, 'chitiethopdong')
  },
};
