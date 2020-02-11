import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 0,
  },
  headerText: {
    color: '#fff',
  },
  body: {
    backgroundColor: '#F9FBFF',
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
    backgroundColor: '#F9FAFF'
  },
  btnWrap: {
    flexGrow: 1,
    marginHorizontal: 16,
  },
  linearGradientBtn: {
  },
  submitButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  formCard: {

    borderRadius: 6,
    marginTop: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: '#fff'
  },
  formItem: {
    minHeight: 44,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  formItemLabel: {
    minWidth: 90,
    fontSize: 15,
    fontWeight: '400',
    color: '#404E66',
    lineHeight: 21,
  },
  ipt: {
    flex: 1,
    textAlign: 'right',
    paddingHorizontal: 5,
    fontSize: 15,
    fontWeight: '400',
    color: '#404E66',
    lineHeight: 21,
    flexGrow: 1,
  },
  iptMultiline: {
    // minHeight: 112,
  }
});
