/**
 *创建时间:  2018/6/13
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { StyleSheet, Platform, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        // backgroundColor:'red'
    },
    searchRow:{
        alignItems:'center',
        flexDirection:'row',
        marginBottom:5,
        marginTop:5
    },
    search_content: {
        flex: 1,
        paddingVertical: 0,
        flexDirection:'row',
        color: '#ffffff',
        fontSize: 14,
        paddingLeft:10,
    },
    search: {
        marginLeft:10,
        marginRight:10,
        height: 30,
        flex: 1,
        width:280,
        borderWidth: 0.5,
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
    fullScreenHeight:{
        height:Dimensions.get('window').height
    },
    centering:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
})
module.exports = styles;