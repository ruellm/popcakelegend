﻿/**
    level.js
    the level base class, each level contains multiple challenges
    there can only one board generated per level, this board is similar
    and playedd across all challenges.
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Oct 17, 2012
*/


function Level() {
   
    // level id
    this.id = -1;

    // the flag count of each type in the level
    this.type_flag = [-1, -1, -1,
                      -1, -1, -1,
                      -1, -1, -1];

    // List of challenges for this level
    this.challenges_list = null;

    // the playing board
    this.board = [-1, -1, -1,
                  -1, -1, -1,
                  -1, -1, -1];

    // number of hits
    this.number_of_hits = 45;

    // points per hits remain
    this.points_per_hits = 10;

    // points per time remain
    this.points_per_time = 10;

    // this seconds stay for teaser
    this.seconds = 15;

    // clock limit
    this.clock_limit = -1;

    // the total star recieved
    this.star_total = 0;

    // Point per challenge
    this.point_per_challenge = 15;

    // minimum trophy
    this.minimum_trophy = 0;    // 1-bronze, 2-silver, 3-gold

    // is this hidden at first?
    this.hidden = false;

    // objective strings
    this.msg = ["Test", "Good Luck!"];

    //Level access condition
    this.fnEvaluate = null;
    this.level_cond_errmsg = null;

    //flipped back the correct icon
    this.correct_flipback = false;
	
	//formal level name
	this.level_name = [""];
}

function Challenge() {
    // icon to discover, the number of icon to 
    // discover is the 'length' of the array
    this.icons = null;

    // good icon count
    this.goodIcon = 0;

    // switch icon
    this.switch_icon = false;
    this.switch_count = 0;

    // does this rotate
    this.rotate = false;

    //rotate angle
    this.rotate_angle = 0;

    // THis should be in order?
    this.inorder = false;

    this.count = 0;
    ////////////////////////////////////////////////////////////
    //TODO: minimum to complete, BRONZE/GOLD
    ////////////////////////////////////////////////////////////
}

Level.prototype.Generate = function () {
    // copy flag data
    for (var i = 0; i < this.board.length; i++) {
        this.board[i] = -1;
    }

    var flag_copy = new Array();
    for (var i = 0; i < this.type_flag.length; i++) {
        flag_copy[i] = this.type_flag[i];
    }

    var count = 0;
    do {
        var type = Math.floor(Math.random() * ICON_TYPE_COUNT);
        if (flag_copy[type] <= 0) continue;

        while (1) {
            var pos = Math.floor(Math.random() * 9);
            if (this.board[pos] == -1) {
                this.board[pos] = type;
                flag_copy[type]--;
                ++count;
                break;
            }
        }

    } while (count < 9);
}

Level.prototype.RegenerateChallenge = function (index)
{
    this.challenges_list[index].GenerateIcons(this.type_flag,
        this.challenges_list[index].count);
}

Challenge.prototype.GenerateIcons = function (flag, count) {
    this.count = count;
    var flag_copy = new Array();
    for (var i = 0; i < flag.length; i++) {
        flag_copy[i] = flag[i];
    }

    this.icons = new Array();
    while (this.icons.length < count) {
        var type = Math.floor(Math.random() * ICON_TYPE_COUNT);
        if (flag_copy[type] <= 0) continue;

        this.icons.push(type);
        flag_copy[type] = 0;
    }
}
