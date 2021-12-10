-- MySQL Script generated by MySQL Workbench
-- Fri Dec 10 01:39:41 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema drmusic
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `drmusic` ;

-- -----------------------------------------------------
-- Schema drmusic
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `drmusic` DEFAULT CHARACTER SET utf8 ;
USE `drmusic` ;

-- -----------------------------------------------------
-- Table `drmusic`.`user_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `drmusic`.`user_category` ;

CREATE TABLE IF NOT EXISTS `drmusic`.`user_category` (
  `id_user_category` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_user_category`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `drmusic`.`prod_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `drmusic`.`prod_category` ;

CREATE TABLE IF NOT EXISTS `drmusic`.`prod_category` (
  `id_prod_category` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_prod_category`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `drmusic`.`user_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `drmusic`.`user_status` ;

CREATE TABLE IF NOT EXISTS `drmusic`.`user_status` (
  `id_user_status` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_user_status`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `drmusic`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `drmusic`.`user` ;

CREATE TABLE IF NOT EXISTS `drmusic`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(60) NULL,
  `last_name` VARCHAR(60) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(100) NULL,
  `phone_number` VARCHAR(20) NULL,
  `address` VARCHAR(45) NULL,
  `creation_date` DATETIME NULL,
  `last_login` DATETIME NULL,
  `id_user_category` INT NOT NULL,
  `id_user_status` INT NOT NULL,
  `alt_phone_numnber` VARCHAR(20) NULL,
  `avatar` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_user`, `id_user_category`, `id_user_status`),
  CONSTRAINT `fk_users_user_category1`
    FOREIGN KEY (`id_user_category`)
    REFERENCES `drmusic`.`user_category` (`id_user_category`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_user_status1`
    FOREIGN KEY (`id_user_status`)
    REFERENCES `drmusic`.`user_status` (`id_user_status`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_users_user_category1_idx` ON `drmusic`.`user` (`id_user_category` ASC) VISIBLE;

CREATE INDEX `fk_users_user_status1_idx` ON `drmusic`.`user` (`id_user_status` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `drmusic`.`color`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `drmusic`.`color` ;

CREATE TABLE IF NOT EXISTS `drmusic`.`color` (
  `id_color` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_color`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `drmusic`.`prod_size`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `drmusic`.`prod_size` ;

CREATE TABLE IF NOT EXISTS `drmusic`.`prod_size` (
  `id_prod_size` INT NOT NULL AUTO_INCREMENT,
  `type` TINYINT NOT NULL,
  `height` DOUBLE NULL,
  `width` DOUBLE NULL,
  `depth` DOUBLE NULL,
  PRIMARY KEY (`id_prod_size`))
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `drmusic`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `drmusic`.`product` ;

CREATE TABLE IF NOT EXISTS `drmusic`.`product` (
  `id_product` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL,
  `brand` VARCHAR(45) NULL,
  `creation_date` DATETIME NULL,
  `modif_date` DATETIME NULL,
  `active` TINYINT(1) NOT NULL,
  `id_colors` INT NOT NULL,
  `id_prod_category` INT NOT NULL,
  `id_prod_size` INT NULL,
  PRIMARY KEY (`id_product`),
  CONSTRAINT `fk_products_colors1`
    FOREIGN KEY (`id_colors`)
    REFERENCES `drmusic`.`color` (`id_color`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_prod_category1`
    FOREIGN KEY (`id_prod_category`)
    REFERENCES `drmusic`.`prod_category` (`id_prod_category`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_prod_size1`
    FOREIGN KEY (`id_prod_size`)
    REFERENCES `drmusic`.`prod_size` (`id_prod_size`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_products_colors1_idx` ON `drmusic`.`product` (`id_colors` ASC) VISIBLE;

CREATE INDEX `fk_products_prod_category1_idx` ON `drmusic`.`product` (`id_prod_category` ASC) VISIBLE;

CREATE INDEX `fk_product_prod_size1_idx` ON `drmusic`.`product` (`id_prod_size` ASC) VISIBLE;

CREATE UNIQUE INDEX `id_prod_size_UNIQUE` ON `drmusic`.`product` (`id_prod_size` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `drmusic`.`prod_price`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `drmusic`.`prod_price` ;

CREATE TABLE IF NOT EXISTS `drmusic`.`prod_price` (
  `id_prod_price` INT NOT NULL AUTO_INCREMENT,
  `price` DOUBLE NOT NULL,
  `creation_date` DATETIME NOT NULL,
  `modif_date` DATETIME NULL,
  `active` TINYINT NOT NULL,
  `id_product` INT NOT NULL,
  PRIMARY KEY (`id_prod_price`),
  CONSTRAINT `fk_prod_price_products1`
    FOREIGN KEY (`id_product`)
    REFERENCES `drmusic`.`product` (`id_product`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_prod_price_products1_idx` ON `drmusic`.`prod_price` (`id_product` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `drmusic`.`prod_image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `drmusic`.`prod_image` ;

CREATE TABLE IF NOT EXISTS `drmusic`.`prod_image` (
  `id_prod_image` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `main` TINYINT NULL,
  `order` INT NULL,
  `id_product` INT NOT NULL,
  PRIMARY KEY (`id_prod_image`),
  CONSTRAINT `fk_prod_images_products1`
    FOREIGN KEY (`id_product`)
    REFERENCES `drmusic`.`product` (`id_product`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_prod_images_products1_idx` ON `drmusic`.`prod_image` (`id_product` ASC) VISIBLE;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
