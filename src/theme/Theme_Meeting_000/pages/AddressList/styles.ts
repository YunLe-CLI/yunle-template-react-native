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
  listWrap: {
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
