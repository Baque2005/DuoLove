package com.duolovefresh;

import android.appwidget.AppWidgetProvider;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.widget.RemoteViews;
import android.graphics.BitmapFactory;
import android.graphics.Bitmap;
import java.io.File;

public class BoardWidgetProvider extends AppWidgetProvider {
    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int widgetId : appWidgetIds) {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.board_widget);

            String imagePath = context.getExternalFilesDir(null) + "/board.png";
            File imgFile = new File(imagePath);
            if (imgFile.exists()) {
                Bitmap bitmap = BitmapFactory.decodeFile(imagePath);
                views.setImageViewBitmap(R.id.boardImage, bitmap);
            }

            appWidgetManager.updateAppWidget(widgetId, views);
        }
    }
}