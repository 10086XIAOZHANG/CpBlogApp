import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    Image
} from 'react-native'
export default class ViewUtils{
    /**
     * 获取设置页的Item
     * @param callBack 单击item的回调
     * @param icon 左侧图标
     * @param text 显示的文本
     * @param tintStyle 图标着色
     * @param expandableIco 右侧图标
     * @return {XML}
     */
    static getSettingItem(callBack, icon, text, tintStyle, expandableIco, isTextColor=false,rightElement=null,isShowRightElement=false) {
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={callBack}>
                <View style={[styles.setting_item_container]}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        {icon ?
                            <Image source={icon} resizeMode='stretch'
                                   style={[{opacity: 1, width: 16, height: 16, marginRight: 10,}, tintStyle]}/> :
                            <View style={{opacity: 1, width: 16, height: 16, marginRight: 10,}}/>
                        }
                        <Text style={{color:isTextColor?'#333':'#fff'}}>{text}</Text>
                    </View>
                    {isShowRightElement?<Text></Text>:
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            {rightElement?rightElement:<Text></Text>}
                            <Image source={expandableIco ? expandableIco : require('../pages/my/images/ic_tiaozhuan.png')}
                                   style={[{
                                       marginRight: 10,
                                       height: 22,
                                       width: 22,
                                       alignSelf: 'center',
                                       opacity: 1
                                   }, tintStyle]}/>
                        </View>
                    }

                </View>
            </TouchableHighlight>
        )
    }
    static getLeftButton(callBack,text='', isShowText=false){
        return <TouchableOpacity
               underlayColor={'transparent'}
                style={{padding:0}}
                onPress={callBack}>
                    <View style={{flexDirection:'row'}}>
                        <Image
                            style={{width:24,height:24,tintColor:'#FFFFFF'}}
                            source={require('../res/images/ic_arrow_back_white_36pt.png')}
                        ></Image>
                        <Text style={{marginRight:5,height:24,color:'#fff',fontSize:18,flexDirection:'row',alignItems:'center'}}>{isShowText?text:''}</Text>
                    </View>
                </TouchableOpacity>

    }
    static getRightButton(title,callBack){
        return <TouchableOpacity
            style={{alignItems: 'center',}}
            onPress={callBack}>
            <View style={{marginRight:10}}>
                <Text style={{fontSize: 16,color: '#FFFFFF',}}>{title}</Text>
            </View>
        </TouchableOpacity>
    }
    /**
     * 获取更多按钮
     * @param callBack
     * @returns {XML}
     */
    static getMoreButton(callBack){
        return <TouchableHighlight
            underlayColor={'transparent'}
            ref="moreMenuButton"
            style={{padding:5}}
            onPress={callBack}
        >
            <View style={{paddingRight:12}}>
                <Image
                    style={{width:25,height:25,}}
                    source={require('../res/images/ic_more_vert_white_48pt.png')}
                />
            </View>
        </TouchableHighlight>
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    setting_item_container:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        height:60,
        justifyContent:'space-between'
    },
    text:{
        color:'#fff'
    }
})