CREATE DATABASE  IF NOT EXISTS `car_service3` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `car_service3`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: car_service3
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` bigint NOT NULL,
  `company` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnihpy8cbpqh83bwo4jwd5kc4k` (`company`),
  CONSTRAINT `FKdmsfrfughyayx2lo3bxq0p4kv` FOREIGN KEY (`id`) REFERENCES `app_user` (`id`),
  CONSTRAINT `FKnihpy8cbpqh83bwo4jwd5kc4k` FOREIGN KEY (`company`) REFERENCES `company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (4,1);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_user`
--

DROP TABLE IF EXISTS `app_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_user` (
  `blocked` bit(1) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('CUSTOMER','WORKER','ADMIN') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `deleted` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_user`
--

LOCK TABLES `app_user` WRITE;
/*!40000 ALTER TABLE `app_user` DISABLE KEYS */;
INSERT INTO `app_user` VALUES (_binary '\0',1,'Marko','Markovic','$2a$10$l5O7w1gt6J3KdrVnt9hcvOgKj2miYvTktcmZpY6UAjuV7meztPOOG','CUSTOMER','marko',_binary '\0'),(_binary '\0',2,'Petar','Petrovic','$2a$10$NiAr/sBBig6VGnuVpl63m.RWPIvD4zrx9yWuObX.B0TVm3JNnm9eG','CUSTOMER','petar',_binary '\0'),(_binary '\0',3,'Jovan','Jovanovic','$2a$10$l5O7w1gt6J3KdrVnt9hcvOgKj2miYvTktcmZpY6UAjuV7meztPOOG','WORKER','jovan',_binary '\0'),(_binary '\0',4,'Admin','Admin','$2a$10$l5O7w1gt6J3KdrVnt9hcvOgKj2miYvTktcmZpY6UAjuV7meztPOOG','ADMIN','admin',_binary '\0'),(_binary '\0',6,'koja','kojic','$2a$10$TKIfmBnALzV8e9JRKZtmpe2NJMM9SlWQZiZH4DQZYFaPzwlqKKNYi','WORKER','koja.kojic',_binary '\0'),(_binary '\0',7,'novak','novakovic','$2a$10$QVeq.o7a5S69xSU62zLiWev5gkpBwqGV3HFZjPVkR0LbeEFHTfP46','WORKER','novak.novakovic',_binary '\0'),(_binary '\0',13,'Mihailo','Vasic','$2a$10$zOP4GiwW6Q93KiIYZmLdsu94TyYKTjIikEuoSvviQjjwVd0LQBWbC','CUSTOMER','mihailo',_binary '\0'),(_binary '\0',14,'Stefan','Stefanović','$2a$10$RsZy6M0r/TA.n7WXk8jqKeU87xTmQ5vmeIR6KbcKyo5/Bur1s6rKu','CUSTOMER','stefan',_binary '\0'),(_binary '\0',15,'Ljubinko','Zec','$2a$10$0JTB50VuHohBAcS87XBzcuiNT.IU0IOMFaeRnm5A9m36gb6Cz5Iu2','CUSTOMER','ljubinko',_binary '\0'),(_binary '\0',16,'testtest','adsfasg','$2a$10$l/nxxRm4iD9x4IQTwUNQEeuwj7ri7R7MHvjMBtx0wUHkWxfyZKAJi','CUSTOMER','testtest',_binary '\0'),(_binary '\0',17,'test1','test2','$2a$10$pr6GD44pK4a0sFA.whqadeZEt4NUIus2SkklZUtUkJcMWuN/f9Zmi','CUSTOMER','test1',_binary '\0');
/*!40000 ALTER TABLE `app_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `canceled` bit(1) NOT NULL,
  `first` bit(1) NOT NULL,
  `green_card` bit(1) NOT NULL,
  `new_plates` bit(1) NOT NULL,
  `owner_cert` bit(1) NOT NULL,
  `price` double NOT NULL,
  `reg_cert` bit(1) NOT NULL,
  `registration` bit(1) NOT NULL,
  `created` datetime(6) DEFAULT NULL,
  `ends_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `line` bigint NOT NULL,
  `starts_at` datetime(6) DEFAULT NULL,
  `vehicle` bigint NOT NULL,
  `status` enum('BOOKED','CANCELED','DONE') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4ud79xoyvvnumo62r09c1kaks` (`line`),
  KEY `FKc8gca462v4f2aq9il22eokwyt` (`vehicle`),
  CONSTRAINT `FK4ud79xoyvvnumo62r09c1kaks` FOREIGN KEY (`line`) REFERENCES `examination_line` (`id`),
  CONSTRAINT `FKc8gca462v4f2aq9il22eokwyt` FOREIGN KEY (`vehicle`) REFERENCES `vehicle` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (_binary '\0',_binary '\0',_binary '',_binary '',_binary '\0',1877.9299999999998,_binary '\0',_binary '','2024-01-30 22:23:44.464335','2024-02-06 07:30:00.000000',1,1,'2024-02-06 07:00:00.000000',1,'DONE'),(_binary '\0',_binary '\0',_binary '',_binary '',_binary '\0',881.14,_binary '\0',_binary '','2024-01-30 22:24:08.420141','2024-02-06 07:20:00.000000',2,2,'2024-02-06 07:00:00.000000',2,'DONE'),(_binary '',_binary '',_binary '',_binary '',_binary '',4116.17,_binary '',_binary '','2024-01-30 22:24:51.126118','2024-02-28 11:00:00.000000',3,4,'2024-02-28 10:00:00.000000',3,'CANCELED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',1504.37,_binary '\0',_binary '','2024-02-05 21:10:38.223033','2024-02-06 07:30:00.000000',4,3,'2024-02-06 07:00:00.000000',1,'DONE'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',1504.37,_binary '\0',_binary '','2024-02-05 21:10:41.366153','2024-02-06 08:00:00.000000',5,1,'2024-02-06 07:30:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',1504.37,_binary '\0',_binary '','2024-02-05 21:14:21.175586','2024-02-06 08:00:00.000000',6,2,'2024-02-06 07:30:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '',_binary '\0',_binary '',1513.37,_binary '\0',_binary '','2024-02-05 21:14:24.636329','2024-02-06 08:00:00.000000',7,3,'2024-02-06 07:30:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',1504.37,_binary '\0',_binary '','2024-02-05 22:15:31.092352','2024-02-21 07:30:00.000000',8,1,'2024-02-21 07:00:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',1504.37,_binary '\0',_binary '','2024-02-05 22:17:57.641943','2024-02-06 08:30:00.000000',9,1,'2024-02-06 08:00:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',1504.37,_binary '\0',_binary '','2024-02-05 22:17:57.932459','2024-02-06 08:30:00.000000',10,2,'2024-02-06 08:00:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-05 22:43:26.789742','2024-02-06 08:00:00.000000',11,1,'2024-02-06 07:30:00.000000',1,'CANCELED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',1504.37,_binary '\0',_binary '','2024-02-05 22:44:38.027948','2024-02-06 08:00:00.000000',12,1,'2024-02-06 07:30:00.000000',1,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-05 22:44:45.460481','2024-02-06 08:00:00.000000',13,2,'2024-02-06 07:30:00.000000',1,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',1504.37,_binary '\0',_binary '','2024-02-06 18:44:17.620399','2024-02-07 07:30:00.000000',14,1,'2024-02-07 07:00:00.000000',1,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 18:44:24.975647','2024-02-07 07:30:00.000000',15,2,'2024-02-07 07:00:00.000000',1,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 18:44:26.591407','2024-02-07 07:30:00.000000',16,3,'2024-02-07 07:00:00.000000',1,'BOOKED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 18:44:46.365537','2024-02-27 07:30:00.000000',17,1,'2024-02-27 07:00:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 18:44:47.774044','2024-02-27 07:30:00.000000',18,2,'2024-02-27 07:00:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 18:44:49.938787','2024-02-27 07:30:00.000000',19,3,'2024-02-27 07:00:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 18:45:33.367112','2024-02-20 07:30:00.000000',20,1,'2024-02-20 07:00:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:07:29.308080','2024-02-21 07:30:00.000000',21,1,'2024-02-21 07:00:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:07:30.753736','2024-02-21 07:30:00.000000',22,2,'2024-02-21 07:00:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:07:33.095927','2024-02-21 07:30:00.000000',23,3,'2024-02-21 07:00:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:07:34.740582','2024-02-21 08:00:00.000000',24,1,'2024-02-21 07:30:00.000000',1,'CANCELED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:10:40.335759','2024-02-16 07:30:00.000000',25,1,'2024-02-16 07:00:00.000000',1,'DONE'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:10:43.451999','2024-02-16 07:30:00.000000',26,2,'2024-02-16 07:00:00.000000',1,'DONE'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:10:45.478403','2024-02-16 07:30:00.000000',27,3,'2024-02-16 07:00:00.000000',1,'DONE'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:10:47.757824','2024-02-16 08:00:00.000000',28,1,'2024-02-16 07:30:00.000000',1,'DONE'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:10:49.658182','2024-02-16 08:00:00.000000',29,2,'2024-02-16 07:30:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:10:51.547541','2024-02-16 08:00:00.000000',30,3,'2024-02-16 07:30:00.000000',1,'CANCELED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:33:28.148033','2024-02-28 07:30:00.000000',31,1,'2024-02-28 07:00:00.000000',1,'BOOKED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:33:29.761796','2024-02-28 07:30:00.000000',32,2,'2024-02-28 07:00:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:33:31.155978','2024-02-28 07:30:00.000000',33,3,'2024-02-28 07:00:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:33:32.678828','2024-02-28 08:00:00.000000',34,1,'2024-02-28 07:30:00.000000',1,'CANCELED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:38:00.864744','2024-02-16 08:00:00.000000',35,2,'2024-02-16 07:30:00.000000',1,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 19:38:02.856527','2024-02-16 08:00:00.000000',36,3,'2024-02-16 07:30:00.000000',1,'BOOKED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',101.16,_binary '\0',_binary '\0','2024-02-06 19:38:07.367194','2024-02-16 09:00:00.000000',37,1,'2024-02-16 08:00:00.000000',3,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',32.33,_binary '\0',_binary '\0','2024-02-06 19:38:14.413794','2024-02-16 08:20:00.000000',38,2,'2024-02-16 08:00:00.000000',2,'CANCELED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 20:23:10.842916','2024-02-21 08:30:00.000000',39,11,'2024-02-21 08:00:00.000000',1,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',32.33,_binary '\0',_binary '\0','2024-02-06 20:23:28.613592','2024-02-21 07:20:00.000000',40,13,'2024-02-21 07:00:00.000000',2,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-06 20:40:44.048515','2024-02-15 07:30:00.000000',41,1,'2024-02-15 07:00:00.000000',1,'DONE'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',1504.37,_binary '\0',_binary '','2024-02-07 19:18:12.886108','2024-02-08 07:30:00.000000',42,1,'2024-02-08 07:00:00.000000',1,'DONE'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',857.14,_binary '\0',_binary '','2024-02-07 19:18:17.669996','2024-02-08 07:20:00.000000',43,2,'2024-02-08 07:00:00.000000',2,'DONE'),(_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '',65.83,_binary '',_binary '\0','2024-02-07 20:01:46.837245','2024-02-08 07:30:00.000000',44,3,'2024-02-08 07:00:00.000000',1,'DONE'),(_binary '\0',_binary '',_binary '\0',_binary '',_binary '\0',4107.17,_binary '',_binary '','2024-02-07 20:02:03.243160','2024-02-08 08:30:00.000000',45,1,'2024-02-08 07:30:00.000000',3,'DONE'),(_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',60.83,_binary '\0',_binary '\0','2024-02-07 20:06:22.423572','2024-02-08 08:00:00.000000',46,2,'2024-02-08 07:30:00.000000',1,'DONE'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',101.16,_binary '\0',_binary '\0','2024-02-26 21:25:08.563649','2024-02-29 14:00:00.000000',47,1,'2024-02-29 13:00:00.000000',3,'CANCELED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',101.16,_binary '\0',_binary '\0','2024-02-26 21:25:24.263286','2024-02-29 12:00:00.000000',48,4,'2024-02-29 11:00:00.000000',3,'BOOKED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-26 21:25:57.580710','2024-02-27 07:30:00.000000',50,1,'2024-02-27 07:00:00.000000',1,'CANCELED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-26 21:26:41.934535','2024-03-15 07:30:00.000000',51,1,'2024-03-15 07:00:00.000000',1,'CANCELED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-27 22:02:26.556827','2024-03-14 07:30:00.000000',53,12,'2024-03-14 07:00:00.000000',1,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-27 22:06:21.040543','2024-03-14 07:30:00.000000',54,13,'2024-03-14 07:00:00.000000',1,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-27 22:08:18.274983','2024-03-21 07:30:00.000000',55,1,'2024-03-21 07:00:00.000000',1,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-02-27 22:08:32.793622','2024-02-29 07:30:00.000000',56,1,'2024-02-29 07:00:00.000000',1,'BOOKED'),(_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '',110.16,_binary '\0',_binary '\0','2024-04-12 15:03:50.674253','2024-04-12 17:00:00.000000',57,1,'2024-04-12 16:00:00.000000',3,'DONE'),(_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '',110.16,_binary '\0',_binary '\0','2024-04-12 15:03:57.092784','2024-04-12 17:00:00.000000',58,2,'2024-04-12 16:00:00.000000',3,'BOOKED'),(_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '',110.16,_binary '\0',_binary '\0','2024-04-12 15:04:03.445259','2024-04-12 17:00:00.000000',59,3,'2024-04-12 16:00:00.000000',3,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-04-12 19:05:59.512016','2024-04-18 10:30:00.000000',60,32,'2024-04-18 10:00:00.000000',1,'DONE'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-04-16 09:45:16.553638','2024-04-17 07:30:00.000000',61,1,'2024-04-17 07:00:00.000000',1,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-04-16 09:45:19.712668','2024-04-17 07:30:00.000000',62,2,'2024-04-17 07:00:00.000000',1,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-04-16 09:45:23.132763','2024-04-17 08:00:00.000000',63,1,'2024-04-17 07:30:00.000000',1,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',1416.98,_binary '\0',_binary '','2024-04-17 09:41:52.981494','2024-04-18 07:30:00.000000',64,1,'2024-04-18 07:00:00.000000',1,'DONE'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',1416.98,_binary '\0',_binary '','2024-04-22 19:59:22.764259','2024-04-23 07:30:00.000000',65,1,'2024-04-23 07:00:00.000000',1,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',32.33,_binary '\0',_binary '\0','2024-04-22 19:59:54.249367','2024-04-23 07:20:00.000000',66,2,'2024-04-23 07:00:00.000000',2,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0','2024-04-22 20:03:48.708298','2024-04-26 14:00:00.000000',67,1,'2024-04-26 13:30:00.000000',5,'BOOKED'),(_binary '\0',_binary '',_binary '',_binary '',_binary '',715.48,_binary '',_binary '','2024-04-25 19:09:29.137919','2024-04-26 12:30:00.000000',68,1,'2024-04-26 12:00:00.000000',6,'DONE'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',678.48,_binary '\0',_binary '','2024-04-27 10:43:13.703376','2024-05-07 11:00:00.000000',69,1,'2024-05-07 10:30:00.000000',6,'CANCELED'),(_binary '\0',_binary '',_binary '',_binary '',_binary '',715.48,_binary '',_binary '','2024-04-27 10:45:21.496776','2024-05-06 09:30:00.000000',70,1,'2024-05-06 09:00:00.000000',6,'DONE'),(_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '',675.207,_binary '',_binary '','2024-04-27 10:46:13.214720','2024-06-10 10:50:00.000000',71,1,'2024-06-10 10:30:00.000000',2,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',2847.966,_binary '\0',_binary '','2024-04-28 00:20:23.049091','2024-05-06 10:00:00.000000',72,2,'2024-05-06 09:00:00.000000',3,'BOOKED'),(_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',617.01,_binary '\0',_binary '','2024-04-28 00:24:59.370767','2024-04-29 10:00:00.000000',73,1,'2024-04-29 09:30:00.000000',7,'CANCELED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',617.01,_binary '\0',_binary '','2024-04-28 00:26:42.683469','2024-05-06 10:00:00.000000',74,1,'2024-05-06 09:30:00.000000',7,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',678.48,_binary '\0',_binary '','2024-04-28 00:28:18.811657','2024-05-14 12:00:00.000000',75,1,'2024-05-14 11:30:00.000000',6,'BOOKED'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',32.33,_binary '\0',_binary '\0','2024-04-28 00:32:04.494737','2024-08-20 07:20:00.000000',76,1,'2024-08-20 07:00:00.000000',8,'BOOKED'),(_binary '\0',_binary '',_binary '',_binary '',_binary '',941.74,_binary '',_binary '','2024-05-12 22:52:46.233688','2024-05-14 10:30:00.000000',77,1,'2024-05-14 10:00:00.000000',9,'BOOKED');
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `engine_power` int NOT NULL,
  `engine_volume` int NOT NULL,
  `lpg` bit(1) NOT NULL,
  `id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FKfugwdpykh9kb35q1quro44hrm` FOREIGN KEY (`id`) REFERENCES `vehicle` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (124,2800,_binary '\0',1),(125,2000,_binary '\0',4),(125,2000,_binary '\0',5),(125,2000,_binary '\0',6),(100,1800,_binary '\0',7),(100,1000,_binary '\0',9),(100,1000,_binary '\0',10),(100,1000,_binary '\0',11);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargo`
--

DROP TABLE IF EXISTS `cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargo` (
  `load_max` int NOT NULL,
  `mass` int NOT NULL,
  `id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK5o147361bw46567v81uwfiyp9` FOREIGN KEY (`id`) REFERENCES `vehicle` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargo`
--

LOCK TABLES `cargo` WRITE;
/*!40000 ALTER TABLE `cargo` DISABLE KEYS */;
INSERT INTO `cargo` VALUES (20000,7000,3);
/*!40000 ALTER TABLE `cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `active` bit(1) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (_binary '',1,'Kralja Milutina 1','opis...','mail11@gmail.com','1.jpg','Auto d.o.o','065 678 451'),(_binary '',2,'Kralja Petra 1','opis...','mail12@gmail.com','2.jpg','Servis d.o.o','065 678 452'),(_binary '',3,'Savska 11','opis...','mail13@gmail.com','3.jpg','Guma doo','065 678 453'),(_binary '',4,'Milosa Obrenovica 2','opis...','mail14@gmail.com','4.jpg','Mali Servis doo','065 678 454'),(_binary '',5,'Novosadska 11','opis...','mail15@gmail.com','5.jpg','Peugeot doo','065 678 455'),(_binary '',6,'Nikole Pasica 3','opis...','mail16@gmail.com','6.jpg','Novoprom doo','065 678 456'),(_binary '',7,'Stepe Stepanovica 11','opis...','mail17@gmail.com','7.jpg','Brckogas doo','065 678 457');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_holidays`
--

DROP TABLE IF EXISTS `company_holidays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_holidays` (
  `company_id` bigint NOT NULL,
  `holidays_id` bigint NOT NULL,
  UNIQUE KEY `UK_j47jhp8c7h58qj4lkax3l26yq` (`holidays_id`),
  KEY `FK4wxoqa4t2e745s1vfbyhxe402` (`company_id`),
  CONSTRAINT `FK4wxoqa4t2e745s1vfbyhxe402` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `FKpllly28sijkblt004lqcbjj4o` FOREIGN KEY (`holidays_id`) REFERENCES `holiday` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_holidays`
--

LOCK TABLES `company_holidays` WRITE;
/*!40000 ALTER TABLE `company_holidays` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_holidays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `criteria`
--

DROP TABLE IF EXISTS `criteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `criteria` (
  `satisfied` bit(1) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `record` bigint NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnbswxh7q2hgyjgxuc9vqgr6o2` (`record`),
  CONSTRAINT `FKnbswxh7q2hgyjgxuc9vqgr6o2` FOREIGN KEY (`record`) REFERENCES `examination_record` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criteria`
--

LOCK TABLES `criteria` WRITE;
/*!40000 ALTER TABLE `criteria` DISABLE KEYS */;
INSERT INTO `criteria` VALUES (_binary '',1,1,'','color'),(_binary '',2,1,'','body'),(_binary '',3,1,'','tires'),(_binary '\0',4,1,'','glass'),(_binary '\0',5,1,'','brakes'),(_binary '',6,1,'','OBD diagnostics'),(_binary '\0',7,1,'','exhaust fumes'),(_binary '',8,1,'','noise'),(_binary '',9,1,'','identification'),(_binary '',10,1,'','lights'),(_binary '',11,1,'','equipment'),(_binary '',12,1,'','safety belts'),(_binary '',13,1,'','gas system'),(_binary '',14,1,'','steering wheel'),(_binary '',15,1,'','underside'),(_binary '',16,1,'','drive'),(_binary '\0',17,2,'','color'),(_binary '\0',18,2,'','body'),(_binary '\0',19,2,'','tires'),(_binary '\0',20,2,'','glass'),(_binary '\0',21,2,'','brakes'),(_binary '',22,2,'','OBD diagnostics'),(_binary '\0',23,2,'','exhaust fumes'),(_binary '\0',24,2,'','noise'),(_binary '\0',25,2,'','identification'),(_binary '',26,2,'','lights'),(_binary '\0',27,2,'','equipment'),(_binary '\0',28,2,'','safety belts'),(_binary '\0',29,2,'','gas system'),(_binary '\0',30,2,'','steering wheel'),(_binary '\0',31,2,'','underside'),(_binary '\0',32,2,'','drive'),(_binary '\0',33,3,'','color'),(_binary '\0',34,3,'','body'),(_binary '\0',35,3,'','tires'),(_binary '\0',36,3,'','glass'),(_binary '',37,3,'','brakes'),(_binary '\0',38,3,'','OBD diagnostics'),(_binary '\0',39,3,'','exhaust fumes'),(_binary '\0',40,3,'ererer','noise'),(_binary '',41,3,'','identification'),(_binary '',42,3,'','lights'),(_binary '\0',43,3,'','equipment'),(_binary '\0',44,3,'','safety belts'),(_binary '\0',45,3,'','gas system'),(_binary '\0',46,3,'','steering wheel'),(_binary '\0',47,3,'','underside'),(_binary '\0',48,3,'','drive'),(_binary '\0',49,4,'','color'),(_binary '\0',50,4,'','body'),(_binary '\0',51,4,'','tires'),(_binary '\0',52,4,'','glass'),(_binary '\0',53,4,'','brakes'),(_binary '\0',54,4,'','OBD diagnostics'),(_binary '\0',55,4,'','exhaust fumes'),(_binary '\0',56,4,'','noise'),(_binary '\0',57,4,'','identification'),(_binary '',58,4,'','lights'),(_binary '',59,4,'','equipment'),(_binary '\0',60,4,'','safety belts'),(_binary '\0',61,4,'rgrg','gas system'),(_binary '\0',62,4,'','steering wheel'),(_binary '\0',63,4,'','underside'),(_binary '\0',64,4,'','drive'),(_binary '\0',65,9,'','color'),(_binary '\0',66,9,'','body'),(_binary '\0',67,9,'','tires'),(_binary '\0',68,9,'','glass'),(_binary '\0',69,9,'','brakes'),(_binary '\0',70,9,'','OBD diagnostics'),(_binary '\0',71,9,'','exhaust fumes'),(_binary '\0',72,9,'','noise'),(_binary '\0',73,9,'','identification'),(_binary '\0',74,9,'','lights'),(_binary '\0',75,9,'','equipment'),(_binary '\0',76,9,'','safety belts'),(_binary '\0',77,9,'','gas system'),(_binary '\0',78,9,'','steering wheel'),(_binary '\0',79,9,'','underside'),(_binary '\0',80,9,'','drive'),(_binary '\0',81,10,'','color'),(_binary '\0',82,10,'','body'),(_binary '\0',83,10,'','tires'),(_binary '\0',84,10,'','glass'),(_binary '\0',85,10,'','brakes'),(_binary '\0',86,10,'','OBD diagnostics'),(_binary '\0',87,10,'','exhaust fumes'),(_binary '\0',88,10,'','noise'),(_binary '\0',89,10,'','identification'),(_binary '\0',90,10,'','lights'),(_binary '\0',91,10,'','equipment'),(_binary '\0',92,10,'','safety belts'),(_binary '\0',93,10,'','gas system'),(_binary '\0',94,10,'','steering wheel'),(_binary '\0',95,10,'','underside'),(_binary '\0',96,10,'','drive'),(_binary '\0',97,11,'','color'),(_binary '\0',98,11,'','body'),(_binary '\0',99,11,'','tires'),(_binary '\0',100,11,'','glass'),(_binary '\0',101,11,'','brakes'),(_binary '\0',102,11,'','OBD diagnostics'),(_binary '\0',103,11,'','exhaust fumes'),(_binary '\0',104,11,'','noise'),(_binary '\0',105,11,'','identification'),(_binary '\0',106,11,'','lights'),(_binary '\0',107,11,'','equipment'),(_binary '\0',108,11,'','safety belts'),(_binary '\0',109,11,'','gas system'),(_binary '\0',110,11,'','steering wheel'),(_binary '\0',111,11,'','underside'),(_binary '\0',112,11,'','drive'),(_binary '\0',113,12,'','color'),(_binary '\0',114,12,'','body'),(_binary '\0',115,12,'','tires'),(_binary '\0',116,12,'','glass'),(_binary '\0',117,12,'','brakes'),(_binary '\0',118,12,'','OBD diagnostics'),(_binary '\0',119,12,'','exhaust fumes'),(_binary '\0',120,12,'','noise'),(_binary '\0',121,12,'','identification'),(_binary '\0',122,12,'','lights'),(_binary '\0',123,12,'','equipment'),(_binary '\0',124,12,'','safety belts'),(_binary '\0',125,12,'','gas system'),(_binary '\0',126,12,'','steering wheel'),(_binary '\0',127,12,'','underside'),(_binary '\0',128,12,'','drive'),(_binary '\0',129,13,'','color'),(_binary '\0',130,13,'','body'),(_binary '\0',131,13,'','tires'),(_binary '\0',132,13,'','glass'),(_binary '\0',133,13,'','brakes'),(_binary '\0',134,13,'','OBD diagnostics'),(_binary '\0',135,13,'','exhaust fumes'),(_binary '\0',136,13,'','noise'),(_binary '\0',137,13,'','identification'),(_binary '\0',138,13,'','lights'),(_binary '\0',139,13,'','equipment'),(_binary '\0',140,13,'','safety belts'),(_binary '\0',141,13,'','gas system'),(_binary '\0',142,13,'','steering wheel'),(_binary '\0',143,13,'','underside'),(_binary '\0',144,13,'','drive'),(_binary '',145,14,'','color'),(_binary '\0',146,14,'Damaged rear view mirror','body'),(_binary '',147,14,'','tires'),(_binary '',148,14,'','glass'),(_binary '',149,14,'','brakes'),(_binary '',150,14,'','OBD diagnostics'),(_binary '',151,14,'','exhaust fumes'),(_binary '',152,14,'','noise'),(_binary '',153,14,'','identification'),(_binary '',154,14,'','lights'),(_binary '',155,14,'','equipment'),(_binary '\0',156,14,'Damaged driver safety belt system','safety belts'),(_binary '',157,14,'','gas system'),(_binary '',158,14,'','steering wheel'),(_binary '',159,14,'','underside'),(_binary '',160,14,'','drive'),(_binary '',161,15,'','boja'),(_binary '',162,15,'','karoserija'),(_binary '',163,15,'','gume'),(_binary '',164,15,'','stakla'),(_binary '',165,15,'','kočnice'),(_binary '',166,15,'','OBD dijagnostika'),(_binary '\0',167,15,'asdfasf','izduvni gasovi'),(_binary '',168,15,'','buka'),(_binary '',169,15,'','broj šasije'),(_binary '',170,15,'','svjetla'),(_binary '\0',171,15,'adsafd','oprema'),(_binary '',172,15,'','pojasevi'),(_binary '',173,15,'','upravljanje'),(_binary '',174,15,'','podvožje'),(_binary '',175,15,'','pogon'),(_binary '',176,16,'','boja'),(_binary '',177,16,'','karoserija'),(_binary '',178,16,'','gume'),(_binary '',179,16,'','stakla'),(_binary '',180,16,'','kočnice'),(_binary '',181,16,'','OBD dijagnostika'),(_binary '',182,16,'','izduvni gasovi'),(_binary '',183,16,'','buka'),(_binary '',184,16,'','broj šasije'),(_binary '',185,16,'','svjetla'),(_binary '',186,16,'','oprema'),(_binary '',187,16,'','pojasevi'),(_binary '',188,16,'','upravljanje'),(_binary '',189,16,'','podvožje'),(_binary '\0',190,16,'nesto nije dobro kod pogona','pogon'),(_binary '',191,17,'','boja'),(_binary '',192,17,'','karoserija'),(_binary '',193,17,'','gume'),(_binary '',194,17,'','stakla'),(_binary '',195,17,'','kocnice'),(_binary '',196,17,'','OBD dijagnostika'),(_binary '',197,17,'','izduvni gasovi'),(_binary '',198,17,'','buka'),(_binary '',199,17,'','broj šasije'),(_binary '',200,17,'','svjetla'),(_binary '',201,17,'','oprema'),(_binary '',202,17,'','pojasevi'),(_binary '',203,17,'','upravljanje'),(_binary '',204,17,'','podvožje'),(_binary '',205,17,'','pogon'),(_binary '',206,18,'','boja'),(_binary '\0',207,18,'šteta na retrovizoru','karoserija'),(_binary '',208,18,'','gume'),(_binary '',209,18,'','stakla'),(_binary '',210,18,'','kocnice'),(_binary '',211,18,'','OBD dijagnostika'),(_binary '',212,18,'','izduvni gasovi'),(_binary '',213,18,'','buka'),(_binary '',214,18,'','broj šasije'),(_binary '',215,18,'','svjetla'),(_binary '\0',216,18,'nedostaje oprema za prvu pomoć','oprema'),(_binary '',217,18,'','pojasevi'),(_binary '',218,18,'','upravljanje'),(_binary '',219,18,'','podvožje'),(_binary '',220,18,'','pogon');
/*!40000 ALTER TABLE `criteria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` bigint NOT NULL,
  `joined` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `penalties` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FKjlfgi6ceqby6oau1krf393ba7` FOREIGN KEY (`id`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'2024-01-30 21:43:07.794443','mail1@gmail.com','065 745 343',3),(2,'2024-01-30 21:44:30.561174','mail2@gmail.com','066 784 344',0),(13,'2024-04-25 19:07:50.793212','mihailo.vasic2000@gmail.com','066615999',0),(14,'2024-04-28 00:23:09.384513','stefan@mail.com','066 123 123',0),(15,'2024-05-12 22:50:24.501058','ljubinko@mail.com','066123456',0),(16,'2024-05-12 22:54:41.397198','testtest@test.test','1234512345',0),(17,'2024-05-14 12:13:22.963259','asdfsag@gmail.com','065123123',0);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examination`
--

DROP TABLE IF EXISTS `examination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examination` (
  `first` bit(1) NOT NULL,
  `green_card` bit(1) NOT NULL,
  `new_plates` bit(1) NOT NULL,
  `owner_cert` bit(1) NOT NULL,
  `price` double NOT NULL,
  `reg_cert` bit(1) NOT NULL,
  `registration` bit(1) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `line` bigint NOT NULL,
  `record` bigint DEFAULT NULL,
  `supervisor` bigint NOT NULL,
  `time` datetime(6) DEFAULT NULL,
  `vehicle` bigint NOT NULL,
  `period` varchar(255) DEFAULT NULL,
  `licence_plates` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `emission_class` int NOT NULL,
  `engine` tinyint DEFAULT NULL,
  `engine_power` int NOT NULL,
  `engine_volume` int NOT NULL,
  `lpg` bit(1) NOT NULL,
  `load_max` int NOT NULL,
  `malus` double NOT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `mass` int NOT NULL,
  `model` varchar(255) DEFAULT NULL,
  `production_year` int NOT NULL,
  `type` enum('CAR','CARGO','MOTORBIKE') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_t4yoiuudwvo80tcwc1dbwn3fp` (`record`),
  KEY `FK798d0j7g7k19mi5pbs3xwk1q` (`line`),
  KEY `FKcw220fdjp1xkrpy2fdp7chenv` (`supervisor`),
  KEY `FK70ik4dl84evvtno1mtdqlo39t` (`vehicle`),
  CONSTRAINT `FK3215ab8hpgj6uqhgwtmq6v60x` FOREIGN KEY (`record`) REFERENCES `examination_record` (`id`),
  CONSTRAINT `FK70ik4dl84evvtno1mtdqlo39t` FOREIGN KEY (`vehicle`) REFERENCES `vehicle` (`id`),
  CONSTRAINT `FK798d0j7g7k19mi5pbs3xwk1q` FOREIGN KEY (`line`) REFERENCES `examination_line` (`id`),
  CONSTRAINT `FKcw220fdjp1xkrpy2fdp7chenv` FOREIGN KEY (`supervisor`) REFERENCES `worker` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examination`
--

LOCK TABLES `examination` WRITE;
/*!40000 ALTER TABLE `examination` DISABLE KEYS */;
INSERT INTO `examination` VALUES (_binary '\0',_binary '',_binary '',_binary '\0',1891.93,_binary '\0',_binary '',1,1,1,3,'2024-01-30 22:25:49.040583',1,'07:00 - 07:30','T12-O-532','black',0,3,0,0,_binary '\0',0,0,NULL,0,NULL,0,'CARGO'),(_binary '\0',_binary '',_binary '',_binary '\0',881.14,_binary '\0',_binary '',2,2,2,3,'2024-02-05 21:12:35.202062',2,'07:00 - 07:20','M34-R-234','black',0,3,0,0,_binary '\0',0,0,NULL,0,NULL,0,'CARGO'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',1504.37,_binary '\0',_binary '',3,3,3,3,'2024-02-05 21:14:48.296555',1,'07:00 - 07:30','N34-T-532','black',0,3,0,0,_binary '\0',0,0,NULL,0,NULL,0,'CARGO'),(_binary '\0',_binary '',_binary '\0',_binary '',65.83,_binary '',_binary '\0',4,3,4,3,'2024-02-07 22:59:52.780783',1,'07:00 - 07:30','N34-T-532','red',5,0,124,2800,_binary '',1,0.6,'FORD',1,'Ranger',2024,'CARGO'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',857.14,_binary '\0',_binary '',5,2,5,3,'2024-02-07 23:03:10.519090',2,'07:00 - 07:20','N34-T-532','blue',5,0,1,1500,_binary '',1,1,'YAMAHA',1,'R8',2015,'CARGO'),(_binary '',_binary '\0',_binary '',_binary '\0',4107.17,_binary '',_binary '',6,1,6,3,'2024-02-07 23:05:54.940905',3,'07:30 - 08:30','N34-T-532','black',3,2,1,1,_binary '',20000,1,'MERCEDES',7000,'Actros',2010,'CARGO'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',1504.37,_binary '\0',_binary '',7,1,7,3,'2024-02-07 23:10:41.381051',1,'07:00 - 07:30','N34-T-532','red',5,0,124,2800,_binary '',1,0.6,'FORD',1,'Ranger',2024,'CARGO'),(_binary '\0',_binary '',_binary '\0',_binary '\0',60.83,_binary '\0',_binary '\0',8,2,8,3,'2024-02-07 23:13:43.257187',1,'07:30 - 08:00','N34-T-532','red',5,0,124,2800,_binary '',1,0.6,'FORD',1,'Ranger',2018,'CARGO'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0',9,1,9,3,'2024-02-07 23:15:21.041388',1,'07:00 - 07:30','N34-T-532','red',5,0,124,2800,_binary '',1,0.6,'FORD',1777,'Ranger',2024,'CARGO'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0',10,1,10,3,'2024-02-07 23:18:00.280038',1,'07:00 - 07:30','N34-T-532','redred',5,0,124,2800,_binary '',1,0.6,'FORD',1,'Ranger',2024,'CARGO'),(_binary '\0',_binary '',_binary '\0',_binary '\0',105.16,_binary '\0',_binary '\0',11,2,11,3,'2024-02-07 23:27:31.394468',1,'07:00 - 07:30','1111111','red blue',2,2,1,1,_binary '',10000,1.6,'FORD cargo',13000,'Ranger',2024,'CARGO'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0',12,3,12,3,'2024-02-07 23:28:06.923583',1,'07:00 - 07:30','XXX-X-XXXrf','red',5,0,124,2800,_binary '',1,0.7,'FORD',1,'Ranger',2024,'CARGO'),(_binary '\0',_binary '\0',_binary '\0',_binary '',102,_binary '\0',_binary '\0',13,1,13,3,'2024-02-07 23:35:42.707946',1,'07:30 - 08:00','XXX-X-XXXe','red fd',1,0,1,1,_binary '',12222,1.4,'FORD',11111,'Ranger',2024,'CARGO'),(_binary '\0',_binary '',_binary '\0',_binary '',110.16,_binary '\0',_binary '\0',14,1,14,3,'2024-04-12 15:10:41.398276',3,'16:00 - 17:00','A23-T-425','black',3,2,1,1,_binary '',20000,0.5,'MERCEDES',7000,'Actros',2010,'CARGO'),(_binary '\0',_binary '\0',_binary '\0',_binary '\0',56.83,_binary '\0',_binary '\0',15,32,15,3,'2024-04-17 09:03:15.575061',1,'10:00 - 10:30','A45-T-345','red',5,0,124,2800,_binary '\0',1,0.5,'FORD',1,'Ranger',2024,'CAR'),(_binary '',_binary '',_binary '',_binary '',1453.98,_binary '',_binary '',16,1,16,6,'2024-04-17 09:44:24.088941',1,'07:00 - 07:30','A54-T-234','red',5,0,124,2800,_binary '\0',1,0.5,'FORD',1,'Ranger',2024,'CAR'),(_binary '',_binary '',_binary '',_binary '',715.48,_binary '',_binary '',17,1,17,6,'2024-04-25 19:14:30.962652',6,'12:00 - 12:30','A45-T-234','Crna',5,0,125,2000,_binary '\0',1,0.5,'Volkswagen',1,'Passat',2012,'CAR'),(_binary '',_binary '',_binary '',_binary '',715.48,_binary '',_binary '',18,1,18,6,'2024-04-27 12:55:00.716283',6,'09:00 - 09:30','A12-A-345','Crna',5,0,125,2000,_binary '',1,0.5,'Volkswagen',1,'Passat',2012,'CAR');
/*!40000 ALTER TABLE `examination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examination_line`
--

DROP TABLE IF EXISTS `examination_line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examination_line` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `station` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `deleted` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKc68sxgjw1sgf238ga50qbxbn5` (`station`),
  CONSTRAINT `FKc68sxgjw1sgf238ga50qbxbn5` FOREIGN KEY (`station`) REFERENCES `inspection_station` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examination_line`
--

LOCK TABLES `examination_line` WRITE;
/*!40000 ALTER TABLE `examination_line` DISABLE KEYS */;
INSERT INTO `examination_line` VALUES (1,1,'Linija 1',_binary '\0'),(2,1,'Linija 2',_binary '\0'),(3,1,'Linija 3',_binary '\0'),(4,2,'Linija 1',_binary '\0'),(5,2,'Linija 2',_binary '\0'),(6,3,'Linija 1',_binary '\0'),(7,4,'Linija 1',_binary '\0'),(8,5,'Linija 1',_binary '\0'),(9,6,'Linija 1',_binary '\0'),(10,7,'Linija 1',_binary '\0'),(11,8,'Linija 1',_binary '\0'),(12,9,'Linija 1',_binary '\0'),(13,10,'Linija 1',_binary '\0'),(14,11,'Linija 1',_binary '\0'),(15,12,'Linija 1',_binary '\0'),(16,13,'Linija 1',_binary '\0'),(17,14,'Linija 1',_binary '\0'),(18,1,'Line 1',_binary ''),(19,1,'Line 2',_binary ''),(20,1,'Line 1',_binary ''),(21,1,'Line 1',_binary ''),(22,1,'Line 1',_binary ''),(23,1,'Line 1',_binary ''),(24,1,'Line 145678',_binary ''),(25,1,'Line 2sd',_binary ''),(26,1,'Line 1wsd',_binary ''),(27,1,'Line 1',_binary ''),(31,1,'Line 1',_binary ''),(32,18,'Line 1',_binary '\0'),(33,20,'Linija 2',_binary '\0'),(34,20,'Linija 1',_binary '\0');
/*!40000 ALTER TABLE `examination_line` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examination_record`
--

DROP TABLE IF EXISTS `examination_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examination_record` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examination_record`
--

LOCK TABLES `examination_record` WRITE;
/*!40000 ALTER TABLE `examination_record` DISABLE KEYS */;
INSERT INTO `examination_record` VALUES (1,''),(2,'lkjhggfgh'),(3,'wererw'),(4,'fvfgfg'),(5,''),(6,''),(7,''),(8,''),(9,''),(10,''),(11,'jk'),(12,''),(13,''),(14,'Your safety belts and mirrors are broken.'),(15,'Neke stvari ne zadovoljavaju'),(16,'Ne zadovoljava pogon zbog necega'),(17,''),(18,'');
/*!40000 ALTER TABLE `examination_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade` (
  `grade` int NOT NULL,
  `company` bigint NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FKbxmfnlkueumw5wbeoohmdiw7e` (`company`),
  CONSTRAINT `FKbxmfnlkueumw5wbeoohmdiw7e` FOREIGN KEY (`company`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade`
--

LOCK TABLES `grade` WRITE;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
INSERT INTO `grade` VALUES (3,2,1),(4,1,2),(2,1,3),(5,1,4),(4,3,5),(2,3,6);
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holiday`
--

DROP TABLE IF EXISTS `holiday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holiday` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `holiday_date` date DEFAULT NULL,
  `company` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf9dj5stiox7bdbsptyp639nyq` (`company`),
  CONSTRAINT `FKf9dj5stiox7bdbsptyp639nyq` FOREIGN KEY (`company`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holiday`
--

LOCK TABLES `holiday` WRITE;
/*!40000 ALTER TABLE `holiday` DISABLE KEYS */;
INSERT INTO `holiday` VALUES (1,'2024-02-22',1),(2,'2024-02-23',1),(3,'2024-02-24',1),(4,'2024-02-25',1),(33,'2024-02-28',1),(35,'2024-02-27',1),(59,'2024-03-14',1),(60,'2024-03-29',1),(61,'2024-03-19',1),(63,'2024-03-02',1),(66,'2024-04-30',1);
/*!40000 ALTER TABLE `holiday` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inspection_station`
--

DROP TABLE IF EXISTS `inspection_station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inspection_station` (
  `ends_at` int NOT NULL,
  `starts_at` int NOT NULL,
  `company` bigint NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `deleted` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKg11rualliouoqwdw6gr8hlsgq` (`company`),
  CONSTRAINT `FKg11rualliouoqwdw6gr8hlsgq` FOREIGN KEY (`company`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inspection_station`
--

LOCK TABLES `inspection_station` WRITE;
/*!40000 ALTER TABLE `inspection_station` DISABLE KEYS */;
INSERT INTO `inspection_station` VALUES (15,7,1,1,'Vojvode Putnika 28','example1@mail.com','Stanica Vojvode Putnika','065 123 231',_binary '\0'),(19,9,1,2,'Nikole Tesle 44','example1@mail.com','Stanica Nikole Tesle','065 123 232',_binary '\0'),(19,9,2,3,'Svetosavksa 11','example1@gmail.com','Stanica 3','065 123 233',_binary '\0'),(19,10,2,4,'Milutina Milankovica 11','example1@gmail.com','Stanica 4','065 123 234',_binary '\0'),(19,10,3,5,'Popa Save Bozica 54','example1@gmail.com','Stanica 5','065 123 235',_binary '\0'),(19,10,3,6,'Omladinska 17','example1@gmail.com','Stanica 6','065 123 236',_binary '\0'),(19,9,4,7,'Stefana Decanskog 83','example1@gmail.com','Stanica 7','065 123 237',_binary '\0'),(19,8,4,8,'Cara Lazara 2','example1@gmail.com','Stanica 8','065 123 238',_binary '\0'),(19,7,5,9,'Kneginje Milice 23','example1@gmail.com','Stanica 9','065 123 239',_binary '\0'),(19,7,5,10,'Gavrila Principa 45','example1@gmail.com','Stanica 10','065 123 221',_binary '\0'),(19,7,6,11,'Novosadska 55','example1@gmail.com','Stanica 11','065 123 222',_binary '\0'),(19,8,6,12,'Majge Jugovica 33','example1@gmail.com','Stanica 12','065 123 223',_binary '\0'),(19,8,7,13,'Patre 18','example1@gmail.com','Stanica 13','065 123 224',_binary '\0'),(19,9,7,14,'Maksima Gorkog 32','example1@gmail.com','Stanica 14','065 123 225',_binary '\0'),(16,7,1,18,'adresa','example3@mail.com','Stanica Test','telefon',_binary '\0'),(16,8,1,20,'Neka adresa','mail@mail.com','Nova Stanica','066123456',_binary '\0');
/*!40000 ALTER TABLE `inspection_station` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` bigint NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `is_read` bit(1) NOT NULL,
  `sender` varchar(255) DEFAULT NULL,
  `time` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `recipient` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcxjl0dnak0n6n4f9h677nl8f3` (`recipient`),
  CONSTRAINT `FKcxjl0dnak0n6n4f9h677nl8f3` FOREIGN KEY (`recipient`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'Vehicle inspection number id=1 for vehicle FORD Ranger FAILED!',_binary '','Jovan Jovanovic','2024-01-30 22:25:49.098000','Vehicle Inspection Report!',1),(3,'Vehicle inspection number id=3 for vehicle FORD Ranger FAILED!',_binary '','Jovan Jovanovic','2024-02-05 21:14:48.386000','Vehicle Inspection Report!',1),(52,'ds',_binary '','Jovan Jovanovic','2024-02-05 22:18:20.406000','Reservation (id=5) canceled!',1),(102,'',_binary '','Jovan Jovanovic','2024-02-05 22:44:06.428000','Reservation (id=11) canceled!',1),(103,'',_binary '','Jovan Jovanovic','2024-02-05 22:44:10.297000','Reservation (id=6) canceled!',1),(104,'',_binary '','Jovan Jovanovic','2024-02-05 22:44:12.933000','Reservation (id=7) canceled!',1),(105,'',_binary '','Jovan Jovanovic','2024-02-05 22:44:15.865000','Reservation (id=9) canceled!',1),(106,'',_binary '','Jovan Jovanovic','2024-02-05 22:44:18.324000','Reservation (id=10) canceled!',1),(152,'Vehicle inspection number id=4 for vehicle FORD Ranger FAILED!',_binary '','Jovan Jovanovic','2024-02-07 22:59:52.893000','Vehicle Inspection Report!',1),(153,'Vehicle inspection number id=5 for vehicle YAMAHA R8 FAILED!',_binary '','Jovan Jovanovic','2024-02-07 23:03:10.685000','Vehicle Inspection Report!',1),(154,'Vehicle inspection number id=6 for vehicle MERCEDES Actros FAILED!',_binary '','Jovan Jovanovic','2024-02-07 23:05:55.091000','Vehicle Inspection Report!',1),(155,'Vehicle inspection number id=7 for vehicle FORD Ranger FAILED!',_binary '','Jovan Jovanovic','2024-02-07 23:10:41.509000','Vehicle Inspection Report!',1),(156,'Vehicle inspection number id=8 for vehicle FORD Ranger FAILED!',_binary '','Jovan Jovanovic','2024-02-07 23:13:43.376000','Vehicle Inspection Report!',1),(157,'Vehicle inspection number id=9 for vehicle FORD Ranger FAILED!',_binary '','Jovan Jovanovic','2024-02-07 23:15:21.105000','Vehicle Inspection Report!',1),(158,'Vehicle inspection number id=10 for vehicle FORD Ranger FAILED!',_binary '','Jovan Jovanovic','2024-02-07 23:18:00.356000','Vehicle Inspection Report!',1),(202,'Vehicle inspection number id=11 for vehicle FORD Ranger FAILED!',_binary '','Jovan Jovanovic','2024-02-07 23:27:31.491000','Vehicle Inspection Report!',1),(203,'Vehicle inspection number id=12 for vehicle FORD Ranger FAILED!',_binary '','Jovan Jovanovic','2024-02-07 23:28:07.018000','Vehicle Inspection Report!',1),(252,'Vehicle inspection number id=13 for vehicle FORD Ranger FAILED!',_binary '','Jovan Jovanovic','2024-02-07 23:35:42.826000','Vehicle Inspection Report!',1),(302,'########',_binary '','Admin Admin','2024-02-26 21:58:43.095000','Reservation (id=50) canceled!',1),(303,'rrrr',_binary '','Admin Admin','2024-02-26 22:04:47.506000','Reservation (id=47) canceled!',1),(304,'no reason',_binary '','Admin Admin','2024-02-26 22:05:27.398000','Reservation (id=49) canceled!',1),(352,'Vehicle inspection number id=14 for vehicle MERCEDES Actros FAILED!',_binary '','Jovan Jovanovic','2024-04-12 15:10:41.434000','Vehicle Inspection Report!',1),(402,'Procjena stanja vozila sa rednim brojem 15 za vozilo FORD Ranger NEUSPJEŠNA!',_binary '','Jovan Jovanovic','2024-04-17 09:03:26.905000','Izvještaj!',1),(452,'Procjena stanja vozila sa rednim brojem 16 za vozilo FORD Ranger NEUSPJEŠNA!',_binary '','koja kojic','2024-04-17 09:44:35.176000','Izvještaj!',1),(502,'Procjena stanja vozila sa rednim brojem 17 za vozilo Volkswagen Passatje USPJEŠNA!',_binary '','koja kojic','2024-04-25 19:14:34.114000','Izvještaj!',13),(552,'Otkazano iz nekog razloga\n-------------------------\nkoja kojic\nAuto d.o.o - Stanica 101',_binary '','koja kojic','2024-04-27 10:43:56.988000','Reservacija sa indentifikatorom 69 (2024-05-07 10:30:00) je otkazana!',13),(602,'Procjena stanja vozila sa rednim brojem 18 za vozilo Volkswagen Passat NEUSPJEŠNA!',_binary '','koja kojic','2024-04-27 12:55:02.035000','Izvještaj!',13),(652,'asdf\n-------------------------\nkoja kojic\nAuto d.o.o - Stanica Vojvode Putnika',_binary '','koja kojic','2024-04-28 00:25:56.279000','Reservacija sa indentifikatorom 73 (2024-04-29 09:30:00) je otkazana!',14);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_seq`
--

DROP TABLE IF EXISTS `message_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_seq`
--

LOCK TABLES `message_seq` WRITE;
/*!40000 ALTER TABLE `message_seq` DISABLE KEYS */;
INSERT INTO `message_seq` VALUES (751);
/*!40000 ALTER TABLE `message_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motor_bike`
--

DROP TABLE IF EXISTS `motor_bike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motor_bike` (
  `engine_volume` int NOT NULL,
  `id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FKdoh6mf0gj4g4w1jxkonedlqrp` FOREIGN KEY (`id`) REFERENCES `vehicle` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motor_bike`
--

LOCK TABLES `motor_bike` WRITE;
/*!40000 ALTER TABLE `motor_bike` DISABLE KEYS */;
INSERT INTO `motor_bike` VALUES (1500,2),(600,8);
/*!40000 ALTER TABLE `motor_bike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacation`
--

DROP TABLE IF EXISTS `vacation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `worker` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8gccm9od6wxfpvjk3wnjrbyw0` (`worker`),
  CONSTRAINT `FK8gccm9od6wxfpvjk3wnjrbyw0` FOREIGN KEY (`worker`) REFERENCES `worker` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacation`
--

LOCK TABLES `vacation` WRITE;
/*!40000 ALTER TABLE `vacation` DISABLE KEYS */;
INSERT INTO `vacation` VALUES (2,'2024-04-22',3),(3,'2024-04-04',3),(4,'2024-03-15',3),(6,'2024-02-01',3),(7,'2024-02-18',3),(8,'2024-02-13',3),(9,'2024-02-17',3),(11,'2024-02-03',3),(14,'2024-02-07',3),(15,'2024-02-15',3),(16,'2024-02-20',3),(17,'2024-02-14',3);
/*!40000 ALTER TABLE `vacation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle` (
  `deleted` bit(1) NOT NULL,
  `emission_class` int NOT NULL,
  `malus` double NOT NULL,
  `production_year` int NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `owner` bigint NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `engine` enum('DIESEL','HYBRID','OTO2','OTO4','ROTO') DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `type` enum('CAR','CARGO','MOTORBIKE') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgrhguem3sg60m3ijmp2pgbjod` (`owner`),
  CONSTRAINT `FKgrhguem3sg60m3ijmp2pgbjod` FOREIGN KEY (`owner`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (_binary '\0',5,0.5,2024,1,1,'red','DIESEL','FORD','Ranger','CAR'),(_binary '\0',5,0.7,2015,2,1,'blue','DIESEL','YAMAHA','R8','MOTORBIKE'),(_binary '\0',3,0.6,2010,3,1,'black','OTO4','MERCEDES','Actros','CARGO'),(_binary '',1,0.5,2012,4,1,'Red','DIESEL','Volkswagen','Passat','CAR'),(_binary '\0',5,0.5,2024,5,1,'Red','DIESEL','Volkswagen','Passat','CAR'),(_binary '\0',5,0.5,2012,6,13,'Crna','DIESEL','Volkswagen','Passat','CAR'),(_binary '\0',5,0.5,2016,7,14,'Crvena','DIESEL','Volkswagen','Golf','CAR'),(_binary '\0',5,1,2009,8,13,'Crvena','OTO4','Yamaha','R6','MOTORBIKE'),(_binary '\0',5,1,2000,9,15,'adsfasf','OTO4','fdasfasg','adsffasg','CAR'),(_binary '\0',5,1,2000,10,16,'crna','ROTO','BMW','3','CAR'),(_binary '\0',1,1,2024,11,17,'adasf','DIESEL','as','dasf','CAR');
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worker`
--

DROP TABLE IF EXISTS `worker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `worker` (
  `id` bigint NOT NULL,
  `station` bigint NOT NULL,
  `vacation_limit` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6crj6k441tqgm8n75w06rsrs3` (`station`),
  CONSTRAINT `FK6crj6k441tqgm8n75w06rsrs3` FOREIGN KEY (`station`) REFERENCES `inspection_station` (`id`),
  CONSTRAINT `FKa4ccjylrkocf8edhugb6rxqs6` FOREIGN KEY (`id`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worker`
--

LOCK TABLES `worker` WRITE;
/*!40000 ALTER TABLE `worker` DISABLE KEYS */;
INSERT INTO `worker` VALUES (3,18,17),(6,1,18),(7,1,20);
/*!40000 ALTER TABLE `worker` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-24 14:13:55
