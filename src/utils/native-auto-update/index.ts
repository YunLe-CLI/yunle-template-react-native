import { Platform } from "react-native";
import { ENVIRONMENT } from '@/utils/env';
import RNFetchBlob from 'rn-fetch-blob';

export default () => {
  
    if (Platform.OS === 'ios') {

    }
    if (Platform.OS === 'android') {
      
      const android = RNFetchBlob.android;
      //下载成功后文件所在path
      const downloadDest = `${RNFetchBlob.fs.dirs.DownloadDir}/app_release.apk`;
      RNFetchBlob.config({
        //配置手机系统通知栏下载文件通知，下载成功后点击通知可运行apk文件
        addAndroidDownloads: {
          useDownloadManager: true,
          title: 'RN APP',
          description: 'An APK that will be installed',
          mime: 'application/vnd.android.package-archive',
          path: downloadDest,
          mediaScannable: true,
          notification: true
        }
      }).fetch(
        'GET',
         'https://micro-assests.oss-cn-beijing.aliyuncs.com/app-production-release.apk'
      ).then(res => {
        // 下载成功后自动打开运行已下载apk文件
        android.actionViewIntent(
          res.path(),
          'application/vnd.android.package-archive'
        );
      }).catch((e) => {
        alert(e)
      })
      alert(downloadDest)
    }
  }