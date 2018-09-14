/**
 *创建时间:  2018/6/12
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { StyleSheet, Platform, Dimensions } from 'react-native';
const STATUS_BAR_HEIGHT = 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tips: {
        fontSize: 29
    },
    item:{
        marginTop:6,
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        height:60,
        justifyContent:'space-between'
    },
    groupTitle:{
        marginLeft:10,
        marginTop:10,
        marginBottom:10,
        fontSize:12,
        color:'gray'
    },
    avatarText:{
        width:40,
        height:40,
        borderRadius:15,
        borderWidth:1,
        borderColor:'#FFFFFF',
        marginRight:15,
    }
});

module.exports = styles;