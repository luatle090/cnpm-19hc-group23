const express = require('express');
const createError = require('http-errors');
const hopDongModel = require('../models/HopDong.model');

const router = express.Router();

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