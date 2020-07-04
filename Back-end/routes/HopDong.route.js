const express = require('express');
const moment = require('moment');
const createError = require('http-errors');
const hopDongModel = require('../models/HopDong.model');
const chiTietHDModel = require('../models/ChiTietHopDong.model');
const xeModel = require('../models/xeOto.model');

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

router.post('/', async (req, res) => {
  const userId = res.locals.token.userId;

  if(isNaN(req.body.idKhachHang)){
    throw createError(400, 'Invalid idKhachHang.');
  }
  if(isNaN(req.body.ngayTraXe)){
    throw createError(400, 'Invalid ngayTraXe.');
  }
  if(isNaN(req.body.ngayThueXe)){
    throw createError(400, 'Invalid ngayThueXe.');
  }

  if(!req.body.soHieuXe){
    throw createError(400, 'Invalid soHieuXe.');
  }

  let ngay = new Date(+req.body.ngayThueXe);
  const ngayThue = moment(ngay).format('YYYY-MM-DD');
  
  ngay = new Date(+req.body.ngayTraXe);
  const ngayTraXe = moment(ngay).format('YYYY-MM-DD');

  //get xe để lấy giá thuê, tiền đặt cọc, idXeOto
  const rowXe = await xeModel.getXeBySoHieuXe(req.body.soHieuXe);
  if(rowXe.length === 0) {
    res.status(404).end();
  }
  else {
    const maHD = await hopDongModel.phatSinhMaHopDong();
    //console.log(maHD[2][0]);
    const entityHopDong = {
      maHopDong: maHD[2][0].maHopDong,
      ngayThue,
      ngayTraXe,
      idKhachHang: req.body.idKhachHang,
      tinhTrangHopDong: 3,
      phiBoiThuong: 0,
      tongTien: 0,
      idNhanVien: userId,
    }

    const results = await hopDongModel.add(entityHopDong);

    const entityChiTiet = {
      idHopDong: results.insertId,
      giaThue: rowXe[0].giaThue,
      soTienDatCoc: rowXe[0].tienDatCoc,
      idXeOto: rowXe[0].idXeOto
    };
    const resultsChiTiet = await chiTietHDModel.add(entityChiTiet);

    const ret = {
      id: results.insertId,
      ...req.body
    }
    res.status(201).json(ret);
  }
})


router.patch('/:id', async (req, res) => {
  if(isNaN(req.params.id)){
    throw createError(400, 'Invalid idHopDong.');
  }

  if(isNaN(req.body.idKhachHang)){
    throw createError(400, 'Invalid idKhachHang.');
  }

  if(isNaN(req.body.ngayTraXe)){
    throw createError(400, 'Invalid ngayTraXe.');
  }

  if(isNaN(req.body.ngayThueXe)){
    throw createError(400, 'Invalid ngayThueXe.');
  }

  if(!req.body.soHieuXe){
    throw createError(400, 'Invalid soHieuXe.');
  }
  

  let ngay = new Date(+req.body.ngayThueXe);
  const ngayThue = moment(ngay).format('YYYY-MM-DD');
  
  ngay = new Date(+req.body.ngayTraXe);
  const ngayTraXe = moment(ngay).format('YYYY-MM-DD');

  //get xe để lấy giá thuê, tiền đặt cọc, idXeOto
  const rowXe = await xeModel.getXeBySoHieuXe(req.body.soHieuXe);
  if(rowXe.length === 0) {
    res.status(404).end();
  }
  else {
    const maHD = await hopDongModel.phatSinhMaHopDong();
    //console.log(maHD[2][0]);
    const entityHopDong = {
      idHopDong: req.params.id,
      ngayThue,
      ngayTraXe,
      idKhachHang: req.body.idKhachHang,
    }

    const results = await hopDongModel.patch(req.params.id, entityHopDong);

    const entityChiTiet = {
      idHopDong: req.params.id,
      giaThue: rowXe[0].giaThue,
      soTienDatCoc: rowXe[0].tienDatCoc,
      idXeOto: rowXe[0].idXeOto
    };
    const resultsChiTiet = await chiTietHDModel.patch(req.params.id, entityChiTiet);

    const ret = {
      id: results.insertId,
      ...req.body
    }
    res.json(results);
  }
});

module.exports = router;