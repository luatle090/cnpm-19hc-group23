const express = require('express');
const createError = require('http-errors');
const baoDuongModel = require('../models/BaoDuong.model');

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


router.get('/:id', async (req, res) => {
  if (isNaN(req.params.id)) {
    throw createError(400, 'Invalid id.');
  }

  const id = req.params.id || -1;

  const row = await xeModel.loadById(id);
  if(row.length === 0){
    res.status(204);
  }
  else{
    delete row[0].hanBaoDuong;
    delete row[0].ngayBaoDuongLanCuoi;
    delete row[0].tinhTrangXe;
    delete row[0].tinhTrangThue;
    res.json(row[0]);
  }
}),

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