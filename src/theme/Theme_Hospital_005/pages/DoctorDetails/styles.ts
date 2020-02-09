import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
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
    paddingHorizontal: 15,
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
    marginBottom: 12,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: 'transparent'
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
    color: '#1457FF',
  },
  formItemMoney: {
    color: '#FF8A00',
  },
  scrollView: {
    marginLeft: -1,
    marginTop: -1,
    marginBottom: -1,
    marginRight: -1,
    flex: 1,
    flexGrow: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableHeader: {
    // height: 50,
    backgroundColor: '#D3E5FF',
    borderColor: '#E8E8E8',
    justifyContent: 'center',
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

    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderLeftColor: '#E8E8E8',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
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
  start: {
    color: '#1457FF',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 12,
  }
});
