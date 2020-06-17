CREATE DATABASE  IF NOT EXISTS `qlthueoto` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `qlthueoto`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: qlthueoto
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chitiehopdong`
--

DROP TABLE IF EXISTS `chitiehopdong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chitiehopdong` (
  `idChiTietHopDong` int(11) NOT NULL AUTO_INCREMENT,
  `giaThue` double DEFAULT NULL,
  `soTienDatCoc` double DEFAULT NULL,
  `idHopDong` int(11) NOT NULL,
  `idXeOto` int(11) NOT NULL,
  PRIMARY KEY (`idChiTietHopDong`),
  KEY `fk_HopDong_has_XeOto_XeOto1_idx` (`idXeOto`),
  KEY `fk_HopDong_has_XeOto_HopDong1_idx` (`idHopDong`),
  CONSTRAINT `fk_HopDong_has_XeOto_HopDong1` FOREIGN KEY (`idHopDong`) REFERENCES `hopdong` (`idHopDong`),
  CONSTRAINT `fk_HopDong_has_XeOto_XeOto1` FOREIGN KEY (`idXeOto`) REFERENCES `xeoto` (`idXeOto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitiehopdong`
--

LOCK TABLES `chitiehopdong` WRITE;
/*!40000 ALTER TABLE `chitiehopdong` DISABLE KEYS */;
/*!40000 ALTER TABLE `chitiehopdong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietbaoduong`
--

DROP TABLE IF EXISTS `chitietbaoduong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chitietbaoduong` (
  `idChiTietBaoDuong` int(11) NOT NULL AUTO_INCREMENT,
  `tinhTrang` int(11) DEFAULT NULL,
  `idPhuTung` int(11) NOT NULL,
  `idLichSu` int(11) NOT NULL,
  PRIMARY KEY (`idChiTietBaoDuong`),
  KEY `fk_PhuTung_has_BaoDuong_PhuTung1_idx` (`idPhuTung`),
  KEY `fk_chitietbaoduong_lichsubaoduong1_idx` (`idLichSu`),
  CONSTRAINT `fk_PhuTung_has_BaoDuong_PhuTung1` FOREIGN KEY (`idPhuTung`) REFERENCES `phutung` (`idPhuTung`),
  CONSTRAINT `fk_chitietbaoduong_lichsubaoduong1` FOREIGN KEY (`idLichSu`) REFERENCES `lichsubaoduong` (`idLichSuBaoDuong`)
) ENGINE=InnoDB AUTO_INCREMENT=361 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietbaoduong`
--

