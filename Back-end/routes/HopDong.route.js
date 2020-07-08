const express = require('express');
const moment = require('moment');
const createError = require('http-errors');
const hopDongModel = require('../models/HopDong.model');
const chiTietHDModel = require('../models/ChiTietHopDong.model');
const xeModel = require('../models/xeOto.model');
const pdfMake = require('pdfmake/build/pdfmake');
const vfsFonts = require('pdfmake/build/vfs_fonts');
const lib = require('../utils/lib');

const router = express.Router();
pdfMake.vfs = vfsFonts.pdfMake.vfs;

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
});

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

    const entityXe = {
      tinhTrangThue: 3
    }
    await xeModel.patch(entityChiTiet.idXeOto, entityXe);
    res.status(201).json(ret);
  }
});

router.post('/export', async (req, res) => {
  if(!req.body.id){
    throw createError(400, 'Invalid id.');
  }

  const id = req.body.id;

  const row = await hopDongModel.loadById(id);
  if(row.length === 0){
    res.status(204).end();
  } else {
    let entity = row[0];
    entity.ngayThueXe = moment(entity.ngayThueXe).format('DD/MM/YYYY');
    entity.ngayTraXe = moment(entity.ngayTraXe).format('DD/MM/YYYY');
    const giaThue = lib.phanCachTien(row[0].giaThue);
    const tienDatCoc = lib.phanCachTien(row[0].soTienDatCoc);

    var documentDefinition = {
      header: {
        fontSize: 9,
        italics: true,
        margin: [10, 10, 0, 0],
        text: 'Công ty Thuê Xe Chuyên nghiệp'
      },
      content: [
        {
          text: 'Hợp đồng thuê xe',
          style: 'title',
          alignment: 'center'
        },
       
        {
          type: 'upper-alpha',
          style: 'header',
          ol: [
            'Thông tin người thuê'
          ]
        },
        {
          style: 'tableExample',
          layout: 'noBorders',
          table: {
            widths: [40, '*', 100, 40, '*'],
            body: [
              ['Họ tên', `${entity.hoTen}`, '', 'SĐT', `${entity.SDT}`],
              ['Địa chỉ', `${entity.diaChi}`, '', 'CMND', `${entity.CMND}`],
            ]
          }
        },
        {
          type: 'upper-alpha',
          start: 2,
          style: 'header',
          ol: [
            'Thông tin xe thuê'
          ]
        },
        {
          style: 'tableExample',
          layout: 'noBorders',
          table: {
            widths: ['auto', 80, 'auto', 80, 'auto'],
            body: [
              [
                {text: 'Số hiệu xe', style: 'tableHeader'},
                '',
                {text: 'Hãng xe', style: 'tableHeader'},
                '',
                {text: 'Dòng xe', style: 'tableHeader'}
              ],
              [
                `${entity.soHieuXe}`, '',`${entity.tenHangXe}`, '',`${entity.tenDongXe}`
              ],
              [
                {text: '', style: 'marginRowTable'},'','','',''
              ],
              [
                {text: 'Ngày thuê', style: 'tableHeader'},
                '',
                {text: 'Ngày trả xe', style: 'tableHeader'},
                '',''
              ],
              [
                entity.ngayThueXe, '', entity.ngayTraXe, '', ''
              ],
              [
                {text: '', style: 'marginRowTable'},'','','',''
              ],
              [
                {text: 'Giá thuê', style: 'tableHeader'}, 
                '',
                {text: 'Tiền đặt cọc', style: 'tableHeader'}, 
                '', ''
              ],
              [
                giaThue, '', tienDatCoc, '', ''
              ],
            ]
          },
        },
        {
          type: 'square',
          italics: true,
          margin: [0, 40, 0, 10],
          ul: ['Điều khoản hợp đồng', 
            {
              ul: [
                {
                  style: 'contentDieuKhoan',
                  text: [
                    'Đồng tiền thanh toán có thể giống hoặc khác với đồng tiền tính giá.',
                    ' Khi hai đồng tiền này khác nhau cần xác định tỷ giá quy đổi hai đồng tiền này, trong đó',
                    ' đặc biệt lựa chọn tỷ giá của công cụ thanh toán nào, tỷ giá mua vào hay bán ra...'
                  ]
                },
                {
                  style: 'contentDieuKhoan',
                  text: 'Thời hạn thanh toán: thanh toán trước giao hàng, ngay khi giao hàng và sau khi giao hàng.',
                },
                {
                  style: 'contentDieuKhoan',
                  text:  'Phương thức thanh toán: phương thức nhờ thu, phương thức tín dụng chứng từ, phương thức chuyển tiền, phương thức chuyển khoản',
                },
                {
                  style: 'contentDieuKhoan',
                  text: 'Điều kiện đảm bảo hối đoái do các bên thỏa thuận để tránh tổn thất có thể xảy ra kho các đồng tiên sụt giá hoặc tăng giá.',
                }, 
                {
                  style: 'contentDieuKhoan',
                  text: [
                    'Chứng từ thanh toán: các bên nên quy định rõ việc người bán phải cung cấp ',
                    'cho ngươi mua những chứng từ chứng minh đã giao hàng cho người vận tải ',
                    'như hai bên đã thỏa thuận: hối phiếu, vận đơn, hóa đơn bán hàng, bảng kê ',
                    'chi tiết hàng hóa, giấy chứng nhận xuất xứ.'
                  ]
                }
              ]
            }
          ]
        },
      ],
      styles: {
        marginRowTable:{
          margin: [0, 0, 0, 12]
        },
        tableExample: {
          margin: [20, 5, 0, 15]
        },
        title: {
          fontSize: 18,
          bold: true,
          alignment: 'justify',
          margin: [0, 40, 0, 20]
        },
        header: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 10]
        },
        contentDieuKhoan: {
          fontSize: 10,
          alignment: 'justify',
        },
        content: {
          alignment: 'justify',
        },
        tableHeader: {
          bold: true,
          color: 'black'
        }
      },
      defaultStyle: {
        fontSize: 12
      }        
    };
    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBase64((data)=>{
        res.writeHead(200, 
        {
            'Content-Type': 'application/pdf',
            'Content-Disposition':'attachment;filename="filename.pdf"'
        });
  
        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
    });

  }
  
});

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
    const entityHopDong = {
      idHopDong: req.params.id,
      ngayThue,
      ngayTraXe,
      idKhachHang: req.body.idKhachHang,
    }

    const results = await hopDongModel.patch(req.params.id, entityHopDong);
    const rowsOldXe = await chiTietHDModel.loadByIdHopDong(req.params.id);
    
    const entityChiTiet = {
      idHopDong: req.params.id,
      giaThue: rowXe[0].giaThue,
      soTienDatCoc: rowXe[0].tienDatCoc,
      idXeOto: rowXe[0].idXeOto
    };
    const resultsChiTiet = await chiTietHDModel.patch(req.params.id, entityChiTiet);

    let entityXe = {
      tinhTrangThue: 4
    }
    //old
    await xeModel.patch(rowsOldXe[0].idXeOto, entityXe);

    entityXe.tinhTrangThue = 3;
    //new
    await xeModel.patch(entityChiTiet.idXeOto, entityXe);

    const ret = {
      id: results.insertId,
      ...req.body
    }
    res.json(results);
  }
});

module.exports = router;