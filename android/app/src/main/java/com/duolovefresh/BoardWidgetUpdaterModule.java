package com.duolovefresh;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BoardWidgetUpdaterModule extends ReactContextBaseJavaModule {
    public BoardWidgetUpdaterModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "BoardWidgetUpdater";
    }

    @ReactMethod
    public void updateWidget() {
        Context context = getReactApplicationContext();
        Intent intent = new Intent(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
        ComponentName widget = new ComponentName(context, BoardWidgetProvider.class);
        int[] ids = AppWidgetManager.getInstance(context).getAppWidgetIds(widget);
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
        context.sendBroadcast(intent);
    }
}