/*
Navicat MySQL Data Transfer

Source Server         : Heroku PopcakeLegend
Source Server Version : 50542
Source Host           : us-cdbr-iron-east-02.cleardb.net:3306
Source Database       : heroku_c1a80fc2baa89cf

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2015-07-17 11:53:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fbid` bigint(20) NOT NULL,
  `coins` int(11) NOT NULL DEFAULT '100',
  `epoch` bigint(20) DEFAULT '0',
  `last_login` text,
  `total_score` bigint(20) DEFAULT '0',
  `life` int(11) DEFAULT NULL,
  `name` text,
  `max_level` int(11) DEFAULT '0',
  `D` int(11) DEFAULT '5',
  `D_claim_flag` int(11) DEFAULT '0',
  `gift_count` int(11) DEFAULT '0',
  `gift_give_date` text,
  `theme` int(11) DEFAULT '0',
  `fr_gift_date` text,
  `spv_flag` int(11) DEFAULT '0',
  PRIMARY KEY (`id`,`fbid`)
) ENGINE=InnoDB AUTO_INCREMENT=82832 DEFAULT CHARSET=latin1;
