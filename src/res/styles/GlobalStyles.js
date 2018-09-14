/*
* 全局样式
* */

import {
    Dimensions
}from 'react-native'
const {height, width} = Dimensions.get('window');
module.exports={
    line:{
        flex:1,
        height:0.4,
        opacity:0.5,
        marginTop:1,
        marginBottom:1,
        backgroundColor:'#bababb'

    },
    root_container:{
      flex:1,
      backgroundColor:'#bababb',
    },
    backgroundColor:'rgb(1, 37, 42)',
    backgroundHalfColor:'rgba(1, 37, 42,0.5)',
    nav_bar_height_ios:30,
    nav_bar_height_android:40,
    window_height:height,

}