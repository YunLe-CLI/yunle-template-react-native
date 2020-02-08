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
    backgroundColor: '#EDF4FE',
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
    backgroundColor: "#EDF4FE",
    height:60,
  },
  btnWrap: {
    flexGrow: 1,
    marginHorizontal: 41,
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
    minHeight: 55,
    borderRadius: 10,
    marginTop: 12,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    overflow: 'hidden',
    alignItems: "center",
    justifyContent: "center",
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
    paddingHorizontal: 5,
    fontSize: 15,
    fontWeight: '400',
    color: '#404E66',
    lineHeight: 21,
    flexGrow: 1,
    textAlign: 'right',
  },
  iptMultiline: {
    // minHeight: 112,
  }
});
