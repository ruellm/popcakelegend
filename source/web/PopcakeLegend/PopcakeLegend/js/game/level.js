/**
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

    //IF level has some process that will happen AFTER the PREVIEW and flip back
    //example: the board is rotated after flip back, etc. this is an array
    // pre process type
    // 0: rotate hidden (not show icons during before & after rotate)
    // 1: switch hidden (not show icons during before & after switch)
    // 2: move line
    this.pre_process = null;

    // how many cards are hidden at start of level
    // milestone 6 - level 14
    this.cards_hidden = 0;

    //hidden challenge, visible board -- Milestone 6, level 16
    this.inverted = false;

    // tutorial flag
    this.tutorial = false;
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

    //flag to redo/reshuffle again with preprocess and stuff
    this.redo_level = false;

    this.count = 0;

    // set this to true for in_order levels that needs to be redone
    // when there is a mistake
    this.inorder_repeat = false;

    //shapes type
    //-1 : None
    // 0 : circle
    // 1 : square
    // 2 : triangle
    this.shape_type = -1;

    // movement per line
    // milestone 6 - level 18
    // this is an array of movement/position
    // movement is only 1 block/card shift
    // null array : no data
    // 0: no movement
    // 1: move to the left
    // 2: move to the right
    this.move_line = null;
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
        flag_copy[type]--;
    }
}
