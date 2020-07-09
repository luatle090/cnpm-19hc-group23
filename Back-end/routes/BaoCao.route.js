const express = require('express');
const createError = require('http-errors');
const baoCaoModel = require('../models/BaoCao.model');
const moment = require('moment');

const router = express.Router();

router.get('/doanhthu', async (req, res) => {

    const ngay = new Date(+req.query.ngayBaoCao);
    req.query.ngayBaoCao = moment(ngay).format('YYYY-MM-DD');

    const rows = await baoCaoModel.baoCaoDoanhThuTheoThang(req.query.ngayBaoCao);

    if(rows.length === 0){
        res.status(204).end();
    } 
    else {
        res.json(rows);
    }
});

router.get('/chi', async (req, res) => {

    const ngay = new Date(+req.query.ngayBaoCao);
    req.query.ngayBaoCao = moment(ngay).format('YYYY-MM-DD');
    console.log(req.query.ngayBaoCao)
    const rows = await baoCaoModel.baoCaoChiTheoThang(req.query.ngayBaoCao);

    if(rows.length === 0){
        res.status(204).end();
    } 
    else {
        res.json(rows);
    }
});


module.exports = router;