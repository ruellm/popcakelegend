/*
Navicat MySQL Data Transfer

Source Server         : Heroku PopcakeLegend
Source Server Version : 50542
Source Host           : us-cdbr-iron-east-02.cleardb.net:3306
Source Database       : heroku_c1a80fc2baa89cf

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2015-07-17 11:54:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `level`
-- ----------------------------
DROP TABLE IF EXISTS `level`;
CREATE TABLE `level` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fbid` bigint(20) NOT NULL,
  `level_id` int(11) NOT NULL,
  `time_complete` int(11) DEFAULT '0',
  `lives_remain` int(11) NOT NULL,
  `stars` int(11) NOT NULL DEFAULT '0',
  `score` bigint(20) NOT NULL DEFAULT '0',
  `hits` int(11) NOT NULL DEFAULT '0',
  `errors` int(11) DEFAULT '0',
  `extra` int(11) DEFAULT '0',
  PRIMARY KEY (`id`,`fbid`,`level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46662 DEFAULT CHARSET=latin1;
