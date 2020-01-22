import { Dimensions, StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexGrow: 1,
    backgroundColor: 'transparent'
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
    marginBottom: 45,
  },
  iptItem: {
    backgroundColor: '#F4F6FA',
    marginBottom: 32,
    height: 48,
    // borderRadius: 24,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingHorizontal: 14,
  },
  ipt: {

  },
  btnWrap: {
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',

    // alignSelf: 'flex-end',
  },
  linearGradientBtn: {
    width: 181,
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
  }
});
