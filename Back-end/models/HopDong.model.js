const db = require('../utils/db');

module.exports = {
  all: () => {
    const sql = 'select * from hinhanh';
    return db.load(sql);
  },

  getlist: (entity, limit, offset) => {
      const sql = `select hd.idHopDong, hd.maHopDong, DATE_FORMAT(hd.ngayThue, "%d/%m/%Y") as ngayThueXe,
                  DATE_FORMAT(hd.ngayTraXe, "%d/%m/%Y") as ngayTraXe, kh.hoTen, tt.moTa as tinhTrang,
                  xe.soHieuXe, hx.tenHangXe, dx.tenDongXe, tt2.moTa as tinhTrangXe
                  from hopdong hd
                  inner join tinhtrang tt on hd.tinhTrangHopDong = tt.idTinhTrang
                  inner join khachHang kh on kh.idKhachHang = hd.idKhachHang
                  inner join chitiethopdong ct on hd.idHopDong = ct.idHopDong
                  inner join xeoto xe on xe.idXeOto = ct.idXeOto
                  inner join tinhtrang tt2 on xe.tinhTrangXe = tt2.idTinhTrang
                  inner join dongxe dx on xe.idDongXe = dx.idDongXe
                  inner join hangxe hx on dx.idHangXe = hx.idHangXe
                  where ('${entity.maHopDong}' = '' or hd.maHopDong like '%${entity.maHopDong}%')
                  and IF('${entity.ngayThueXe}' = '', 
                        hd.ngayThue is not null,
                        Date(hd.ngayThue) >= Date('${entity.ngayThueXe}')
                      )
                  and IF('${entity.ngayTraXe}' <> '', 
                        Date(hd.ngayTraXe) <= Date('${entity.ngayTraXe}'),
                        hd.ngayTraXe is not null
                      )
                  and ('${entity.tinhTrangHopDong}' = '' or hd.tinhTrangHopDong = '${entity.tinhTrangHopDong}')
                  order by hd.idHopDong
                  limit ${limit} offset ${offset}`;
      return db.load(sql);
  },

  countList: (entity) => {
      const sql = `select count(xe.idXeOto) as total
                  from hopdong hd
                  inner join tinhtrang tt on hd.tinhTrangHopDong = tt.idTinhTrang
                  inner join khachHang kh on kh.idKhachHang = hd.idKhachHang
                  inner join chitiethopdong ct on hd.idHopDong = ct.idHopDong
                  inner join xeoto xe on xe.idXeOto = ct.idXeOto
                  inner join dongxe dx on xe.idDongXe = dx.idDongXe
                  inner join hangxe hx on dx.idHangXe = hx.idHangXe
                  where ('${entity.maHopDong}' = '' or hd.maHopDong like '%${entity.maHopDong}%')
                  and IF('${entity.ngayThueXe}' <> '', 
                          Date(hd.ngayThue) >= Date('${entity.ngayThueXe}'), 
                          hd.ngayThue is not null
                      )
                  and IF('${entity.ngayTraXe}' <> '', 
                        Date(hd.ngayTraXe) <= Date('${entity.ngayTraXe}'),
                        hd.ngayTraXe is not null
                      )
                  and ('${entity.tinhTrangHopDong}' = '' or hd.tinhTrangHopDong = '${entity.tinhTrangHopDong}')`;
      return db.load(sql);
  },
  

  loadById: id => {
    const sql = `select hd.idHopDong, hd.maHopDong, hd.ngayThue as ngayThueXe,
                hd.ngayTraXe as ngayTraXe , kh.hoTen, kh.CMND, kh.diaChi, kh.SDT,
                xe.soHieuXe, hx.tenHangXe, dx.tenDongXe, ct.giaThue, ct.soTienDatCoc
                from hopdong hd
                inner join khachHang kh on kh.idKhachHang = hd.idKhachHang
                inner join chitiethopdong ct on hd.idHopDong = ct.idHopDong
                inner join xeoto xe on xe.idXeOto = ct.idXeOto
                inner join dongxe dx on xe.idDongXe = dx.idDongXe
                inner join hangxe hx on dx.idHangXe = hx.idHangXe
                where hd.idHopDong = ${id}`;
    return db.load(sql);
  },

  phatSinhMaHopDong: () => {
    const sql = `set @count = (
                  select if((select count(idHopDong) from hopdong) = 0, cast(1 as signed), 
                  (
                    select Max(cast(right(maHopDong, 3) as SIGNED)) from hopdong) + 1
                  )
                );
                set @id = concat('HD', right( concat('000', CONVERT(@count, char(11))), 3));
                select @id as maHopDong;`;

    return db.load(sql);
  },

  getHopDongByIdXe: (id) => {
    const sql = `select hd.idHopDong, hd.maHopDong
                from xeoto xe
                inner join chitiethopdong ct on xe.idXeOto = ct.idXeOto
                inner join hopdong hd on ct.idHopDong = hd.idHopDong
                where xe.tinhTrangXe = 5 and hd.tinhTrangHopDong = 3
                and xe.idXeOto = ${id}`;
    return db.load(sql);
  },
  
  getInfoPaymentByIdHopDong: (id) => {
    const sql = `
              with chiPhi (giaPhuTung, idPhuTung, idHopDong) as (
                select pt.giaPhuTung as giaPhuTung, pt.idPhuTung, ctkt.idHopDong
                from chitietkiemtra ctkt
                inner join phutung pt on pt.idPhuTung = ctkt.idPhuTung
                where ctkt.tinhTrang = 7
              )
              select hd.idHopDong, hd.maHopDong, hd.ngayThue as ngayThueXe, hd.ngayTraXe as ngayTraXe,
              kh.hoTen, kh.CMND, kh.diaChi, kh.SDT, hd.tinhTrangHopDong, hd.tinhTrangKiemTra, xe.idXeOto,
              xe.soHieuXe, ct.giaThue, ct.soTienDatCoc, ifnull(sum(cp.giaPhuTung), 0) as chiPhiDenBu,
              datediff(hd.ngayTraXe, hd.ngayThue) * ct.giaThue as giaNgayThue,
              datediff(hd.ngayTraXe, hd.ngayThue) * ct.giaThue + ifnull(sum(cp.giaPhuTung), 0) as tongCong
              from hopdong hd
              inner join khachHang kh on kh.idKhachHang = hd.idKhachHang
              inner join chitiethopdong ct on hd.idHopDong = ct.idHopDong
              inner join xeoto xe on xe.idXeOto = ct.idXeOto
              left join chiPhi cp on hd.idHopDong = cp.idHopDong
              where hd.idHopDong = ${id}`;
    return db.load(sql);
  },

  getChiTietDenBuByIdHopDong: (id) =>{
    const sql = ` select pt.giaPhuTung , pt.idPhuTung
                from chitietkiemtra ctkt
                inner join phutung pt on pt.idPhuTung = ctkt.idPhuTung
                where ctkt.tinhTrang = 7 and ctkt.idHopDong = ${id}`;
    return db.load(sql);
  },

  add: entity => db.add(entity, 'hopdong'),
  del: id => db.del({ id: id }, 'hopdong'),
  patch: (id, entity) => {
    delete entity.idHopDong;
    return db.patch(entity, { idHopDong: id }, 'hopdong')
  },
};
  