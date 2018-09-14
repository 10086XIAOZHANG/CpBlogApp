/**
 *创建时间:  2018/6/13
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
    TouchableOpacity,
} from 'react-native'
import AsyncStorageUtils from '../../utils/AsyncStorageUtils';
import NavigationBar from '../../common/component/NavigationBar'
import BaseComponent from '../common/component/BaseComponent'
import ViewUtils from '../../utils/ViewUtils'
import styles from './styles/index'
import {SORTWARE_SETTING_MENU} from "../common/component/MoreMenu";
import GlobalStyles from "../../res/styles/GlobalStyles";
import ThemeFactory from "../../res/styles/ThemeFactory";
import HomePage from "../home";
export default class Settings extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            theme:this.props.theme,
        }
    }
    onClick=(tag)=>{
        console.log(tag)
    }
    onExit=()=>{
        AsyncStorageUtils.clearAll();
        this.props.navigator.resetTo({
            component:HomePage,
            params:{
                theme:this.state.theme,
            }
        })
    }
    getItem(tag,icon,text,rightElement){
        return ViewUtils.getSettingItem(()=>{this.onClick(tag)},icon,text,{tintColor:'#FFFFFF'},null,false,rightElement)
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
                        title='个人信息'
                        leftButton={
                            ViewUtils.getLeftButton(()=>{this.props.navigator.pop()},'返回',true)
                        }
                        style={this.state.theme.styles.backgroundColorStyle}
                        statusBar={statusBar}
                    />
                    <View>
                        <View style={GlobalStyles.line} />
                        <View style={{backgroundColor:'rgba(255,255,255,0.2)'}}>
                            {/*帮助*/}
                            {this.getItem(SORTWARE_SETTING_MENU.SETTING_HYPE,null,SORTWARE_SETTING_MENU.SETTING_HYPE,null)}
                        </View>
                        <View style={GlobalStyles.line} />
                        <View style={{backgroundColor:'rgba(255,255,255,0.2)'}}>
                            {/*反馈*/}
                            {this.getItem(SORTWARE_SETTING_MENU.SETTING_FEEDBACK,null,SORTWARE_SETTING_MENU.SETTING_FEEDBACK,null)}
                        </View>
                        <View style={{backgroundColor:'rgba(255,255,255,0.2)',marginTop:20}}>
                            {/*关于微信*/}
                            {this.getItem(SORTWARE_SETTING_MENU.SETTING_ABOUT,null,SORTWARE_SETTING_MENU.SETTING_ABOUT,<Text style={{color:'#fff'}}>版本1.0.1</Text>)}
                        </View>
                        <View style={GlobalStyles.line} />
                        <View style={{marginTop:20}}>
                            <TouchableOpacity
                                style={styles.btnStyle}
                                underlayColor={'transparent'}
                                onPress={this.onExit}
                            >
                                <Text style={styles.exitText}>{SORTWARE_SETTING_MENU.SETTING_EXIT}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>)
    }
}