import { Platform, Linking } from "react-native";
import RNFetchBlob from 'rn-fetch-blob';

export default (url: string) => {
    if (Platform.OS === 'ios') {
      Linking.openURL(url);
    }
    if (Platform.OS === 'android') {
      const android = RNFetchBlob.android;
      //下载成功后文件所在path
      const downloadDest = `${RNFetchBlob.fs.dirs.DownloadDir}/app_release.apk`;
      RNFetchBlob.config({
        //配置手机系统通知栏下载文件通知，下载成功后点击通知可运行apk文件
        addAndroidDownloads: {
          useDownloadManager: true,
          title: '大狗吱-APP',
          description: '装安装大狗吱app',
          mime: 'application/vnd.android.package-archive',
          path: downloadDest,
          mediaScannable: true,
          notification: true
        }
      }).fetch('GET', url).then(res => {
        // 下载成功后自动打开运行已下载apk文件
        android.actionViewIntent(
          res.path(),
          'application/vnd.android.package-archive'
        );
      }).catch((e) => {
        alert(e)
      })
    };
  }