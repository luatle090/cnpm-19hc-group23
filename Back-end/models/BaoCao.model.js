const db = require('../utils/db');


module.exports = {
    all: () => {
        const sql = 'select * from lichsubaoduong';
        return db.load(sql);
    },


    baoCaoDoanhThuTheoThang: (ngayTraXe) => {
        const sql = `select date_format(ngayTraXe, "%d/%m/%Y") as ngay, 
                    count(idHopDong) as soLuongKhach, sum(tongTien) as doanhThu
                    from hopdong
                    where tinhTrangHopDong = 8 and
                    EXTRACT(YEAR_MONTH from '${ngayTraXe}') = EXTRACT(YEAR_MONTH FROM ngayTraXe)
                    group by date(ngayTraXe)`;
        return db.load(sql);
    },

    baoCaoChiTheoThang: (ngayBaoCao) => {
        const sql = `select date_format(ls.ngayBaoDuong, "%d/%m/%Y") as ngay, pt.tenPhuTung, pt.giaPhuTung
                    from lichsubaoduong ls
                    inner join chitietbaoduong ct on ct.idLichSu = ls.idLichSuBaoDuong
                    inner join phutung pt on pt.idPhuTung = ct.idPhuTung
                    where ls.tinhTrang = 10 and ct.tinhTrang = 7
                    and EXTRACT(YEAR_MONTH from '${ngayBaoCao}') = EXTRACT(YEAR_MONTH FROM ngayBaoDuong)`;
        return db.load(sql);
    }


}