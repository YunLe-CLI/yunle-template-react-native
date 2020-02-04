import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
  },
  headerText: {
    color: '#192038',
  },
  body: {
    backgroundColor: '#FFFFFF',
  },
  bodyContent: {
    // paddingHorizontal: 16,
  },
  btn: {
    borderRadius: 4,
  },
  footerWrap: {
    borderTopWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    height:60,
  },
  btnWrap: {
    flexGrow: 1,
    marginTop: 88,
    marginHorizontal: 33,
  },
  linearGradientBtn: {
    borderRadius: 6,
  },
  submitButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  formCard: {
    borderRadius: 6,
    marginTop: 12,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  formItem: {
    // minHeight: 44,
  },
  formItemLabel: {
    minWidth: 90,
    fontSize: 15,
    fontWeight: '400',
    color: '#BBBABA',
    lineHeight: 21,
  },
  ipt: {
    paddingHorizontal: 5,
    fontSize: 15,
    fontWeight: '400',
    color: '#404E66',
    lineHeight: 21,
    flexGrow: 1,
  },
  iptMultiline: {
    // minHeight: 112,
  },
  formItemContent: {
    marginLeft: 26,
    marginRight: 26,
  }
});
