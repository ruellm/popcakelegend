/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : popcakelegend_pbm

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-11-29 11:21:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `level_statistics`
-- ----------------------------
DROP TABLE IF EXISTS `level_statistics`;
CREATE TABLE `level_statistics` (
  `duo_count` int(11) DEFAULT '0',
  `level_id` smallint(6) NOT NULL DEFAULT '0',
  `solo_count` int(11) DEFAULT '0',
  PRIMARY KEY (`level_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of level_statistics
-- ----------------------------
INSERT INTO `level_statistics` VALUES ('0', '1', '0');
INSERT INTO `level_statistics` VALUES ('0', '2', '0');
INSERT INTO `level_statistics` VALUES ('0', '3', '0');
INSERT INTO `level_statistics` VALUES ('0', '4', '0');
INSERT INTO `level_statistics` VALUES ('0', '5', '0');
INSERT INTO `level_statistics` VALUES ('0', '6', '0');
INSERT INTO `level_statistics` VALUES ('0', '7', '0');
INSERT INTO `level_statistics` VALUES ('0', '8', '0');
INSERT INTO `level_statistics` VALUES ('0', '9', '0');
INSERT INTO `level_statistics` VALUES ('0', '10', '0');
INSERT INTO `level_statistics` VALUES ('0', '11', '0');
INSERT INTO `level_statistics` VALUES ('0', '12', '0');
INSERT INTO `level_statistics` VALUES ('0', '13', '0');
INSERT INTO `level_statistics` VALUES ('0', '14', '0');
INSERT INTO `level_statistics` VALUES ('0', '15', '0');
INSERT INTO `level_statistics` VALUES ('0', '16', '0');
INSERT INTO `level_statistics` VALUES ('0', '17', '0');
INSERT INTO `level_statistics` VALUES ('0', '18', '0');
INSERT INTO `level_statistics` VALUES ('0', '19', '0');
