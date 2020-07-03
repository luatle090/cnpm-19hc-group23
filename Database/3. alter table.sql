ALTER TABLE `qlthueoto`.`hopdong` 
ADD COLUMN `maHopDong` VARCHAR(45) NULL AFTER `idHopDong`;

ALTER TABLE `qlthueoto`.`chitiehopdong` 
RENAME TO  `qlthueoto`.`chitiethopdong` ;

ALTER TABLE `qlthueoto`.`khachhang` 
CHANGE COLUMN `SĐT` `SDT` INT(11) NULL DEFAULT NULL ;