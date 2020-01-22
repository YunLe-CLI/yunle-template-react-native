import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9'
  },
  btn: {
    borderRadius: 4,
  },
  linearGradientBtn: {
    borderRadius: 6,
    marginBottom: 20,
  },
  btnItemBox: {
  },
  boxLeft: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: -10,
    paddingLeft: 0,
    flexGrow: 1,
  },
  boxTitle: {
    paddingBottom: 8,
    color: '#fff',
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '500',
  },
  boxTitle_1: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  boxTitle_2: {
    paddingTop: 10,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  boxIconWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
});
