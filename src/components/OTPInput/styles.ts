import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12 as any,
        marginVertical: 30,
    },
    box: {
        width: 64,
        height: 64,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
    },
});