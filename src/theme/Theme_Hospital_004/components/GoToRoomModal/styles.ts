import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#353B50',
    textAlign: 'center',
    fontWeight: '500',
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  infoText: {
    paddingHorizontal: 20,
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
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
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  btn: {
    flexGrow: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 20,
    color: '#000000',
    fontWeight: '400',
  },
  okText: {
    color: '#fff',
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
