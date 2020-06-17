const express = require('express');
const createError = require('http-errors');
const logger = require('log4js').getLogger();
const thietLapModel = require('../models/thietlapnguoinhan.model');
const taiKhoanModel = require('../models/taikhoannganhang.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const userId = res.locals.token.userId;

  try{
    const rows = await thietLapModel.getInfoThiepLapByUserId(userId);
    if(rows.length === 0){
      res.status(204).end();
    }
    else{
      res.status(200).json(rows).end();
    }
  }catch(err) {
    logger.error(err);
    res.status(500);
    res.end('View error log on console.');
  }
})

router.post('/', async (req, res) => {
    const userId = res.locals.token.userId;
    
    if(!req.body.soTaiKhoanNhan){
      throw createError(400, 'Invalid soTK.');
    }
    if(!req.body.hasOwnProperty('tenGoiNho')){
      throw createError(400, 'Invalid tenGoiNho.');
    }
    
    const entity ={
      ...req.body,
      idTaiKhoanNHGui : userId
    }

    const taiKhoanRS = await taiKhoanModel.loadBySoTK(entity.soTaiKhoanNhan);
    if(taiKhoanRS.length === 0){
      throw createError(404, 'Not found soTK.');
    }
    if(taiKhoanRS[0].id === userId){
      throw createError(409, 'Trung soTK nhan');
    }
    const checkUnique = await thietLapModel.checkUnique(userId, entity.soTaiKhoanNhan);
    if(checkUnique.length !== 0){
      throw createError(409, "Trung thiet lap");
    }

    try{
      if(!entity.tenGoiNho){
        entity.tenGoiNho = taiKhoanRS[0].tenDangKy
      }
      const results = await thietLapModel.add(entity);
      if(results.insertId > 0){
        res.status(201).json({
          message : "success"
        }).end();
      }
      else{
        res.status(204).end();
      }
    }  catch(err){
      logger.error(err);
      res.status(500);
      res.end('View error log on console.');
    }
})


router.delete('/:id', async (req, res) => {
  if (isNaN(req.params.id)) {
    throw createError(400, 'Invalid id.');
  }

  try{
    const rs = await thietLapModel.del(req.params.id);
    res.json({
      affectedRows: rs.affectedRows
    }).end();
  } catch(err){
    logger.error(err);
    res.status(500);
    res.end('View error log on console.');
  }
})

router.patch('/:id', async (req, res) => {
  const userId = res.locals.token.userId;
  
  if (isNaN(req.params.id)) {
    throw createError(400, 'Invalid id.');
  }
  if(!req.body.soTaiKhoanNhan){
    throw createError(400, 'Invalid soTK.');
  }
  if(!req.body.hasOwnProperty('tenGoiNho')){
    throw createError(400, 'Invalid tenGoiNho.');
  }

  const entity ={
    ...req.body
  }
  const idThietLap = Number(req.params.id);
  const taiKhoanRS = await taiKhoanModel.loadBySoTK(entity.soTaiKhoanNhan);
  if(taiKhoanRS.length === 0){
    throw createError(404, 'Not found soTK.');
  }
  if(taiKhoanRS[0].id === userId){
    throw createError(409, 'Trung soTK nhan');
  }

  const checkUnique = await thietLapModel.checkUnique(userId, entity.soTaiKhoanNhan);
  if(checkUnique.length > 0 && checkUnique[0].id !== idThietLap){
    throw createError(409, "Trung thiet lap");
  }

  try{
    if(!entity.tenGoiNho){
      entity.tenGoiNho = taiKhoanRS[0].tenDangKy
    }

    const rs = await thietLapModel.patch(idThietLap, entity);
    if(rs.changedRows > 0){
      res.status(201).json({
        message : "success"
      }).end();
    }
    else{
      res.status(204).end();
    }
  } catch(err){
    logger.error(err);
    res.status(500);
    res.end('View error log on console.');
  }
})

// router.get('/', async (req, res, next) => {
//   const rows = await thietlapnguoinhanModel.all();
//   res.json(rows);
// })

// router.get('/:id', async (req, res) => {
//   if (isNaN(req.params.id)) {
//     throw createError(400, 'Invalid id.');
//   }

//   const id = req.params.id || -1;
//   try {
//     const rows = await thietlapnguoinhanModel.loadById(id);
//     if (rows.length === 0) {
//       res.status(204).end();
//     } else {
//       res.json(rows[0]);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500);
//     res.end('View error log on console.');
//   }
// })



module.exports = router;