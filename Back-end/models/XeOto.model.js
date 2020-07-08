const db = require('../utils/db');

module.exports = {
  loadById: (id) => {
    const sql = `select xe.*, hx.idHangXe from xeoto xe
                inner join dongxe dx on xe.idDongXe = dx.idDongXe
                inner join hangxe hx on dx.idHangXe = hx.idHangXe
                where idXeOto = ${id}`;
    return db.load(sql);
  },

  getAllSoHieuXe: () => {
    const sql = `select xe.soHieuXe as soHieuXe, xe.giaThue, xe.tienDatCoc, 
                  hx.tenHangXe, dx.tenDongXe
                from xeoto xe
                inner join dongxe dx on xe.idDongXe = dx.idDongXe
                inner join hangxe hx on dx.idHangXe = hx.idHangXe
                inner join tinhtrang tt on xe.tinhTrangXe = tt.idTinhTrang
                where xe.tinhTrangXe = 1 and xe.tinhTrangThue = 4`;
    return db.load(sql);
  },

  getXeBySoHieuXe: (soHieuXe) => {
    const sql = `select xe.idXeOto, xe.giaThue, xe.tienDatCoc, 
                  hx.tenHangXe, dx.tenDongXe
                from xeoto xe
                inner join dongxe dx on xe.idDongXe = dx.idDongXe
                inner join hangxe hx on dx.idHangXe = hx.idHangXe
                inner join tinhtrang tt on xe.tinhTrangXe = tt.idTinhTrang
                where xe.soHieuXe = '${soHieuXe}'`;
    return db.load(sql);
  },

  getlist: (entity, limit, offset) => {
    const sql = `select xe.idXeOto, xe.soHieuXe, xe.giaThue, xe.phanTramDatCoc,
                  xe.tienDatCoc, tt.moTa, lx.tenLoaiXe, dx.tenDongXe, hx.tenHangXe
                  from xeoto xe
                  inner join loaixe lx on lx.idLoaiXe = xe.idLoaiXe
                  inner join dongxe dx on xe.idDongXe = dx.idDongXe
                  inner join hangxe hx on dx.idHangXe = hx.idHangXe
                  inner join tinhtrang tt on xe.tinhTrangXe = tt.idTinhTrang
                  where ('${entity.soHieuXe}' = '' or xe.soHieuXe like '%${entity.soHieuXe}%')
                  and ('${entity.idHangXe}' = '' or hx.idHangXe = '${entity.idHangXe}')
                  and ('${entity.idDongXe}' = '' or dx.idDongXe = '${entity.idDongXe}')
                  and ('${entity.idLoaiXe}' = '' or lx.idLoaiXe = '${entity.idLoaiXe}')
                  and ('${entity.tinhTrangXe}' = '' or xe.tinhTrangXe = '${entity.tinhTrangXe}')
                  order by xe.idXeOto
                  limit ${limit} offset ${offset}`;
    return db.load(sql);
  },

  countList: (entity) => {
    const sql = `select count(xe.idXeOto) as total
                  from xeoto  xe
                  inner join loaixe lx on lx.idLoaiXe = xe.idLoaiXe
                  inner join dongxe dx on xe.idDongXe = dx.idDongXe
                  inner join hangxe hx on dx.idHangXe = hx.idHangXe
                  inner join tinhtrang tt on xe.tinhTrangXe = tt.idTinhTrang
                  where ('${entity.soHieuXe}' = '' or xe.soHieuXe like '%${entity.soHieuXe}%')
                  and ('${entity.idHangXe}' = '' or hx.idHangXe = '${entity.idHangXe}')
                  and ('${entity.idDongXe}' = '' or dx.idDongXe = '${entity.idDongXe}')
                  and ('${entity.idLoaiXe}' = '' or lx.idLoaiXe = '${entity.idLoaiXe}')
                  and ('${entity.tinhTrangXe}' = '' or xe.tinhTrangXe = '${entity.tinhTrangXe}')`;
    return db.load(sql);
  },

  phatSinhSoHieuXe: () => {
    const sql = `set @count = (
                                select if((select count(idXeOto) from xeoto) = 0, cast(1 as signed), 
                                (
                                  select Max(cast(right(soHieuXe, 3) as SIGNED)) from xeoto) + 1
                                )
                              );
                  set @id = concat('SKD', right( concat('000', CONVERT(@count, char(11))), 3));
                  select @id as soHieuXe;`;

    return db.load(sql);
  },


  getListXeKhachTra: (entity, limit, offset) => {
    const sql = `select xe.idXeOto, xe.soHieuXe, tt.moTa, DATE_FORMAT(hd.ngayTraXe, "%d/%m/%Y") as ngayTraXe,
                   dx.tenDongXe, hx.tenHangXe, hd.idHopDong, hd.maHopDong, 
                   DATE_FORMAT(hd.ngayKiemTra, "%d/%m/%Y") as ngayKiemTra
                  from xeoto xe
                  inner join dongxe dx on xe.idDongXe = dx.idDongXe
                  inner join hangxe hx on dx.idHangXe = hx.idHangXe
                  inner join tinhtrang tt on xe.tinhTrangXe = tt.idTinhTrang
                  inner join chitiethopdong ct on xe.idXeOto = ct.idXeOto
                  inner join hopdong hd on ct.idHopDong = hd.idHopDong
                  where ('${entity.soHieuXe}' = '' or xe.soHieuXe like '%${entity.soHieuXe}%')
                  and xe.tinhTrangXe in (5,6) and hd.tinhTrangHopDong in (5, 6)
                  order by xe.idXeOto
                  limit ${limit} offset ${offset}`;
    return db.load(sql);
  },

  countListXeKhachTra: (entity) => {
    const sql = `select count(xe.idXeOto) as total
                  from xeoto  xe
                  inner join dongxe dx on xe.idDongXe = dx.idDongXe
                  inner join hangxe hx on dx.idHangXe = hx.idHangXe
                  inner join tinhtrang tt on xe.tinhTrangXe = tt.idTinhTrang
                  inner join chitiethopdong ct on xe.idXeOto = ct.idXeOto
                  inner join hopdong hd on ct.idHopDong = hd.idHopDong
                  where ('${entity.soHieuXe}' = '' or xe.soHieuXe like '%${entity.soHieuXe}%')
                  and xe.tinhTrangXe in (5,6) and hd.tinhTrangHopDong in (5, 6)`;
    return db.load(sql);
  },

  getXeKhachTraById(id){
    const sql = `select hd.ngayKiemTra, tt.moTa as tinhTrangBaoDuong, pt.tenPhuTung, ct.idPhuTung,
                   tt2.moTa as tinhTrangPhuTung, xe.soHieuXe
                  from xeoto xe
                  inner join tinhtrang tt on xe.tinhTrangXe = tt.idTinhTrang
                  inner join chitietkiemtra ctkt on ctkt.idXeOto = xe.idXeOto
                  inner join hopdong hd on ctkt.idHopDong = hd.idHopDong
                  inner join phutung pt on pt.idPhuTung = ctkt.idPhuTung
                  inner join tinhtrang tt2 on ctkt.tinhTrang = tt2.idTinhTrang
                  where xe.idXeOto = ${id}
                  and xe.tinhTrangXe = 6 and hd.tinhTrangHopDong = 3`;
    return db.load(sql);
  },

  add: entity => db.add(entity, 'xeoto'),
  del: id => db.del({ id: id }, 'xeoto'),
  patch: (id, entity) => {
    delete entity.idXeOto;
    delete entity.soHieuXe;
    delete entity.idHangXe;
    return db.patch(entity, { idXeOto: id }, 'xeoto')
  },
};
