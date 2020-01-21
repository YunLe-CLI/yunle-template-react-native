import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
    marginTop: 20,
    fontSize: 15,
    color: '#192038',
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

  btnContent: {
    paddingTop: 0,
    paddingBottom: 0,
    height: 32,
    paddingHorizontal: 20,
  },
  btnWrap: {
    marginTop: 12,
    borderRadius: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FE3D00'
  }
});
