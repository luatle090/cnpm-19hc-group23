const express = require('express');
const moment = require('moment');
const createError = require('http-errors');
const hopDongModel = require('../models/HopDong.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const maHopDong = req.query.maHopDong || '';
  const tinhTrangHopDong = req.query.tinhTrangHopDong || '';
  let ngayThueXe = '';
  let ngayTraXe = '';
  if(req.query.ngayThueXe){
    const ngay = new Date(+req.query.ngayThueXe);
    ngayThueXe = moment(ngay).format('YYYY-MM-DD');
  }
  if(req.query.ngayTraXe){
    const ngay = new Date(+req.query.ngayTraXe);
    ngayTraXe = moment(ngay).format('YYYY-MM-DD');
  }
  const entity = {
      maHopDong,
      ngayThueXe,
      ngayTraXe,
      tinhTrangHopDong
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
    const xeOtoList = await hopDongModel.getlist(entity, limit, offset);
    const totalItems = await hopDongModel.countList(entity);
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

  const row = await hopDongModel.loadById(id);
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


module.exports = router;