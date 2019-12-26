import { Platform, Linking } from "react-native";
import RNFetchBlob from 'rn-fetch-blob';
import { getOnlineAppVersion } from '@/services/api'
import {checkAppVersion} from "@/utils/utils";

export default async () => {
  try {
    const res = await getOnlineAppVersion();
    if (!res || !res.version) {
      return;
    }
    const is = await checkAppVersion({
      appPlatform: Platform.OS,
      appVersion: res.version,
      appBuildNumber:  res.build,
    });
    console.log(is)
    if (is) {
      alert('有更新，请先下载')
      if (Platform.OS === 'ios') {
        Linking.openURL(res.download);
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
        }).fetch('GET', res.download).then(res => {
          // 下载成功后自动打开运行已下载apk文件
          android.actionViewIntent(
              res.path(),
              'application/vnd.android.package-archive'
          );
        }).catch((e) => {
          alert('下载失败')
        })
      };
    } else {
      throw '无更新'
    }
  } catch (e) {
    alert(e)
  }
}