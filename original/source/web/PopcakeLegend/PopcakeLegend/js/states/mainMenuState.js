/**
    Class for Main demo
	Sprite tester
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: Feb 04, 2014
*/

var g_globalAudio = new AudioBG();

function MainMenuState() {
    // State ID 
    this._stateID = MAIN_MENU_STATE;
    this.displayText = true;
}

// set base class to State
MainMenuState.prototype = new State;

MainMenuState.prototype.Load = function () {
	this._uimanager = new UIManager();
    this._animator = new Animator();
    this._animator.Set(2);

	this.board = new ImageObject();
	this.board.Load("images/splash/welcome-screen_board.png");

    //this.logo = new ImageObject();
    //this.logo.Load("images/splash/welcome-screen-logo.png");
	this.logo = new AnimatedObject();
	this.logo.Load("images/splash/pop-cake-title-.png");
	this.logo.Set(10, 2.0, true);
	this.logo._frameWidth = 4421 / 10;
	

	this.playsolo = new Button;
	this.playsolo.LoadImages(
          "images/splash/play-solo-duo-button.png",
        "images/splash/play-solo-duo-hover-button.png",
        "images/splash/play-solo-duo-button.png");

   
	this.playsolo._Y = 538;
	this.playsolo._width = 292;
	this.playsolo._height = 61;
	this.playsolo._fnMouseDownEvnt = (function () {
      //  g_gameMode = GAME_MODE_SOLO;
        g_Engine.SetState(GENERAL_LEVEL_STATE);
    });

    if (g_gameData.theme == THEME_TYPE_DEFAULT) {
        this.playsolo._X = 320;
    } else if (g_gameData.theme == THEME_TYPE_SAMPLE) {
        this.playsolo._X = 430;
    }
    
    this.glowImg = new GlowImage();
    this.glowImg.Load("images/splash/play-solo-duo-button-glow.png", 60);

    this._uimanager.Add(this.playsolo);

    this.LoadTheme();

    this.angle = 0;
	
	this.fglogo = new ImageObject();
	this.fglogo.Load("images/FG-Logo.png");


	var random = Math.floor(Math.random() * 2);
	if (random % 2 == 0) {
	    this.objectiveWindow = new ADDXWindow;
	} else {
	    this.objectiveWindow = new PBMWindow;
	}

	this.objectiveWindow.Load();
	this.objectiveWindow.Show();

	var context = this;
	this.objectiveWindow.fnClose = function () {
	    context.objectiveWindow = 0;
	};
}

MainMenuState.prototype.LoadTheme = function ()
{
    switch (g_gameData.theme) {
        case THEME_TYPE_DEFAULT:
            this.bg = new ImageObject();
            this.bg.Load("images/themes/default/background-green-garden.png");

            this.bg_sky = new ImageObject();
            this.bg_sky.Load("images/themes/default/background-blue.png");

            this.bg_ray = new ImageObject();
            this.bg_ray.Load("images/themes/default/sunrays.png");

            //this.char1 = new ImageObject();
            //this.char1.Load("images/themes/default/welcome-screen_baker.png");
            this.char1 = new BlinkSprite();
            this.char1.Load("images/themes/default/Welcome-screen-baker.png", 6, 4, 333 );

            this.char2 = new ImageObject();
            this.char2.Load("images/themes/default/welcome-screen_baker-front-fingers.png");
          
            //this.baker = new AnimatedObject();
           // this.baker.Load("images/themes/default/welcome_baker_anim.png");
           // this.baker.Set(4, 2.0, true);
          //  this.baker._frameWidth = 1346 / 4;
            
            this.cloudManager = new CloudManager();
            this.cloudManager.CLOUD_BORDER_Y = 230;
            this.cloudManager.imageList = [
                    "images/themes/default/cloud-1.png",
                    "images/themes/default/cloud-2.png",
                    "images/themes/default/cloud-3.png"];
            this.cloudManager.InitClouds();

            this.walldorf = new ImageObject();
            this.walldorf.Load("images/WG-Logo-Black.png");

            break;
        case THEME_TYPE_SAMPLE:
            this.bg = new ImageObject();
            this.bg.Load("images/themes/sample/customised-welcome-screen-bg.png");

            //this.char1 = new ImageObject();
            //this.char1.Load("images/themes/sample/male-baker-for-welcomeScreen.png");

            //this.char2 = new ImageObject();
            //this.char2.Load("images/themes/sample/lady-baker-for-welcomeScreen.png");

            this.char1 = new BlinkSprite();
            this.char1.Load("images/themes/sample/elephant-Charactor_genlevel.png", 6, 10, 2238 / 6);
            this.char1.blink_sec = 5;
            
            this.char2 = new BlinkSprite();
            this.char2.Load("images/themes/sample/squirrel-Charactor_genlevel.png", 6, 10, 1528 / 6);
            this.char2.blink_sec = 2;
            
            this.walldorf = new ImageObject();
            this.walldorf.Load("images/WG-Logo-White.png");
            break;
    }
}

