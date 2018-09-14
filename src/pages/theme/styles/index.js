/**
 *创建时间:  2018/6/14
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { StyleSheet, Platform, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.01)',
        position: 'relative'
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
    modelContainer:{
        flex:1,
        margin:10,
        marginTop:Platform.OS==='ios'?20:10,
        shadowColor:'gray',
        shadowOpacity:0.5,
        padding:3,
        shadowRadius:5,
        shadowOffset:{width:2,height:2}
    },
    themeItem:{
        flex:1,
        height:120,
        margin:3,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    themeText:{
        color:'#ffffff',
        fontWeight:'500',
        fontSize:16
    }
})
module.exports = styles;