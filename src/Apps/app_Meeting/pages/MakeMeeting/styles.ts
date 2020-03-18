import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    flex: 1,
  },
  boxWithShadow: {
    marginBottom: 12,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 2.22,

    elevation: 3,
  },
  headerWrap: {
    minHeight: 60,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    lineHeight: 25,
  },
  formCard: {
    marginTop: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  listWrap: {
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  btnTab: {
    backgroundColor: '#118DF0',
  },
  btnTabText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    color: '#fff'
  },
  formItem: {
    flex: 1,
  },
  formItemLabel: {

    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    minWidth: 104,
    color: 'rgba(0,0,0,0.85)'
  },
  ipt: {
    height: 30,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    flexGrow: 1,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    minWidth: 104,
    color: 'rgba(0,0,0,0.85)',
  },
});
