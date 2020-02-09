import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 21,
    paddingHorizontal: 20,
    fontSize: 18,
    lineHeight: 21,
    color: '#353B50',
    textAlign: 'center',
    fontWeight: '500',
  },
  infoText: {
    paddingHorizontal: 20,
    marginTop: 24,
    fontSize: 14,
    lineHeight: 20,
    color: '#404E66',
    textAlign: 'center',
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    borderTopWidth: 0,
    borderTopColor: '#F2F2F2',
  },
  btn: {
    marginHorizontal: 28,
    marginBottom: 21,
    flexGrow: 1,
    borderColor: 'transparent',
    height: 50,
    backgroundColor: '#000'
  },
  btnText: {
    fontSize: 18,
    lineHeight: 20,
    color: '#8193AE',
    fontWeight: '400',
  },
  okText: {
    color: '#FFFFFF',
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
});
