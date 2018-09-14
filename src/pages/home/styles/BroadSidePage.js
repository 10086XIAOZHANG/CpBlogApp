/**
 *创建时间: 2017/11/3
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { StyleSheet, Platform, Dimensions } from 'react-native';
const STATUS_BAR_HEIGHT =20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.01)',
        position: 'relative'
    },
    barHight: {
        marginTop: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT:0,
    },
    image: {
        height: 26,
        width: 26,
    },
    text:{
        color:'#ffffff',
        fontSize:16
    },
    avatarText: {
        fontWeight: '500',
        color: '#ffffff',
        fontSize: 18,
        height:35,
        lineHeight:35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarImage:{
        width:35,
        height:35,
        borderRadius:15,
        borderWidth:1,
        borderColor:'#FFFFFF',
        marginRight:10,
        marginBottom:10
    },
    signature:{
        fontSize:12,
        borderColor:'#ffffff',
        color:'#ffffff'
    }

});

module.exports = styles;
