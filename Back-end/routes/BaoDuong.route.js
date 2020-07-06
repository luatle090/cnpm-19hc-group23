const express = require('express');
const createError = require('http-errors');
const baoDuongModel = require('../models/BaoDuong.model');
const chiTietModel = require('../models/ChiTietBaoDuong.model');
const xeModel = require('../models/XeOto.model');
const moment = require('moment');

const router = express.Router();

router.get('/', async (req, res) => {
  const id = req.params.id || -1;

  await capNhatTinhTrang();
  
  const soHieuXe = req.query.soHieuXe || '';
  const tinhTrangBaoDuong = req.query.tinhTrang || '';
  const entity = {
      soHieuXe,
      tinhTrangBaoDuong
  }
  if(isNaN(req.query.limit)){
    throw createError(400, 'Invalid limit.');
  }
  if(isNaN(req.query.offset)){
    throw createError(400, 'Invalid offset.');
  }

  const limit = Number(req.query.limit) || 10;
  const offset = limit * Number(req.query.offset) || 0;

  try {
    const xeOtoList = await baoDuongModel.getlist(entity, limit, offset);
    const totalItems = await baoDuongModel.countList(entity);
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

async function capNhatTinhTrang(){
   const result = await baoDuongModel.capNhatTinhTrang();
   return result[1].affectedRows;
}

router.get('/ngaybaoduong/:id', async (req, res) => {
    if(isNaN(req.params.id)){
        throw createError(400, 'Invalid id.');
    }

    const id = req.params.id || -1;

    const row = await baoDuongModel.loadNgayBaoDuongByIdXeOto(id);
    if(row.length === 0){
        res.status(204).end();
    }
    else {
        res.status(200).json(row);
    }
});


router.get('/:id', async (req, res) => {
  if (isNaN(req.params.id)) {
    throw createError(400, 'Invalid id.');
  }
  let ngayBaoDuong = req.query.ngayBaoDuong || '';

  const id = req.params.id || -1;

  const rows = await baoDuongModel.loadByIdXeOto(id, ngayBaoDuong);
  if(rows.length === 0){
    res.status(204);
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
 *  req.body.ngayBaoDuong;
 *  req.body.tinhTrang;
 */
router.post('/', async (req, res) => {
    
   
    const ngay = new Date(+req.body.ngayBaoDuong);
    req.body.ngayBaoDuong = moment(ngay).format('YYYY-MM-DD');

    const entityLichSu = {
        idXeOto: req.body.idXeOto,
        ngayBaoDuong: req.body.ngayBaoDuong,
        tinhTrang: req.body.tinhTrang
    }
    const chiTiet = req.body.chiTiet;
    const results = await baoDuongModel.add(entityLichSu);
    if(results.insertId > 0){
        const entityXe = {
            ngayBaoDuongLanCuoi: entityLichSu.ngayBaoDuong
        }
        await xeModel.patch(entityLichSu.idXeOto, entityXe);
        for(let ct of chiTiet){
            ct.idLichSu = results.insertId;
            await chiTietModel.add(ct);
        }
        const ret = {
            id: results.insertId,
            ...req.body
          }
          res.status(201).json(ret);
    } else {
        res.status(204).end();
    }
});

router.patch('/:id', async (req, res) => {
  if(isNaN(req.params.id)){
    throw createError(400, 'Invalid idDongXe.');
  }
  const phanTramDatCoc = Number(req.body.phanTramDatCoc);
  const giaTriXe = Number(req.body.giaTriXe);
  req.body.tienDatCoc = phanTramDatCoc * giaTriXe / 100;
  const results = await xeModel.patch(req.params.id, req.body);
  res.json(results);
});

module.exports = router;