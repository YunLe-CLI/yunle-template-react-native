利用脚手架开发一套react-native(ios & android)项目(让你开发网页dva.js 一套，**牛奶香浓浓,丝般感受** )
> 1. dva.js
> 2. code-push
> 3. react-navigation
> 4. native-base
> 5. react-native-orientation-locker

## demo下载地址 密码: `dagouzhi`
[https://www.pgyer.com/dagouzhi2temp](https://www.pgyer.com/dagouzhi2temp)


## 安装脚手架
> ` npm i -g yunle-cli`

## 创建RN项目
```
 yunle init test_rn

? 请选择使用的模板
  umi
❯ RN
  taro
  electron
  gatsby
  next
  component

```
## 获取依赖包
> `cd test_rn && yarn`

## ios
> `npm run start:ios`

## android
> `npm run start:android`
>

## 主题定制
》 https://nativebase.io/customizer/#

## 欢迎star
> [开源github](https://github.com/YunLe-CLI/yunle-template-RN) 欢迎star ⭐⭐⭐ 感谢感谢！！！
>

### 支付组件
> [内购 `react-native-iap`](https://github.com/dooboolab/react-native-iap)
>
> [支付(微信&支付宝) `react-native-puti-pay`](https://github.com/puti94/react-native-puti-pay)
>
### 提示
>  android
>  友盟sdk与支付宝sdk utdid冲突
>  删除`android/app/libs/utdid4all-1.1.5.3_proguard.jar` 就行