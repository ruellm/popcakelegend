/**
    Bakery Store screen State.
    Date Created: November 22, 2014
*/

function BakeryStoreState() {

    //set this state ID
    this._stateID = BAKERYSTORE_STATE;
}

// set base class to State
BakeryStoreState.prototype = new PopcakeBaseState;

BakeryStoreState.prototype.Load = function () {

    this.state = 0;
    g_CoinsPurchase = 0;
  
    this._uimanager = new UIManager();

    this.LoadTheme();

    if (g_gameData.theme == THEME_TYPE_SAMPLE) {
        var coords = [
             { x: 295, y: 439 },
             { x: 488, y: 439 },
             { x: 681, y: 439 },
             { x: 391, y: 671 },
             { x: 584, y: 671 }
        ];

    } else {
        // default theme
        var coords = [
            { x: 296, y: 489 },
            { x: 486, y: 489 },
            { x: 680, y: 489 },
            { x: 390, y: 720 },
            { x: 586, y: 720 }
        ];

    }

    var context = this;
    for (var i = 0; i < coords.length; i++) {
        var button = new Button;
       /* button.LoadImages(
                "images/bakery_store/package-"+(i+1)+"-button.png",
                "images/bakery_store/package-" + (i + 1) + "-button-hover.png",
               "images/bakery_store/package-" + (i + 1) + "-button.png");
               */
        button.LoadImages(
            "images/bakery_store/button.png",
            "images/bakery_store/button-hover.png",
            "images/bakery_store/button.png");

        button._X = coords[i].x;
        button._Y = coords[i].y;
        button._width = 118;
        button._height = 32;
        button.id = i;
        button._fnMouseDownEvnt = (function () {
            context.PurchaseCoins(this.id);
        });

        this._uimanager.Add(button);
    }

    var currency = [
        "images/bakery_store/dollar-symbol.png",
        "images/bakery_store/euro-symbol.png"    
    ];
	
    this.currency = new ImageObject();
    this.currency.Load(
        currency[g_CURRENCY]);

    this.message = ["YOUR PAYMENTS", "ARE MADE IN", "LOCAL CURRENCY!"];
    if (LOCALE == "fr_FR") {
        this.message = ["VOS ACHATS SONT", "FACTURÉS EN", "MONNAIE LOCALE","(EUR)!"];
    }
}

BakeryStoreState.prototype.LoadTheme = function () {

    var back = null;
    switch (g_gameData.theme) {
        case THEME_TYPE_DEFAULT:
            this.background = new ImageObject();
            this.background.Load("images/themes/default/bakery-store-background-DEFAULT.png");

            back = new Button;
            back.LoadImages(
                 "images/themes/default/back-button.png",
                "images/themes/default/back-hover-button.png",
                 "images/themes/default/back-button.png");

            back._X = 904;
            back._Y = 310;
            back._width = 153;
            back._height = 151;

            break;
        case THEME_TYPE_SAMPLE:
            this.background = new ImageObject();
            this.background.Load("images/themes/sample/bakery-store-background-SPV.png");

            /*back.LoadImages(
                "images/themes/sample/back-button.png",
                "images/themes/sample/back-button-hover.png",
                "images/themes/sample/back-button.png");
                */
            
            back = new AnimatedButton();

            back.idle = new AnimatedObject();
            back.idle.Load("images/themes/sample/back-button.png");
            back.idle.Set(4, 6.0, true);
            back.idle._frameWidth = 300 / 4;

            back.hover = new AnimatedObject();
            back.hover.Load("images/themes/sample/back-button-hover.png");
            back.hover.Set(1, 1.0, true);
            back.hover._frameWidth = 74;

            back._X = 913;
            back._Y = 42;
            back._width = 74;
            back._height = 112;


            this.logo = new AnimatedObject();
            this.logo._image = new Image();
            this.logo._image.src = ("images/loading_images/logo-3fps.png");
            this.logo.Set(6, 3.0, true);
            this.logo._frameWidth = 2832 / 6;

         
            break;
    }


    back._fnMouseDownEvnt = (function () {
        g_Engine.SetState(GENERAL_LEVEL_STATE);
    });

    this._uimanager.Add(back);
}

