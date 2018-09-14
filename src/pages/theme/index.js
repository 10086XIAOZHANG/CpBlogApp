/**
 *创建时间:  2018/6/14
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import  React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView, DeviceEventEmitter,
    TouchableHighlight,
} from 'react-native'
import NavigationBar from '../../common/component/NavigationBar'
import BaseComponent from '../common/component/BaseComponent'
import ThemeData from '../../support/data/ThemeData'
import ThemeFactory,{ThemeFlags} from '../../res/styles/ThemeFactory'
import {ACTION_HOME} from "../common/component/ComponentSetting"
import ViewUtils from '../../utils/ViewUtils'
import styles from './styles/index'

export default class MyTheme extends BaseComponent {
    constructor(props) {
        super(props);
        this.themeData=new ThemeData()
        this.state = {
            theme:this.props.theme
        }
    }
    /**
     * 单击主题颜色
     * */
    onSelectTheme(themeKey){
        this.themeData.save(ThemeFlags[themeKey])
        DeviceEventEmitter.emit("ACTION_BASE",ACTION_HOME.A_THEME,ThemeFactory.createTheme(ThemeFlags[themeKey]))
    }
    /*
    * 创建主题
    * */
    getThemeItem(themeKey){
        return (<TouchableHighlight
            style={{flex:1}}
            underlayColor='#ffffff'
            onPress={()=>{this.onSelectTheme(themeKey)}}

        >
            <View style={[{backgroundColor:ThemeFlags[themeKey]},styles.themeItem]}>
                <Text style={styles.themeText}>{themeKey}</Text>
            </View>
        </TouchableHighlight>)
    }
    /**
     * 创建主题列表
     * */
    renderThemeItems(){
        var views=[];
        for(var i=0;l=Object.keys(ThemeFlags),i<l.length;i=i+3){
            key1=l[i],key2=l[i+1],key3=l[i+2]
            views.push(<View key={i} style={{flexDirection:'row',flex:1}}>
                {this.getThemeItem(key1)}
                {this.getThemeItem(key2)}
                {this.getThemeItem(key3)}
            </View>)
        }
        return views;
    }
    rederContentView(){
        {/* 初始化Modal */}
        return (
            <View style={styles.modelContainer}>
                <ScrollView>
                    {this.renderThemeItems()}
                </ScrollView>
            </View>
       )
    }
    render() {
        var statusBar={
            backgroundColor:this.state.theme.themeColor
        }
        return (
            <View style={styles.container}>
                <Image source={require('../../res/images/background_image.png')} style={styles.background_image} />
                <View style={styles.background_color}>
                    <NavigationBar
                        title='我的主题'
                        leftButton={
                            ViewUtils.getLeftButton(()=>{this.props.navigator.pop()},'返回',true)
                        }
                        style={this.state.theme.styles.backgroundColorStyle}
                        statusBar={statusBar}
                    />
                    {this.rederContentView()}
                </View>
            </View>)
    }
}