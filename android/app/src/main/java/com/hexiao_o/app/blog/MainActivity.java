package com.hexiao_o.app.blog;

import com.facebook.react.ReactActivity;

import android.os.Bundle; // react-native-bootsplash
import com.zoontek.rnbootsplash.RNBootSplash; // react-native-bootsplash

import android.content.Intent;
import android.content.res.Configuration;

// start 友盟分享
import android.content.Intent;
import com.umeng.socialize.UMShareAPI;
import com.hexiao_o.app.blog.umeng.ShareModule;
// end  友盟分享

// start 友盟推送
import com.umeng.analytics.MobclickAgent;
import com.umeng.message.PushAgent;
import com.hexiao_o.app.blog.umeng.PushModule;
// end  友盟推送

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the cofmponent.
     */
    @Override
    protected String getMainComponentName() {
        return "dgz";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        RNBootSplash.show(R.drawable.bootsplash, MainActivity.this); // react-native-bootsplash
        // start 友盟分享
        ShareModule.initSocialSDK(this);
        // end  友盟分享

        // start 友盟推送
        PushModule.initPushSDK(this);
        PushAgent.getInstance(this).onAppStart();
        // end  友盟推送
        MobclickAgent.setSessionContinueMillis(1000*40); // start 友盟统计
    }

    // start 友盟分享
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
    }
    // end  友盟分享

    @Override
    public void onResume() {
        super.onResume();
        android.util.Log.e("xxxxxx","onResume=");
        MobclickAgent.onResume(this);  // start 友盟统计
    }
    @Override
    protected void onPause() {
        super.onPause();
        android.util.Log.e("xxxxxx","onPause=");

        MobclickAgent.onPause(this); // start 友盟统计
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        //MobclickAgent.onKillProcess(this);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
}
