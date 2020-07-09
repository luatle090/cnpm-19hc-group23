const express = require('express');
const createError = require('http-errors');
const hopDongModel = require('../models/HopDong.model');
const xeModel = require('../models/xeOto.model');
const lib = require('../utils/lib');
const moment = require('moment');

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

router.post('/export', async (req, res) => {
  if(!req.body.id){
    throw createError(400, 'Invalid id.');
  }

  const id = req.body.id;

  const rows = await hopDongModel.getInfoPaymentByIdHopDong(id);
  const rowsChiTiet = await hopDongModel.getChiTietDenBuByIdHopDong(id);

  if(rows.length === 0){
    res.status(204).end();
  } else {
    let entity = rows[0];
    entity.ngayThueXe = moment(entity.ngayThueXe).format('DD/MM/YYYY');
    entity.ngayTraXe = moment(entity.ngayTraXe).format('DD/MM/YYYY');
    const giaThue = lib.phanCachTien(entity.giaThue);
    const tienDatCoc = lib.phanCachTien(entity.soTienDatCoc);
    const giaNgayThue = lib.phanCachTien(entity.giaNgayThue);
    const chiPhiDenBu = rowsChiTiet.length === 0 ? '0 VNĐ' : lib.phanCachTien(entity.chiPhiDenBu);
    const tongCong = lib.phanCachTien(entity.tongCong);


    var documentDefinition = {
      header: {
        fontSize: 9,
        italics: true,
        margin: [10, 10, 0, 0],
        text: 'Công ty Thuê Xe Chuyên nghiệp'
      },
      content: [
        {
          text: 'Hóa đơn thanh toán',
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
            'Thông tin hóa đơn'
          ]
        },
        {
          style: 'tableExample',
          layout: 'noBorders',
          table: {
            widths: ['auto', 40, 'auto', 60, '*'],
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
                '',
                {text: 'Giá thuê', style: 'tableHeader'}
              ],
              [
                entity.ngayThueXe, '', entity.ngayTraXe, '', giaThue
              ],
              [
                {text: '', style: 'marginRowTable'},'','','',''
              ],
              [
                {text: 'Tiền đặt cọc', style: 'tableHeader'}, 
                '',
                {text: 'Giá số ngày thuê', style: 'tableHeader'}, 
                '', {text: 'Chi phí đền bù', style: 'tableHeader'}
              ],
              [
                tienDatCoc, '', giaNgayThue, '', chiPhiDenBu
              ],
              [
                {text: '', style: 'marginRowTable'},'','','',''
              ]
            ]
          },
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

    if(rowsChiTiet.length !== 0){

      const title = [
        { text: 'Thông tin chi tiết đền bù', style: 'tableHeader' },
        '','','',''
      ]
      documentDefinition.content[4].table.body.push(title);

      for(const chiTiet of rowsChiTiet){
        const giaPhuTung = lib.phanCachTien(chiTiet.giaPhuTung);
        const chiPhiDenBuExport =[
          {text: chiTiet.tenPhuTung, style: 'tableHeader'}, 
          '', 
          {text: giaPhuTung, style: 'tableHeader'}, '', ''
        ]
        
        documentDefinition.content[4].table.body.push(chiPhiDenBuExport)
      }
      const newLine = [
        {text: '', style: 'marginRowTable'},'','','',''
      ]
      documentDefinition.content[4].table.body.push(newLine);
    }

    const tongCongExport = [
      [
        '','','', '',
        {text: 'Tổng cộng', style: 'tableHeader'}, 
      ],
      [
        '', '', '', '', {text: tongCong, style: 'tableHeader'}
      ]
    ]
    documentDefinition.content[4].table.body = documentDefinition.content[4].table.body.concat(tongCongExport);

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