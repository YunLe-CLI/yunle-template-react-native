import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
  }
});
