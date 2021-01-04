/**
    level_123.js
    Level 1 to 3 data and challenges information
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Oct 17, 2012
*/

function Level_1_Init() {
  
  // Level 1 Tutorial Level
    var level = new Level();
    level.type_flag = [
            1, 1, 1,
            1, 1, 1,
            0, 0, 0,
            3,
			0, 0, 0];
    
    level.id = 0;
    level.Generate();
    level.clock_limit = 180;    // 5 minutes
	level.level_name = ["TUTORIAL"];
    level.challenges_list = new Array();
    level.msg = ["- Delicious tutorial", "- 15 seconds to memorize",
        "- 60 hits and 5 minutes to complete", " 10 challenges",
        "Bon appetit!"];

    // challenge 1
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 1;
    level.challenges_list.push(challenge);

    // challenge 2
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 1;
    level.challenges_list.push(challenge);

   // challenge 3
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 1;
    level.challenges_list.push(challenge);

    // challenge 4
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 5
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 6
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 7
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 8
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 9
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 10
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);
    //...
   
    // In level 1, there will be at least 1 neutral icon to be 
    // discovered
    for (var i = 0; i < level.challenges_list.length; i++) {
        var challenge = level.challenges_list[i];
        var found = false;
        for (var j = 0; j < challenge.icons.length; j++) {
            if (challenge.icons[j] == ICON_TYPE_NEUTRAL) {
                found = true;
                break;
            }
        }

        if (!found) {
            //insert random neutral everywhere
            var pos = Math.floor(Math.random() * challenge.icons.length);
            challenge.icons[pos] = ICON_TYPE_NEUTRAL;
        }
    }
    
    return level;
}

function Level_2_Init() {

    // Level 1 Tutorial Level
    var level = new Level();
    level.type_flag = [
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
            0,
			0, 0, 0];

    level.id = 1;
    level.Generate();
    level.clock_limit = 180;    // 5 minutes
	level.level_name = ["SHORT-TERM","MEMORY"];
    level.challenges_list = new Array();
    level.msg = ["- 3 new cakes", "- 15 seconds to memorize",
        "- 60 hits and 5 minutes to complete", " 10 challenges",
        "Enjoy your lunch!"];

    // challenge 1
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 2
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 3
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 4
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 5
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 6
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 7
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 8
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 9
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 10
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);
    
    return level;
}

function Level_3_Init() {

    // Level 1 Tutorial Level
    var level = new Level();
    level.type_flag = [
            1, 1, 1,
            0, 0, 0,
            1, 1, 1,
            3,
			0, 0, 0];

    level.id = 2;
    level.Generate();
    level.clock_limit = 180;    // 5 minutes
	level.level_name = ["PROCEDURAL","MEMORY"];
    level.challenges_list = new Array();
    level.msg = ["- 2 Jumping Cakes", "- 15 seconds to memorize",
      "- 60 hits and 5 minutes to complete", " 10 challenges",
      "So delicious !"];

    // challenge 1
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    level.challenges_list.push(challenge);

    // challenge 2
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    level.challenges_list.push(challenge);

    // challenge 3
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
	challenge.switch_icon = false;	
    level.challenges_list.push(challenge);
    
    // challenge 4
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    challenge.switch_icon = true;
    challenge.switch_count = 2;
    level.challenges_list.push(challenge);

    // challenge 5
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    level.challenges_list.push(challenge);

    // challenge 6
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
	challenge.switch_icon = false;
    level.challenges_list.push(challenge);
    
    // challenge 7
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    challenge.switch_icon = true;
    challenge.switch_count = 2;    
	level.challenges_list.push(challenge);

    // challenge 8
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 9
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 10
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    return level;
}

function Level_4_Init()
{
    // Level 1 Tutorial Level
    var level = new Level();
    level.type_flag = [
            1, 1, 1,
            1, 1, 1,
            0, 0, 0,
            3,
			0, 0, 0];

    level.id = 3;
    level.Generate();
    level.clock_limit = 180;    // 5 minutes
	level.level_name = ["SPATIAL","MEMORY"];
    level.challenges_list = new Array();
    level.msg = ["- Service on a Rotating Plate", "- 15 seconds to memorize",
        "- 60 hits and 5 minutes to complete", " 10 challenges",
        "A memorable dessert !"];

    // challenge 1
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    level.challenges_list.push(challenge);

    // challenge 2
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    level.challenges_list.push(challenge);

    // challenge 3
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    level.challenges_list.push(challenge);
    
    // challenge 4
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    challenge.rotate = true;
    challenge.rotate_angle = 90;
    level.challenges_list.push(challenge);

    // challenge 5
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    level.challenges_list.push(challenge);

    // challenge 6
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    level.challenges_list.push(challenge);

    // challenge 7
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    challenge.rotate = true;
    challenge.rotate_angle = 180;
    level.challenges_list.push(challenge);

    // challenge 8
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    level.challenges_list.push(challenge);

    // challenge 9
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    challenge.rotate = false;
    level.challenges_list.push(challenge);

    // challenge 10
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    level.challenges_list.push(challenge);
    
    level.fnEvaluate = Level4_Evaluate; 
    level.level_cond_errmsg = ["YOU NEED 80 STARS TO UNLOCK LEVEL 5.", "KEEP PLAYING!"];
								 
    return level;
}

