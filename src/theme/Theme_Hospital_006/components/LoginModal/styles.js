import { Dimensions, StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
    flexGrow: 1,
    flexDirection: 'row',
    // paddingTop: 166,
    alignItems: 'center',
    // justifyContent: 'center',
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
  formWrap: {
    marginTop: 45,
  },
  iptItem: {
    marginBottom: 20,
    marginLeft: 0,
    paddingLeft: 0,
    borderBottomColor: '#E3E7EF',
    borderBottomWidth: 2,
  },
  ipt: {
    color: '#404E66',
  },
  btnWrap: {
    paddingTop: 50,
  },
  linearGradientBtn: {
    borderRadius: 6,
  },
  loginButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  }
});
