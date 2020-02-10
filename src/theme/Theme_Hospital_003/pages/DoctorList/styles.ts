import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: '#16183E',
    flex: 1,
  },
  header: {
    height: 72,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DCE3EE',
  },
  title: {
    fontSize: 18,
    lineHeight: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  body: {
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  infoText: {
    paddingHorizontal: 20,
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#404E66',
    fontWeight: '400',
  },
  qrMainWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrWrap: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 17,
    width: 171,
    height: 171,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  qrImage: {
    width: 154,
    height: 154,
    alignItems: 'center',
  },
  qrText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 22,
    color: '#595959',
    textAlign: 'center',
    fontWeight: '400',
  },
  copyWrap: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyTextWrap: {
    flexDirection: 'row',
  },
  copyText1: {

  },
  copyText2: {
    fontWeight: '600',
  },
  btnWrap: {
    marginTop: 24,
    marginHorizontal: 24,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  btn: {
    flexGrow: 1,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 20,
    color: '#fff',
    fontWeight: '400',
  },
  okText: {
    color: '#11CD8F',
  },
  buttonStyle: {
    flexGrow: 1,
    borderRadius: 23,
    height: 46,
    borderColor: '#BFBFBF'
  },
  buttonTitleProps: {
    fontSize: 16,
    color: '#fff',
  },
  buttonStyle2: {
    borderRadius: 23,
    height: 46,
    borderColor: '#BFBFBF'
  },
  buttonTitleProps2: {
    fontSize: 16,
    color: '#BFBFBF',
  },
  listWrap: {
    paddingHorizontal: 0,
  },
  listItem: {
    marginLeft: 0,
    marginRight: 0,
    height: 44,
    borderBottomWidth: 0,
    backgroundColor: '#fff',
  },
  selected: {
    backgroundColor: 'rgba(17, 205, 143, .2)',
  },
  listText: {
    marginLeft: 17,
    marginRight: 17,
  },
  card: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: '#16183E'
  },
  itemHeader: {
    flexDirection: 'row',
  },
  nameText: {
    fontSize: 16,
    lineHeight: 22.5,
    color: '#DBDCD4',
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  span: {
    paddingLeft: 8,
  },
  note: {
    marginTop: 12,
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(255,255,255, .5)',
    fontWeight: '400',
  },
  strong: {
    color: '#11CD8F',
  },
});
