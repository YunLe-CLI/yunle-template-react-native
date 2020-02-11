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
    marginTop: 107,
    flexGrow: 1,
    // marginHorizontal: 16,
  },
  linearGradientBtn: {
    borderRadius: 0,
  },
  submitButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  formCard: {
    marginTop: 0,
    borderRadius: 6,
    marginBottom: 12,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  formItem: {
    minHeight: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  formItemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#404E66',
    lineHeight: 22.5,
  },
  formItemMoney: {
    color: '#FF3B0E',
  },
  formItemLabel: {
    minWidth: 56,
    marginRight: 14,
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    lineHeight: 22,
  },
  ipt: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    lineHeight: 22,
  },
  iptMultiline: {
    // minHeight: 112,
  },
  success: {
    flexDirection: 'column',
  },
  successText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#404E66',
    lineHeight: 22.5,
    marginBottom: 24,
  },
});
