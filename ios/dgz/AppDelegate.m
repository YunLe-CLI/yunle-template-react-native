/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <CodePush/CodePush.h>

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNBootSplash.h" // react-native-bootsplash

/** start 友盟分享 **/
#import "RNUMConfigure.h"
#import <UMShare/UMShare.h>
/** end 友盟分享 **/
/** start 友盟推送 **/
#include <arpa/inet.h>
#import <UMPush/UMessage.h>
/** end 友盟推送 **/
/** start 友盟推送 **/
#import <UMAnalytics/MobClick.h>
/** end 友盟推送 **/

#import <React/RCTLinkingManager.h> // 打开app

#import "Orientation.h" // react-native-orientation-locker

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"dgz"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView];

  /** start 友盟分享 **/
  /* 打开调试日志 */
  [UMConfigure setLogEnabled:YES];
  [RNUMConfigure initWithAppkey:@"5cecec04570df31709000740" channel:@"App Store"];
  [self configUSharePlatforms];
  [self confitUShareSettings];
  /** end 友盟分享 **/

  /** start 友盟推送 **/
  // Push组件基本功能配置
  UMessageRegisterEntity * entity = [[UMessageRegisterEntity alloc] init];
  //type是对推送的几个参数的选择，可以选择一个或者多个。默认是三个全部打开，即：声音，弹窗，角标
  entity.types = UMessageAuthorizationOptionBadge|UMessageAuthorizationOptionSound|UMessageAuthorizationOptionAlert;
  [UNUserNotificationCenter currentNotificationCenter].delegate=self;
  [UMessage registerForRemoteNotificationsWithLaunchOptions:launchOptions Entity:entity     completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (granted) {
    }else{
    }
  }];
  /** end 友盟推送 **/

  /** start 友盟统计 **/
  [MobClick setScenarioType:E_UM_NORMAL];
  /** start 友盟统计 **/
  [RNBootSplash initialShow];
  
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [CodePush bundleURL];
//  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/** start 友盟分享 **/
- (void)confitUShareSettings
{
  /*
   * 打开图片水印
   */
  //[UMSocialGlobal shareInstance].isUsingWaterMark = YES;
  /*
   * 关闭强制验证https，可允许http图片分享，但需要在info.plist设置安全域名
   <key>NSAppTransportSecurity</key>
   <dict>
   <key>NSAllowsArbitraryLoads</key>
   <true/>
   </dict>
   */
  [UMSocialGlobal shareInstance].isUsingHttpsWhenShareContent = NO;
}
- (void)configUSharePlatforms
{
  /* 设置微信的appKey和appSecret */
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:@"wxa3e9527542c4bc64" appSecret:@"ca5e7b939f85979fa70993377228705c" redirectURL:@"http://mobile.umeng.com/social"];
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_QQ appKey:@"101584810"/*设置QQ平台的appID*/  appSecret:nil redirectURL:@"http://mobile.umeng.com/social"];
  /* 设置新浪的appKey和appSecret */
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Sina appKey:@"3921700954"  appSecret:@"04b48b094faeb16683c32669824ebdad" redirectURL:@"https://sns.whalecloud.com/sina2/callback"];

}

// 支持所有iOS系统
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  //6.3的新的API调用，是为了兼容国外平台(例如:新版facebookSDK,VK等)的调用[如果用6.2的api调用会没有回调],对国内平台没有影响
  BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url sourceApplication:sourceApplication annotation:annotation];
  if (!result) {
    // 其他如支付等SDK的回调
    // html 开app
    return [RCTLinkingManager application:application openURL:url
    sourceApplication:sourceApplication annotation:annotation];
  }
  return result;
}

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
  BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url];
  if (!result) {
    // 其他如支付等SDK的回调
  }
  return result;
}
/** end 友盟分享 **/



#pragma mark - 友盟推送

/** start 友盟推送 **/

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  NSLog(@"deviceToken:%s","123");
  if (![deviceToken isKindOfClass:[NSData class]]) return;
  const unsigned *tokenBytes = (const unsigned *)[deviceToken bytes];
  NSString *hexToken = [NSString stringWithFormat:@"%08x%08x%08x%08x%08x%08x%08x%08x",
                        ntohl(tokenBytes[0]), ntohl(tokenBytes[1]), ntohl(tokenBytes[2]),
                        ntohl(tokenBytes[3]), ntohl(tokenBytes[4]), ntohl(tokenBytes[5]),
                        ntohl(tokenBytes[6]), ntohl(tokenBytes[7])];
  NSLog(@"deviceToken:%@",hexToken);
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
  //关闭友盟自带的弹出框
  [UMessage setAutoAlert:NO];
  [UMessage didReceiveRemoteNotification:userInfo];

  //    self.userInfo = userInfo;
  //    //定制自定的的弹出框
  //    if([UIApplication sharedApplication].applicationState == UIApplicationStateActive)
  //    {
  //        UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"标题"
  //                                                            message:@"Test On ApplicationStateActive"
  //                                                           delegate:self
  //                                                  cancelButtonTitle:@"确定"
  //                                                  otherButtonTitles:nil];
  //
  //        [alertView show];
  //
  //    }
}

//iOS10新增：处理前台收到通知的代理方法
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler{
  NSDictionary * userInfo = notification.request.content.userInfo;
  if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {

    //应用处于前台时的远程推送接受
    //关闭友盟自带的弹出框
    [UMessage setAutoAlert:NO];
    //必须加这句代码
    [UMessage didReceiveRemoteNotification:userInfo];

  }else{
    //应用处于前台时的本地推送接受
  }
  completionHandler(UNNotificationPresentationOptionSound|UNNotificationPresentationOptionBadge|UNNotificationPresentationOptionAlert);
}


//iOS10新增：处理后台点击通知的代理方法
-(void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler{
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {

    //应用处于后台时的远程推送接受
    //必须加这句代码
    [UMessage didReceiveRemoteNotification:userInfo];

  }else{
    //应用处于后台时的本地推送接受
  }
}
/** start 友盟推送 **/

#pragma mark - 方向
- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

@end
