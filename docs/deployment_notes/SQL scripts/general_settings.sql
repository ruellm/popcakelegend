/*
Navicat MySQL Data Transfer

Source Server         : PBM live
Source Server Version : 50542
Source Host           : us-cdbr-iron-east-02.cleardb.net:3306
Source Database       : heroku_1b7688e1f88998a

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2016-01-01 07:45:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `general_settings`
-- ----------------------------
DROP TABLE IF EXISTS `general_settings`;
CREATE TABLE `general_settings` (
  `name` text,
  `value` int(11) DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of general_settings
-- ----------------------------
INSERT INTO `general_settings` VALUES ('Lives', '5', '1');
INSERT INTO `general_settings` VALUES ('Coins', '100', '2');
INSERT INTO `general_settings` VALUES ('Life Minutes', '45', '3');
