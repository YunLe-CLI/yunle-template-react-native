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
    backgroundColor: '#F9FAFF'
  },
  btnWrap: {
    marginTop: 72,
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
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
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
    fontSize: 13,
    fontWeight: '500',
    color: '#404E66',
    lineHeight: 22.5,
    alignItems: "center",
    justifyContent: "center",
  },
  formItemMoney: {
    color: '#666666',
  },
  formItemLabel: {
    minWidth: 56,
    marginRight: 16,
    fontSize: 14,
    fontWeight: '400',
    color: '#32303D',
    lineHeight: 22,
  },
  ipt: {
    flexGrow: 1,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 22,
  },
  iptMultiline: {
    // minHeight: 112,
  }
});
