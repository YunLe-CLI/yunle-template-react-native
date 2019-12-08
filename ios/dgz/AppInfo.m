//
//  AppInfo.m
//  dgz
//
//  Created by 大狗吱 on 2019/11/5.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "AppInfo.h"

@implementation AppInfo

RCT_EXPORT_MODULE(AppInfo)

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

- (NSDictionary *)constantsToExport {
  NSDictionary *info = [[NSBundle mainBundle] infoDictionary];
  NSMutableDictionary *settings = [[info objectForKey:@"AppSettings"] mutableCopy];
  return settings;
}

@end
