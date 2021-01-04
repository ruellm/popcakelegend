/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : popcakelegend_pbm

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-11-29 11:10:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `level_settings`
-- ----------------------------
DROP TABLE IF EXISTS `level_settings`;
CREATE TABLE `level_settings` (
  `level_id` int(11) NOT NULL,
  `hits` int(11) DEFAULT '60',
  `points_per_hits` int(11) DEFAULT '15',
  `points_per_time` int(11) DEFAULT '15',
  `seconds` int(11) DEFAULT '15',
  `clock_limit` int(11) DEFAULT '-1',
  `points_per_challenge` int(11) DEFAULT '10',
  `minimum_trophy` int(11) DEFAULT '0',
  `hidden` int(11) DEFAULT '0',
  PRIMARY KEY (`level_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of level_settings
-- ----------------------------
INSERT INTO `level_settings` VALUES ('0', '45', '15', '10', '15', '180', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('1', '45', '15', '10', '15', '150', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('2', '45', '15', '10', '15', '150', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('3', '45', '15', '10', '15', '150', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('4', '45', '15', '10', '15', '150', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('5', '45', '15', '10', '15', '150', '20', '0', '0');
INSERT INTO `level_settings` VALUES ('6', '45', '15', '10', '10', '150', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('7', '45', '15', '10', '15', '180', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('8', '45', '15', '10', '15', '210', '75', '0', '0');
INSERT INTO `level_settings` VALUES ('9', '25', '75', '10', '15', '120', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('10', '45', '15', '10', '0', '180', '30', '0', '1');
INSERT INTO `level_settings` VALUES ('11', '35', '30', '10', '10', '150', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('12', '45', '20', '10', '15', '180', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('13', '45', '20', '10', '15', '180', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('14', '45', '20', '10', '5', '180', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('15', '45', '15', '10', '15', '180', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('16', '50', '20', '10', '0', '180', '30', '0', '1');
INSERT INTO `level_settings` VALUES ('17', '45', '20', '10', '5', '180', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('18', '45', '20', '10', '15', '180', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('19', '45', '20', '10', '0', '180', '30', '0', '1');
