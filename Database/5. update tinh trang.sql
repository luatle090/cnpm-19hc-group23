
ALTER TABLE `qlthueoto`.`tinhtrang` 
ADD COLUMN `code` VARCHAR(45) NULL AFTER `moTa`;

UPDATE `qlthueoto`.`tinhtrang` SET `code` = 'PHU_TUNG' WHERE (`idTinhTrang` = '7');
UPDATE `qlthueoto`.`tinhtrang` SET `code` = '' WHERE (`idTinhTrang` = '8');
UPDATE `qlthueoto`.`tinhtrang` SET `code` = 'BAO_DUONG' WHERE (`idTinhTrang` = '9');
UPDATE `qlthueoto`.`tinhtrang` SET `code` = 'BAO_DUONG' WHERE (`idTinhTrang` = '10');
INSERT INTO `qlthueoto`.`tinhtrang` (`idTinhTrang`, `moTa`, `code`) VALUES ('11', 'Bình thường', 'PHU_TUNG');

ALTER TABLE `qlthueoto`.`chitietbaoduong` 
DROP FOREIGN KEY `fk_chitietbaoduong_lichsubaoduong1`;
ALTER TABLE `qlthueoto`.`chitietbaoduong` 
;
ALTER TABLE `qlthueoto`.`chitietbaoduong` ALTER INDEX `fk_PhuTung_has_BaoDuong_PhuTung1_idx` INVISIBLE;
ALTER TABLE `qlthueoto`.`chitietbaoduong` 
ADD CONSTRAINT `fk_chitietbaoduong_lichsubaoduong1`
  FOREIGN KEY (`idLichSu`)
  REFERENCES `qlthueoto`.`lichsubaoduong` (`idLichSuBaoDuong`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;