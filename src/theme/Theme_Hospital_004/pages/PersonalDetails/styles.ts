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
    backgroundColor: '#fff',
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
    borderRadius: 0,
  },
  submitButton: {
    marginTop: 50,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#000'
  },
  formCard: {
    borderRadius: 6,
    marginTop: 12,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  formItem: {
    minHeight: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
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