LOCK TABLES `chitietbaoduong` WRITE;
/*!40000 ALTER TABLE `chitietbaoduong` DISABLE KEYS */;
INSERT INTO `chitietbaoduong` VALUES (1,1,1,1),(2,1,2,1),(3,1,3,1),(4,1,4,1),(5,7,5,1),(6,1,6,1),(7,7,1,2),(8,7,2,2),(9,7,3,2),(10,1,4,2),(11,1,5,2),(12,1,6,2),(13,1,1,3),(14,1,2,3),(15,7,3,3),(16,7,4,3),(17,7,5,3),(18,1,6,3),(19,1,1,4),(20,1,2,4),(21,1,3,4),(22,1,4,4),(23,7,5,4),(24,7,6,4),(25,7,1,5),(26,1,2,5),(27,1,3,5),(28,1,4,5),(29,1,5,5),(30,1,6,5),(31,7,1,6),(32,7,2,6),(33,7,3,6),(34,1,4,6),(35,1,5,6),(36,7,6,6),(37,1,1,7),(38,7,2,7),(39,1,3,7),(40,1,4,7),(41,1,5,7),(42,7,6,7),(43,1,1,8),(44,1,2,8),(45,1,3,8),(46,1,4,8),(47,1,5,8),(48,1,6,8),(49,7,1,9),(50,7,2,9),(51,1,3,9),(52,1,4,9),(53,1,5,9),(54,1,6,9),(55,1,1,10),(56,1,2,10),(57,1,3,10),(58,1,4,10),(59,1,5,10),(60,7,6,10),(61,7,1,11),(62,7,2,11),(63,1,3,11),(64,1,4,11),(65,1,5,11),(66,1,6,11),(67,7,1,12),(68,7,2,12),(69,1,3,12),(70,1,4,12),(71,1,5,12),(72,7,6,12),(73,1,1,13),(74,1,2,13),(75,1,3,13),(76,1,4,13),(77,1,5,13),(78,1,6,13),(79,1,1,14),(80,1,2,14),(81,1,3,14),(82,1,4,14),(83,1,5,14),(84,7,6,14),(85,1,1,15),(86,1,2,15),(87,1,3,15),(88,1,4,15),(89,1,5,15),(90,1,6,15),(91,1,1,16),(92,1,2,16),(93,7,3,16),(94,7,4,16),(95,1,5,16),(96,1,6,16),(97,1,1,17),(98,1,2,17),(99,1,3,17),(100,7,4,17),(101,7,5,17),(102,1,6,17),(103,1,1,18),(104,1,2,18),(105,1,3,18),(106,1,4,18),(107,1,5,18),(108,1,6,18),(109,1,1,19),(110,1,2,19),(111,1,3,19),(112,1,4,19),(113,1,5,19),(114,1,6,19),(115,1,1,20),(116,1,2,20),(117,1,3,20),(118,1,4,20),(119,1,5,20),(120,1,6,20),(121,1,1,21),(122,1,2,21),(123,1,3,21),(124,1,5,21),(125,1,6,21),(126,1,1,22),(127,1,2,22),(128,1,3,22),(129,1,4,22),(130,7,5,22),(131,1,6,22),(132,1,1,23),(133,1,2,23),(134,7,3,23),(135,1,4,23),(136,1,5,23),(137,7,6,23),(138,1,1,24),(139,7,2,24),(140,1,3,24),(141,1,4,24),(142,7,5,24),(143,1,6,24),(144,1,1,25),(145,7,2,25),(146,1,3,25),(147,1,4,25),(148,1,5,25),(149,7,6,25),(150,1,1,26),(151,7,2,26),(152,1,3,26),(153,1,4,26),(154,1,5,26),(155,7,6,26),(156,1,1,27),(157,7,2,27),(158,1,3,27),(159,7,4,27),(160,1,5,27),(161,7,6,27),(162,1,1,28),(163,7,2,28),(164,1,3,28),(165,1,4,28),(166,7,5,28),(167,1,6,28),(168,7,1,29),(169,7,2,29),(170,1,3,29),(171,7,4,29),(172,1,5,29),(173,1,6,29),(174,1,1,30),(175,1,2,30),(176,1,3,30),(177,1,4,30),(178,1,5,30),(179,1,6,30),(180,1,1,31),(181,7,2,31),(182,7,3,31),(183,1,4,31),(184,1,5,31),(185,7,6,31),(186,7,1,32),(187,1,2,32),(188,1,3,32),(189,1,4,32),(190,7,5,32),(191,1,6,32),(192,1,1,33),(193,1,2,33),(194,1,3,33),(195,1,4,33),(196,1,5,33),(197,1,6,33),(198,1,1,34),(199,1,2,34),(200,1,3,34),(201,1,4,34),(202,1,5,34),(203,1,6,34),(204,1,1,35),(205,1,2,35),(206,1,3,35),(207,1,4,35),(208,1,5,35),(209,1,6,35),(210,1,1,36),(211,1,2,36),(212,1,3,36),(213,1,4,36),(214,1,5,36),(215,1,6,36),(216,1,1,37),(217,1,2,37),(218,1,3,37),(219,1,4,37),(220,1,5,37),(221,1,6,37),(222,1,1,38),(223,1,2,38),(224,1,3,38),(225,1,4,38),(226,1,5,38),(227,1,6,38),(228,1,1,39),(229,1,2,39),(230,1,3,39),(231,1,4,39),(232,1,5,39),(233,1,6,39),(234,1,1,40),(235,1,2,40),(236,1,3,40),(237,1,4,40),(238,1,5,40),(239,1,6,40),(240,1,1,41),(241,1,2,41),(242,1,3,41),(243,1,4,41),(244,1,5,41),(245,1,6,41),(246,1,1,42),(247,1,2,42),(248,1,3,42),(249,1,4,42),(250,1,5,42),(251,1,6,42),(252,1,1,43),(253,1,2,43),(254,1,3,43),(255,1,4,43),(256,1,5,43),(257,1,6,43),(258,1,1,44),(259,1,2,44),(260,1,3,44),(261,1,4,44),(262,1,5,44),(263,1,6,44),(264,1,1,45),(265,1,2,45),(266,1,3,45),(267,1,4,45),(268,1,5,45),(269,1,6,45),(270,1,1,46),(271,1,2,46),(272,1,3,46),(273,1,4,46),(274,1,5,46),(275,7,6,46),(276,1,1,47),(277,1,2,47),(278,1,3,47),(279,1,4,47),(280,1,5,47),(281,1,6,47),(282,1,1,48),(283,7,2,48),(284,1,3,48),(285,1,4,48),(286,1,5,48),(287,1,6,48),(288,7,1,49),(289,1,2,49),(290,1,3,49),(291,1,4,49),(292,1,5,49),(293,1,6,49),(294,1,1,50),(295,1,2,50),(296,1,3,50),(297,1,4,50),(298,1,5,50),(299,1,6,50),(300,1,1,51),(301,1,2,51),(302,1,3,51),(303,7,4,51),(304,1,5,51),(305,1,6,51),(306,1,1,52),(307,1,2,52),(308,1,3,52),(309,1,4,52),(310,1,5,52),(311,1,6,52),(312,1,1,53),(313,7,2,53),(314,7,3,53),(315,1,4,53),(316,1,5,53),(317,1,6,53),(318,1,1,54),(319,1,2,54),(320,1,3,54),(321,1,4,54),(322,1,5,54),(323,1,6,54),(324,1,1,55),(325,7,2,55),(326,1,3,55),(327,1,4,55),(328,1,5,55),(329,1,6,55),(330,7,1,56),(331,1,2,56),(332,1,3,56),(333,1,4,56),(334,1,5,56),(335,1,6,56),(336,7,1,57),(337,1,2,57),(338,1,3,57),(339,1,4,57),(340,1,5,57),(341,7,6,57),(342,1,1,58),(343,7,2,58),(344,1,3,58),(345,1,4,58),(346,1,5,58),(347,1,6,58),(348,1,1,59),(349,1,2,59),(350,1,3,59),(351,1,4,59),(352,1,5,59),(353,1,6,59),(354,1,1,60),(355,7,2,60),(356,1,3,60),(357,7,4,60),(358,7,5,60),(359,1,6,60),(360,1,4,21);
/*!40000 ALTER TABLE `chitietbaoduong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietkiemtra`
--

DROP TABLE IF EXISTS `chitietkiemtra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chitietkiemtra` (
  `idChiTietKiemTra` int(11) NOT NULL AUTO_INCREMENT,
  `tinhTrang` int(11) DEFAULT NULL,
  `idPhuTung` int(11) NOT NULL,
  `idHopDong` int(11) NOT NULL,
  `idXeOto` int(11) NOT NULL,
  PRIMARY KEY (`idChiTietKiemTra`),
  KEY `fk_BoiThuong_has_PhuTung_PhuTung1_idx` (`idPhuTung`),
  KEY `fk_ChiTietKiemTra_HopDong1_idx` (`idHopDong`),
  KEY `fk_ChiTietKiemTra_XeOto1_idx` (`idXeOto`),
  CONSTRAINT `fk_BoiThuong_has_PhuTung_PhuTung1` FOREIGN KEY (`idPhuTung`) REFERENCES `phutung` (`idPhuTung`),
  CONSTRAINT `fk_ChiTietKiemTra_HopDong1` FOREIGN KEY (`idHopDong`) REFERENCES `hopdong` (`idHopDong`),
  CONSTRAINT `fk_ChiTietKiemTra_XeOto1` FOREIGN KEY (`idXeOto`) REFERENCES `xeoto` (`idXeOto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietkiemtra`
--

LOCK TABLES `chitietkiemtra` WRITE;
/*!40000 ALTER TABLE `chitietkiemtra` DISABLE KEYS */;
/*!40000 ALTER TABLE `chitietkiemtra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dongxe`
--

DROP TABLE IF EXISTS `dongxe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `dongxe` (
  `idDongXe` int(11) NOT NULL AUTO_INCREMENT,
  `tenDongXe` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `idHangXe` int(11) NOT NULL,
  PRIMARY KEY (`idDongXe`),
  KEY `fk_dongxe_hangxe_idx` (`idHangXe`),
  CONSTRAINT `fk_dongxe_hangxe` FOREIGN KEY (`idHangXe`) REFERENCES `hangxe` (`idHangXe`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dongxe`
--

LOCK TABLES `dongxe` WRITE;
/*!40000 ALTER TABLE `dongxe` DISABLE KEYS */;
INSERT INTO `dongxe` VALUES (1,'Innova',1),(2,'Vios',1),(3,'Accent',2),(4,'Santafe',2),(5,'Soluto',3),(6,'Optima',3),(7,'Sunny',4),(8,'Terra',4),(9,'City',5),(10,'Civic',5),(11,'Fadil',6),(12,'Lux V8',6);
/*!40000 ALTER TABLE `dongxe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hangxe`
--

DROP TABLE IF EXISTS `hangxe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hangxe` (
  `idHangXe` int(11) NOT NULL AUTO_INCREMENT,
  `tenHangXe` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idHangXe`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hangxe`
--

LOCK TABLES `hangxe` WRITE;
/*!40000 ALTER TABLE `hangxe` DISABLE KEYS */;
INSERT INTO `hangxe` VALUES (1,'Toyota'),(2,'Hyundai'),(3,'Kia'),(4,'Nissan'),(5,'Honda'),(6,'Vinfast');
/*!40000 ALTER TABLE `hangxe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hinhanh`
--

DROP TABLE IF EXISTS `hinhanh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hinhanh` (
  `idHinhAnh` int(11) NOT NULL AUTO_INCREMENT,
  `dgDan` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idXeOto` int(11) NOT NULL,
  `sapXep` int(11) DEFAULT NULL,
  PRIMARY KEY (`idHinhAnh`),
  KEY `fk_HinhAnh_XeOto1_idx` (`idXeOto`),
  CONSTRAINT `fk_HinhAnh_XeOto1` FOREIGN KEY (`idXeOto`) REFERENCES `xeoto` (`idXeOto`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hinhanh`
--

LOCK TABLES `hinhanh` WRITE;
/*!40000 ALTER TABLE `hinhanh` DISABLE KEYS */;
INSERT INTO `hinhanh` VALUES (1,'img/toyota-innova-01.jpg',1,1),(2,'img/toyota-innova-02.jpg',1,2),(3,'img/toyota-innova-01.jpg',2,1),(4,'img/toyota-innova-02.jpg',2,2),(5,'img/toyota-innova-01.jpg',3,1),(6,'img/toyota-innova-02.jpg',3,2),(7,'img/toyota-vios-01.jpg',4,1),(8,'img/toyota-vios-02.jpg',4,2),(9,'img/toyota-vios-01.jpg',5,1),(10,'img/toyota-vios-02.jpg',5,2),(11,'img/toyota-vios-01.jpg',6,1),(12,'img/toyota-vios-02.jpg',6,2),(13,'img/hyundai-accent-01.jpg',7,1),(14,'img/hyundai-accent-02.jpg',7,2),(15,'img/hyundai-accent-01.jpg',8,1),(16,'img/hyundai-accent-02.jpg',8,2),(17,'img/hyundai-santafe-01.png',9,1),(18,'img/hyundai-santafe-02.png',9,2),(19,'img/hyundai-santafe-01.png',10,1),(20,'img/hyundai-santafe-02.png',10,2),(21,'img/kia-soluto-01.jpg',11,2),(22,'img/kia-soluto-02.jpg',11,1),(23,'img/kia-soluto-01.jpg',12,2),(24,'img/kia-soluto-02.jpg',12,1),(25,'img/vinfast-lux-01.jpg',13,1),(26,'img/vinfast-lux-02.jpg',13,2),(27,'img/kia-optima-02.jpg',14,1),(28,'img/kia-optima-02.jpg',15,1),(29,'img/kia-optima-01.jpg',15,2),(30,'img/nissan-sunny-02.jpg',16,1),(31,'img/nissan-sunny-01.jpg',16,2),(32,'img/honda-city-01.jpg',17,1),(33,'img/honda-city-02.jpg',17,2),(34,'img/nissan-terra-01.png',18,2),(35,'img/honda-civic-01.jpg',19,1),(36,'img/honda-civic-02.jpg',19,2),(37,'img/vinfast-fadil-01.jpg',20,1),(38,'img/vinfast-fadil-02.jpg',20,2),(39,'img/kia-optima-01.jpg',14,2),(40,'img/nissan-terra-02.png',18,1);
/*!40000 ALTER TABLE `hinhanh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hopdong`
--

DROP TABLE IF EXISTS `hopdong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hopdong` (
  `idHopDong` int(11) NOT NULL AUTO_INCREMENT,
  `ngayThue` datetime DEFAULT NULL,
  `ngayTraXe` datetime DEFAULT NULL,
  `tinhTrangHopDong` int(11) DEFAULT NULL,
  `phiBoiThuong` double DEFAULT NULL,
  `tongTien` double DEFAULT NULL,
  `idNhanVien` int(11) NOT NULL,
  `idKhachHang` int(11) NOT NULL,
  `ngayKiemTra` date DEFAULT NULL,
  `tinhTrangKiemTra` int(11) DEFAULT NULL,
  `ngayTao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idHopDong`),
  KEY `fk_HopDong_TaiKhoan1_idx` (`idNhanVien`),
  KEY `fk_HopDong_KhachHang1_idx` (`idKhachHang`),
  CONSTRAINT `fk_HopDong_KhachHang1` FOREIGN KEY (`idKhachHang`) REFERENCES `khachhang` (`idKhachHang`),
  CONSTRAINT `fk_HopDong_TaiKhoan1` FOREIGN KEY (`idNhanVien`) REFERENCES `taikhoan` (`idTaiKhoan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hopdong`
--

LOCK TABLES `hopdong` WRITE;
/*!40000 ALTER TABLE `hopdong` DISABLE KEYS */;
/*!40000 ALTER TABLE `hopdong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `khachhang` (
  `idKhachHang` int(11) NOT NULL AUTO_INCREMENT,
  `hoTen` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `diaChi` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SĐT` int(11) DEFAULT NULL,
  `CMND` varchar(12) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idKhachHang`),
  UNIQUE KEY `CMND_UNIQUE` (`CMND`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhang`
--

LOCK TABLES `khachhang` WRITE;
/*!40000 ALTER TABLE `khachhang` DISABLE KEYS */;
INSERT INTO `khachhang` VALUES (1,'Lê Hoàng Luật','227 Nguyễn Văn Cừ',908511846,'012345678'),(2,'Nguyễn Ngọc Châu','227 Nguyễn Văn Cừ',938202874,'012345633'),(3,'Nguyễn Mỹ Linh','227 Nguyễn Văn Cừ',908500846,'022345677'),(4,'Nguyễn Minh Quân','227 Nguyễn Văn Cừ',902522086,'012345655'),(5,'Trần Anh Tuấn','227 Nguyễn Văn Cừ',988406846,'012345666'),(6,'Lê Mỹ Linh','227 Nguyễn Văn Cừ',904530889,'012345688'),(7,'Nguyễn Anh Thư','227 Nguyễn Văn Cừ',931520746,'012345699'),(8,'Nguyễn Như Ngân','227 Nguyễn Văn Cừ',911305896,'012345611'),(9,'	Lê Khả Như','227 Nguyễn Văn Cừ',778500841,'012345622');
/*!40000 ALTER TABLE `khachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lichsubaoduong`
--

DROP TABLE IF EXISTS `lichsubaoduong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `lichsubaoduong` (
  `idLichSuBaoDuong` int(11) NOT NULL AUTO_INCREMENT,
  `ngayBaoDuong` date DEFAULT NULL,
  `tinhTrang` int(11) DEFAULT '1',
  `idXeOto` int(11) NOT NULL,
  PRIMARY KEY (`idLichSuBaoDuong`),
  KEY `fk_LichSuBaoDuong_XeOto1_idx` (`idXeOto`),
  CONSTRAINT `fk_LichSuBaoDuong_XeOto1` FOREIGN KEY (`idXeOto`) REFERENCES `xeoto` (`idXeOto`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lichsubaoduong`
--

LOCK TABLES `lichsubaoduong` WRITE;
/*!40000 ALTER TABLE `lichsubaoduong` DISABLE KEYS */;
INSERT INTO `lichsubaoduong` VALUES (1,'2020-06-17',10,1),(2,'2020-05-17',10,1),(3,'2020-04-17',10,1),(4,'2020-06-17',10,2),(5,'2020-05-17',10,2),(6,'2020-04-17',10,2),(7,'2020-05-17',10,3),(8,'2020-04-17',10,3),(9,'2020-03-17',10,3),(10,'2020-03-17',10,4),(11,'2020-04-17',10,4),(12,'2020-05-17',10,4),(13,'2020-03-04',10,5),(14,'2020-04-04',10,5),(15,'2020-05-04',10,5),(16,'2020-03-04',10,6),(17,'2020-04-04',10,6),(18,'2020-05-04',10,6),(19,'2020-05-02',10,7),(20,'2020-04-02',10,7),(21,'2020-03-02',10,7),(22,'2020-05-03',10,8),(23,'2020-04-02',10,8),(24,'2020-03-01',10,8),(25,'2020-06-06',10,9),(26,'2020-05-06',10,9),(27,'2020-04-06',10,9),(28,'2020-05-07',10,10),(29,'2020-04-07',10,10),(30,'2020-03-07',10,10),(31,'2020-04-04',10,11),(32,'2020-05-04',10,11),(33,'2020-03-04',10,11),(34,'2020-03-04',10,12),(35,'2020-05-04',10,12),(36,'2020-04-04',10,12),(37,'2020-04-04',10,13),(38,'2020-05-04',10,13),(39,'2020-06-04',10,13),(40,'2020-03-04',10,14),(41,'2020-05-04',10,14),(42,'2020-04-04',10,14),(43,'2020-05-04',10,15),(44,'2020-03-04',10,15),(45,'2020-04-04',10,15),(46,'2020-05-02',10,16),(47,'2020-04-02',10,16),(48,'2020-03-02',10,16),(49,'2020-03-20',10,17),(50,'2020-04-20',10,17),(51,'2020-05-20',10,17),(52,'2020-05-10',10,18),(53,'2020-03-10',10,18),(54,'2020-04-10',10,18),(55,'2020-05-04',10,19),(56,'2020-03-04',10,19),(57,'2020-04-04',10,19),(58,'2020-05-04',10,20),(59,'2020-04-04',10,20),(60,'2020-03-05',10,20);
/*!40000 ALTER TABLE `lichsubaoduong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaixe`
--

DROP TABLE IF EXISTS `loaixe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `loaixe` (
  `idLoaiXe` int(11) NOT NULL AUTO_INCREMENT,
  `tenLoaiXe` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idLoaiXe`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaixe`
--

LOCK TABLES `loaixe` WRITE;
/*!40000 ALTER TABLE `loaixe` DISABLE KEYS */;
INSERT INTO `loaixe` VALUES (1,'Sendai'),(2,'SUV');
/*!40000 ALTER TABLE `loaixe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phutung`
--

DROP TABLE IF EXISTS `phutung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `phutung` (
  `idPhuTung` int(11) NOT NULL AUTO_INCREMENT,
  `tenPhuTung` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `giaPhuTung` double DEFAULT NULL,
  PRIMARY KEY (`idPhuTung`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phutung`
--

LOCK TABLES `phutung` WRITE;
/*!40000 ALTER TABLE `phutung` DISABLE KEYS */;
INSERT INTO `phutung` VALUES (1,'Vỏ xe',1000000),(2,'Ruột xe',1200000),(3,'Túi khí',3000000),(4,'Hệ thống thắng',5000000),(5,'Ghế xe',10000000),(6,'Gương chiếu hậu',4000000);
/*!40000 ALTER TABLE `phutung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taikhoan`
--

DROP TABLE IF EXISTS `taikhoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `taikhoan` (
  `idTaiKhoan` int(11) NOT NULL AUTO_INCREMENT,
  `tenNV` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `SĐT` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `diaChi` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idVaiTro` int(11) NOT NULL,
  PRIMARY KEY (`idTaiKhoan`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_TaiKhoan_VaiTro_idx` (`idVaiTro`),
  CONSTRAINT `fk_TaiKhoan_VaiTro` FOREIGN KEY (`idVaiTro`) REFERENCES `vaitro` (`idVaiTro`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taikhoan`
--

LOCK TABLES `taikhoan` WRITE;
/*!40000 ALTER TABLE `taikhoan` DISABLE KEYS */;
INSERT INTO `taikhoan` VALUES (1,'Sales','nv1','1',NULL,'227 Nguyễn Văn Cừ',2),(2,'Nguyễn Bảo Dưỡng','nv2','1',NULL,'227 Nguyễn Văn Cừ',3),(3,'Nguyễn Quản Lý','ql1','1',NULL,'227 Nguyễn Văn Cừ',1);
/*!40000 ALTER TABLE `taikhoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tinhtrang`
--

DROP TABLE IF EXISTS `tinhtrang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tinhtrang` (
  `idTinhTrang` int(11) NOT NULL AUTO_INCREMENT,
  `moTa` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idTinhTrang`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tinhtrang`
--

LOCK TABLES `tinhtrang` WRITE;
/*!40000 ALTER TABLE `tinhtrang` DISABLE KEYS */;
INSERT INTO `tinhtrang` VALUES (1,'Bình thường'),(2,'Hỏng hóc'),(3,'Đang thuê'),(4,'Nhàn rỗi'),(5,'Cần kiểm tra'),(6,'Đã kiểm tra'),(7,'Thay thế'),(8,'Hoàn tất'),(9,'Cần bảo dưỡng'),(10,'Đã bảo dưỡng');
/*!40000 ALTER TABLE `tinhtrang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaitro`
--

DROP TABLE IF EXISTS `vaitro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `vaitro` (
  `idVaiTro` int(11) NOT NULL AUTO_INCREMENT,
  `tenVaiTro` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idVaiTro`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaitro`
--

LOCK TABLES `vaitro` WRITE;
/*!40000 ALTER TABLE `vaitro` DISABLE KEYS */;
INSERT INTO `vaitro` VALUES (1,'Quản lý'),(2,'Nhân viên kinh doanh'),(3,'Nhân viên bảo dưỡng');
/*!40000 ALTER TABLE `vaitro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xeoto`
--

DROP TABLE IF EXISTS `xeoto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `xeoto` (
  `idXeOto` int(11) NOT NULL AUTO_INCREMENT,
  `soHieuXe` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `giaTriXe` double DEFAULT NULL,
  `giaThue` double DEFAULT NULL,
  `phanTramDatCoc` int(11) DEFAULT NULL,
  `tienDatCoc` double DEFAULT NULL,
  `mauSac` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tinhTrangThue` int(11) DEFAULT NULL,
  `tinhTrangXe` int(11) DEFAULT NULL,
  `idLoaiXe` int(11) NOT NULL,
  `idDongXe` int(11) NOT NULL,
  `hanBaoDuong` int(11) DEFAULT '30',
  `ngayBaoDuongLanCuoi` date DEFAULT NULL,
  PRIMARY KEY (`idXeOto`),
  KEY `fk_XeOto_dongXe1_idx` (`idLoaiXe`),
  KEY `fk_XeOto_DongXe1` (`idDongXe`),
  CONSTRAINT `fk_XeOto_DongXe1` FOREIGN KEY (`idDongXe`) REFERENCES `dongxe` (`idDongXe`),
  CONSTRAINT `fk_XeOto_LoaiXe1` FOREIGN KEY (`idLoaiXe`) REFERENCES `loaixe` (`idLoaiXe`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xeoto`
--

LOCK TABLES `xeoto` WRITE;
/*!40000 ALTER TABLE `xeoto` DISABLE KEYS */;
INSERT INTO `xeoto` VALUES (1,'SKD001',700000000,450000,NULL,NULL,'Trắng',4,1,2,1,30,NULL),(2,'SKD002',740000000,550000,NULL,NULL,'Trắng',4,1,2,1,30,NULL),(3,'SKD003',710000000,1100000,NULL,NULL,'Trắng',4,1,2,1,30,NULL),(4,'SKD004',670000000,470000,NULL,NULL,'Trắng',4,1,1,2,30,NULL),(5,'SKD005',670000000,650000,NULL,NULL,'Trắng',4,1,1,2,30,NULL),(6,'SKD006',670000000,750000,NULL,NULL,'Trắng',4,1,1,2,30,NULL),(7,'SKD007',670000000,450000,NULL,NULL,'Trắng',4,1,1,3,30,NULL),(8,'SKD008',670000000,450000,NULL,NULL,'Trắng',4,1,1,3,30,NULL),(9,'SKD009',670000000,450000,NULL,NULL,'Trắng',4,1,1,4,30,NULL),(10,'SKD010',670000000,450000,NULL,NULL,'Trắng',4,1,1,4,30,NULL),(11,'SKD011',670000000,450000,NULL,NULL,'Trắng',4,1,1,5,30,NULL),(12,'SKD012',670000000,450000,NULL,NULL,'Trắng',4,1,1,5,30,NULL),(13,'SKD013',670000000,550000,NULL,NULL,'Trắng',4,1,1,12,30,NULL),(14,'SKD014',670000000,550000,NULL,NULL,'Trắng',4,1,1,6,30,NULL),(15,'SKD015',670000000,750000,NULL,NULL,'Trắng',4,1,1,6,30,NULL),(16,'SKD016',670000000,800000,NULL,NULL,'Trắng',4,1,1,7,30,NULL),(17,'SKD017',670000000,800000,NULL,NULL,'Trắng',4,1,1,9,30,NULL),(18,'SKD018',670000000,450000,NULL,NULL,'Trắng',4,1,1,8,30,NULL),(19,'SKD019',670000000,650000,NULL,NULL,'Trắng',4,1,1,10,30,NULL),(20,'SKD020',670000000,1200000,NULL,NULL,'Trắng',4,1,1,11,30,NULL);
/*!40000 ALTER TABLE `xeoto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'qlthueoto'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-17  8:06:55
