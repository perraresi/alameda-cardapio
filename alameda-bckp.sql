-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: alameda
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `ordem` int DEFAULT '0',
  `ativo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'COMBOS',1,1),(2,'DESTILADOS - DOSES',2,1),(3,'GARRAFAS',3,1),(4,'CERVEJAS',4,1),(5,'DRINKS',5,1),(6,'NÃO ALCOÓLICOS',6,1),(7,'TABACARIA',0,1);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `preco` decimal(10,2) NOT NULL,
  `categoria` varchar(80) NOT NULL,
  `imagem` varchar(500) DEFAULT NULL,
  `disponivel` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Blue Label 750ml','Combo acompanha 5 Red Bulls e 5 gelos sabores.',1899.99,'COMBOS','',1),(2,'Royal Salute 700ml','Combo acompanha 5 Red Bulls e 5 gelos sabores.',1499.99,'COMBOS','https://res.cloudinary.com/dwdihtisq/image/upload/v1779474748/alameda-produtos/qgchisgf6ourdfcpxxks.jpg',1),(3,'Macallan 750ml','Combo acompanha 5 Red Bulls e 5 gelos sabores.',1299.99,'COMBOS','',1),(4,'Gold Label 750ml','Combo acompanha 5 Red Bulls e 5 gelos sabores.',479.99,'COMBOS','',1),(5,'Black Label 1L','Combo acompanha 5 Red Bulls e 5 gelos sabores.',379.99,'COMBOS','',1),(6,'Buchanans 1L','Combo acompanha 5 Red Bulls e 5 gelos sabores.',379.99,'COMBOS','',1),(7,'Jack Daniels 1L','Combo acompanha 5 Red Bulls e 5 gelos sabores.',379.99,'COMBOS','',1),(8,'Jack Daniels Sabores 1L','Combo acompanha 5 Red Bulls e 5 gelos sabores.',399.99,'COMBOS','',1),(9,'Ballantines 1L','Combo acompanha 5 Red Bulls e 5 gelos sabores.',249.99,'COMBOS','',1),(10,'Beefeater 750ml','Combo acompanha 5 Red Bulls e 5 gelos sabores.',249.99,'COMBOS','',1),(11,'Beefeater Pink 750ml','Combo acompanha 5 Red Bulls e 5 gelos sabores.',299.99,'COMBOS','',1),(12,'Tanqueray 750ml','Combo acompanha 5 Red Bulls e 5 gelos sabores.',349.99,'COMBOS','',1),(13,'Bombay 750ml','Combo acompanha 5 Red Bulls e 5 gelos sabores.',299.99,'COMBOS','',1),(14,'Ciroc 750ml','Combo acompanha 5 Red Bulls e 5 gelos sabores.',399.99,'COMBOS','',1),(15,'Grey Goose 750ml','Combo acompanha 5 Red Bulls e 5 gelos sabores.',399.99,'COMBOS','',1),(16,'Jagermeister 700ml','Combo acompanha 5 Red Bulls e 5 gelos sabores.',349.99,'COMBOS','',1),(17,'Absolut 1L','Combo acompanha 5 Red Bulls e 5 gelos sabores.',249.99,'COMBOS','',1),(18,'Malibu 750ml','Combo acompanha 5 Red Bulls e 5 gelos sabores.',239.99,'COMBOS','',1),(19,'Smirnoff 1L','Combo acompanha 5 Red Bulls e 5 gelos sabores.',199.99,'COMBOS','',1),(20,'Black Label','Dose de whisky.',59.99,'DESTILADOS - DOSES','',1),(21,'Buchanans','Dose de whisky.',59.99,'DESTILADOS - DOSES','',1),(22,'Jack Daniels','Dose de whisky.',54.99,'DESTILADOS - DOSES','',1),(23,'Jack Sabores','Dose de whisky saborizado.',59.99,'DESTILADOS - DOSES','',1),(24,'Ballantines','Dose de whisky.',39.99,'DESTILADOS - DOSES','',1),(25,'Beefeater','Dose de gin.',49.99,'DESTILADOS - DOSES','',1),(26,'Tanqueray','Dose de gin.',49.99,'DESTILADOS - DOSES','',1),(27,'Bombay','Dose de gin.',44.99,'DESTILADOS - DOSES','',1),(28,'Apogee','Dose de gin.',29.99,'DESTILADOS - DOSES','',1),(29,'Absolut','Dose de vodka.',39.99,'DESTILADOS - DOSES','',1),(30,'Malibu','Dose de vodka/licor.',39.99,'DESTILADOS - DOSES','',1),(31,'Smirnoff','Dose de vodka.',34.99,'DESTILADOS - DOSES','',1),(32,'Jagermeister','Dose de licor.',44.99,'DESTILADOS - DOSES','',1),(33,'Licor 43','Dose de licor.',19.99,'DESTILADOS - DOSES','',1),(34,'Ballena','Dose de licor.',19.99,'DESTILADOS - DOSES','',1),(35,'Licor 43','Garrafa.',249.99,'GARRAFAS','',1),(36,'Ballena','Garrafa.',249.99,'GARRAFAS','',1),(37,'Heineken','Cerveja.',19.99,'CERVEJAS','',1),(38,'Original','Cerveja.',14.99,'CERVEJAS','',1),(39,'Balde com 5 Heineken','Balde com 5 unidades.',89.99,'CERVEJAS','',1),(40,'Balde com 5 Original','Balde com 5 unidades.',69.99,'CERVEJAS','',1),(41,'Long Neck Heineken','Long neck.',14.99,'CERVEJAS','',1),(42,'Corona','Long neck.',14.99,'CERVEJAS','',1),(43,'Skol Beats','Long neck.',14.99,'CERVEJAS','',1),(44,'Stella Artois','Long neck.',10.99,'CERVEJAS','',1),(45,'Smirnoff Ice','Long neck.',14.99,'CERVEJAS','',1),(46,'Xeque Mate','Drink pronto.',17.99,'CERVEJAS','',1),(47,'Água 500ml','Água mineral.',4.99,'NÃO ALCOÓLICOS','',1),(48,'Água com Gás 500ml','Água mineral gaseificada.',6.99,'NÃO ALCOÓLICOS','',1),(49,'Coca-Cola 350ml','Refrigerante lata.',6.99,'NÃO ALCOÓLICOS','',1),(51,'Guaraná 350ml','Refrigerante lata.',6.99,'NÃO ALCOÓLICOS','',1),(52,'Fanta Laranja 350ml','Refrigerante lata.',6.99,'NÃO ALCOÓLICOS','',1),(53,'Suco Del Valle 290ml','Suco Del Valle.',7.99,'NÃO ALCOÓLICOS','',1),(54,'Red Bull 250ml','Energético.',14.99,'NÃO ALCOÓLICOS','',1),(55,'Caipirinha de Saquê','Caipirinha preparada com saquê.',24.99,'DRINKS','',1),(56,'Caipirinha de Vodka','Caipirinha preparada com vodka.',24.99,'DRINKS','',1),(57,'Caipirinha de Cachaça','Caipirinha preparada com cachaça.',19.99,'DRINKS','https://res.cloudinary.com/dwdihtisq/image/upload/v1779547771/alameda-produtos/nxua8p4g9ufqsh5mq7uo.jpg',1),(58,'Coca-Cola Zero 350ml','Refrigerante zero açúcar.',6.99,'NÃO ALCOÓLICOS','',1),(59,'Rosh Narguile','Consulte os sabores disponíveis.',24.99,'TABACARIA','',1);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_admin`
