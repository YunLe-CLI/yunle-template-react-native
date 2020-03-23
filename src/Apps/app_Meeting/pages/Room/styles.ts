import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: '#121E23',
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
  loadingWrap: {
    marginTop: -100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12.5,
    fontSize: 16,
    lineHeight: 22,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '400',
  },
  footerWrap: {
    borderTopWidth: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    backgroundColor: 'transparent'
  },
  btnWrap: {
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0,
    width: 48,
    height: 48,
    backgroundColor: '#000000',
    borderRadius: 24,
  },
  userNameWrap: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  userNameText: {
    fontSize: 12,
    color: '#404E66',
    textAlign: 'center',
    fontWeight: '400',
  },
  bigView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000'
  }
});