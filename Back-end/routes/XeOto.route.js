const express = require('express');
const createError = require('http-errors');
const xeModel = require('../models/XeOto.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const id = req.params.id || -1;
  const soHieuXe = req.query.soHieuXe || '';
  const idHangXe = req.query.idHangXe || '';
  const idDongXe = req.query.idDongXe || '';
  const tinhTrangXe = req.query.tinhTrangXe || '';
  const idLoaiXe = req.query.idLoaiXe || '';
  const entity = {
      soHieuXe,
      idHangXe,
      idDongXe,
      idLoaiXe,
      tinhTrangXe
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
    const xeOtoList = await xeModel.getlist(entity, limit, offset);
    const totalItems = await xeModel.countList(entity);
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

router.post('/', async (req, res) => {
  if(isNaN(req.body.idDongXe)){
    throw createError(400, 'Invalid idDongXe.');
  }
  if(isNaN(req.body.idLoaiXe)){
    throw createError(400, 'Invalid idLoaiXe.');
  }
  if(!req.body.mauSac){
    throw createError(400, 'Invalid mauSac.');
  }
  if(isNaN(req.body.giaThue)){
    throw createError(400, 'Invalid giaThue.');
  }
  if(isNaN(req.body.giaTriXe)){
    throw createError(400, 'Invalid giaTriXe.');
  }
  if(isNaN(req.body.phanTramDatCoc)){
    throw createError(400, 'Invalid phan tram dat coc.');
  }
  if(isNaN(req.body.tienDatCoc)){
    throw createError(400, 'Invalid tien dat coc.');
  }

  req.body.tinhTrangXe = 1;
  req.body.tinhTrangThue = 4;

  const soHieuXe = await xeModel.phatSinhSoHieuXe();
  req.body.soHieuXe = soHieuXe[2][0].soHieuXe;
  console.log(soHieuXe[2][0]);
  delete req.body.idHangXe;
  const results = await xeModel.add(req.body);
  const ret = {
    id: results.insertId,
    ...req.body
  }
  res.status(201).json(ret);
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