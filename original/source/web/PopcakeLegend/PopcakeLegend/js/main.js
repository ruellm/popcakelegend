//
// Entry point to nightmare game engine develop by
// Ruell Magpayo <ruellm@yahoo.com>
//
function OnGameLaunch() {

    // Initialize global
    g_Engine = new Engine();
    g_gameData = new GameData();

    //Initialize engine
    g_Engine.Init();
    //g_gameData.Init();

    //TODO: Add States in here
    //..
    g_Engine.AddState(new SplashScreenState);
    g_Engine.AddState(new LoadState);
    g_Engine.AddState(new GameState);
    g_Engine.AddState(new MainMenuState);
    g_Engine.AddState(new GeneralLevelState);
    g_Engine.AddState(new BakeryStoreState);

    //Setting the initial state
    g_Engine.SetState(SPLASH_STATE);

    //Run the Engine
    g_Engine.Run();
}

function OnGameFocus()
{ }

function OnGameBlur()
{ }

function OnGameExit(e)
{
    /*if (g_gameData.life <= 0 && g_targetTimer) {
        var currentTime = new Date().getTime();
        var hitTime = g_targetTimer - (DEFAULT_WAIT_MINUTES * 1000.0);
        var diff = currentTime - hitTime;
        value = g_targetTimer - diff;

        // TODO: Store in database
        console.log("Exiting with value " + value);
    }*/
}