BakeryStoreState.prototype.PurchaseCoins = function (id)
{    
	transcation_complete = false;
	
	if( g_DBUserInfo ) {	
		g_CoinsPurchase = gCoinPrices[id].coins;	
		FBAccess_PaymentAPI(gCoinPrices[id].coins);
	}else{
		Debit_Coins(gCoinPrices[id].coins);
		g_Engine.SetState(GENERAL_LEVEL_STATE);	
	}
}

var transcation_complete = false;
var g_CoinsPurchase = 0;

BakeryStoreState.prototype.DoInternalPurchase = function(data)
{
		if(data.error_code && data.error_code ==1383010 ) return;
	
		if(!data) {			
			   var message = ["There was an error processing your payment.", "", 
					"No charge was made"];
               this.MessageBox(message);
			return;
		}
			  
		if(data.error_code) {
			if(data.error_code != 1383010) {			  
		
				var message = ["There was an error processing your payment.", "", 
					data.error_message,
					"Error code:"+data.error_code];
               this.MessageBox(message);
			}
			return;
		}

		if(data.status=="completed") {

			Ajax_AddTransaction(data.amount, 
				data.currency, data.payment_id, data.quantity);
			
			var message = ["Payment Complete!", "", 
					"Transaction Done!"];
            this.MessageBox(message);
			
			transcation_complete = true;
		}
}

BakeryStoreState.prototype.OnCloseMsgBox = function()
{
	//this is assumption that message box came from Transaction COmplete
	this.state = 0;
	if(!transcation_complete)
		return;
		
	Debit_Coins(g_CoinsPurchase);
	g_Engine.SetState(GENERAL_LEVEL_STATE);	
}

BakeryStoreState.prototype.Update = function (/**Number*/ elapsed) {
    
	if( this.state == 0) {
		this._uimanager.Update(elapsed);
	}else{
		this.BaseSubStateUpdate(elapsed);
	}
	
    g_globalAudio.Update();	
    this.logo.Update(elapsed);

}

BakeryStoreState.prototype.Draw = function (/**Graphics*/gfx) {
    this.background.Draw(gfx, 0, 0);

    this._uimanager.Draw(gfx);

    var ty = 20;
    
    this.logo._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.logo._frameWidth / 2);
    this.logo._y = 10;
    this.logo.Draw(gfx);

    //standard center X: 141, 276
    //sov: 143, 369
    if (g_gameData.theme == THEME_TYPE_DEFAULT) {
        var centerX = [358, 551, 744, 456, 648];
        var y = 514;
        var y2 = 745;
        var bubblex = 141;
        var bubbley = 295;
    } else if (g_gameData.theme == THEME_TYPE_SAMPLE) {
        var centerX = [364, 558, 752, 461, 653];
        var y = 464;
        var y2 = 697;
        var bubblex = 143;
        var bubbley = 392;
    }
   
    var textdff = 23;
    var textHeight = textdff * this.message.length;
    var txy = bubbley - (textHeight / 2) + 14;

    for (var i = 0; i < this.message.length; i++) {
        var text = this.message[i];

        var style = "14pt Androgyne_TB";
        var ctx = gfx._canvasBufferContext;
        ctx.font = style;
        var textWidth = ctx.measureText(text);
        var x = bubblex;

        gfx.DrawText(text,
                  x - (textWidth.width / 2), txy,
                  "rgb(255,255,255)",
                 style);

        txy += textdff;
    }



    for (var i = 0; i < 5; i++) {
        var center = centerX[i];
        var ctx = gfx._canvasBufferContext;
        var style = this.fontStyle;
        ctx.font = style;
        var text = gCoinPrices[i].price;
                
        // Render Text header
        var textWidth = ctx.measureText(text);
        var buttonX = center - (textWidth.width / 2);

        if (i >= 3) {
            y = y2;
        }

        this.currency.Draw(gfx, buttonX - 35, y - ty);
        gfx.DrawText(text,
          buttonX, y,
          "rgb(255,255,255)",
          "14pt Androgyne_TB");
    }
	
	    this.DrawBase(gfx);
}

///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
BakeryStoreState.prototype.Unload = function () {
    this.CleanupUIManager();
}

BakeryStoreState.prototype.EventHandler = function (e) {

	if(this.state != 0){
		this.EventHandlerEx(e);
		return;
	}
	
    this.EventHandlerBase(e);

}