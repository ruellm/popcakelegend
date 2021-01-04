/*
Navicat MySQL Data Transfer

Source Server         : professor-brain-memory-live
Source Server Version : 50542
Source Host           : us-cdbr-iron-east-02.cleardb.net:3306
Source Database       : heroku_1b7688e1f88998a

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2015-09-20 21:40:32
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
  `email` text,
  PRIMARY KEY (`id`,`fbid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