MainMenuState.prototype.Update = function (elapsed) {

    if (this.objectiveWindow) {
        this.objectiveWindow.Update(elapsed);
        return;
    }

    this.glowImg.Update(elapsed);
    this._uimanager.Update(elapsed);

    if (g_gameData.theme == THEME_TYPE_DEFAULT) {
        this.angle += 30 * elapsed;
        this.cloudManager.Update(elapsed);
    }

    g_globalAudio.Update();
    this.logo.Update(elapsed);
    this.char1.Update(elapsed);
    this.char2.Update(elapsed);
}



MainMenuState.prototype.Draw = function (gfx) {

    gfx.FillRect(0, 0, gfx.GetRenderWidth(), gfx.GetRenderHeight(), "rgb(255,255,255)");
	var logo_y = 0;
	var logo_x = 0;
	switch (g_gameData.theme) {
	    case THEME_TYPE_DEFAULT:
	       
	        this.bg_sky.Draw(gfx, 0, 0);

	        ////////////////////////////////////////////////////////
	        var cxscreen = DEFAULT_WINDOW_WIDTH / 2;
	        var cyscreen = (DEFAULT_WINDOW_HEIGHT / 2);
	        var radial_cx = this.bg_ray._image.width / 2;
	        var radial_cy = this.bg_ray._image.height / 2;
	        var diffx = radial_cx - cxscreen;
	        var diffy = radial_cy - cyscreen;
	        gfx.DrawRotateFull(-diffx, -diffy, radial_cx, radial_cy,
                this.angle, this.bg_ray._image, 1.0);
	        ////////////////////////////////////////////////////////

	        this.cloudManager.Draw(gfx);
	        this.bg.Draw(gfx, 0, 0);

	     //   this.baker._X = 647;
	       // this.baker._Y = 100;
	        //this.baker.Draw(gfx);
	        this.char1.Draw(gfx, 647, 100);	      
			logo_y = 730;
			logo_x   = 860;
	        break;
	    case THEME_TYPE_SAMPLE:
	        this.bg.Draw(gfx,
		        (DEFAULT_WINDOW_WIDTH / 2) - (this.bg._image.width / 2),
		        (DEFAULT_WINDOW_HEIGHT / 2) - (this.bg._image.height / 2));

			logo_y = 39;
			logo_x = 759;
	        break;
	}

	var boardX = 318;
	var boardY = 228;
	if (g_gameData.theme == THEME_TYPE_DEFAULT) {
	    boardX = 200;
	}

    this.board.Draw(gfx, boardX, boardY);

    if (g_gameData.theme == THEME_TYPE_DEFAULT) {
        this.char2.Draw(gfx, 600, 208);
       
    }

    this.logo._X = boardX + 20;
    this.logo._Y = (DEFAULT_WINDOW_HEIGHT / 2) - (this.logo._image.height / 2);
    this.logo.Draw(gfx);

   /* this.logo.Draw(gfx,
        boardX + 20,
       (DEFAULT_WINDOW_HEIGHT / 2) - (this.logo._image.height / 2));
       */

    this.glowImg._X = this.playsolo._X-38;
	this.glowImg._Y = 505;
	this.glowImg.Draw(gfx);
	this._uimanager.Draw(gfx);

	if (g_gameData.theme == THEME_TYPE_SAMPLE) {
	  this.char2.Draw(gfx, 824, 423);
        this.char1.Draw(gfx, 64, 321);
	}

	
	this.walldorf.Draw(gfx, logo_x,logo_y);	
	this.fglogo.Draw(gfx, 39, logo_y);
	
	if (this.objectiveWindow) {
	    this.objectiveWindow.Draw(gfx);
	    return;
	}
 }


///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
MainMenuState.prototype.Unload = function () {
    this.CleanupUIManager();
}

MainMenuState.prototype.EventHandler = function (e) {
    if (this.objectiveWindow) {
        this.objectiveWindow.EventHandler(e);
        return;
    }

    this.EventHandlerBase(e);
    
}