--

DROP TABLE IF EXISTS `usuarios_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha_hash` varchar(255) NOT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` varchar(20) DEFAULT 'admin',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_admin`
--

LOCK TABLES `usuarios_admin` WRITE;
/*!40000 ALTER TABLE `usuarios_admin` DISABLE KEYS */;
INSERT INTO `usuarios_admin` VALUES (1,'Admin Alameda','admin@alameda.com','$2b$10$Y.tp2siqGJ2i3dvYN1DYruEzO7y9suiA4T4jwkvxirx7AFQv6nhdS',0,'2026-05-23 14:13:16','admin'),(4,'Gabriel Ferraresi','gabs_ferraresi@hotmail.com','$2b$10$ranQ1SJfTRTBWVuoxgc6UOLiBEWc9ZtMxViWsfZF2LWn/1HuroiXG',1,'2026-05-23 15:36:49','superadmin'),(5,'Pedro Ferraresi','phferraresi@gmail.com','$2b$10$fWGtJrykRW.8ljsOFbLYTO/gBP/uNmtLgAhvCTn7qZRLiFsPC6YzG',1,'2026-05-23 15:38:06','superadmin'),(6,'Teste','teste@gmail.com','$2b$10$TGkWmcj7a.ULQrs6Rqct9ehyar1FLrFGkRHYfuTZxI3CXBAw9AlZ6',0,'2026-05-23 15:59:05','admin');
/*!40000 ALTER TABLE `usuarios_admin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-25  9:05:54