function Level_5_Init() {
    // Level 1 Tutorial Level
    var level = new Level();
    level.type_flag = [
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
            0,
			0, 0, 0];

    level.id = 4;
    level.Generate();
    level.clock_limit = 180;    // 5 minutes
	level.level_name = ["SEQUENTIAL","MEMORY"];
    level.challenges_list = new Array();
    level.msg = ["- Perfectly Ordered Service", "- 15 seconds to memorize",
        "- 60 hits and 5 minutes to complete", " 10 challenges",
        "Bon appetit !"];

    // challenge 1
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    challenge.inorder = true;
    level.challenges_list.push(challenge);

    // challenge 2
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    challenge.inorder = true;
    level.challenges_list.push(challenge);

    // challenge 3
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    challenge.inorder = true;
    level.challenges_list.push(challenge);

    // challenge 4
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    challenge.inorder = true;
    level.challenges_list.push(challenge);

    // challenge 5
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    challenge.inorder = true;
    level.challenges_list.push(challenge);

    // challenge 6
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    challenge.inorder = true;
    level.challenges_list.push(challenge);

    // challenge 7
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    challenge.inorder = true;
    level.challenges_list.push(challenge);

    // challenge 8
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    challenge.inorder = true;
    level.challenges_list.push(challenge);

    // challenge 9
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    challenge.inorder = true;
    level.challenges_list.push(challenge);

    // challenge 10
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    challenge.inorder = true;
    level.challenges_list.push(challenge);


    return level;
}

function Level_6_Init()
{
    // Level 1 Tutorial Level
    var level = new Level();
    level.type_flag = [
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
            0,
			0, 0, 0];

    level.id = 5;
    level.Generate();
	level.level_name = ["STRESS","MEMORY"];
    level.challenges_list = new Array();
    level.clock_limit = 180;			// 5 minutes
    level.point_per_challenge = 15;
    level.points_per_hits = 20;
    level.points_per_time = 20;
    level.seconds = 10;
    level.msg = ["- Rush Hour & Fast Service", "- 15 seconds to memorize",
        "- 50 hits and 5 minutes to complete", " 10 challenges",
        "Go, go, go !"];

    // challenge 1
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);
    
    // challenge 2
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);
    // challenge 3
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 4
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 5
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 6
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 7
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 8
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 9
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 10
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);
   
    return level;
}

function Level_7_Init()
{
    var level = new Level();
    level.type_flag = [
            0, 0, 0,
            1, 1, 1,
            1, 1, 1,
            0,
			1, 1, 1];

    level.id = 6;
    level.Generate();
	level.level_name = ["INSTANT","MEMORY"];
    level.challenges_list = new Array();
    level.point_per_challenge = 15;
    level.points_per_hits = 20;
    level.points_per_time = 20;
    level.correct_flipback = true;

    level.clock_limit = 180;    // 5 minutes
    level.msg = ["- All you can eat", "- 15 seconds to memorize",
        "- Discovered Icons are closed back",
        "- 50 hits and 5 minutes to complete", " 10 challenges",
        "Miam, miam !"];

    // challenge 1
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 2
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 3
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 4
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 5
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 6
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 7
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 8
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 9
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 10
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);


    // Replace Pink cakes with brown
  /*  for (var i = 0; i < level.board.length; i++) {
        if (level.board[i] == ICON_TYPE_POPCAKES_PINK) {
            level.board[i] = ICON_TYPE_POPCAKES_BROWN;
        } else if (level.board[i] == ICON_TYPE_CUPCAKE_PINK) {
            level.board[i] = ICON_TYPE_CUPCAKE_BROWN;
        } if (level.board[i] == ICON_TYPE_ECLAIRS_PINK) {
            level.board[i] = ICON_TYPE_ECLAIRS_BROWN;
        }
    }

    for (var i = 0; i < level.challenges_list.length; i++) {
        var challenge = level.challenges_list[i];
        for (var j = 0; j < challenge.icons.length; j++) {
            if (challenge.icons[j] == ICON_TYPE_POPCAKES_PINK) {
                challenge.icons[j] = ICON_TYPE_POPCAKES_BROWN;
            } else if (challenge.icons[j] == ICON_TYPE_CUPCAKE_PINK) {
                challenge.icons[j] = ICON_TYPE_CUPCAKE_BROWN;
            } if (challenge.icons[j] == ICON_TYPE_ECLAIRS_PINK) {
                challenge.icons[j] = ICON_TYPE_ECLAIRS_BROWN;
            }
        }
    }*/
	
    return level;
}

