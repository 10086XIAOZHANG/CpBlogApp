/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能: 登 录
 */

import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    ListView,
    Platform,
    PixelRatio,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    DeviceEventEmitter,
    ActivityIndicator,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import CpTextInput from '../../common/component/CpTextInput';
import UrlCofing from '../../common/UrlCofing';
import Config from '../../common/config';
import styles from './styles/index'
import BaseComponent from '../common/component/BaseComponent'
import ViewUtils from '../../utils/ViewUtils'
import AsyncStorageUtils from '../../utils/AsyncStorageUtils';
import DataRepository, {FLAG_STORAGE} from "../../support/data/dataRepository";
import {ACTION_BroadSide} from '../home/views/BroadSidePage';
import {ImageCache, CachedImage} from "react-native-img-cache";
export default class LoginPage extends BaseComponent{
    constructor(props) {
        super(props);
        this.dataRespository=new DataRepository();
        this.state={
            account:'',
            pwd:'',
            isLoading:false,
        }
    }
    componentWillMount(){
        ImageCache.get().bust('http://www.jimck.cn:8000/media/avatar/images/7.pic_hd_y9yP6Gq.jpg/')
    }
    onChangeAccountText=(text)=>{
        this.setState({
            account:text,
        });
    }
    onChangePwdText=(text)=>{
        this.setState({
            pwd:text,
        });
    }
    onSumit=()=>{
        this.setState({
            isLoading:true,
        })
        if(this.state.account===''||this.state.pwd===''){
            this.toast.show('账号和密码不能为空',DURATION.LENGTH_LONG);
            return;
        }
        this.dataRespository.fetchServerRepository(UrlCofing.TOKENURL,
            UrlCofing.TOKEN(this.state.account,this.state.pwd).CONFIG)
            .then(result=> {
                if(!result.hasOwnProperty('non_field_errors')) {
                    AsyncStorageUtils.save(Config.defaultProps.USER_TOKEN, result.token);
                    AsyncStorageUtils.save(Config.defaultProps.USER_ID, result.user_id);
                    this.dataRespository.fetchServerRepository(UrlCofing.USER(result).URL, UrlCofing.USER(result).CONFIG).then(userInfo => {
                        if (userInfo) {
                            // DeviceEventEmitter.emit('ACTION_BroadSide',ACTION_BroadSide.A_USER,userInfo);
                            this.props.callBackInfo(userInfo);
                            this.props.navigator.pop();
                        }
                    }).then(data => {
                        if (data) {
                            DeviceEventEmitter.emit('ACTION_BroadSide', ACTION_BroadSide.A_USER, data);
                        }
                    }).catch(error => {
                        console.log(error);
                    })
                }else {
                    this.toast.show('账号或者密码错误',DURATION.LENGTH_LONG);
                }
            })
            .then(data=>{
                this.getUserData(data);
            })
            .catch(error=> {
                console.log(error);
                // this.toast.show(error,DURATION.LENGTH_LONG);
            })
    }
    getUserData=(data)=>{

    }
    render() {
        const avatarUrl='http://www.jimck.cn:8000/media/avatar/images/7.pic_hd_y9yP6Gq.jpg/';
        const indicatorView=this.state.isLoading?
            <ActivityIndicator
                animating={this.state.isLoading}
                style={[styles.centering,styles.fullScreenHeight]}
                size="large" />:null;
        return (
            <View style={styles.container}>
                <Image source={require('./images/login_bg.jpg')} style={styles.background_image} />
                {indicatorView}
                <View style={styles.background_color}>
                    <View style={styles.goBack}>
                        {ViewUtils.getLeftButton(()=>{this.props.navigator.pop()})}
                    </View>
                {/*头像*/}
                <View style={styles.circleImage}>
                {ImageCache.get().bust(avatarUrl) || <CachedImage source={{ uri: avatarUrl,height: 25,
                    width: 25 }} />}
                </View>
                    <View style={styles.input_group}>
                        {/*账户*/}
                        <CpTextInput
                            onChangeText={(text) => this.onChangeAccountText(text)}
                            style={styles.textInput}
                            placeholder={'请输入用户名'}
                            //输入框下划线
                            underlineColorAndroid={'transparent'}/>
                        {/*密码*/}
                        <TextInput
                            onChangeText={(text) => this.onChangePwdText(text)}
                            style={styles.textInput}
                            placeholder={'请输入密码'}
                            secureTextEntry={true}
                            underlineColorAndroid={'transparent'}/>
                    </View>
                {/*登录*/}
                <TouchableOpacity
                    style={styles.btnStyle}
                    underlayColor={'transparent'}
                    onPress={this.onSumit}
                >
                    <Text style={styles.loginText}>登录</Text>
                </TouchableOpacity>
                {/*无法登录  新用户*/}
                <View style={styles.canNot}>
                    <Text style={{color: '#FFFFFF'}}>无法登录</Text>
                    <Text style={{color: '#FFFFFF'}}>新用户</Text>
                </View>
                {/*服务 条款*/}
                <View style={styles.loginTheWay}>
                    <Text style={{color: '#FFFFFF'}}>登陆即代表阅读并同意</Text><Text style={{color: '#0ae1ff'}}>服务条款</Text>
                </View>
                </View>
                <Toast ref={toast=>this.toast=toast}/>
            </View>
        )
    }

}