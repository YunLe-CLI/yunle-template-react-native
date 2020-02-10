import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16183E',
  },
  header: {
    backgroundColor: '#0059D3',
    borderBottomWidth: 0,
  },
  headerText: {
    color: '#fff',
  },
  body: {
    backgroundColor: '#16183E',
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
    marginTop: 50,
    flexGrow: 1,
    marginHorizontal: 16,
  },
  linearGradientBtn: {
    borderRadius: 0,
  },
  submitButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderColor: '#4292FF',
    borderWidth: 1,
  },
  formCard: {
    borderRadius: 6,
    marginTop: 12,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: '#2C2D59',
  },
  formItem: {
    minHeight: 44,
    backgroundColor: '#2C2D59'
  },
  formItemLabel: {
    minWidth: 90,
    fontSize: 15,
    fontWeight: '400',
    color: '#fff',
    lineHeight: 21,
  },
  ipt: {
    paddingHorizontal: 5,
    fontSize: 15,
    fontWeight: '400',
    color: '#fff',
    lineHeight: 21,
    flexGrow: 1,
    textAlign: 'right'
  },
  iptMultiline: {
    // minHeight: 112,
  }
});
