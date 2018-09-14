/**
 * 创建时间:2017/11/3
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:侧边栏
 */
import React, {Component} from "react";
import {StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
    ListView,
    ActivityIndicator,
    DeviceEventEmitter
} from "react-native";
import {ImageCache, CachedImage} from "react-native-img-cache";
import Toast, {DURATION} from 'react-native-easy-toast';
import ViewUtils from '../../../utils/ViewUtils'
import {SIDE_MENU} from '../../common/component/MoreMenu'
import styles from '../styles/BroadSidePage'
import BaseComponent from '../../common/component/BaseComponent'
import BarcodeScanner from '../../../common/component/BarcodeScanner'
import SignatureBook from '../../signatureBook';
import MyBlogArticle from '../../blog'
import Settings from '../../settings';
import MyTheme from '../../theme';
import {ThemeFlags} from "../../../res/styles/ThemeFactory";
import ThemeData from "../../../support/data/ThemeData";
import {ACTION_HOME} from "../../common/component/ComponentSetting";
import ThemeFactory from "../../../res/styles/ThemeFactory";
export const ACTION_BroadSide={A_USER:'updateUserInfo'};
export default class BroadSidePage extends BaseComponent {
    constructor(props) {
        super(props);
        this.themeData=new ThemeData()
        this.state={
            theme:this.props.theme,
            user: this.props.userInfo,
        }
        this.lock = false;
    }
    componentDidMount(){
        super.componentDidMount();
        this.listener =DeviceEventEmitter.addListener('ACTION_BroadSide',(action,params)=> this.onAction(action,params));
    }
    //组件将被卸载
    componentWillUnmount(){
        this.lock = true;
    }
    getItem(tag,icon,text){
        return ViewUtils.getSettingItem(()=>{this.onClick(tag)},icon,text,{tintColor:'#ffffff'},null,false,null,true)
    }
    onAction=(action,params)=>{
        if(ACTION_BroadSide.A_USER ===action){
            if(!this.lock){
                this.setState({
                    user:params,
                })
            };
        }
    }
    onClick(tab){
        let TargetComponent, params = {...this.props,menuType: tab};
        switch (tab){
            case SIDE_MENU.MY_ARTICLE:
                if(this.state.user){
                    TargetComponent=MyBlogArticle;
                    params.theme=this.state.theme;
                }
                this.toast && this.toast.show('请登陆您的账号',DURATION.LENGTH_LONG);
                break;
            case SIDE_MENU.MY_THEME:
                TargetComponent=MyTheme;
                params.theme=this.state.theme;
                break;
            case SIDE_MENU.MY_FOCUS:

                break;
            case SIDE_MENU.MY_FANS:

                break;
        }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }
    render() {
        const settingParams={
            theme:this.state.theme,
        }
        return (
            <View style={[styles.container,this.state.theme.styles.backgroundColorStyle]}>
                <View style={[styles.barHight,{flexDirection:'row',justifyContent:'space-between'}]}>
                    <TouchableOpacity
                        onPress={()=> {
                            this.props.navigator.push({
                                component: SignatureBook,
                                params: settingParams,
                            });
                        } }
                    >
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image style={[styles.image,{width:25,height:25,margin:12}]} source={require('../images/ic_card.png')}/>
                            <Text style={styles.text}>打卡</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=> {
                            this.props.navigator.push({
                                component: BarcodeScanner,
                                params: settingParams,
                            });
                        } }
                    >
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image style={[styles.image,{width:25,height:25,margin:12}]} source={require('../images/ic_code.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,marginTop:20,marginLeft:10}}>
                    <View style={{flexDirection:'row'}}>
                        {this.state.user && this.state.user.avatar ?
                            ImageCache.get().bust(this.state.user.avatar) || <CachedImage style={styles.avatarImage} source={{ uri: this.state.user && this.state.user.avatar?this.state.user.avatar:'jpg',height: 35,
                                width: 35 }} />:null
                        }
                        <Text style={styles.avatarText}>{this.state.user?this.state.user.name:'未登录'}</Text>
                    </View>
                    <Text style={styles.signature}>个性签名功能待续……</Text>
                    <View style={{flex:1,marginTop:20,marginLeft:10}}>
                        {this.getItem(SIDE_MENU.MY_ARTICLE,require('../images/ic_side_article.png'),SIDE_MENU.MY_ARTICLE)}
                        {this.getItem(SIDE_MENU.MY_THEME,require('../images/ic_custom_theme.png'),SIDE_MENU.MY_THEME)}
                        {/*{this.getItem(SIDE_MENU.MY_ESSAY,require('../images/ic_side_assay.png'),'我的随笔')}*/}
                        {/*{this.getItem(SIDE_MENU.MY_FOCUS,require('../images/ic_side_focus.png'),'我的关注')}*/}
                        {/*{this.getItem(SIDE_MENU.MY_FANS,require('../images/ic_side_fan.png'),'我的粉丝')}*/}
                    </View>
                </View>
                <View style={{flex:1,justifyContent:'space-between',position:'absolute',flexDirection:'row',bottom:12,left:12}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <TouchableOpacity
                            onPress={()=> {
                                this.props.navigator.push({
                                    component: Settings,
                                    params: settingParams,
                                });
                            } }
                        >
                             <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Image source={require("../images/ic_side_settings.png")}/>
                                <Text style={styles.signature}>设置</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity
                            onPress={()=> {
                                this.themeData.save(ThemeFlags['Night'])
                                DeviceEventEmitter.emit("ACTION_BASE",ACTION_HOME.A_THEME,ThemeFactory.createTheme(ThemeFlags['Night']))
                            } }
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Image source={require("../images/ic_brightness.png")} style={{tintColor:'#FFFFFF',width:20,height:20}}/>
                                <Text style={styles.signature}>夜间模式</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Toast ref={toast=>this.toast=toast}/>
            </View>)
    }
}

