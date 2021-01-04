/**
    Base class for popcake legend game states
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Dec 30, 2014
*/

var POPCAKEBASE_STATE_MSGWINDOW = 1231980;

function PopcakeBaseState() {
    //...
    this.state = -1;
    this.objectiveWindow = null;
    this.coins_step = 1;
}

PopcakeBaseState.prototype = new State;

PopcakeBaseState.prototype.LoadBase = function ()
{
    this.coins = g_gameData.coins;
}

PopcakeBaseState.prototype.UpdateBase = function (elapsed)
{
    if (this.coins > g_gameData.coins) {
        this.coins -= this.coins_step;
    } else if (this.coins < g_gameData.coins) {
        this.coins += this.coins_step;
    }
}

PopcakeBaseState.prototype.BaseSubStateUpdate = function (elapsed)
{
    switch (this.state) {
        case POPCAKEBASE_STATE_MSGWINDOW:
            this.objectiveWindow.Update(elapsed);
            return true;
    }
    return false;
}

PopcakeBaseState.prototype.DrawBase = function (gfx)
{
    switch (this.state) {
        case POPCAKEBASE_STATE_MSGWINDOW:
            this.objectiveWindow.Draw(gfx);
            break;
    }
}

PopcakeBaseState.prototype.OnCloseMsgBox = function ()
{
    //...
}

PopcakeBaseState.prototype.MessageBox = function (message) {
    this.state = POPCAKEBASE_STATE_MSGWINDOW;
    this.objectiveWindow = new ObjectiveWindow;
    this.objectiveWindow.Load();
    this.objectiveWindow.Show();
    this.objectiveWindow.msg = message;

    var context = this;
    this.objectiveWindow.fnClose = function () {
        context.OnCloseMsgBox();
    };
}

PopcakeBaseState.prototype.EventHandlerEx = function (e) {
    
    if (this.state == POPCAKEBASE_STATE_MSGWINDOW) {
        this.objectiveWindow.EventHandler(e);
        return true;
    }
    return false;
}