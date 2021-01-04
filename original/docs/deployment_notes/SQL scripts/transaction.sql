/*
Navicat MySQL Data Transfer

Source Server         : Heroku PopcakeLegend
Source Server Version : 50542
Source Host           : us-cdbr-iron-east-02.cleardb.net:3306
Source Database       : heroku_c1a80fc2baa89cf

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2015-07-17 11:54:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `transaction`
-- ----------------------------
DROP TABLE IF EXISTS `transaction`;
CREATE TABLE `transaction` (
  `transact_id` int(11) NOT NULL AUTO_INCREMENT,
  `fbid` bigint(20) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `currency` text,
  `payment_id` bigint(20) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `date` text,
  PRIMARY KEY (`transact_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;
