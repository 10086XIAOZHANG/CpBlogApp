/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能: login index 样式
 */

import { StyleSheet, Platform, Dimensions } from 'react-native';
const STATUS_BAR_HEIGHT = 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: Dimensions.get('window').width,
        flexDirection: 'column',
        //设置次轴的对齐方式
        alignItems: 'center'
},
    circleImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'white',
        marginTop: 100,
        marginBottom: 25,
    },
    input_group: {
        justifyContent: 'center',
    },
    textInput: {
        height: 40,
        width: Dimensions.get('window').width - 34,
        marginBottom: 5,
        backgroundColor: 'white',
        textAlign: 'center',
    },
    canNot: {
        width: Dimensions.get('window').width - 38,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        //设置主轴为两端对齐
        justifyContent: 'space-between',
    },
    loginTheWay: {
        flexDirection: 'row',
        //设置次轴的对齐方式
        alignItems: 'center',
        justifyContent: 'flex-start',
        //绝对定位
        position: 'absolute',
        //距离底部还有30 距离左边还有10 这样的一个位置
        bottom: 30,
        // left: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginLeft: 5,
        borderRadius: 25,
    },
    btnStyle: {
        height: 40,
        width: Dimensions.get('window').width - 32,
        borderRadius: 5,
        marginTop: 20,
        backgroundColor: '#4398ff',
        justifyContent: 'center',
    },
    loginText: {
        textAlign: 'center',
        color: 'white',
        textAlignVertical: 'center',
    },
    goBack:{
        position: 'absolute',
        left: 14,
        top: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT:0,
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


});

module.exports = styles;
