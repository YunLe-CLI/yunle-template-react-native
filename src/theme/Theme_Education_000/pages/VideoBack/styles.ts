import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: '#2E323F',
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
    color: '#fff',
    fontWeight: '400',
    lineHeight: 21,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
    lineHeight: 23,
    paddingHorizontal: 16,
    paddingVertical: 16,
    textAlign: 'center',
  },
  itemWrap: {
    height: 50,
  },
  on: {
    backgroundColor: 'rgba(85,132,255, .7)',
  }
});