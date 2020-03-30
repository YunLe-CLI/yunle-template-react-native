package com.dagouzhi.app.temp;

import android.app.Application;
import android.content.Context;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.horcrux.svg.SvgPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;

import com.microsoft.codepush.react.CodePush;

import java.util.List;

// start 友盟分享
import com.dagouzhi.app.temp.umeng.DplusReactPackage;
import com.dagouzhi.app.temp.umeng.RNUMConfigure;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.PlatformConfig;
// end 友盟分享

// start 友盟推送
import android.content.Context;
import android.os.Handler;
import android.widget.Toast;
import android.app.Notification;
import android.widget.RemoteViews;
import com.umeng.message.IUmengRegisterCallback;
import com.umeng.message.MsgConstant;
import com.umeng.message.PushAgent;
import com.umeng.message.UTrack;
import com.umeng.message.UmengMessageHandler;
import com.umeng.message.UmengNotificationClickHandler;
import com.umeng.message.entity.UMessage;
// end  友盟推送

public class MainApplication extends Application implements ReactApplication {

  // start 友盟推送
  private static final String TAG = MainApplication.class.getName();
  private Handler handler;
  // end  友盟推送

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
//    @Override
   protected String getJSBundleFile() {
     return CodePush.getJSBundleFile();
   }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      packages.add(new AppPackage());
      packages.add(new DplusReactPackage());
      return packages;
    }

  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    UMConfigure.setLogEnabled(true);

    // start 友盟分享
    RNUMConfigure.init(
      this,
      "5cecebb14ca3572ca4000471",
      "Umeng",
      UMConfigure.DEVICE_TYPE_PHONE,
      "b3e9a867cfceaf640c44a54080a34eb6"
    );
    // end 友盟分享

    initUpush(); // 友盟推送
  }

  private static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
      if (BuildConfig.DEBUG) {
        try {
          /*
           We use reflection here to pick up the class that initializes Flipper,
          since Flipper library is not available in release mode
          */
          Class<?> aClass = Class.forName("com.dagouzhi.app.temp.ReactNativeFlipper");
          aClass.getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
          .invoke(null, context, reactInstanceManager);
        } catch (ClassNotFoundException e) {
          e.printStackTrace();
        } catch (NoSuchMethodException e) {
          e.printStackTrace();
        } catch (IllegalAccessException e) {
          e.printStackTrace();
        } catch (InvocationTargetException e) {
          e.printStackTrace();
        }
      }
  }
  // start 友盟分享
  {
    PlatformConfig.setWeixin("wxa3e9527542c4bc64", "ca5e7b939f85979fa70993377228705c");
    PlatformConfig.setQQZone("101584810", "7a13940f4162d311b16eb5eeace69ae4");
    PlatformConfig.setSinaWeibo("3921700954", "04b48b094faeb16683c32669824ebdad", "http://sns.whalecloud.com");
  }
  // end 友盟分享

  // start 友盟推送
  private void initUpush() {
    PushAgent mPushAgent = PushAgent.getInstance(this);
    handler = new Handler(getMainLooper());

    //sdk开启通知声音
    mPushAgent.setNotificationPlaySound(MsgConstant.NOTIFICATION_PLAY_SDK_ENABLE);
    // sdk关闭通知声音
    // mPushAgent.setNotificationPlaySound(MsgConstant.NOTIFICATION_PLAY_SDK_DISABLE);
    // 通知声音由服务端控制
    // mPushAgent.setNotificationPlaySound(MsgConstant.NOTIFICATION_PLAY_SERVER);

    // mPushAgent.setNotificationPlayLights(MsgConstant.NOTIFICATION_PLAY_SDK_DISABLE);
    // mPushAgent.setNotificationPlayVibrate(MsgConstant.NOTIFICATION_PLAY_SDK_DISABLE);

    UmengMessageHandler messageHandler = new UmengMessageHandler() {

      /**
       * 通知的回调方法（通知送达时会回调）
       */
      @Override
      public void dealWithNotificationMessage(Context context, UMessage msg) {
        //调用super，会展示通知，不调用super，则不展示通知。
        super.dealWithNotificationMessage(context, msg);
      }

      /**
       * 自定义消息的回调方法
       */
      @Override
      public void dealWithCustomMessage(final Context context, final UMessage msg) {

        handler.post(new Runnable() {

          @Override
          public void run() {
            // TODO Auto-generated method stub
            // 对自定义消息的处理方式，点击或者忽略
            boolean isClickOrDismissed = true;
            if (isClickOrDismissed) {
              //自定义消息的点击统计
              UTrack.getInstance(getApplicationContext()).trackMsgClick(msg);
            } else {
              //自定义消息的忽略统计
              UTrack.getInstance(getApplicationContext()).trackMsgDismissed(msg);
            }
            Toast.makeText(context, msg.custom, Toast.LENGTH_LONG).show();
          }
        });
      }

      /**
       * 自定义通知栏样式的回调方法
       */
      @Override
      public Notification getNotification(Context context, UMessage msg) {
        switch (msg.builder_id) {
          case 1:
            Notification.Builder builder = new Notification.Builder(context);
            RemoteViews myNotificationView = new RemoteViews(context.getPackageName(),
                    R.layout.notification_view);
            myNotificationView.setTextViewText(R.id.notification_title, msg.title);
            myNotificationView.setTextViewText(R.id.notification_text, msg.text);
            myNotificationView.setImageViewBitmap(R.id.notification_large_icon, getLargeIcon(context, msg));
            myNotificationView.setImageViewResource(R.id.notification_small_icon,
                    getSmallIconId(context, msg));
            builder.setContent(myNotificationView)
                    .setSmallIcon(getSmallIconId(context, msg))
                    .setTicker(msg.ticker)
                    .setAutoCancel(true);

            return builder.getNotification();
          default:
            //默认为0，若填写的builder_id并不存在，也使用默认。
            return super.getNotification(context, msg);
        }
      }
    };
    mPushAgent.setMessageHandler(messageHandler);

    /**
     * 自定义行为的回调处理，参考文档：高级功能-通知的展示及提醒-自定义通知打开动作
     * UmengNotificationClickHandler是在BroadcastReceiver中被调用，故
     * 如果需启动Activity，需添加Intent.FLAG_ACTIVITY_NEW_TASK
     * */
    UmengNotificationClickHandler notificationClickHandler = new UmengNotificationClickHandler() {

      @Override
      public void launchApp(Context context, UMessage msg) {
        super.launchApp(context, msg);
      }

      @Override
      public void openUrl(Context context, UMessage msg) {
        super.openUrl(context, msg);
      }

      @Override
      public void openActivity(Context context, UMessage msg) {
        super.openActivity(context, msg);
      }

      @Override
      public void dealWithCustomAction(Context context, UMessage msg) {
        Toast.makeText(context, msg.custom, Toast.LENGTH_LONG).show();
      }
    };
    //使用自定义的NotificationHandler
    mPushAgent.setNotificationClickHandler(notificationClickHandler);

    //注册推送服务 每次调用register都会回调该接口
    mPushAgent.register(new IUmengRegisterCallback() {
      @Override
      public void onSuccess(String deviceToken) {
//        Log.i(TAG, "device token: " + deviceToken);
      }

      @Override
      public void onFailure(String s, String s1) {
//        Log.i(TAG, "register failed: " + s + " " + s1);
      }
    });

    //使用完全自定义处理
    //mPushAgent.setPushIntentServiceClass(UmengNotificationService.class);

    //小米通道
    //MiPushRegistar.register(this, XIAOMI_ID, XIAOMI_KEY);
    //华为通道
    //HuaWeiRegister.register(this);
    //魅族通道
    //MeizuRegister.register(this, MEIZU_APPID, MEIZU_APPKEY);
  }
  // end 友盟推送
}
