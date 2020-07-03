const db = require('../utils/db');


module.exports = {
    all: () => {
      const sql = 'select * from hinhanh';
      return db.load(sql);
    },

    getlist: (entity, limit, offset) => {
        const sql = `select hd.idHopDong, hd.maHopDong, DATE_FORMAT(hd.ngayThue, "%d/%m/%Y") as ngayThueXe,
                    DATE_FORMAT(hd.ngayTraXe, "%d/%m/%Y") as ngayTraXe, kh.hoTen, tt.moTa as tinhTrang,
                    xe.soHieuXe, hx.tenHangXe, dx.tenDongXe
                    from hopdong hd
                    inner join tinhtrang tt on hd.tinhTrangHopDong = tt.idTinhTrang
                    inner join khachHang kh on kh.idKhachHang = hd.idKhachHang
                    inner join chitiethopdong ct on hd.idHopDong = ct.idHopDong
                    inner join xeoto xe on xe.idXeOto = ct.idXeOto
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
                    order by xe.idXeOto
                    limit ${limit} offset ${offset}`;
        console.log(sql);
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
      const sql = `select hd.idHopDong, hd.maHopDong, DATE_FORMAT(hd.ngayThue, "%d/%m/%Y") as ngayThueXe,
                  DATE_FORMAT(hd.ngayTraXe, "%d/%m/%Y") as ngayTraXe , kh.hoTen, kh.CMND, kh.diaChi, kh.SDT,
                  xe.soHieuXe, hx.tenHangXe, dx.tenDongXe
                  from hopdong hd
                  inner join khachHang kh on kh.idKhachHang = hd.idKhachHang
                  inner join chitiethopdong ct on hd.idHopDong = ct.idHopDong
                  inner join xeoto xe on xe.idXeOto = ct.idXeOto
                  inner join dongxe dx on xe.idDongXe = dx.idDongXe
                  inner join hangxe hx on dx.idHangXe = hx.idHangXe
                  where hd.idHopDong = ${id}`;
      return db.load(sql);
    },
  
    add: entity => db.add(entity, 'hopdong'),
    del: id => db.del({ id: id }, 'hopdong'),
    patch: (id, entity) => {
      delete entity.idHopDong;
      return db.patch(entity, { idHopDong: id }, 'hopdong')
    },
  };
  