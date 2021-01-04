// MergeFiles.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <stdio.h>
#include <stdlib.h>
#include <memory.h>

#define MAX_FNAME 200

int cbd_merge_files(const char filenames[][MAX_FNAME], int n, const char* final_filename) {

  FILE* fp = fopen(final_filename, "w");

  if (fp == NULL) return 1;

  char buffer[4097];

  for (int i = 0; i < n; ++i) {

    const char* fname = filenames[i];
	char ch = 0;
    FILE* fp_read = fopen(fname, "r");
	
	printf("Processing %s ...\n\r", fname);
 	 while( ( ch = fgetc(fp_read) ) != EOF )
		fputc(ch,fp);

	fputc('\r', fp);
	fputc('\n', fp);

    fclose(fp_read);

 }

 fclose(fp);

 return 0;
}
int _tmain(int argc, _TCHAR* argv[])
{
	//////////////////////////////////////////////////////////////
	// SPirit BUbble
	// File list as of July 28, 2014, 3:53pm - PNoy SONA
	// Popcake Legend 
	// FIle list as of October 19, 2014
	//////////////////////////////////////////////////////////////
	const char filenames[][MAX_FNAME]={
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/common.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/resource.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/core/baseObject.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/core/engine.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/core/graphics.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/core/state.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/utility/timer.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/utility/animator.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/utility/point.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/utility/longAudio.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/utility/vector2D.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/utility/rectangle.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/utility/collisionHandler.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/scene/imageObject.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/scene/animatedObject.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/scene/animatedText.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/scene/repeatingImage.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/ui/uibase.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/ui/uimanager.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/ui/button.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/ui/listBoxBase.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/ui/customListBox.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/ui/textBoxBase.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/ui/customTextBox.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/ui/popupwindow.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/ui/roundButtonText.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/ui/slideWindow.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/game/iconBox.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/game/customImageButton.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/game/level.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/game/glowImage.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/game/star.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/game/purchaseWindow.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/game/popupLivesWindow.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/game/levelCompleteWnd.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/game/retryWindow.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/game/objectiveWindow.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/data/fb_data.js",    
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/data/fbaccess.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/data/gameData.js",    
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/data/rc4.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/data/ajaxAdapter.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/data/popcake_data.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/data/level_data.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/states/splashState.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/states/mainMenuState.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/states/loadState.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/states/gameState.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/main.js",
		"../../../source/web/PopcakeLegend/PopcakeLegend/js/default.js"
	};

	cbd_merge_files(filenames, 47, "../../compiler-latest/popcakelegend_engine.js");
	return 0;
}

