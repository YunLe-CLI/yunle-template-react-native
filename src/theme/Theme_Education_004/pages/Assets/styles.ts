import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: '#010118',
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
  itemBox: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemBox_1: {
    borderTopWidth: 1,
    borderTopColor: 'transparent',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    borderLeftWidth: 1,
    borderLeftColor: 'transparent',
  },
  itemBox_2: {
    borderTopWidth: 1,
    borderTopColor: 'transparent',
    borderRightWidth: 1,
    borderRightColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    borderLeftWidth: 1,
    borderLeftColor: 'transparent',
  },
  itemBox_3: {
    borderTopWidth: 1,
    borderTopColor: 'transparent',
    borderRightWidth: 1,
    borderRightColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    borderLeftWidth: 1,
    borderLeftColor: 'transparent',
  },

  btnWrap: {
    marginTop: 30,
    borderRadius: 3,
    overflow: 'hidden'
  },
  btnContent: {
    paddingTop: 0,
    paddingBottom: 0,
    height: 28,
    paddingHorizontal: 20,
  },
});
