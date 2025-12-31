-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: rasa_borneo
-- ------------------------------------------------------
-- Server version	8.4.6

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banks`
--

DROP TABLE IF EXISTS `banks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `sandi_bank` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_bank` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banks`
--

LOCK TABLES `banks` WRITE;
/*!40000 ALTER TABLE `banks` DISABLE KEYS */;
INSERT INTO `banks` VALUES (1,'014','BANK BCA (BANK CENTRAL ASIA)'),(2,'008','BANK MANDIRI'),(3,'009','BANK BNI (BANK NEGARA INDONESIA)'),(4,'427','BANK SYARIAH INDONESIA (Eks BNI SYARIAH)'),(5,'002','BANK BRI (BANK RAKYAT INDONESIA)'),(6,'451','BANK SYARIAH INDONESIA (Eks BSM)'),(7,'022','BANK CIMB NIAGA'),(8,'022','BANK CIMB NIAGA SYARIAH'),(9,'147','BANK MUAMALAT'),(10,'213','BANK BTPN (BANK TABUNGAN PENSIUNAN NASIONAL)'),(11,'547','BANK BTPN SYARIAH'),(12,'213','JENIUS'),(13,'422','BANK SYARIAH INDONESIA (Eks BRI SYARIAH)'),(14,'200','BANK TABUNGAN NEGARA (BANK BTN)'),(15,'013','PERMATA BANK'),(16,'011','BANK DANAMON'),(17,'016','BANK BII MAYBANK'),(18,'426','BANK MEGA'),(19,'153','BANK SINARMAS'),(20,'950','BANK COMMONWEALTH'),(21,'028','BANK OCBC NISP'),(22,'441','BANK BUKOPIN'),(23,'521','BANK BUKOPIN SYARIAH'),(24,'536','BANK BCA SYARIAH'),(25,'026','BANK LIPPO'),(26,'031','CITIBANK'),(27,'789','INDOSAT DOMPETKU'),(28,'911','TELKOMSEL TCASH'),(29,'911','LINKAJA'),(30,'046','BANK DBS INDONESIA'),(31,'046','DIGIBANK'),(32,'535','SEABANK (Eks BANK KESEJAHTERAAN EKONOMI)'),(33,'542','BANK JAGO (Eks BANK ARTOS INDONESIA)'),(34,'023','BANK UOB INDONESIA'),(35,'023','TMRW by UOB INDONESIA'),(36,'490','BANK NEO COMMERCE (Akulaku)'),(37,'567','ALLO BANK (Eks BANK HARDA)'),(38,'947','BANK ALADIN (Eks BANK MAYBANK INDOCORP)'),(39,'110','BANK JABAR dan BANTEN (BJB)'),(40,'111','BANK DKI JAKARTA'),(41,'112','BPD DIY (YOGYAKARTA)'),(42,'113','BANK JATENG (JAWA TENGAH)'),(43,'114','BANK JATIM (JAWA BARAT)'),(44,'115','BPD JAMBI'),(45,'116','BPD ACEH'),(46,'116','BPD ACEH SYARIAH'),(47,'117','BANK SUMUT'),(48,'118','BANK NAGARI (BANK SUMBAR)'),(49,'119','BANK RIAU KEPRI'),(50,'120','BANK SUMSEL BABEL'),(51,'121','BANK LAMPUNG'),(52,'122','BANK KALSEL (BANK KALIMANTAN SELATAN)'),(53,'123','BANK KALBAR (BANK KALIMANTAN BARAT)'),(54,'124','BANK KALTIMTARA (BANK KALIMANTAN TIMUR DAN UTARA)'),(55,'125','BANK KALTENG (BANK KALIMANTAN TENGAH)'),(56,'126','BANK SULSELBAR (BANK SULAWESI SELATAN DAN BARAT)'),(57,'127','BANK SULUTGO (BANK SULAWESI UTARA DAN GORONTALO)'),(58,'128','BANK NTB'),(59,'128','BANK NTB SYARIAH'),(60,'129','BANK BPD BALI'),(61,'130','BANK NTT'),(62,'131','BANK MALUKU MALUT'),(63,'132','BANK PAPUA'),(64,'133','BANK BENGKULU'),(65,'134','BANK SULTENG (BANK SULAWESI TENGAH)'),(66,'135','BANK SULTRA'),(67,'137','BANK BPD BANTEN'),(68,'003','BANK EKSPOR INDONESIA'),(69,'019','BANK PANIN'),(70,'517','BANK PANIN DUBAI SYARIAH'),(71,'020','BANK ARTA NIAGA KENCANA'),(72,'023','BANK UOB INDONESIA (BANK BUANA INDONESIA)'),(73,'030','AMERICAN EXPRESS BANK LTD'),(74,'031','CITIBANK N.A.'),(75,'032','JP. MORGAN CHASE BANK, N.A.'),(76,'033','BANK OF AMERICA, N.A'),(77,'034','ING INDONESIA BANK'),(78,'036','BANK MULTICOR'),(79,'037','BANK ARTHA GRAHA INTERNASIONAL'),(80,'039','BANK CREDIT AGRICOLE INDOSUEZ'),(81,'040','THE BANGKOK BANK COMP. LTD'),(82,'041','THE HONGKONG & SHANGHAI B.C. (BANK HSBC)'),(83,'042','THE BANK OF TOKYO MITSUBISHI UFJ LTD'),(84,'045','BANK SUMITOMO MITSUI INDONESIA'),(85,'047','BANK RESONA PERDANIA'),(86,'048','BANK MIZUHO INDONESIA'),(87,'050','STANDARD CHARTERED BANK'),(88,'052','BANK ABN AMRO'),(89,'053','BANK KEPPEL TATLEE BUANA'),(90,'054','BANK CAPITAL INDONESIA'),(91,'057','BANK BNP PARIBAS INDONESIA'),(92,'023','BANK UOB INDONESIA'),(93,'059','KOREA EXCHANGE BANK DANAMON'),(94,'060','RABOBANK INTERNASIONAL INDONESIA'),(95,'061','BANK ANZ INDONESIA'),(96,'068','BANK WOORI SAUDARA'),(97,'069','BANK OF CHINA'),(98,'076','BANK BUMI ARTA'),(99,'087','BANK EKONOMI'),(100,'088','BANK ANTARDAERAH'),(101,'089','BANK HAGA'),(102,'093','BANK IFI'),(103,'095','BANK CENTURY'),(104,'097','BANK MAYAPADA'),(105,'145','BANK NUSANTARA PARAHYANGAN'),(106,'146','BANK SWADESI (BANK OF INDIA INDONESIA)'),(107,'151','BANK MESTIKA DHARMA'),(108,'152','BANK SHINHAN INDONESIA (BANK METRO EXPRESS)'),(109,'157','BANK MASPION INDONESIA'),(110,'159','BANK HAGAKITA'),(111,'161','BANK GANESHA'),(112,'162','BANK WINDU KENTJANA'),(113,'164','BANK ICBC INDONESIA (HALIM INDONESIA BANK)'),(114,'166','BANK HARMONI INTERNATIONAL'),(115,'167','BANK QNB KESAWAN (BANK QNB INDONESIA)'),(116,'212','BANK HIMPUNAN SAUDARA 1906'),(117,'405','BANK SWAGUNA'),(118,'459','BANK BISNIS INTERNASIONAL'),(119,'466','BANK SRI PARTHA'),(120,'472','BANK JASA JAKARTA'),(121,'484','BANK BINTANG MANUNGGAL'),(122,'485','BANK MNC INTERNASIONAL (BANK BUMIPUTERA)'),(123,'490','BANK YUDHA BHAKTI'),(124,'491','BANK MITRANIAGA'),(125,'494','BANK BRI AGRO NIAGA'),(126,'498','BANK SBI INDONESIA (BANK INDOMONEX)'),(127,'501','BANK ROYAL INDONESIA'),(128,'503','BANK NATIONAL NOBU (BANK ALFINDO)'),(129,'506','BANK MEGA SYARIAH'),(130,'513','BANK INA PERDANA'),(131,'517','BANK HARFA'),(132,'520','PRIMA MASTER BANK'),(133,'521','BANK PERSYARIKATAN INDONESIA'),(134,'525','BANK AKITA'),(135,'526','LIMAN INTERNATIONAL BANK'),(136,'531','ANGLOMAS INTERNASIONAL BANK'),(137,'523','BANK SAHABAT SAMPEORNA (BANK DIPO INTERNATIONAL)'),(138,'547','BANK PURBA DANARTA'),(139,'548','BANK MULTI ARTA SENTOSA'),(140,'553','BANK MAYORA INDONESIA'),(141,'555','BANK INDEX SELINDO'),(142,'566','BANK VICTORIA INTERNATIONAL'),(143,'558','BANK EKSEKUTIF'),(144,'559','CENTRATAMA NASIONAL BANK'),(145,'562','BANK FAMA INTERNASIONAL'),(146,'564','BANK MANDIRI TASPEN POS (BANK SINAR HARAPAN BALI)'),(147,'945','BANK AGRIS (BANK FINCONESIA)'),(148,'946','BANK MERINCORP'),(149,'948','BANK OCBC – INDONESIA'),(150,'949','BANK CTBC (CHINA TRUST) INDONESIA'),(151,'425','BANK BJB SYARIAH'),(152,'688','BPR KS (KARYAJATNIKA SEDAYA)');
/*!40000 ALTER TABLE `banks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `business_categories`
--

DROP TABLE IF EXISTS `business_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `business_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business_categories`
--

LOCK TABLES `business_categories` WRITE;
/*!40000 ALTER TABLE `business_categories` DISABLE KEYS */;
INSERT INTO `business_categories` VALUES (1,'Rumah Makan','2025-06-19 15:43:28','2025-06-19 15:43:28',NULL),(2,'Coffee Shop','2025-06-19 20:20:43','2025-06-19 20:20:43',NULL),(3,'Angkringan','2025-06-19 20:20:47','2025-06-19 20:20:47',NULL),(4,'Toko Kue & Roti','2025-06-19 20:20:52','2025-06-19 20:20:52',NULL),(5,'Kathering','2025-06-19 20:22:16','2025-06-19 20:22:16',NULL),(6,'Restoran Cepat Saji','2025-06-19 20:22:34','2025-06-19 20:22:52',NULL);
/*!40000 ALTER TABLE `business_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned DEFAULT NULL,
  `merchant_id` bigint unsigned DEFAULT NULL,
  `menu_item_id` bigint unsigned NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `unit_price` int NOT NULL DEFAULT '0',
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carts_customer_id_foreign` (`customer_id`),
  KEY `carts_merchant_id_foreign` (`merchant_id`),
  KEY `carts_menu_item_id_foreign` (`menu_item_id`),
  CONSTRAINT `carts_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `carts_menu_item_id_foreign` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `carts_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `merchant_id` bigint unsigned NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('percentage','fixed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` int NOT NULL,
  `minimum_purchase` int NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `coupons_code_unique` (`code`),
  KEY `coupons_merchant_id_foreign` (`merchant_id`),
  CONSTRAINT `coupons_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` VALUES (10,1,'Q79PYX','percentage',5,100000,'2025-08-01 00:00:00','2025-08-31 00:00:00',1,'2025-08-02 04:39:54','2025-08-02 04:39:54',NULL),(11,1,'NG3ENT','percentage',2,50000,'2025-08-01 00:00:00','2025-08-31 00:00:00',1,'2025-08-13 06:19:58','2025-08-13 06:19:58',NULL);
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courier_assignment_rejections`
--

DROP TABLE IF EXISTS `courier_assignment_rejections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courier_assignment_rejections` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `courier_id` bigint unsigned NOT NULL,
  `transaction_id` bigint unsigned NOT NULL,
  `rejected_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courier_assignment_rejections_courier_id_foreign` (`courier_id`),
  KEY `courier_assignment_rejections_transaction_id_foreign` (`transaction_id`),
  CONSTRAINT `courier_assignment_rejections_courier_id_foreign` FOREIGN KEY (`courier_id`) REFERENCES `couriers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `courier_assignment_rejections_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courier_assignment_rejections`
--

LOCK TABLES `courier_assignment_rejections` WRITE;
/*!40000 ALTER TABLE `courier_assignment_rejections` DISABLE KEYS */;
/*!40000 ALTER TABLE `courier_assignment_rejections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courier_assignments`
--

DROP TABLE IF EXISTS `courier_assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courier_assignments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `courier_id` bigint unsigned NOT NULL,
  `transaction_id` bigint unsigned NOT NULL,
  `status` enum('menunggu','diterima','ditolak','dibatalkan','diantar','selesai') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'menunggu',
  `accepted_at` datetime DEFAULT NULL,
  `delivered_at` datetime DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `proof_of_delivery` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courier_assignments_courier_id_foreign` (`courier_id`),
  KEY `courier_assignments_transaction_id_foreign` (`transaction_id`),
  CONSTRAINT `courier_assignments_courier_id_foreign` FOREIGN KEY (`courier_id`) REFERENCES `couriers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `courier_assignments_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courier_assignments`
--

LOCK TABLES `courier_assignments` WRITE;
/*!40000 ALTER TABLE `courier_assignments` DISABLE KEYS */;
/*!40000 ALTER TABLE `courier_assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courier_wallet_histories`
--

DROP TABLE IF EXISTS `courier_wallet_histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courier_wallet_histories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `courier_id` bigint unsigned NOT NULL,
  `transaction_id` bigint unsigned NOT NULL,
  `amount` int NOT NULL DEFAULT '0',
  `earned_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courier_wallet_histories_courier_id_foreign` (`courier_id`),
  KEY `courier_wallet_histories_transaction_id_foreign` (`transaction_id`),
  CONSTRAINT `courier_wallet_histories_courier_id_foreign` FOREIGN KEY (`courier_id`) REFERENCES `couriers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `courier_wallet_histories_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courier_wallet_histories`
--

LOCK TABLES `courier_wallet_histories` WRITE;
/*!40000 ALTER TABLE `courier_wallet_histories` DISABLE KEYS */;
/*!40000 ALTER TABLE `courier_wallet_histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courier_wallets`
--

DROP TABLE IF EXISTS `courier_wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courier_wallets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `courier_id` bigint unsigned NOT NULL,
  `balance` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courier_wallets_courier_id_foreign` (`courier_id`),
  CONSTRAINT `courier_wallets_courier_id_foreign` FOREIGN KEY (`courier_id`) REFERENCES `couriers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courier_wallets`
--

LOCK TABLES `courier_wallets` WRITE;
/*!40000 ALTER TABLE `courier_wallets` DISABLE KEYS */;
/*!40000 ALTER TABLE `courier_wallets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `couriers`
--

DROP TABLE IF EXISTS `couriers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `couriers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `vehicle_type` enum('sepeda motor','mobil') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sepeda motor',
  `national_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_card_photo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` int DEFAULT '0',
  `birthplace` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `profile_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` enum('laki-laki','perempuan') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `driving_license_photo` text COLLATE utf8mb4_unicode_ci,
  `license_plate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_online` tinyint(1) NOT NULL DEFAULT '0',
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `couriers_user_id_foreign` (`user_id`),
  CONSTRAINT `couriers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `couriers`
--

LOCK TABLES `couriers` WRITE;
/*!40000 ALTER TABLE `couriers` DISABLE KEYS */;
/*!40000 ALTER TABLE `couriers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_addresses`
--

DROP TABLE IF EXISTS `customer_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_addresses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned NOT NULL,
  `address_label` enum('rumah','kantor','apartemen','kos','lainnya') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'rumah',
  `complete_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note_to_courier` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recipient_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_primary` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_addresses_customer_id_foreign` (`customer_id`),
  CONSTRAINT `customer_addresses_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_addresses`
--

LOCK TABLES `customer_addresses` WRITE;
/*!40000 ALTER TABLE `customer_addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `birthplace` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `profile_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` enum('laki-laki','perempuan') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customers_user_id_foreign` (`user_id`),
  CONSTRAINT `customers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expense_report_categories`
--

DROP TABLE IF EXISTS `expense_report_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense_report_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `merchant_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `expense_report_categories_merchant_id_foreign` (`merchant_id`),
  CONSTRAINT `expense_report_categories_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense_report_categories`
--

LOCK TABLES `expense_report_categories` WRITE;
/*!40000 ALTER TABLE `expense_report_categories` DISABLE KEYS */;
INSERT INTO `expense_report_categories` VALUES (1,1,'Bahan Baku','2025-06-20 08:30:36','2025-06-20 08:34:50'),(2,1,'Operasional','2025-06-20 08:30:42','2025-06-20 08:37:43'),(4,21,'Biaya Operasional','2025-08-10 15:34:47','2025-08-10 15:35:19'),(5,21,'Biaya Karyawan','2025-08-10 15:35:24','2025-08-10 15:35:24');
/*!40000 ALTER TABLE `expense_report_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expense_report_items`
--

DROP TABLE IF EXISTS `expense_report_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense_report_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `expense_report_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `amount` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `expense_report_items_expense_report_id_foreign` (`expense_report_id`),
  KEY `expense_report_items_category_id_foreign` (`category_id`),
  CONSTRAINT `expense_report_items_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `expense_report_categories` (`id`),
  CONSTRAINT `expense_report_items_expense_report_id_foreign` FOREIGN KEY (`expense_report_id`) REFERENCES `expense_reports` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense_report_items`
--

LOCK TABLES `expense_report_items` WRITE;
/*!40000 ALTER TABLE `expense_report_items` DISABLE KEYS */;
INSERT INTO `expense_report_items` VALUES (8,4,'Ayam 2 KG',4,'Beli Ayam di pasar',200000,'2025-08-10 15:36:17','2025-08-10 15:36:17'),(9,4,'Air Mineral 2 Dus',4,'Beli di pasar',50000,'2025-08-10 15:36:17','2025-08-10 15:36:17'),(10,5,'Test',1,'test',100000,'2025-08-11 13:57:59','2025-08-11 13:57:59');
/*!40000 ALTER TABLE `expense_report_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expense_reports`
--

DROP TABLE IF EXISTS `expense_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense_reports` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `merchant_id` bigint unsigned NOT NULL,
  `report_date` date NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `total_expense` bigint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `expense_reports_merchant_id_foreign` (`merchant_id`),
  CONSTRAINT `expense_reports_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense_reports`
--

LOCK TABLES `expense_reports` WRITE;
/*!40000 ALTER TABLE `expense_reports` DISABLE KEYS */;
INSERT INTO `expense_reports` VALUES (4,21,'2025-08-10','Laporan Pengeluaran Minggu 10 Agustus 2025',250000,'2025-08-10 15:36:17','2025-08-10 15:36:17'),(5,1,'2025-08-09','Test',100000,'2025-08-11 13:57:59','2025-08-11 13:57:59');
/*!40000 ALTER TABLE `expense_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fees`
--

DROP TABLE IF EXISTS `fees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fees` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fees`
--

LOCK TABLES `fees` WRITE;
/*!40000 ALTER TABLE `fees` DISABLE KEYS */;
INSERT INTO `fees` VALUES (1,'delivery_fee',10000,'2025-06-19 21:06:49','2025-06-19 21:06:49'),(2,'application_service_fee',2000,'2025-06-19 21:06:49','2025-06-19 21:06:49');
/*!40000 ALTER TABLE `fees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_categories`
--

DROP TABLE IF EXISTS `menu_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `merchant_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `menu_categories_slug_unique` (`slug`),
  KEY `menu_categories_merchant_id_foreign` (`merchant_id`),
  CONSTRAINT `menu_categories_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_categories`
--

LOCK TABLES `menu_categories` WRITE;
/*!40000 ALTER TABLE `menu_categories` DISABLE KEYS */;
INSERT INTO `menu_categories` VALUES (1,'Nasi','nasi-1',1,'2025-06-19 19:53:09','2025-06-19 19:53:09',NULL),(2,'Daging','daging-1',1,'2025-06-19 19:53:13','2025-06-19 19:53:13',NULL),(3,'Minuman Dingin','minuman-dingin-1',1,'2025-06-19 19:53:19','2025-06-19 19:53:19',NULL),(4,'Minuman Hangat','minuman-hangat-1',1,'2025-06-19 19:53:24','2025-06-19 19:53:24',NULL),(5,'Berkuah','berkuah-1',1,'2025-06-19 19:53:45','2025-06-19 19:53:45',NULL),(6,'Test','test-1',1,'2025-07-04 03:19:06','2025-07-04 03:19:06',NULL),(7,'Nasi','nasi-20',20,'2025-08-05 13:39:42','2025-08-05 13:39:42',NULL),(8,'Daging','daging-20',20,'2025-08-05 13:39:46','2025-08-05 13:39:46',NULL),(9,'Mie','mie-20',20,'2025-08-05 13:39:48','2025-08-05 13:39:48',NULL),(10,'Minuman','minuman-20',20,'2025-08-05 13:39:53','2025-08-05 13:39:53',NULL),(11,'Makanan','makanan-20',20,'2025-08-05 13:43:04','2025-08-05 13:43:04',NULL),(12,'Makanan','makanan-21',21,'2025-08-05 13:53:42','2025-08-05 13:53:42',NULL),(13,'Minuman','minuman-21',21,'2025-08-05 13:53:46','2025-08-05 13:53:46',NULL);
/*!40000 ALTER TABLE `menu_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_item_reviews`
--

DROP TABLE IF EXISTS `menu_item_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_item_reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned NOT NULL,
  `transaction_id` bigint unsigned NOT NULL,
  `menu_item_id` bigint unsigned NOT NULL,
  `rating` tinyint NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_item_reviews_customer_id_foreign` (`customer_id`),
  KEY `menu_item_reviews_transaction_id_foreign` (`transaction_id`),
  KEY `menu_item_reviews_menu_item_id_foreign` (`menu_item_id`),
  CONSTRAINT `menu_item_reviews_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `menu_item_reviews_menu_item_id_foreign` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `menu_item_reviews_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_item_reviews`
--

LOCK TABLES `menu_item_reviews` WRITE;
/*!40000 ALTER TABLE `menu_item_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `menu_item_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `image_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('tersedia','habis') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'tersedia',
  `short_description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu_category_id` bigint unsigned NOT NULL,
  `merchant_id` bigint unsigned NOT NULL,
  `is_recommended` tinyint(1) NOT NULL DEFAULT '0',
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `menu_items_slug_unique` (`slug`),
  KEY `menu_items_menu_category_id_foreign` (`menu_category_id`),
  KEY `menu_items_merchant_id_foreign` (`merchant_id`),
  CONSTRAINT `menu_items_menu_category_id_foreign` FOREIGN KEY (`menu_category_id`) REFERENCES `menu_categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `menu_items_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (1,'Nasi Goreng Biasa',13000,'/storage/merchant_assets/menu/1750337668_nasi-goreng.png','tersedia','Nasi goreng dengan sayur sawi',1,1,0,'nasi-goreng-biasa-1','2025-06-19 19:54:28','2025-06-19 19:54:28',NULL),(2,'Nasi Goreng Sedang',15000,'/storage/merchant_assets/menu/1750337771_nasi-goreng-sedang.png','tersedia','Nasi goreng dengan ayam suir',1,1,0,'nasi-goreng-sedang-1','2025-06-19 19:56:11','2025-06-19 19:56:11',NULL),(3,'Nasi Goreng Jumbo',17000,'/storage/merchant_assets/menu/1750337796_nasi-goreng-jumbo.jpg','tersedia','Nasi goreng dengan telur dadar',1,1,1,'nasi-goreng-jumbo','2025-06-19 19:56:36','2025-06-19 19:56:44',NULL),(4,'Bakso Biasa',15000,'/storage/merchant_assets/menu/1750337916_bakso-biasa.png','tersedia','Bakso daging sapi',2,1,0,'bakso-biasa-1','2025-06-19 19:58:36','2025-06-19 19:58:36',NULL),(5,'Bakso Sedang',20000,'/storage/merchant_assets/menu/1750337944_bakso-sedang.png','tersedia','Bakso daging dengan telur',2,1,1,'bakso-sedang','2025-06-19 19:59:04','2025-08-05 14:08:20',NULL),(6,'Bakso Jumbo',25000,'/storage/merchant_assets/menu/1750337974_bakso-jumbo.jpg','tersedia','Bakso dengan kuah pedas',2,1,1,'bakso-jumbo-1','2025-06-19 19:59:34','2025-08-13 07:00:52',NULL),(7,'Teh Es',5000,'/storage/merchant_assets/menu/1754401229_teh-es.jpg','tersedia','Teh Es Manis',10,20,0,'teh-es-20','2025-08-05 13:40:29','2025-08-05 13:40:29',NULL),(8,'Soto',15000,'/storage/merchant_assets/menu/1754401408_soto.jpg','tersedia','Soto dengan daging ayam segar',11,20,0,'soto-20','2025-08-05 13:43:28','2025-08-05 13:43:28',NULL),(9,'Pecel Lele',20000,'/storage/merchant_assets/menu/1754401457_pecel-lele.jpeg','tersedia','Pecel Lele dengan cabe nikmat',11,20,0,'pecel-lele-20','2025-08-05 13:44:17','2025-08-05 13:44:17',NULL),(10,'Nasi Ikan',20000,'/storage/merchant_assets/menu/1754401490_nasi-ikan.jpg','tersedia','Nasi dengan ikan gurame',7,20,1,'nasi-ikan-20','2025-08-05 13:44:50','2025-08-05 13:44:50',NULL),(11,'Bakso Jumbo',25000,'/storage/merchant_assets/menu/1754401523_bakso-jumbo.jpg','tersedia','Bakso dengan daging sapi',8,20,0,'bakso-jumbo-20','2025-08-05 13:45:23','2025-08-05 13:45:23',NULL),(12,'Teh Es',5000,'/storage/merchant_assets/menu/1754402042_teh-es.jpg','tersedia','Teh es manis',13,21,0,'teh-es-21','2025-08-05 13:54:02','2025-08-05 13:54:02',NULL),(13,'Bakso Jumbo',26000,'/storage/merchant_assets/menu/1754402070_bakso-jumbo.jpg','tersedia','Bakso dengan daging sapi',12,21,0,'bakso-jumbo-21','2025-08-05 13:54:30','2025-08-05 13:54:30',NULL);
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merchant_reviews`
--

DROP TABLE IF EXISTS `merchant_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `merchant_reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned NOT NULL,
  `merchant_id` bigint unsigned NOT NULL,
  `rating` tinyint NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `merchant_reviews_customer_id_foreign` (`customer_id`),
  KEY `merchant_reviews_merchant_id_foreign` (`merchant_id`),
  CONSTRAINT `merchant_reviews_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `merchant_reviews_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_reviews`
--

LOCK TABLES `merchant_reviews` WRITE;
/*!40000 ALTER TABLE `merchant_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `merchant_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merchant_wallets`
--

DROP TABLE IF EXISTS `merchant_wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `merchant_wallets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `merchant_id` bigint unsigned NOT NULL,
  `balance` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `merchant_wallets_merchant_id_foreign` (`merchant_id`),
  CONSTRAINT `merchant_wallets_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_wallets`
--

LOCK TABLES `merchant_wallets` WRITE;
/*!40000 ALTER TABLE `merchant_wallets` DISABLE KEYS */;
INSERT INTO `merchant_wallets` VALUES (3,21,124000,'2025-08-10 15:06:26','2025-08-10 15:15:25'),(4,1,267000,'2025-08-11 06:45:34','2025-08-13 06:16:09');
/*!40000 ALTER TABLE `merchant_wallets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merchants`
--

DROP TABLE IF EXISTS `merchants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `merchants` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `id_card_photo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `business_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `business_phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `business_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `business_description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `business_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `business_category_id` bigint unsigned NOT NULL,
  `bank_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bank_account_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bank_account_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tax_identification_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `merchants_slug_unique` (`slug`),
  KEY `merchants_user_id_foreign` (`user_id`),
  KEY `merchants_business_category_id_foreign` (`business_category_id`),
  CONSTRAINT `merchants_business_category_id_foreign` FOREIGN KEY (`business_category_id`) REFERENCES `business_categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `merchants_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchants`
--

LOCK TABLES `merchants` WRITE;
/*!40000 ALTER TABLE `merchants` DISABLE KEYS */;
INSERT INTO `merchants` VALUES (1,2,'/storage/merchant_assets/id_card_photo/1750322668_KTP.jpeg','Rumah Makan Thomas','082252648921','tomasalberto527@gmail.com','78711','Rumah makan murah meriah yang ada di pontianak','Jl.Purnama',1,'014-BANK BCA (BANK CENTRAL ASIA)','7876123','Thomas','0','rumah-makan-thomas',1,'2025-06-19 15:44:28','2025-06-19 15:44:28',NULL),(20,31,'/storage/merchant_assets/id_card_photo/1750322668_KTP.jpeg','Rumah Makan Sederhana','08702618123','sederhana@example.com','40123','Rumah makan yang menyajikan hidangan lezat dan harga terjangkau.','Jl. Contoh Alamat No. 123, Jakarta',1,'014','1234567890','Rumah Makan Sederhana','9876543210','rumah-makan-sederhana',1,'2025-08-05 13:27:35','2025-08-05 13:27:35',NULL),(21,32,'/storage/merchant_assets/id_card_photo/1750322668_KTP.jpeg','Warung Nasi Padang Maknyus','08691781318','nasipadang@example.com','40123','Rumah makan yang menyajikan hidangan lezat dan harga terjangkau.','Jl. Contoh Alamat No. 123, Jakarta',1,'014','1234567890','Warung Nasi Padang Maknyus','9876543210','warung-nasi-padang-maknyus',1,'2025-08-05 13:27:36','2025-08-05 13:27:36',NULL);
/*!40000 ALTER TABLE `merchants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'2021_08_08_100000_create_banks_tables',1),(4,'2025_03_19_031604_create_permission_tables',1),(5,'2025_05_04_024753_create_business_categories_table',1),(6,'2025_05_05_035256_create_merchants_table',1),(7,'2025_05_05_053118_create_customers_table',1),(8,'2025_05_08_015830_create_menu_categories_table',1),(9,'2025_05_08_092235_create_menu_items_table',1),(10,'2025_05_09_014442_create_store_profiles_table',1),(11,'2025_05_09_140121_create_store_galleries_table',1),(12,'2025_05_10_023321_create_store_operating_hours_table',1),(13,'2025_05_11_154128_create_wishlists_table',1),(14,'2025_05_13_060118_create_carts_table',1),(15,'2025_05_14_015445_create_customer_addresses_table',1),(16,'2025_05_14_103931_create_coupons_table',1),(17,'2025_05_16_082301_create_tables_table',1),(18,'2025_05_17_033130_create_transactions_table',1),(19,'2025_05_17_033142_create_transaction_items_table',1),(20,'2025_05_17_041136_create_fees_table',1),(21,'2025_05_21_131544_create_order_statuses_table',1),(22,'2025_05_27_025710_create_revenue_reports_table',1),(23,'2025_05_27_131823_create_expense_report_categories_table',1),(24,'2025_05_27_135026_create_expense_reports_table',1),(25,'2025_05_27_135031_create_expense_report_items_table',1),(26,'2025_05_29_043124_create_profit_reports_table',1),(27,'2025_05_31_103433_create_couriers_table',1),(28,'2025_06_01_215743_create_courier_assignments_table',1),(29,'2025_06_01_221637_create_courier_wallets_table',1),(30,'2025_06_02_205926_create_courier_assignment_rejections_table',1),(31,'2025_06_03_205007_create_courier_wallet_histories_table',1),(32,'2025_06_03_220205_create_withdraws_table',1),(33,'2025_06_04_101423_create_menu_item_reviews_table',1),(34,'2025_06_04_101440_create_merchant_reviews_table',1),(35,'2025_06_12_190433_create_merchant_wallets_table',1),(36,'2025_06_17_101105_create_jobs_table',1),(37,'2025_06_19_153855_disable_foreign_key_checks',1),(38,'2025_07_08_150632_add_google_id_to_users_table',2),(39,'2025_07_08_153225_make_password_nullable_in_users_table',3),(40,'2025_07_08_153358_make_phone_number_nullable_in_users_table',4);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

LOCK TABLES `model_has_permissions` WRITE;
/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
INSERT INTO `model_has_roles` VALUES (1,'App\\Models\\User',1),(3,'App\\Models\\User',2),(2,'App\\Models\\User',3),(4,'App\\Models\\User',4),(4,'App\\Models\\User',5),(2,'App\\Models\\User',6),(2,'App\\Models\\User',7),(2,'App\\Models\\User',8),(2,'App\\Models\\User',9),(3,'App\\Models\\User',11),(3,'App\\Models\\User',12),(3,'App\\Models\\User',13),(3,'App\\Models\\User',14),(3,'App\\Models\\User',15),(3,'App\\Models\\User',16),(3,'App\\Models\\User',17),(3,'App\\Models\\User',18),(3,'App\\Models\\User',19),(3,'App\\Models\\User',21),(3,'App\\Models\\User',22),(3,'App\\Models\\User',23),(3,'App\\Models\\User',24),(3,'App\\Models\\User',25),(3,'App\\Models\\User',26),(3,'App\\Models\\User',27),(3,'App\\Models\\User',28),(3,'App\\Models\\User',29),(3,'App\\Models\\User',31),(3,'App\\Models\\User',32),(3,'App\\Models\\User',33),(3,'App\\Models\\User',34),(3,'App\\Models\\User',35),(3,'App\\Models\\User',36),(3,'App\\Models\\User',37),(3,'App\\Models\\User',38),(3,'App\\Models\\User',39),(3,'App\\Models\\User',40),(4,'App\\Models\\User',41);
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_statuses`
--

DROP TABLE IF EXISTS `order_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_statuses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `transaction_id` bigint unsigned NOT NULL,
  `status` enum('menunggu','dikonfirmasi','diproses','siap diantar','siap disajikan','diantar','selesai') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_statuses_transaction_id_foreign` (`transaction_id`),
  CONSTRAINT `order_statuses_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=214 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_statuses`
--

LOCK TABLES `order_statuses` WRITE;
/*!40000 ALTER TABLE `order_statuses` DISABLE KEYS */;
INSERT INTO `order_statuses` VALUES (142,42,'menunggu','2025-08-10 15:03:56','2025-08-10 15:03:56'),(143,42,'dikonfirmasi','2025-08-10 15:04:25','2025-08-10 15:04:25'),(144,42,'diproses','2025-08-10 15:04:28','2025-08-10 15:04:28'),(145,42,'siap disajikan','2025-08-10 15:04:32','2025-08-10 15:04:32'),(146,42,'selesai','2025-08-10 15:04:34','2025-08-10 15:04:34'),(147,43,'menunggu','2025-08-10 15:06:15','2025-08-10 15:06:15'),(148,43,'dikonfirmasi','2025-08-10 15:06:40','2025-08-10 15:06:40'),(149,43,'diproses','2025-08-10 15:06:43','2025-08-10 15:06:43'),(150,43,'siap disajikan','2025-08-10 15:06:45','2025-08-10 15:06:45'),(151,43,'selesai','2025-08-10 15:06:47','2025-08-10 15:06:47'),(152,44,'menunggu','2025-08-10 15:09:37','2025-08-10 15:09:37'),(153,44,'dikonfirmasi','2025-08-10 15:10:00','2025-08-10 15:10:00'),(154,44,'diproses','2025-08-10 15:10:02','2025-08-10 15:10:02'),(155,44,'siap disajikan','2025-08-10 15:10:05','2025-08-10 15:10:05'),(156,44,'selesai','2025-08-10 15:10:07','2025-08-10 15:10:07'),(157,45,'menunggu','2025-08-10 15:12:45','2025-08-10 15:12:45'),(158,46,'menunggu','2025-08-10 15:13:27','2025-08-10 15:13:27'),(159,47,'menunggu','2025-08-10 15:13:53','2025-08-10 15:13:53'),(160,48,'menunggu','2025-08-10 15:14:44','2025-08-10 15:14:44'),(161,49,'menunggu','2025-08-10 15:15:16','2025-08-10 15:15:16'),(162,45,'dikonfirmasi','2025-08-10 15:15:49','2025-08-10 15:15:49'),(163,45,'diproses','2025-08-10 15:15:52','2025-08-10 15:15:52'),(164,45,'siap disajikan','2025-08-10 15:15:54','2025-08-10 15:15:54'),(165,45,'selesai','2025-08-10 15:15:56','2025-08-10 15:15:56'),(166,47,'dikonfirmasi','2025-08-10 15:21:03','2025-08-10 15:21:03'),(167,47,'diproses','2025-08-10 15:21:06','2025-08-10 15:21:06'),(168,47,'siap diantar','2025-08-10 15:21:45','2025-08-10 15:21:45'),(169,47,'selesai','2025-08-10 15:22:05','2025-08-10 15:22:05'),(170,46,'dikonfirmasi','2025-08-10 15:23:01','2025-08-10 15:23:01'),(171,46,'diproses','2025-08-10 15:23:03','2025-08-10 15:23:03'),(172,46,'siap diantar','2025-08-10 15:23:12','2025-08-10 15:23:12'),(173,46,'selesai','2025-08-10 15:23:36','2025-08-10 15:23:36'),(174,48,'dikonfirmasi','2025-08-10 15:25:41','2025-08-10 15:25:41'),(175,48,'diproses','2025-08-10 15:25:43','2025-08-10 15:25:43'),(176,48,'siap disajikan','2025-08-10 15:25:45','2025-08-10 15:25:45'),(177,48,'selesai','2025-08-10 15:25:48','2025-08-10 15:25:48'),(178,49,'dikonfirmasi','2025-08-10 15:25:54','2025-08-10 15:25:54'),(179,49,'diproses','2025-08-10 15:26:02','2025-08-10 15:26:02'),(180,49,'siap disajikan','2025-08-10 15:26:04','2025-08-10 15:26:04'),(181,49,'selesai','2025-08-10 15:26:06','2025-08-10 15:26:06'),(184,52,'menunggu','2025-08-11 06:45:20','2025-08-11 06:45:20'),(185,52,'dikonfirmasi','2025-08-11 06:46:57','2025-08-11 06:46:57'),(186,52,'diproses','2025-08-11 06:46:59','2025-08-11 06:46:59'),(187,52,'siap disajikan','2025-08-11 06:47:01','2025-08-11 06:47:01'),(188,52,'selesai','2025-08-11 06:47:04','2025-08-11 06:47:04'),(189,53,'menunggu','2025-08-11 13:55:35','2025-08-11 13:55:35'),(190,53,'dikonfirmasi','2025-08-11 13:56:58','2025-08-11 13:56:58'),(191,53,'diproses','2025-08-11 13:57:00','2025-08-11 13:57:00'),(192,53,'siap disajikan','2025-08-11 13:57:02','2025-08-11 13:57:02'),(193,53,'selesai','2025-08-11 13:57:04','2025-08-11 13:57:04'),(194,54,'menunggu','2025-08-12 14:28:00','2025-08-12 14:28:00'),(195,54,'dikonfirmasi','2025-08-12 14:28:44','2025-08-12 14:28:44'),(196,54,'diproses','2025-08-12 14:28:46','2025-08-12 14:28:46'),(197,54,'siap disajikan','2025-08-12 14:28:49','2025-08-12 14:28:49'),(198,54,'selesai','2025-08-12 14:28:51','2025-08-12 14:28:51'),(199,55,'menunggu','2025-08-13 05:42:59','2025-08-13 05:42:59'),(200,55,'dikonfirmasi','2025-08-13 05:43:35','2025-08-13 05:43:35'),(201,55,'diproses','2025-08-13 05:43:37','2025-08-13 05:43:37'),(202,55,'siap disajikan','2025-08-13 05:43:39','2025-08-13 05:43:39'),(203,55,'selesai','2025-08-13 05:43:41','2025-08-13 05:43:41'),(204,56,'menunggu','2025-08-13 06:12:30','2025-08-13 06:12:30'),(205,56,'dikonfirmasi','2025-08-13 06:13:58','2025-08-13 06:13:58'),(206,56,'diproses','2025-08-13 06:14:00','2025-08-13 06:14:00'),(207,56,'siap disajikan','2025-08-13 06:14:02','2025-08-13 06:14:02'),(208,56,'selesai','2025-08-13 06:14:05','2025-08-13 06:14:05'),(209,57,'menunggu','2025-08-13 06:15:58','2025-08-13 06:15:58'),(210,57,'dikonfirmasi','2025-08-13 06:17:24','2025-08-13 06:17:24'),(211,57,'diproses','2025-08-13 06:17:26','2025-08-13 06:17:26'),(212,57,'siap diantar','2025-08-13 06:17:33','2025-08-13 06:17:33'),(213,57,'selesai','2025-08-13 06:17:45','2025-08-13 06:17:45');
/*!40000 ALTER TABLE `order_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profit_reports`
--

DROP TABLE IF EXISTS `profit_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profit_reports` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `merchant_id` bigint unsigned NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `report_type` enum('harian','mingguan','bulanan','custom') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'harian',
  `total_revenue` bigint NOT NULL,
  `total_expense` bigint NOT NULL,
  `gross_profit` bigint NOT NULL,
  `net_profit` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profit_reports_merchant_id_foreign` (`merchant_id`),
  CONSTRAINT `profit_reports_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profit_reports`
--

LOCK TABLES `profit_reports` WRITE;
/*!40000 ALTER TABLE `profit_reports` DISABLE KEYS */;
INSERT INTO `profit_reports` VALUES (16,1,'2025-08-11','2025-08-11','harian',75000,0,75000,75000,'2025-08-11 13:58:23','2025-08-11 13:58:23'),(17,1,'2025-08-13','2025-08-13','harian',19000,0,19000,19000,'2025-08-13 05:43:54','2025-08-13 05:43:54'),(18,1,'2025-08-09','2025-08-10','custom',0,100000,0,-100000,'2025-08-13 06:55:34','2025-08-13 06:55:34');
/*!40000 ALTER TABLE `profit_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revenue_reports`
--

DROP TABLE IF EXISTS `revenue_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revenue_reports` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `merchant_id` bigint unsigned NOT NULL,
  `report_date` date NOT NULL,
  `report_type` enum('harian','mingguan','bulanan','custom') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'harian',
  `total_transaction` int NOT NULL,
  `total_revenue` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `revenue_reports_merchant_id_foreign` (`merchant_id`),
  CONSTRAINT `revenue_reports_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revenue_reports`
--

LOCK TABLES `revenue_reports` WRITE;
/*!40000 ALTER TABLE `revenue_reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `revenue_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','web','2025-06-19 15:42:52','2025-06-19 15:42:52'),(2,'customer','web','2025-06-19 15:42:52','2025-06-19 15:42:52'),(3,'merchant','web','2025-06-19 15:42:52','2025-06-19 15:42:52'),(4,'courier','web','2025-06-19 15:42:52','2025-06-19 15:42:52');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('0lfuOaIWL1FgNng70WFlB35zEczCoY45iUsccuOn',9,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoicEYycnMwcmZzNXNiOWlGMVpVeVV0VzUxaHh2cmVyV3JZNjIxcFYwSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZGRyZXNzLWxpc3QvZWRpdC9udWxsIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1OiJzdGF0ZSI7czo0MDoiajNmNFJ4UWpMNzVORkNZS1hkN2tKTDRJTHdGb1B6ZE55clF2cm52ciI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6OTt9',1755067719),('3LrvVii5hQYShQRgzrnt3r0uQv76FTOUzvYE0ibP',4,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoieVJ2amtjZDg3OEVCZk5KOWV3TmZCTndpbE9lSFpHdVR4am4yWGJ5WSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NjQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9jb3VyaWVyL215LWRlbGl2ZXJpZXMvVFJTQy0yMDI1MDgxMy04VEdUUVIiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aTo0O30=',1755065867),('c9jK2tnjUblJqNIlEK2bZzysMcjOWLzhy79LRY4D',2,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiQlFoMlh5cVdDVTRjb3Zjb1JCWHZROEw0NFhLWURiRXZYbWR1alVIeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjI7fQ==',1756040843),('HltfVzeku5g4jGtYB7SQaZiGC3LTutLb5QP2co8p',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiN0JwVmRjbXR0TUtxN1pIZ2JndjhCd0NVMEdCRm4yU29OMzhLa1JwMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1767017566),('JOU8Os2y9xyufQ0C1Pvsee1T6lzY9ocmTH9XdCWg',9,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiVjBPMmZtSzgwZ3FjUHFZUWNBbTZvekV6S28zdmFxRlJ4bXBiMktySyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6OTtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyMToiaHR0cDovLzEyNy4wLjAuMTo4MDAwIjt9fQ==',1755067979),('JTZ09Q9Eu9a9qKRS8m9gY4VSmdneozSkBU22V6CW',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVVZDM0FEdWllaERyN0E3MHRpaXZ1bkg1N0F1dTh2dHY1OWFzRWpldyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzQ6Imh0dHA6Ly9lMWMzNTc4NTJiMzgubmdyb2stZnJlZS5hcHAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1758168931),('lXVuA7vamSZYU2G5JTjNLDMMJud1oTF26G0rgJaY',NULL,'192.168.10.1','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiSGtRVjdPcFlkUG4zMjhsU2VFT01BbDBEcmsyeDY1Wlg3N1dLdGN1aSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHA6Ly8xOTIuMTY4LjEwLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1756022098),('mKEl74NpsBtBYA8v2YBJOgHbxf5pnhOT64VtDdjQ',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiN1M0bG9BZTBWOUlDU0JjeXRnVE5JZHg1QlVic012bjFVeDZiaXFNRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1758169188),('QFDSVJDSfVvRMtDXRp41iRcmeSH4kJ9NBBRTZ4Sg',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ2FiSW45cnpRdTBOMVhQaVpwamFTbmx6UGxFRTI3T1NCOVlDbFB5QiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1758169331),('sdl19emoUDCc3jN52pyitX9VBLuSgsx0jEZcZnoO',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWVVOc0N0Z2ZqOWx1M0tNSG8zTGNVTFpOdXRWQklVTUZKeE1FWEIwMCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1758169188),('sLZOGZf0L4H0EaTJnRTS7xKSoRqDIR4FM6q0ojPs',2,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoibkp6eTUyZUxzaUkxS2swaFBsdTBTOWF6aE5ISzZrMDBnalZlUmx5biI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MjtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo3NjoiaHR0cDovLzEyNy4wLjAuMTo4MDAwL21lcmNoYW50L3N0b3JlLW1hbmFnZW1lbnQvc3RvcmUtcHJvZmlsZS9lZGl0L3VuZGVmaW5lZCI7fX0=',1755068452);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_galleries`
--

DROP TABLE IF EXISTS `store_galleries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_galleries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `image_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `merchant_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `store_galleries_merchant_id_foreign` (`merchant_id`),
  CONSTRAINT `store_galleries_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_galleries`
--

LOCK TABLES `store_galleries` WRITE;
/*!40000 ALTER TABLE `store_galleries` DISABLE KEYS */;
INSERT INTO `store_galleries` VALUES (1,'/storage/merchant_assets/store_gallery/1750338091_ian-dooley-TLD6iCOlyb0-unsplash.jpg',1,'2025-06-19 20:01:31','2025-06-19 20:01:31',NULL),(2,'/storage/merchant_assets/store_gallery/1750338099_anna-pelzer-IGfIGP5ONV0-unsplash.jpg',1,'2025-06-19 20:01:39','2025-06-19 20:01:39',NULL),(3,'/storage/merchant_assets/store_gallery/1750338107_eiliv-aceron-ZuIDLSz3XLg-unsplash.jpg',1,'2025-06-19 20:01:47','2025-06-19 20:01:47',NULL),(4,'/storage/merchant_assets/store_gallery/1750338116_eaters-collective-12eHC6FxPyg-unsplash.jpg',1,'2025-06-19 20:01:56','2025-06-19 20:01:56',NULL),(5,'/storage/merchant_assets/store_gallery/1750338124_odiseo-castrejon-1SPu0KT-Ejg-unsplash.jpg',1,'2025-06-19 20:02:04','2025-06-19 20:02:04',NULL),(6,'/storage/merchant_assets/store_gallery/1754401599_ian-dooley-TLD6iCOlyb0-unsplash.jpg',20,'2025-08-05 13:46:39','2025-08-05 13:46:39',NULL),(7,'/storage/merchant_assets/store_gallery/1754401605_anna-pelzer-IGfIGP5ONV0-unsplash.jpg',20,'2025-08-05 13:46:45','2025-08-05 13:46:45',NULL),(8,'/storage/merchant_assets/store_gallery/1754401611_eiliv-aceron-ZuIDLSz3XLg-unsplash.jpg',20,'2025-08-05 13:46:51','2025-08-05 13:46:51',NULL),(9,'/storage/merchant_assets/store_gallery/1754401618_eaters-collective-12eHC6FxPyg-unsplash.jpg',20,'2025-08-05 13:46:58','2025-08-05 13:46:58',NULL),(10,'/storage/merchant_assets/store_gallery/1754401624_odiseo-castrejon-1SPu0KT-Ejg-unsplash.jpg',20,'2025-08-05 13:47:04','2025-08-05 13:47:04',NULL),(11,'/storage/merchant_assets/store_gallery/1754402290_ian-dooley-TLD6iCOlyb0-unsplash.jpg',21,'2025-08-05 13:58:10','2025-08-05 13:58:10',NULL),(12,'/storage/merchant_assets/store_gallery/1754402307_anna-pelzer-IGfIGP5ONV0-unsplash.jpg',21,'2025-08-05 13:58:27','2025-08-05 13:58:27',NULL),(13,'/storage/merchant_assets/store_gallery/1754402321_eiliv-aceron-ZuIDLSz3XLg-unsplash.jpg',21,'2025-08-05 13:58:41','2025-08-05 13:58:41',NULL);
/*!40000 ALTER TABLE `store_galleries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_operating_hours`
--

DROP TABLE IF EXISTS `store_operating_hours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_operating_hours` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `merchant_id` bigint unsigned NOT NULL,
  `day` enum('MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY') COLLATE utf8mb4_unicode_ci NOT NULL,
  `open_time` time NOT NULL,
  `close_time` time NOT NULL,
  `is_closed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `store_operating_hours_merchant_id_foreign` (`merchant_id`),
  CONSTRAINT `store_operating_hours_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_operating_hours`
--

LOCK TABLES `store_operating_hours` WRITE;
/*!40000 ALTER TABLE `store_operating_hours` DISABLE KEYS */;
INSERT INTO `store_operating_hours` VALUES (1,1,'SUNDAY','08:00:00','22:00:00',0,'2025-06-19 20:02:36','2025-06-19 20:02:36'),(2,1,'MONDAY','08:00:00','22:00:00',0,'2025-06-19 20:02:36','2025-06-19 20:02:36'),(3,1,'TUESDAY','08:00:00','22:00:00',0,'2025-06-19 20:02:36','2025-06-19 20:02:36'),(4,1,'WEDNESDAY','08:00:00','22:00:00',0,'2025-06-19 20:02:36','2025-06-19 20:02:36'),(5,1,'THURSDAY','08:00:00','17:00:00',0,'2025-06-19 20:02:36','2025-06-19 20:02:36'),(6,1,'FRIDAY','08:00:00','22:00:00',0,'2025-06-19 20:02:36','2025-06-19 20:02:36'),(7,1,'SATURDAY','08:00:00','22:00:00',0,'2025-06-19 20:02:36','2025-06-19 20:02:36'),(8,20,'SUNDAY','08:00:00','17:00:00',0,'2025-08-05 13:47:18','2025-08-05 13:47:18'),(9,20,'MONDAY','08:00:00','17:00:00',0,'2025-08-05 13:47:18','2025-08-05 13:47:18'),(10,20,'TUESDAY','08:00:00','17:00:00',0,'2025-08-05 13:47:18','2025-08-05 13:47:18'),(11,20,'WEDNESDAY','08:00:00','17:00:00',0,'2025-08-05 13:47:18','2025-08-05 13:47:18'),(12,20,'THURSDAY','08:00:00','17:00:00',0,'2025-08-05 13:47:18','2025-08-05 13:47:18'),(13,20,'FRIDAY','08:00:00','17:00:00',0,'2025-08-05 13:47:18','2025-08-05 13:47:18'),(14,20,'SATURDAY','08:00:00','17:00:00',0,'2025-08-05 13:47:18','2025-08-05 13:47:18'),(15,21,'SUNDAY','08:00:00','23:00:00',0,'2025-08-05 13:58:45','2025-08-05 14:00:52'),(16,21,'MONDAY','08:00:00','23:00:00',0,'2025-08-05 13:58:45','2025-08-05 14:00:52'),(17,21,'TUESDAY','08:00:00','23:00:00',0,'2025-08-05 13:58:45','2025-08-05 14:00:52'),(18,21,'WEDNESDAY','08:00:00','23:00:00',0,'2025-08-05 13:58:45','2025-08-05 14:00:52'),(19,21,'THURSDAY','08:00:00','23:00:00',0,'2025-08-05 13:58:45','2025-08-05 14:00:52'),(20,21,'FRIDAY','08:00:00','23:00:00',0,'2025-08-05 13:58:45','2025-08-05 14:00:52'),(21,21,'SATURDAY','08:00:00','23:00:00',0,'2025-08-05 13:58:45','2025-08-05 14:00:52');
/*!40000 ALTER TABLE `store_operating_hours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_profiles`
--

DROP TABLE IF EXISTS `store_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_profiles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `logo_photo` text COLLATE utf8mb4_unicode_ci,
  `cover_photo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `website_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tiktok_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` decimal(30,20) DEFAULT NULL,
  `longitude` decimal(30,20) DEFAULT NULL,
  `founded_year` int NOT NULL,
  `number_of_employees` int NOT NULL,
  `merchant_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `store_profiles_merchant_id_foreign` (`merchant_id`),
  CONSTRAINT `store_profiles_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_profiles`
--

LOCK TABLES `store_profiles` WRITE;
/*!40000 ALTER TABLE `store_profiles` DISABLE KEYS */;
INSERT INTO `store_profiles` VALUES (1,'/storage/store_logo_photo/logo_685409fb0aa33.png','/storage/store_cover_photo/cover_685409fb0ac5a.png','https://www.google.com/','https://www.instagram.com/','https://www.facebook.com/',NULL,'http://tiktok.com/','https://web.whatsapp.com/',51.50585765454760000000,-0.18299102783203000000,2015,10,1,'2025-06-19 20:00:43','2025-06-20 09:27:22'),(2,'/storage/store_logo_photo/logo_68920952ca77d.png','/storage/store_cover_photo/cover_68920952cdcbd.png','https://www.google.com/','https://www.instagram.com/','https://www.facebook.com/','https://x.com','http://tiktok.com/','https://web.whatsapp.com/',51.49891200625809000000,-0.16771316528320000000,2015,10,20,'2025-08-05 13:38:26','2025-08-05 13:38:26'),(3,'/storage/store_logo_photo/logo_68920ddcacb4e.png','/storage/store_cover_photo/cover_68920ddcad07b.png','https://www.google.com/','https://www.instagram.com/','https://www.facebook.com/','https://x.com','http://tiktok.com/','https://web.whatsapp.com/',51.49933946133652000000,-0.16616821289063000000,2016,20,21,'2025-08-05 13:57:48','2025-08-05 13:57:55');
/*!40000 ALTER TABLE `store_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tables` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `merchant_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` int NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tables_merchant_id_foreign` (`merchant_id`),
  CONSTRAINT `tables_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tables`
--

LOCK TABLES `tables` WRITE;
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
INSERT INTO `tables` VALUES (1,1,'1A',5,1,'2025-06-19 20:02:45','2025-06-19 20:02:45',NULL),(2,1,'1B',2,1,'2025-06-19 20:02:50','2025-06-19 20:02:50',NULL),(3,1,'1C',3,1,'2025-06-19 20:02:54','2025-06-19 20:02:54',NULL),(4,1,'1D',10,1,'2025-06-19 20:02:59','2025-06-19 20:02:59',NULL),(5,1,'2A',5,1,'2025-06-19 20:03:06','2025-06-19 20:03:06',NULL),(6,20,'1A',5,1,'2025-08-05 13:47:25','2025-08-05 13:47:25',NULL),(7,20,'1B',10,1,'2025-08-05 13:47:31','2025-08-05 13:47:31',NULL),(8,20,'1C',2,1,'2025-08-05 13:47:35','2025-08-05 13:47:35',NULL),(9,20,'1D',6,1,'2025-08-05 13:47:40','2025-08-05 13:47:40',NULL),(10,20,'1E',10,1,'2025-08-05 13:47:45','2025-08-05 13:47:45',NULL),(11,21,'1A',10,1,'2025-08-05 13:58:52','2025-08-05 13:58:52',NULL);
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_items`
--

DROP TABLE IF EXISTS `transaction_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `transaction_id` bigint unsigned NOT NULL,
  `menu_item_id` bigint unsigned NOT NULL,
  `menu_item_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `menu_item_price` int NOT NULL DEFAULT '0',
  `menu_item_image_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu_item_category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtotal` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `transaction_items_transaction_id_foreign` (`transaction_id`),
  CONSTRAINT `transaction_items_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_items`
--

LOCK TABLES `transaction_items` WRITE;
/*!40000 ALTER TABLE `transaction_items` DISABLE KEYS */;
INSERT INTO `transaction_items` VALUES (84,42,12,'Teh Es',5000,'/storage/merchant_assets/menu/1754402042_teh-es.jpg','Minuman',1,NULL,5000,'2025-08-10 15:03:16','2025-08-10 15:03:16'),(85,42,13,'Bakso Jumbo',26000,'/storage/merchant_assets/menu/1754402070_bakso-jumbo.jpg','Makanan',1,NULL,26000,'2025-08-10 15:03:16','2025-08-10 15:03:16'),(86,43,12,'Teh Es',5000,'/storage/merchant_assets/menu/1754402042_teh-es.jpg','Minuman',1,'Test',5000,'2025-08-10 15:05:49','2025-08-10 15:05:49'),(87,43,13,'Bakso Jumbo',26000,'/storage/merchant_assets/menu/1754402070_bakso-jumbo.jpg','Makanan',1,NULL,26000,'2025-08-10 15:05:49','2025-08-10 15:05:49'),(88,44,12,'Teh Es',5000,'/storage/merchant_assets/menu/1754402042_teh-es.jpg','Minuman',1,NULL,5000,'2025-08-10 15:08:49','2025-08-10 15:08:49'),(89,44,13,'Bakso Jumbo',26000,'/storage/merchant_assets/menu/1754402070_bakso-jumbo.jpg','Makanan',1,NULL,26000,'2025-08-10 15:08:49','2025-08-10 15:08:49'),(90,45,12,'Teh Es',5000,'/storage/merchant_assets/menu/1754402042_teh-es.jpg','Minuman',1,NULL,5000,'2025-08-10 15:12:25','2025-08-10 15:12:25'),(91,45,13,'Bakso Jumbo',26000,'/storage/merchant_assets/menu/1754402070_bakso-jumbo.jpg','Makanan',1,NULL,26000,'2025-08-10 15:12:25','2025-08-10 15:12:25'),(92,46,12,'Teh Es',5000,'/storage/merchant_assets/menu/1754402042_teh-es.jpg','Minuman',1,NULL,5000,'2025-08-10 15:13:09','2025-08-10 15:13:09'),(93,46,13,'Bakso Jumbo',26000,'/storage/merchant_assets/menu/1754402070_bakso-jumbo.jpg','Makanan',1,NULL,26000,'2025-08-10 15:13:09','2025-08-10 15:13:09'),(94,47,12,'Teh Es',5000,'/storage/merchant_assets/menu/1754402042_teh-es.jpg','Minuman',1,NULL,5000,'2025-08-10 15:13:38','2025-08-10 15:13:38'),(95,47,13,'Bakso Jumbo',26000,'/storage/merchant_assets/menu/1754402070_bakso-jumbo.jpg','Makanan',1,NULL,26000,'2025-08-10 15:13:38','2025-08-10 15:13:38'),(96,48,12,'Teh Es',5000,'/storage/merchant_assets/menu/1754402042_teh-es.jpg','Minuman',1,NULL,5000,'2025-08-10 15:14:20','2025-08-10 15:14:20'),(97,48,13,'Bakso Jumbo',26000,'/storage/merchant_assets/menu/1754402070_bakso-jumbo.jpg','Makanan',1,NULL,26000,'2025-08-10 15:14:20','2025-08-10 15:14:20'),(98,49,12,'Teh Es',5000,'/storage/merchant_assets/menu/1754402042_teh-es.jpg','Minuman',1,NULL,5000,'2025-08-10 15:14:56','2025-08-10 15:14:56'),(99,49,13,'Bakso Jumbo',26000,'/storage/merchant_assets/menu/1754402070_bakso-jumbo.jpg','Makanan',1,NULL,26000,'2025-08-10 15:14:56','2025-08-10 15:14:56'),(106,52,1,'Nasi Goreng Biasa',13000,'/storage/merchant_assets/menu/1750337668_nasi-goreng.png','Nasi',1,NULL,13000,'2025-08-11 06:45:02','2025-08-11 06:45:02'),(107,52,2,'Nasi Goreng Sedang',15000,'/storage/merchant_assets/menu/1750337771_nasi-goreng-sedang.png','Nasi',1,NULL,15000,'2025-08-11 06:45:02','2025-08-11 06:45:02'),(108,52,4,'Bakso Biasa',15000,'/storage/merchant_assets/menu/1750337916_bakso-biasa.png','Daging',1,NULL,15000,'2025-08-11 06:45:02','2025-08-11 06:45:02'),(109,53,1,'Nasi Goreng Biasa',13000,'/storage/merchant_assets/menu/1750337668_nasi-goreng.png','Nasi',1,NULL,13000,'2025-08-11 13:54:01','2025-08-11 13:54:01'),(110,53,2,'Nasi Goreng Sedang',15000,'/storage/merchant_assets/menu/1750337771_nasi-goreng-sedang.png','Nasi',1,NULL,15000,'2025-08-11 13:54:01','2025-08-11 13:54:01'),(111,54,3,'Nasi Goreng Jumbo',17000,'/storage/merchant_assets/menu/1750337796_nasi-goreng-jumbo.jpg','Nasi',5,NULL,85000,'2025-08-12 14:25:12','2025-08-12 14:25:12'),(112,55,3,'Nasi Goreng Jumbo',17000,'/storage/merchant_assets/menu/1750337796_nasi-goreng-jumbo.jpg','Nasi',1,NULL,17000,'2025-08-13 05:42:44','2025-08-13 05:42:44'),(113,56,3,'Nasi Goreng Jumbo',17000,'/storage/merchant_assets/menu/1750337796_nasi-goreng-jumbo.jpg','Nasi',1,NULL,17000,'2025-08-13 06:11:52','2025-08-13 06:11:52'),(114,56,5,'Bakso Sedang',20000,'/storage/merchant_assets/menu/1750337944_bakso-sedang.png','Daging',2,NULL,40000,'2025-08-13 06:11:52','2025-08-13 06:11:52'),(115,57,3,'Nasi Goreng Jumbo',17000,'/storage/merchant_assets/menu/1750337796_nasi-goreng-jumbo.jpg','Nasi',1,NULL,17000,'2025-08-13 06:15:35','2025-08-13 06:15:35'),(116,57,5,'Bakso Sedang',20000,'/storage/merchant_assets/menu/1750337944_bakso-sedang.png','Daging',1,NULL,20000,'2025-08-13 06:15:35','2025-08-13 06:15:35'),(117,58,7,'Teh Es',5000,'/storage/merchant_assets/menu/1754401229_teh-es.jpg','Minuman',2,NULL,10000,'2025-08-13 06:49:16','2025-08-13 06:49:16'),(118,59,1,'Nasi Goreng Biasa',13000,'/storage/merchant_assets/menu/1750337668_nasi-goreng.png','Nasi',1,NULL,13000,'2025-08-13 06:50:51','2025-08-13 06:50:51');
/*!40000 ALTER TABLE `transaction_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `transaction_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint unsigned DEFAULT NULL,
  `merchant_id` bigint unsigned DEFAULT NULL,
  `order_type` enum('makan di tempat','pesan lalu dibawa pulang','antar ke rumah','ambil di tempat') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_location` enum('di lokasi','di luar lokasi') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_method` enum('tunai','non tunai') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_status` enum('menunggu','dibayar','gagal','dibatalkan') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'menunggu',
  `payment_reference` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cash_received_amount` int NOT NULL DEFAULT '0',
  `change_amount` int NOT NULL DEFAULT '0',
  `customer_address_id` bigint unsigned DEFAULT NULL,
  `recipient_address_label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recipient_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recipient_phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recipient_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recipient_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delivery_note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dine_in_table_id` bigint unsigned DEFAULT NULL,
  `dine_in_table_label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `orderer_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `orderer_phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coupon_id` bigint unsigned DEFAULT NULL,
  `coupon_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coupon_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coupon_discount` int NOT NULL DEFAULT '0',
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtotal_transaction_item` int NOT NULL DEFAULT '0',
  `delivery_fee` int NOT NULL DEFAULT '0',
  `application_service_fee` int NOT NULL DEFAULT '0',
  `discount_total` int NOT NULL DEFAULT '0',
  `final_total` int NOT NULL DEFAULT '0',
  `checked_out_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `transactions_customer_id_foreign` (`customer_id`),
  KEY `transactions_merchant_id_foreign` (`merchant_id`),
  KEY `transactions_customer_address_id_foreign` (`customer_address_id`),
  KEY `transactions_dine_in_table_id_foreign` (`dine_in_table_id`),
  KEY `transactions_coupon_id_foreign` (`coupon_id`),
  CONSTRAINT `transactions_coupon_id_foreign` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE SET NULL,
  CONSTRAINT `transactions_customer_address_id_foreign` FOREIGN KEY (`customer_address_id`) REFERENCES `customer_addresses` (`id`) ON DELETE SET NULL,
  CONSTRAINT `transactions_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL,
  CONSTRAINT `transactions_dine_in_table_id_foreign` FOREIGN KEY (`dine_in_table_id`) REFERENCES `tables` (`id`) ON DELETE SET NULL,
  CONSTRAINT `transactions_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (42,'TRSC-20250810-Q5X4RZ',NULL,21,'makan di tempat','di lokasi','tunai','dibayar',NULL,33000,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,11,'1A','Thomas','082252648923',NULL,NULL,NULL,0,'MAKAN DI TEMPAT / TUNAI',31000,0,2000,0,33000,'2025-08-10 15:03:56','2025-08-10 15:03:16','2025-08-10 15:04:17',NULL),(43,'TRSC-20250810-KDXXNA',NULL,21,'makan di tempat','di lokasi','non tunai','dibayar','1703cce0-496c-422e-97e6-06a7bb2f6549',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,11,'1A','Thomas Alberto','082252648923',NULL,NULL,NULL,0,'MAKAN DI TEMPAT / NON-TUNAI',31000,0,2000,0,33000,'2025-08-10 15:06:26','2025-08-10 15:05:49','2025-08-10 15:06:26',NULL),(44,'TRSC-20250810-GKHBQV',NULL,21,'pesan lalu dibawa pulang','di lokasi','tunai','dibayar',NULL,50000,17000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Thomas Alberto','082252648923',NULL,NULL,NULL,0,'PESAN LALU DIBAWA PULANG / TUNAI',31000,0,2000,0,33000,'2025-08-10 15:09:37','2025-08-10 15:08:49','2025-08-10 15:09:58',NULL),(45,'TRSC-20250810-OF6JIJ',NULL,21,'pesan lalu dibawa pulang','di lokasi','non tunai','dibayar','06786db2-056b-4634-af60-0b640146b9b4',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Thomas Alberto','082252648923',NULL,NULL,NULL,0,'PESAN LALU DI BAWA PULANG / NON-TUNAI',31000,0,2000,0,33000,'2025-08-10 15:12:57','2025-08-10 15:12:25','2025-08-10 15:12:57',NULL),(46,'TRSC-20250810-EO1KVD',NULL,21,'antar ke rumah','di luar lokasi','tunai','dibayar',NULL,50000,7000,NULL,'rumah','Thomas','082252648923','thomasalberto456@gmail.com','Jalan Kom Yos Sudarso','Rumah Warna Merah',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,31000,10000,2000,0,43000,'2025-08-10 15:13:27','2025-08-10 15:13:09','2025-08-10 15:22:55',NULL),(47,'TRSC-20250810-PJQKT2',NULL,21,'antar ke rumah','di luar lokasi','non tunai','dibayar','e2a52c0c-3e88-4304-a6f5-71b93f552a18',0,0,NULL,'rumah','Thomas','082252648923','thomasalberto456@gmail.com','Jalan Kom Yos Sudarso','Rumah Warna Merah',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'ANTAR KE RUMAH / NON-TUNAI',31000,10000,2000,0,43000,'2025-08-10 15:14:04','2025-08-10 15:13:38','2025-08-10 15:14:04',NULL),(48,'TRSC-20250810-SGADDL',NULL,21,'ambil di tempat','di luar lokasi','tunai','dibayar',NULL,50000,17000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Thomas Alberto','082252648923',NULL,NULL,NULL,0,'AMBIL DI TEMPAT / TUNAI',31000,0,2000,0,33000,'2025-08-10 15:14:44','2025-08-10 15:14:20','2025-08-10 15:25:38',NULL),(49,'TRSC-20250810-JJO6LA',NULL,21,'ambil di tempat','di luar lokasi','non tunai','dibayar','1942feb0-aaa5-460d-9412-a6aa661c94ef',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Thomas Alberto','082252648923',NULL,NULL,NULL,0,'AMBIL DI TEMPAT / NON-TUNAI',31000,0,2000,0,33000,'2025-08-10 15:15:25','2025-08-10 15:14:56','2025-08-10 15:15:25',NULL),(52,'TRSC-20250811-1DWLSE',NULL,1,'makan di tempat','di lokasi','non tunai','dibayar','a6b6f95f-51b6-492b-9036-73a8ae74444b',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'1A','Thomas Alberto','08229875456',NULL,NULL,NULL,0,'MAKAN DI TEMPAT / NON-TUNAI',43000,0,2000,0,45000,'2025-08-11 06:45:34','2025-08-11 06:45:02','2025-08-11 06:45:34',NULL),(53,'TRSC-20250811-BKDCSL',NULL,1,'makan di tempat','di lokasi','non tunai','dibayar','83b6142b-9dff-489f-9256-c64653a91f3e',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'1A','Thomas','08255652345',NULL,NULL,NULL,0,'MAKAN DI TEMPAT / NON-TUNAI',28000,0,2000,0,30000,'2025-08-11 13:56:04','2025-08-11 13:54:01','2025-08-11 13:56:04',NULL),(54,'TRSC-20250812-9R5TM5',NULL,1,'makan di tempat','di lokasi','non tunai','dibayar','cd086cae-d11a-429d-90f7-876e6eb2ea62',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'1A','Thomas','0822526789823',NULL,NULL,NULL,0,'Test',85000,0,2000,0,87000,'2025-08-12 14:28:18','2025-08-12 14:25:12','2025-08-12 14:28:18',NULL),(55,'TRSC-20250813-SWQRTO',NULL,1,'makan di tempat','di lokasi','non tunai','dibayar','2aaace46-00d5-4847-93e1-98d0ea7656f9',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'1A','Thomas Alberto','082252648923',NULL,NULL,NULL,0,'Test',17000,0,2000,0,19000,'2025-08-13 05:43:22','2025-08-13 05:42:44','2025-08-13 05:43:22',NULL),(56,'TRSC-20250813-EZGDXZ',NULL,1,'makan di tempat','di lokasi','non tunai','dibayar','4f8d57f2-f702-416a-b6f9-b732cc5bb305',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'1A','Thomas Alberto','082252648923',NULL,NULL,NULL,0,'Test',57000,0,2000,0,59000,'2025-08-13 06:12:56','2025-08-13 06:11:52','2025-08-13 06:12:56',NULL),(57,'TRSC-20250813-8TGTQR',NULL,1,'antar ke rumah','di luar lokasi','non tunai','dibayar','13f71bd4-6629-468b-93ea-9653529551ef',0,0,NULL,'rumah','Thomas','082252648923','thomasalberto456@gmail.com','Jalan Kom Yos Sudarso','Rumah Warna Merah',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'Test',37000,10000,2000,0,49000,'2025-08-13 06:16:09','2025-08-13 06:15:35','2025-08-13 06:16:09',NULL),(58,'TRSC-20250813-JXZ9YZ',NULL,20,NULL,NULL,NULL,'menunggu',NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,10000,0,2000,0,0,NULL,'2025-08-13 06:49:16','2025-08-13 06:49:16',NULL),(59,'TRSC-20250813-QSHIAX',NULL,1,NULL,NULL,NULL,'menunggu',NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,13000,0,2000,0,0,NULL,'2025-08-13 06:50:51','2025-08-13 06:50:51',NULL);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `google_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_phone_number_unique` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin Utama','admin@gmail.com',NULL,'2025-06-19 15:42:56','$2y$12$UUcrOP.D01cVZPYbbsVsUewMsdegPxjNp1y8spqUkyShDILh8sPOS','081234567890',NULL,'2025-06-19 15:42:57','2025-06-19 15:42:57',NULL),(2,'Thomas Alberto Ganteng','tomasalberto527@gmail.com',NULL,'2025-06-19 15:44:28','$2y$12$AGMNeBCtXBj9Cv3ZpD6b6etGfeSmDjWdZayKIA/0AB4BpSaceO2pW','082252648921',NULL,'2025-06-19 15:44:28','2025-06-19 20:11:55',NULL),(31,'Rumah Makan Sederhana','sederhana@example.com',NULL,'2025-08-05 13:27:35','$2y$12$43YTx25wOirqR12dQYLx9uqICCX7FWtAynGEPaWzFh1yAjJjtZdyW','08702618123',NULL,'2025-08-05 13:27:35','2025-08-05 13:27:35',NULL),(32,'Warung Nasi Padang Maknyus','nasipadang@example.com',NULL,'2025-08-05 13:27:36','$2y$12$1XJIhsPJHsBO2dwk..4X8ulLILjeet8XiD6ht6yFBfIt45D8dp.FK','08691781318',NULL,'2025-08-05 13:27:36','2025-08-05 13:27:36',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlists`
--

DROP TABLE IF EXISTS `wishlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlists` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned NOT NULL,
  `menu_item_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wishlists_customer_id_foreign` (`customer_id`),
  KEY `wishlists_menu_item_id_foreign` (`menu_item_id`),
  CONSTRAINT `wishlists_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `wishlists_menu_item_id_foreign` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlists`
--

LOCK TABLES `wishlists` WRITE;
/*!40000 ALTER TABLE `wishlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdraws`
--

DROP TABLE IF EXISTS `withdraws`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `withdraws` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `merchant_id` bigint unsigned DEFAULT NULL,
  `courier_id` bigint unsigned DEFAULT NULL,
  `withdraw_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int NOT NULL,
  `bank_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bank_account_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bank_account_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('menunggu','disetujui','ditolak','dibatalkan','ditransfer') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'menunggu',
  `note` text COLLATE utf8mb4_unicode_ci,
  `requested_at` timestamp NOT NULL,
  `approved_at` timestamp NULL DEFAULT NULL,
  `rejected_at` timestamp NULL DEFAULT NULL,
  `cancelled_at` timestamp NULL DEFAULT NULL,
  `transferred_at` timestamp NULL DEFAULT NULL,
  `transfer_proof` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `withdraws_withdraw_code_unique` (`withdraw_code`),
  KEY `withdraws_merchant_id_foreign` (`merchant_id`),
  KEY `withdraws_courier_id_foreign` (`courier_id`),
  CONSTRAINT `withdraws_courier_id_foreign` FOREIGN KEY (`courier_id`) REFERENCES `couriers` (`id`),
  CONSTRAINT `withdraws_merchant_id_foreign` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdraws`
--

LOCK TABLES `withdraws` WRITE;
/*!40000 ALTER TABLE `withdraws` DISABLE KEYS */;
/*!40000 ALTER TABLE `withdraws` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-31 12:00:42
