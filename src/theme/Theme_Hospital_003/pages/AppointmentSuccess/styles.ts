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
    backgroundColor: '#16183E',
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
    backgroundColor: '#0059D3'
  },
  btnWrap: {
    flexGrow: 1,
    // marginHorizontal: 16,
  },
  linearGradientBtn: {
    // borderRadius: 24,
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
    minHeight: 44,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255, .1)',
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
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 22.5,
  },
  formItemMoney: {
    color: '#FF3B0E',
  },
  formItemLabel: {
    minWidth: 56,
    marginRight: 16,
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
    lineHeight: 22,
  },
  ipt: {
    flex:1,
    flexGrow: 1,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
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
    color: '#FFFFFF',
    lineHeight: 22.5,
    marginBottom: 24,
  },
});
