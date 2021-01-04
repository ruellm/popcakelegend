/*
Navicat MySQL Data Transfer

Source Server         : professor-brain-memory-live
Source Server Version : 50542
Source Host           : us-cdbr-iron-east-02.cleardb.net:3306
Source Database       : heroku_1b7688e1f88998a

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2015-09-21 21:52:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `price_settings`
-- ----------------------------
DROP TABLE IF EXISTS `price_settings`;
CREATE TABLE `price_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL DEFAULT '0',
  `price` float(11,2) DEFAULT NULL,
  `count` int(11) DEFAULT '1',
  `currency` int(11) DEFAULT '0',
  PRIMARY KEY (`id`,`type`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of price_settings
-- ----------------------------
INSERT INTO `price_settings` VALUES ('1', '1', '3.00', '1', '0');
INSERT INTO `price_settings` VALUES ('3', '3', '7.00', '1', '0');
INSERT INTO `price_settings` VALUES ('4', '4', '7.00', '1', '0');
INSERT INTO `price_settings` VALUES ('5', '4', '15.00', '3', '0');
INSERT INTO `price_settings` VALUES ('6', '4', '20.00', '5', '0');
INSERT INTO `price_settings` VALUES ('7', '5', '5.00', '15', '0');
INSERT INTO `price_settings` VALUES ('8', '6', '5.00', '30', '0');
INSERT INTO `price_settings` VALUES ('9', '7', '10.00', '1', '0');
INSERT INTO `price_settings` VALUES ('11', '0', '1.00', '1', '0');
INSERT INTO `price_settings` VALUES ('18', '9', '0.35', '30', '1');
INSERT INTO `price_settings` VALUES ('19', '9', '0.45', '50', '1');
INSERT INTO `price_settings` VALUES ('20', '9', '0.69', '100', '1');
INSERT INTO `price_settings` VALUES ('21', '9', '1.79', '300', '1');
INSERT INTO `price_settings` VALUES ('22', '9', '2.25', '500', '1');
