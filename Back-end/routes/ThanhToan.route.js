const express = require('express');
const createError = require('http-errors');
const hopDongModel = require('../models/HopDong.model');
const xeModel = require('../models/xeOto.model');
const lib = require('../utils/lib');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const rows = await hopDongModel.getInfoPaymentByIdHopDong(req.params.id);
  const rowsChiTiet = await hopDongModel.getChiTietDenBuByIdHopDong(req.params.id);
  if(rows.length === 0){
    res.status(204).end();
  } else {
    let entity = {
      thanhToan: rows[0],
      chiTiet: {
        voXe: '0 VNĐ',
        ruotXe: '0 VNĐ',
        tuiKhi: '0 VNĐ',
        thangXe: '0 VNĐ',
        gheXe: '0 VNĐ',
        guongXe: '0 VNĐ',
      }
    }
    entity.thanhToan.giaThue = lib.phanCachTien(entity.thanhToan.giaThue);
    entity.thanhToan.giaNgayThue = lib.phanCachTien(entity.thanhToan.giaNgayThue);
    entity.thanhToan.chiPhiDenBu = lib.phanCachTien(entity.thanhToan.chiPhiDenBu);
    entity.thanhToan.tongCong = lib.phanCachTien(entity.thanhToan.tongCong);
    for(const chiTiet of rowsChiTiet){
      switch (chiTiet.idPhuTung) {
        case 1:
            entity.chiTiet.voXe = lib.phanCachTien(chiTiet.giaPhuTung);
            break;
        case 2:
            entity.chiTiet.ruotXe = lib.phanCachTien(chiTiet.giaPhuTung);
            break;
        case 3:
            entity.chiTiet.tuiKhi = lib.phanCachTien(chiTiet.giaPhuTung);
            break;
        case 4:
            entity.chiTiet.thangXe = lib.phanCachTien(chiTiet.giaPhuTung);
            break;
        case 5:
            entity.chiTiet.gheXe = lib.phanCachTien(chiTiet.giaPhuTung);
            break;
        default:
            entity.chiTiet.guongXe = lib.phanCachTien(chiTiet.giaPhuTung);
            break;
      }
    }
    res.json(entity);
  }
});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;

  const rows = await hopDongModel.getInfoPaymentByIdHopDong(req.params.id);
  if(rows.length === 204){
    res.status(204).end();
  }
  else {
    //update tinh trang hop dong, phi boi thuong, tong tien
    const entityHopDong = {
      tinhTrangHopDong: 8,
      phiBoiThuong: rows[0].chiPhiDenBu,
      tongTien: rows[0].tongCong,
    };

    const results = await hopDongModel.patch(id, entityHopDong);

    //update tinh trang xe oto
    //update tinh trang thue, va tinh trang xe
    const entityXe = {
      tinhTrangThue: 4,
      tinhTrangXe: rows[0].tinhTrangKiemTra,
    }
    
    await xeModel.patch(rows[0].idXeOto, entityXe);

    res.json(results);
  }
  
});

module.exports = router;