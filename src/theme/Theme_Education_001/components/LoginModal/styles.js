import { Dimensions, StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexGrow: 1,
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
    marginLeft: 0,
    // backgroundColor: '#F4F6FA',
    marginBottom: 32,
    height: 48,
    // borderRadius: 24,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    // paddingHorizontal: 14,
  },
  ipt: {

  },
  btnWrap: {
    marginTop: 0,
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'flex-end',
  },
  linearGradientBtn: {
    borderRadius: 50,
  },
  btnText: {
    fontWeight: '400',
    color: '#030600',
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
  }
});
