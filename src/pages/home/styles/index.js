import { StyleSheet, Platform, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.01)',
        position: 'relative'
    },
    image: {
        height: 26,
        width: 26,
    },
    pag1:{
        flex:1
    },
    pag2:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    background_image:{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    background_color: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    search_content: {
        paddingVertical: 0,
        flex: 1,
        color: '#ffffff',
        fontSize: 14,
        paddingLeft:10,
    },
    search: {
        marginTop:2,
        height: 20,
        flex: 1,
        width:280,
        borderWidth: 0.5,
        borderColor: '#ffffff',
        borderRadius: 30,
        paddingLeft: 15,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchIcon:{
        marginLeft: 2,
        marginRight: 3,
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    tab_content: {
        paddingTop: 6,
        paddingBottom: 6,
        flex: 4
    },
    tab_left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

module.exports = styles;
