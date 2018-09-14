/**
 *创建时间:  2018/6/13
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

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
} from 'react-native'
import {ImageCache, CachedImage} from "react-native-img-cache";
import NavigationBar from '../../common/component/NavigationBar'
import BaseComponent from '../common/component/BaseComponent'
import ViewUtils from '../../utils/ViewUtils'
import styles from './styles/index'
import {USER_MENU} from "../common/component/MoreMenu";
import GlobalStyles from "../../res/styles/GlobalStyles";
export default class User extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            theme:this.props.theme,
            userInfo:this.props.userInfo,
        }
    }
    onClick=(tag)=>{
        console.log(tag)
    }
    getItem(tag,icon,text,rightElement){
        return ViewUtils.getSettingItem(()=>{this.onClick(tag)},icon,text,{tintColor:'#FFFFFF'},null,false,rightElement)
    }
    render() {
        var statusBar={
            backgroundColor:this.state.theme.themeColor
        }
        const avatarImgae =  ImageCache.get().bust(this.state.userInfo.avatar) || <CachedImage style={styles.avatarImage} source={{ uri: this.state.userInfo && this.state.userInfo.avatar?this.state.userInfo.avatar:'jpg',height: 40,
            width: 40 }} style={styles.avatarText} />;
        return (
            <View style={styles.container}>
                <Image source={require('../../res/images/background_image.png')} style={styles.background_image} />
                <View style={styles.background_color}>
                    <NavigationBar
                        title='个人信息'
                        leftButton={
                            ViewUtils.getLeftButton(()=>{this.props.navigator.pop()},'我的',true)
                        }
                        style={this.state.theme.styles.backgroundColorStyle}
                        statusBar={statusBar}
                    />
                    <View>
                        <View style={{backgroundColor:'rgba(255,255,255,0.2)',marginTop:10}}>
                            {/*头像*/}
                            {this.getItem(USER_MENU.MY_AVATAR,null,USER_MENU.MY_AVATAR,avatarImgae)}
                        </View>
                        <View style={GlobalStyles.line} />
                        <View style={{backgroundColor:'rgba(255,255,255,0.2)'}}>
                            {/*姓名*/}
                            {this.getItem(USER_MENU.MY_NAME,null,USER_MENU.MY_NAME,<Text style={{color:'#fff'}}>{this.state.userInfo.name}</Text>)}
                        </View>
                        <View style={GlobalStyles.line} />
                        <View style={{backgroundColor:'rgba(255,255,255,0.2)'}}>
                            {/*性别*/}
                            {this.getItem(USER_MENU.MY_GENDER,null,USER_MENU.MY_GENDER,<Text style={{color:'#fff'}}>{this.state.userInfo.gender==='male'?'男':'女'}</Text>)}
                        </View>
                        <View style={GlobalStyles.line} />
                        <View style={{backgroundColor:'rgba(255,255,255,0.2)'}}>
                            {/*生日*/}
                            {this.getItem(USER_MENU.MY_BIRTHDAY,null,USER_MENU.MY_BIRTHDAY,<Text style={{color:'#fff'}}>{this.state.userInfo.birthday}</Text>)}
                        </View>
                        <View style={GlobalStyles.line} />
                        <View style={{backgroundColor:'rgba(255,255,255,0.2)',marginTop:20}}>
                            {/*电话号码*/}
                            {this.getItem(USER_MENU.MY_PHONE,null,USER_MENU.MY_PHONE,<Text style={{color:'#fff'}}>{this.state.userInfo.mobile}</Text>)}
                        </View>
                        <View style={GlobalStyles.line} />
                        <View style={{backgroundColor:'rgba(255,255,255,0.2)'}}>
                            {/*邮箱*/}
                            {this.getItem(USER_MENU.MY_EMAIL,null,USER_MENU.MY_EMAIL,<Text style={{color:'#fff'}}>{this.state.userInfo.email}</Text>)}
                        </View>
                    </View>
                </View>
            </View>)
    }
}