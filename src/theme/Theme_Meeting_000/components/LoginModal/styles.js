import { Dimensions, StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  skipBtn: {
    marginTop: 24,
    marginRight: 24,
    alignSelf: 'flex-end',
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
    marginTop: 70,
    flexDirection: 'row',
    // paddingTop: 166,
    alignItems: 'center',
    justifyContent: 'center',
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
  formBox: {
    flex: 1,
    flexGrow: 1,
    marginBottom: 56,
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  formBoxItem: {
    flex: 1,
  },
  formWrap: {
    flex: 1,
    // alignSelf: 'flex-end',
    justifyContent: "flex-end",
  },
  iptItem: {
    marginBottom: 29,
    marginLeft: 0,
    paddingLeft: 0,
    borderBottomColor: '#FFFFFF'
  },
  ipt: {
    paddingHorizontal: 10,
    color: '#FFFFFF',
  },
  btnWrap: {
    marginTop: 35,
  },
  linearGradientBtn: {
    marginHorizontal: 20,
    borderRadius: 24,
  },
  loginButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  }
});