function Level_8_Init() {
    // Level 1 Tutorial Level
    var level = new Level();
    level.type_flag = [
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
            0,
			0, 0, 0];

    level.id = 7;
    level.Generate();
	level.level_name = ["PROCEDURAL","MEMORY"];
    level.challenges_list = new Array();
    level.point_per_challenge = 15;
    level.points_per_hits = 20;
    level.points_per_time = 20;
    level.clock_limit = 210;    // 5 minutes
    level.msg = ["- 3 Crazy Flying Cakes", "- 15 seconds to memorize",
        "- 50 hits and 5 minutes to complete", " 10 challenges",
        "Bon appetit !"];

    // challenge 1
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    level.challenges_list.push(challenge);

    // challenge 2
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    level.challenges_list.push(challenge);

    // challenge 3
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
	challenge.switch_icon = false;
    level.challenges_list.push(challenge);

    // challenge 4
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
	challenge.switch_icon = true;
    challenge.switch_count = 3;
    level.challenges_list.push(challenge);

    // challenge 5
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    challenge.switch_icon = false;
    level.challenges_list.push(challenge);

    // challenge 6
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 7
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
	challenge.switch_icon = true;
    challenge.switch_count = 2;
    level.challenges_list.push(challenge);

    // challenge 8
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 9
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 4);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);

    // challenge 10
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    challenge.goodIcon = 0;
    level.challenges_list.push(challenge);
    
    level.fnEvaluate = Level8_Evaluate;
    level.level_cond_errmsg = ["YOU NEED 2 GOLD TROPHIES TO UNLOCK LEVEL 9.", "KEEP PLAYING!"]; 
		 

    return level;
}

function Level_9_Init() {
    // Level 1 Tutorial Level
    var level = new Level();
    level.type_flag = [
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
            0,
			0, 0, 0];

    level.id = 8;
    level.Generate();
	level.level_name = ["INSTANT","MEMORY"];
    level.challenges_list = new Array();
    level.number_of_hits = 25;          //Decreased to 50
    level.point_per_challenge = 75;
    level.points_per_hits = 20;
    level.points_per_time = 20;
    level.clock_limit = 120;				// 2 minutes

    level.msg = ["- Saturday Night Fever", "- 15 seconds to memorize",
       "- 50 hits and 2 minutes to complete", " 10 challenges",
       "Faster, faster, faster !"];

    var icons_flag = [ 0, 1, 2, 3, 4, 5, 6, 7, 8];
    var random = Math.floor(Math.random() * ICON_TYPE_NEUTRAL);
    icons_flag.push(random);
    icons_flag = shuffleArray(icons_flag);

    for (var k = 0; k < 10; k++) {
        var challenge = new Challenge();
        challenge.icons = new Array();
        challenge.icons.push(icons_flag[k]);
        level.challenges_list.push(challenge);
    }

    return level;
}

function Level_10_Init()
{
    var level = new Level();
    level.type_flag = [
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
            0,
			0, 0, 0];

    level.id = 9;
    level.Generate();
	level.level_name = ["WORKING","MEMORY"];
    level.challenges_list = new Array();
    level.point_per_challenge = 15;
    level.points_per_hits = 20;
    level.points_per_time = 20;
    level.hidden = true;
    level.clock_limit = 180;    // 5 minutes
    level.msg = ["- Memorable Breakfast",
        "- I lost the menu, sorry for", "  inconvenience",
        "- 50 hits and 5 minutes to complete", " 10 challenges",
        "A bientot les amis!"];

    // challenge 1
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    level.challenges_list.push(challenge);

    // challenge 2
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    level.challenges_list.push(challenge);

    // challenge 3
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    level.challenges_list.push(challenge);

    // challenge 4
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    level.challenges_list.push(challenge);

    // challenge 5
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    level.challenges_list.push(challenge);

    // challenge 6
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    level.challenges_list.push(challenge);

    // challenge 7
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    level.challenges_list.push(challenge);

    // challenge 8
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    level.challenges_list.push(challenge);

    // challenge 9
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 2);
    level.challenges_list.push(challenge);

    // challenge 10
    var challenge = new Challenge();
    challenge.GenerateIcons(level.type_flag, 3);
    level.challenges_list.push(challenge);
    return level;
}