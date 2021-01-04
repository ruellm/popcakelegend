/*
Navicat MySQL Data Transfer

Source Server         : Heroku PopcakeLegend
Source Server Version : 50542
Source Host           : us-cdbr-iron-east-02.cleardb.net:3306
Source Database       : heroku_c1a80fc2baa89cf

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2015-07-17 11:54:27
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
INSERT INTO `level_settings` VALUES ('0', '45', '100', '50', '15', '180', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('1', '45', '100', '50', '15', '150', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('2', '45', '100', '50', '15', '150', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('3', '45', '100', '50', '15', '150', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('4', '45', '100', '50', '15', '150', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('5', '45', '100', '50', '10', '150', '20', '0', '0');
INSERT INTO `level_settings` VALUES ('6', '45', '100', '50', '15', '150', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('7', '45', '100', '50', '15', '180', '30', '0', '0');
INSERT INTO `level_settings` VALUES ('8', '25', '100', '50', '15', '120', '75', '0', '0');
INSERT INTO `level_settings` VALUES ('9', '45', '100', '50', '15', '150', '30', '0', '1');
