import { Platform, Linking } from "react-native";
import RNFetchBlob from 'rn-fetch-blob';
import { getOnlineAppVersion } from '@/services/api'
import {checkAppVersion, showMsg} from "@/utils/utils";
import moment from "moment";
import Permissions, {PERMISSIONS, RESULTS} from "react-native-permissions";

export default async () => {
  let updateURI = undefined;
  try {
    const res = await getOnlineAppVersion();
    if (!res || !res.version) {
      updateURI = undefined;
      return updateURI;
    }
    const is = await checkAppVersion({
      appPlatform: Platform.OS,
      appVersion: res.version,
      appBuildNumber:  res.build,
    });
    if (is) {
      updateURI = res.download;
    } else {
      throw '无更新'
    }
  } catch (e) {
    updateURI = undefined;
  }
  return updateURI;
}

export const handleDownload = async (url: string) => {
  if (!url) {
    return;
  }
  const time = moment().format('X');
  if (Platform.OS === 'ios') {
    Linking.openURL(url);
  }
  if (Platform.OS === 'android') {
    const currentStatus = await Permissions.check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

    if (currentStatus !== RESULTS.GRANTED) {
      const status = await Permissions.request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (status !== RESULTS.GRANTED) {
        throw '未请求/被拒绝但可请求, 请重新授权';
      }
    }
    const android = RNFetchBlob.android;
    //下载成功后文件所在path
    const downloadDest = `${RNFetchBlob.fs.dirs.DownloadDir}/app_release_${time}.apk`;
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
    }).fetch('GET', `${url}?time=${time}`).then(res => {
      // 下载成功后自动打开运行已下载apk文件
      android.actionViewIntent(
          res.path(),
          'application/vnd.android.package-archive'
      );
    }).catch((e) => {

    })
  };
}