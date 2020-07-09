const express = require('express');
const createError = require('http-errors');
const tinhTrangModel = require('../models/TinhTrang.model');
const xeModel = require('../models/XeOto.model');
const hopDongModel = require('../models/HopDong.model');
const chiTietKiemTraModel = require('../models/ChiTietKiemTra.model');
const moment = require('moment');

const router = express.Router();

router.get('/', async (req, res) => {

    const soHieuXe = '';
    if(isNaN(req.query.limit)){
        throw createError(400, 'Invalid limit.');
    }
    if(isNaN(req.query.offset)){
        throw createError(400, 'Invalid offset.');
    }

    const entity = {
        soHieuXe
    }
    
    const limit = Number(req.query.limit) || 10;
    const offset = limit * Number(req.query.offset) || 0;

    try {
    const xeOtoList = await xeModel.getListXeKhachTra(entity, limit, offset);
    const totalItems = await xeModel.countListXeKhachTra(entity);
    if (xeOtoList.length === 0 || totalItems.length === 0) {
        res.status(204).end();
    } else {
        const result ={
        totalItems: totalItems[0].total,
        listResult: xeOtoList,
        }
        
        res.json(result);
    }
    } catch (err) {
    console.log(err);
    res.status(500);
    res.end('View error log on console.');
    }
});


router.get('/:id', async (req, res) => {
    if (isNaN(req.params.id)) {
        throw createError(400, 'Invalid id.');
    }

    const id = req.params.id || -1;

    const rows = await xeModel.getXeKhachTraById(id);
    if(rows.length === 0){
        res.status(204).end();
    }
    else{
        let entity = {
            baoDuong : {
                soHieuXe: rows[0].soHieuXe,
                tinhTrangBaoDuong: rows[0].tinhTrangBaoDuong,
            },
            chiTiet: {}
        }
        for(const row of rows){
            switch (row.idPhuTung) {
                case 1:
                    entity.chiTiet.voXe = row.tinhTrangPhuTung;
                    break;
                case 2:
                    entity.chiTiet.ruotXe = row.tinhTrangPhuTung;
                    break;
                case 3:
                    entity.chiTiet.tuiKhi = row.tinhTrangPhuTung;
                    break;
                case 4:
                    entity.chiTiet.thangXe = row.tinhTrangPhuTung;
                    break;
                case 5:
                    entity.chiTiet.gheXe = row.tinhTrangPhuTung;
                    break;
                default:
                    entity.chiTiet.guongXe = row.tinhTrangPhuTung;
                    break;
            }
        }
        res.json(entity);
    }
});


/**
 *  req.body.idXeOto;
 *  req.body.ngayKiemTra;
 *  req.body.tinhTrangKiemTra;
 */
router.post('/', async (req, res) => {
    
    const ngay = new Date(+req.body.ngayKiemTra);
    req.body.ngayKiemTra = moment(ngay).format('YYYY-MM-DD');

    const rows = await hopDongModel.getHopDongByIdXe(req.body.idXeOto);
    if(rows.length === 0 ){
        res.status(204).end();
    }
    else {

        //update hop dong => idHopDong
        const entityHopDong = {
            idHopDong: rows[0].idHopDong,
            ngayKiemTra: req.body.ngayKiemTra,
            tinhTrangKiemTra: req.body.tinhTrangKiemTra,
            tinhTrangHopDong: 6
        }
        
        const rowsHopDong = await hopDongModel.patch(entityHopDong.idHopDong, entityHopDong);


        //update xe => idXeOto
        //update tinh trang xe = 6, sau khi thanh toan dua vao
        // tinh trang hop dong ma cap nhat xe
        const entityXe = {
            tinhTrangXe: 6
        }

        await xeModel.patch(req.body.idXeOto, entityXe);

        //update chi tiet kiem tra => idHopDong
        const chiTiet = req.body.chiTiet;
        for(let ct of chiTiet){
            ct.idHopDong = rows[0].idHopDong;
            ct.idXeOto = req.body.idXeOto;
            await chiTietKiemTraModel.add(ct);
        }

        res.json(rowsHopDong);
    }
});


router.patch('/', async (req, res) => {
   //req.body.soHieuXe;
   //req.body.idHopDong;
   const idHopDong = req.body.idHopDong;
   req.body.tinhTrangXe = 5;
   const rows = await xeModel.getXeBySoHieuXe(req.body.soHieuXe);
   const idXeOto = rows[0].idXeOto;
   delete req.body.soHieuXe;
   delete req.body.idHopDong;

   // cap nhat tinh trang xe
   const results = await xeModel.patch(idXeOto, req.body);

   //cap nhat ngay tra xe
   const ngayTraXe = moment().format("YYYY-MM-DD HH:mm:ss");
   const entityHopDong = {
       ngayTraXe,
       tinhTrangHopDong: 5
   }

   await hopDongModel.patch(idHopDong, entityHopDong);
   res.json(results);
});

module.exports = router;