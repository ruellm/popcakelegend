/*
Navicat MySQL Data Transfer

Source Server         : Heroku PopcakeLegend
Source Server Version : 50542
Source Host           : us-cdbr-iron-east-02.cleardb.net:3306
Source Database       : heroku_c1a80fc2baa89cf

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2015-07-17 11:54:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `monetize`
-- ----------------------------
DROP TABLE IF EXISTS `monetize`;
CREATE TABLE `monetize` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fbid` bigint(20) NOT NULL DEFAULT '0',
  `type` int(11) DEFAULT NULL,
  `level_id` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT '0',
  PRIMARY KEY (`id`,`fbid`)
) ENGINE=InnoDB AUTO_INCREMENT=36792 DEFAULT CHARSET=latin1;

