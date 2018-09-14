import {
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native'
import GlobalStyles from '../../../res/styles/GlobalStyles'
var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        // backgroundColor:'red'
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
    container_row:{
        flex: 4,
        flexDirection:'row',
        alignItems: 'center',
        height: (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android,
        borderWidth: (Platform.OS === 'ios') ? 1 :0.5,
        borderColor: '#ffffff',
        borderRadius: 10,
        marginLeft:12,
        marginRight:12,
        paddingLeft: 15,
        paddingRight: 2,
    },
    statusBar: {
        height: 20,
    },
    textInput: {
        flex: 1,
        alignItems: 'center',
        color:'#ffffff',
        flexDirection: 'row',
        fontSize: 14,
        paddingLeft:10,
    },
    title: {
        fontSize: 16,
        color: "#ffffff",
        fontWeight: '400'
    },
    centering:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    bottomButton:{
        alignItems:'center',
        justifyContent:'center',
        opacity:0.9,
        height:40,
        position:'absolute',
        left:10,
        top:GlobalStyles.window_height-45,
        right:10,
        borderRadius:3
    },
    searchIcon:{
        flexDirection:'row',
        marginLeft: 2,
        marginRight: 13,
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    bottomButton:{
        alignItems:'center',
        justifyContent:'center',
        opacity:0.6,
        height:40,
        position:'absolute',
        left:10,
        top:GlobalStyles.window_height-65,
        right:10,
        borderRadius:3
    },
    centering:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    fullScreenHeight:{
        height:Dimensions.get('window').height
    }
});
module.exports=styles