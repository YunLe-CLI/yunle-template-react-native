import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
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
    marginTop: 0,
    borderRadius: 6,
    marginBottom: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  formItem: {
    flex: 1,
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
  itemHeader: {
    marginTop: -5,
    flexDirection: 'row',
  },
  nameText: {
    fontSize: 16,
    lineHeight: 22.5,
    color: '#404E66',
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  span: {
    paddingLeft: 8,
  },
  note: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    color: '#8193AE',
    fontWeight: '400',
  },
  strong: {
    color: '#11CD8F',
  },
  formItemMoney: {
    color: '#FF3B0E',
  },
  scrollView: {
    flex: 1,
    flexGrow: 1,
  },
  tableHeader: {
    // height: 50,
    backgroundColor: '#D9E9FE',
    borderColor: '#D9E9FE',
    justifyContent: 'center',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableHeaderText: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#404E66',
    fontSize: 12,
  },
  tableText: {
    textAlign: 'center',
    fontWeight: '100',
  },
  tableDataWrapper: { marginTop: -1 },
  tableRow: {

    minHeight: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderLeftWidth: 0,
    // borderLeftColor: '#E8E8E8',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3',
  },
  cellWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCellSpanText: {
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
    color: '#8193AE',
    fontSize: 12,
  },
  end: {
    color: '#8193AE',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 12,
  },
  startWrap: {
    backgroundColor: '#D9E9FE',
    borderLeftWidth: 2,
    borderLeftColor: '#4386E2',
  },
  start: {
    color: '#4386E2',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 6,
    paddingHorizontal: 10,

  }
});
