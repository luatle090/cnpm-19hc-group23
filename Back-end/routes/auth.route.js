const express = require('express');
const jwt = require('jsonwebtoken');
const rndToken = require('rand-token');
const authModel = require('../models/auth.model');
const opts = require('../utils/opts');
const request = require('request');
const router = express.Router();
const logger = require('log4js').getLogger();


/**
 * login admin
 * body: {
 *    "user": "",
 *    "password": "",
 *    "recaptchaToken": ""
 * }
 * 
 * 
 */
router.post('/admin', async (req, res) => {
  // req.body = {
  // 	user: 'test',
  // 	password: 'test'
  // }
  if (!req.body.recaptchaToken) {
    return res.status(400).json({ message: "recaptchaToken is required" });
  }
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "username or password are required" });
  }

  //verify google
  var verify = '6Lca6tgUAAAAALu-FiNSIz34De4EA59U-jlB5Flc';
  const verifyCaptchaOptions = {
    uri: "https://www.google.com/recaptcha/api/siteverify",
    json: true,
    form: {
      secret: opts.CAPTCHA.SECRET_KEY,
      response: req.body.recaptchaToken
    }
  };
  
  request.post(verifyCaptchaOptions, async (err, response, body) => {
    if (err) {
      return res.status(500).json({ message: "oops, something went wrong on our side" });
    }

    if (!body.success) {
      return res.status(520).json({ message: body["error-codes"].join(".") });
    }
    const ret = await authModel.loginAdmin(req.body);
    if (ret === null) {
      return res.json({
        authenticated: false
      });
    }
    
    const token = generateAccessToken(ret);
    const rfToken = rndToken.generate(opts.REFRESH_TOKEN.SIZE);
    const result = await authModel.updateRefreshToken(ret.idTaiKhoan, rfToken);
    if(result.insertId > 0){
      res.status(201).json({
        // authenticated: true,
        accessToken: token,
        refreshToken: rfToken
      })
    }
    else{
      res.json({
        authenticated: false
      });
    }
    logger.info('Username login:', ret.username);
      // thêm token vào db addToken()
    // Save the user to the database. At this point they have been verified.
    // });
  });
});


function generateAccessToken(ret){
  const payload = {
      userId: ret.idTaiKhoan,
      username: ret.username,
      hoTen: ret.tenNV,
      vaiTro: ret.idVaiTro,
      vaiTroMT: ret.tenVaiTro
  }
  const token = jwt.sign(payload, opts.ACCESS_TOKEN.SECRET_KEY, {
    expiresIn:  opts.ACCESS_TOKEN.LIFETIME // 10 mins
  });
  return token;
}

/**
 * body: {
 *      "refreshToken": ""
 * }
 * 
 */
router.post('/renew-token', async (req, res) => {
  // req.body = {
    // 	refreshToken: '2kjwAhv7OBWW',
  // }
  if (!req.body.refreshToken) {
    throw createError(400, 'Invalid refreshToken.');
  }

  try{ 
    var rToken = req.body.refreshToken;
    //verify refresh token có lưu ở DB
    const rows = await authModel.verifyRefreshToken(rToken);
    if(rows.length === 0){
      return res.status(204).end();
    }
    
    //sau đó lấy userID để truy vấn thông tin và cấp lại access token
    var rowTaiKhoan = await authModel.loadUserAndRoleByIdUser(rows[0].userId);
      
    if(rowTaiKhoan.length === 0){
      return res.status(204).end();
    }
    var userObj = rowTaiKhoan[0];
    const token = generateAccessToken(userObj);
    logger.info('refreshToken of username: ', userObj.username);
    res.status(201).json({
      accessToken: token
    });
  }
  catch(err){
    logger.error(err);
    res.statusCode = 500;
    res.end('View error log on console.');
  }
});

//khong can body chi can access token
router.get('/logout', authModel.verifyAccessToken, async (req, res) => {
  var userId = res.locals.token.userId;
  try{
    const result = await authModel.deleteRefreshToken(userId);
    logger.info('del refesh token affectedRows: ' + result.affectedRows)
    if(result.affectedRows > 0){
      res.status(201).json({
        msg: 'success'
      });
    }
    else{
      res.status(204).end();
    }
  }
  catch(err){
    logger.error(err);
    res.statusCode = 500;
    res.end('View error log on console.');
  }

});

module.exports = router;