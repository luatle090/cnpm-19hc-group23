const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const cors = require('cors')
const logger = require('log4js').getLogger();
require('express-async-errors');

logger.level = "info";
const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    msg: 'hello from nodejs express api'
  });
})

app.use('/api/auth', require('./routes/auth.route'));
//app.use('/api/users', require('./routes/user.route'));

var verifyAccessToken = require('./models/auth.model').verifyAccessToken;

app.use('/api/hangxe', verifyAccessToken, require('./routes/HangXe.route'));
app.use('/api/phutung', verifyAccessToken, require('./routes/PhuTung.route'));
app.use('/api/loaixe', verifyAccessToken, require('./routes/LoaiXe.route'));
app.use('/api/dongxe', verifyAccessToken, require('./routes/DongXe.route'));
app.use('/api/khachhang', verifyAccessToken, require('./routes/KhachHang.route'));
app.use('/api/xeoto', verifyAccessToken, require('./routes/XeOto.route'));
app.use('/api/hopdong', verifyAccessToken, require('./routes/HopDong.route'));
app.use('/api/thanhtoan', verifyAccessToken, require('./routes/ThanhToan.route'));
app.use('/api/baoduong', verifyAccessToken, require('./routes/BaoDuong.route'));
app.use('/api/tinhtrang', verifyAccessToken, require('./routes/TinhTrang.route'));
//app.use('/api/lichsubaoduong', verifyAccessToken, require('./routes/LichSuBaoDuong.route'));
//app.use('/api/khachhang', verifyAccessToken, require('./routes/KhachHang.route'));
//app.use('/api/khachhang', verifyAccessToken, require('./routes/KhachHang.route'));

// ------------- old api ----------------
// app.use('/api/lichsuchuyenkhoan', verifyAccessToken, require('./routes/lichsuchuyenkhoan.route'));
// app.use('/api/lichsunhantien', verifyAccessToken, require('./routes/lichsunhantien.route'));
// app.use('/api/nhacno', verifyAccessToken, require('./routes/nhacno.route'));
// app.use('/api/taikhoannganhang', verifyAccessToken, require('./routes/taikhoannganhang.route'));
// app.use('/api/thietlapnguoinhan', verifyAccessToken, require('./routes/thietlapnguoinhan.route'));
// app.use('/api/nhacNoAddedEvent', verifyAccessToken, require('./routes/eventNhacNo').subscribeNhacNoAdded);

app.use((req, res, next) => {
  throw createError(404, 'Resource not found.');
})

app.use(function (err, req, res, next) {
  if (typeof err.status === 'undefined' || err.status === 500) {
    console.error(err.stack);
    res.status(500).send('View error log on console.');
  } else {
    res.status(err.status).send(err);
  }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}`);
})