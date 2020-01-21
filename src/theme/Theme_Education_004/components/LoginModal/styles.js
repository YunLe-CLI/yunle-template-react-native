import { Dimensions, StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  skipBtnText: {
    color: '#8C8C8C',
    fontSize: 24,
    lineHeight: 24,
  },
  body: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  logoWrap: {
    flexGrow: 1,
    // paddingTop: 166,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
  },
  iptItem: {
    // backgroundColor: '#F4F6FA',
    marginBottom: 32,
    height: 48,
    marginLeft: 0,
    paddingLeft: 0,
    // borderRadius: 24,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  ipt: {
    color: '#FFFFFF',
    textAlign: 'center'
  },
  btnWrap: {
    marginTop: 32,
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'flex-end',
    height: 52,
  },
  linearGradientBtn: {
    borderRadius: 50,
  },
  btnText: {
    fontWeight: '400',
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    paddingVertical: 12,
    alignContent: 'flex-end',
    flexDirection: 'row',
  },
  footerBox: {
    flexGrow: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  wxBtn: {
    borderWidth: 1,
    borderRadius: 32,
    height: 64,
    width: 64,
    borderColor: '#09BB07',
    alignItems: "center",
    justifyContent: "center",
  },
  wxIcon: {
    marginRight: 12,
    width: 24,
    height: 24,
    borderColor: '#fff',
  },
  logoText: {
    fontWeight: '500',
    color: '#fff',
    lineHeight: 35,
    fontSize: 25,
  }
});
