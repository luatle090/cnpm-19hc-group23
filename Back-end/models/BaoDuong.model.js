const db = require('../utils/db');

module.exports = {
  all: () => {
    const sql = 'select * from lichsubaoduong';
    return db.load(sql);
  },

  loadNgayBaoDuongByIdXeOto: id => {
      const sql = `select ls.idLichSuBaoDuong, DATE_FORMAT(ls.ngayBaoDuong, "%d/%m/%Y") as ngayBaoDuong,
                    case when xe.ngayBaoDuongLanCuoi = ls.ngayBaoDuong
                        then 1
                        else 0
                    end as ngayMacDinh
                    from lichsubaoduong ls
                    inner join xeoto xe on xe.idXeOto = ls.idXeOto
                    where ls.idXeOto = ${id}
                    order by ls.ngayBaoDuong desc `;
      return db.load(sql);
  },

  loadByIdXeOto: (id, ngayBaoDuong) => {
    const sql = `select xe.soHieuXe, tt.moTa as tinhTrangBaoDuong, pt.tenPhuTung, ct.idPhuTung,
                tt2.moTa as tinhTrangPhuTung
                from lichsubaoduong ls
                inner join xeoto xe on xe.idXeOto = ls.idXeOto
                inner join chitietbaoduong ct on ls.idLichSuBaoDuong = ct.idLichSu
                inner join tinhtrang tt on ls.tinhTrang = tt.idTinhTrang
                inner join tinhtrang tt2 on ct.tinhTrang = tt2.idTinhTrang
                inner join phutung pt on pt.idPhuTung = ct.idPhuTung
                where xe.idXeOto = ${id} and
                    if('${ngayBaoDuong}' = '', 
                        ls.ngayBaoDuong = xe.ngayBaoDuongLanCuoi, 
                        ls.ngayBaoDuong = str_to_date('${ngayBaoDuong}', '%d/%m/%y')
                    )`;
    return db.load(sql);
  },

  getlist: (entity, limit, offset) => {
    const sql = `select xe.idXeOto, xe.soHieuXe, DATE_FORMAT(xe.ngayBaoDuongLanCuoi, "%d/%m/%Y") as ngayBaoDuong,
                  tt.moTa as tinhTrang, lx.tenLoaiXe, dx.tenDongXe, hx.tenHangXe
                  from xeoto xe
                  inner join loaixe lx on lx.idLoaiXe = xe.idLoaiXe
                  inner join dongxe dx on xe.idDongXe = dx.idDongXe
                  inner join hangxe hx on dx.idHangXe = hx.idHangXe
                  inner join tinhtrang tt on xe.tinhTrangBaoDuong = tt.idTinhTrang
                  where ('${entity.soHieuXe}' = '' or xe.soHieuXe like '%${entity.soHieuXe}%')
                  and ('${entity.tinhTrangBaoDuong}' = '' or xe.tinhTrangBaoDuong = '${entity.tinhTrangBaoDuong}')
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
                  inner join tinhtrang tt on xe.tinhTrangBaoDuong = tt.idTinhTrang
                  where ('${entity.soHieuXe}' = '' or xe.soHieuXe like '%${entity.soHieuXe}%')
                  and ('${entity.tinhTrangBaoDuong}' = '' or xe.tinhTrangBaoDuong = '${entity.tinhTrangBaoDuong}')`;
    return db.load(sql);
  },

  capNhatTinhTrang: () => {
    const sql = `SET SQL_SAFE_UPDATES = 0;
                with cte (idXeOto, tinhTrangBaoDuong) as (
                    select idXeOto ,case 
                        when date_add(ngayBaoDuongLanCuoi, INTERVAL hanBaoDuong DAY) <=  Date(Now())
                        then 9
                        else 10
                    end as tinhTrangBaoDuong
                    from xeoto
                )
                update xeoto xe1
                set xe1.tinhTrangBaoDuong = (select cte.tinhTrangBaoDuong from cte
                                where xe1.idXeOto = cte.idXeOto);`;
    return db.load(sql);
  },

  add: entity => db.add(entity, 'lichsubaoduong'),
  del: id => db.del({ id: id }, 'lichsubaoduong'),
  patch: (id, entity) => {
    delete entity.idLichSulichsubaoduong;
    return db.patch(entity, { idHopDong: id }, 'lichsubaoduong')
  },
};
