package com.mcontrol;

import com.facebook.react.ReactActivity;


//import android.app.ActionBar;
//import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "mControl";
    }

//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//
//        // 设置透明状态栏
////        if (Build.VERSION.SDK_INT >= 21) {
////            View decorView = getWindow().getDecorView();
////            int option = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
////                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
////            decorView.setSystemUiVisibility(option);
////            getWindow().setStatusBarColor(Color.TRANSPARENT);
////        }
//
//        // 设置透明状态栏和透明导航栏
//        if (Build.VERSION.SDK_INT >= 21) {
//            View decorView = getWindow().getDecorView();
//            int option = View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
//                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
//                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
//            decorView.setSystemUiVisibility(option);
//            getWindow().setNavigationBarColor(Color.TRANSPARENT);
//            getWindow().setStatusBarColor(Color.TRANSPARENT);
//        }
//    }
    
    
     
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        setStickFullScreen(getWindow().getDecorView());
    }


    protected void setStickFullScreen(View view) {
        int systemUiVisibility = view.getSystemUiVisibility();
        if (Build.VERSION.SDK_INT > 16 && Build.VERSION.SDK_INT < 19) {
             view.setSystemUiVisibility(View.GONE);
         } else if (Build.VERSION.SDK_INT >= 19) {
             int flags = View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                             | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                             | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                             | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                             | View.SYSTEM_UI_FLAG_FULLSCREEN
                             | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
             systemUiVisibility |= flags;
             view.setSystemUiVisibility(systemUiVisibility);
         }
    }



}
