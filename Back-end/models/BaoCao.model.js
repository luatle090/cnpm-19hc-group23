const db = require('../utils/db');


module.exports = {
    all: () => {
        const sql = 'select * from lichsubaoduong';
        return db.load(sql);
    },

}