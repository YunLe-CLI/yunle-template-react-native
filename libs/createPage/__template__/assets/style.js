import {
	StyleSheet,
} from 'react-native';

export default StyleSheet.create({
	container: {
		marginTop: 25,
		padding: 10,
	},
	header: {
		fontSize: 20,
	},
	nav: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	navItem: {
		flex: 1,
		alignItems: 'center',
		padding: 10,
	},
	subNavItem: {
		padding: 5,
	},
	topic: {
		textAlign: 'center',
		fontSize: 15,
	}
})