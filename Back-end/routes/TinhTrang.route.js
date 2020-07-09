const express = require('express');
const createError = require('http-errors');
const tinhTrangModel = require('../models/TinhTrang.model');

const router = express.Router();


router.get('/:code', async (req, res) => {
    if(!req.params.code){
        throw createError(400, 'Invalid code.');
    }
    const code = req.params.code;
    const rows = await tinhTrangModel.loadByCode(code);
    if(rows.length === 0){
        res.status(204).end();
    }
    else {
        res.json(rows);
    }
});

module.exports = router;