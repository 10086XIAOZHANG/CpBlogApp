import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    trending_row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    trending_title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
        flex: 1
    },
    trending_description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#3e3e3e'
    },
    trending_cell_container: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width:0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation:2
    },
    trending_author: {
        fontSize: 14,
        marginBottom: 2,
        color: '#282828'
    },
});

module.exports = styles;
