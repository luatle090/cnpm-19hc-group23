SET SQL_SAFE_UPDATES = 0;
update qlthueoto.xeoto
set ngayBaoDuongLanCuoi = (
	select ngayBaoDuong from qlthueoto.lichsubaoduong
	where idXeOto = xeoto.idXeOto
	group by idXeOto
having max(ngayBaoDuong));

ALTER TABLE `qlthueoto`.`xeoto` 
ADD COLUMN `tinhTrangBaoDuong` INT NULL AFTER `tinhTrangXe`;

UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '1');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '2');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '3');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '4');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '5');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '6');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '7');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '8');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '9');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '10');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '11');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '12');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '13');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '14');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '15');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '26');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '20');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '18');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '17');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '16');
UPDATE `qlthueoto`.`xeoto` SET `tinhTrangBaoDuong` = '9' WHERE (`idXeOto` = '19');
