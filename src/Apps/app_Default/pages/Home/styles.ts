import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  btn: {
    borderRadius: 4,
  },
  header: {
    marginTop: 30,
    marginBottom: 25,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerUser: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBtns: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerBtn: {
    paddingTop: 0,
    paddingRight: 15,
    paddingBottom: 0,
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    height: 24,
  },
  headerBtnText: {
    color: '#262626',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center'
  },
  itemTitle: {
    paddingVertical: 15,
    color: '#404E66',
    fontSize: 20,
    lineHeight: 23,
    fontWeight: '500',
    backgroundColor: '#F6F6F6',
    textAlign: 'justify'
  },
  itemBox: {
    // minHeight: 118,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    overflow: 'hidden'
  },
  typeLineDefault: {
    width: 16,
    height: 3,
    backgroundColor: '#13B6FF',
  },
  typeLine01: {
    backgroundColor: '#11CD8F',
  },
  typeLine02: {
    backgroundColor: '#B0BED4',
  },
  itemBoxBody: {
    flex: 1,
    flexGrow: 1,
    marginTop: -3,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
    // overflow: 'hidden'
  },
  itemBoxLeft: {
    marginRight: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemIconText: {
    paddingHorizontal: 8,
    borderRadius: 2,
    color: '#fff',
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '400',
    backgroundColor: '#FFC862',
  },
  itemIconText00: {
    backgroundColor: '#FFC862',
    color: '#fff',
  },
  itemIconText01: {
    backgroundColor: '#118DF0',
    color: '#fff',
  },
  itemIconText02: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    color: '#fff',
  },
  itemBoxContent: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  itemBodyTitle: {
    marginTop: 10,
    flex: 1,
    flexGrow: 1,
    color: '#404E66',
    fontSize: 16,
    lineHeight: 22.5,
    fontWeight: '500',
    textAlign: 'justify'
  },
  itemBodyText: {
    flexGrow: 1,
    marginTop: 10,
    color: '#8193AE',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    textAlign: 'justify'
  },
  itemBodyText001: {
    marginTop: 8.5,
  },
  itemBodyText002: {
    color: '#FC492E',
  },
  itemBoxFooter: {
    marginTop: 16,
    marginRight: -8,
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  itemBodyBtnWrap: {
    marginLeft: -8,
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDefault: {
    flexGrow: 1,
    height: 36,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradientBtn: {
    flexGrow: 1,
    marginLeft: 8,
    borderRadius: 4,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    textAlign: 'justify'
  },
  clearButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.25)',
  },
  btnClearText: {
    color: '#fff',
  },
  submitButton: {

  },
  btnTab: {
    flexDirection: 'row'
  },
  btnTabText: {
    color: '#404E66',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    textAlign: 'justify'
  },
  activeBtnTabText: {
    color: '#fff',
  },
  line: {
    width: 1,
    height: 24,
    backgroundColor: '#DCE3EE',
  },
  footerWrap: {
    borderTopColor: '#DCE3EE',
    height: 53,
  },
  formContent: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  formCard: {
    borderRadius: 6,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  formItemLabel: {
    minWidth: 61.5,
    marginRight: 27.5,
    fontSize: 15,
    fontWeight: '400',
    color: '#404E66',
    lineHeight: 21,
  },
  ipt: {
    flexGrow: 1,
    fontSize: 15,
    fontWeight: '400',
    color: '#CCD5E3',
    lineHeight: 21,
  },
  linearGradientBtn2: {
    marginTop: 24,
    marginBottom: 16,
    flexGrow: 1,
    borderRadius: 24,
  },
  segmentWrap: {
    backgroundColor: 'transparent',
    height: 32,
  },
  segmentBtn: {
    height: 32,
  },
  segmentBtnText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
});
