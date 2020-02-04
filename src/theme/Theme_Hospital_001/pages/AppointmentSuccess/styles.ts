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
    marginHorizontal: 16,
  },
  linearGradientBtn: {
    borderRadius: 24,
  },
  submitButton: {
    width: '100%',
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#F5F4F7'
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
    color: '#404E66',
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
    color: '#8193AE',
    lineHeight: 22,
  },
  ipt: {
    fontSize: 14,
    fontWeight: '400',
    color: '#404E66',
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
