import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    color: '#262626',
    textAlign: 'center',
    fontWeight: '600',
  },
  infoText: {
    paddingHorizontal: 20,
    marginTop: 20,
    fontSize: 14,
    lineHeight: 22,
    color: '#595959',
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
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
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
