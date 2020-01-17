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
    backgroundColor: '#F9FBFF',
  },
  bodyContent: {
    paddingHorizontal: 16,
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
    marginHorizontal: 16,
  },
  linearGradientBtn: {
    borderRadius: 24,
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
    minHeight: 44,
  },
  formItemLabel: {
    minWidth: 90,
    fontSize: 15,
    fontWeight: '400',
    color: '#404E66',
    lineHeight: 21,
  },
  ipt: {
    fontSize: 15,
    fontWeight: '400',
    color: '#404E66',
    lineHeight: 21,
  },
  iptMultiline: {
    // minHeight: 112,
  }
});
