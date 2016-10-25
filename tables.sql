-- Execute this on your local mariadb server to bring the tables up
CREATE TABLE `blokweb_api`.`user` (
  `userId` INT NOT NULL,
  `hvaId` VARCHAR(10) NULL,
  `name` TINYTEXT NULL,
  `email` TINYTEXT NULL,
  `lastlogin` TIMESTAMP NULL,
  PRIMARY KEY (`userId`));

CREATE TABLE `blokweb_api`.`verhalen` (
  `verhaalId` INT UNSIGNED NOT NULL,
  `userId` INT NOT NULL,
  `categories` TEXT NULL,
  `tags` TEXT NULL,
  `titel` TINYTEXT NULL,
  `imglink` TINYTEXT NULL,
  PRIMARY KEY (`verhaalId`));
