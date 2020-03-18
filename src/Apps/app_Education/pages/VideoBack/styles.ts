import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  boxWithShadow: {
    marginBottom: 12,
    shadowColor: 'rgba(0,0,0,.04)',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    height: 55,
    borderRadius: 4,
  },
  trafficTitle: {
    fontSize: 20,
    lineHeight: 28,
    color: '#262626',
    textAlign: 'center',
    fontWeight: '600',
  },
  trafficInfoText: {
    paddingHorizontal: 20,
    marginTop: 20,
    fontSize: 14,
    lineHeight: 22,
    color: '#595959',
    textAlign: 'center',
    fontWeight: '400',
  },
  trafficButton: {
    borderRadius: 23,
    height: 46,
    borderColor: '#FB3A3A',
    backgroundColor: '#FB3A3A',
  },
  trafficButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  itemText: {
    fontSize: 15,
    color: '#303133',
    fontWeight: '400',
    lineHeight: 21,
  },
  title: {
    height: 45,
    backgroundColor: '#EEF1F4',
    fontSize: 14,
    color: '#1D262C',
    fontWeight: '500',
    paddingHorizontal: 16,
    marginTop: 16,
    lineHeight: 45,
    marginHorizontal: 16,
    borderRadius: 4,
  },
  btn: {
    marginLeft: 17,
    marginBottom: 17,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D3D3D3',
    backgroundColor: '#EEF1F4',
  },
  btnText: {
    color: '#51549A'
  }
});
