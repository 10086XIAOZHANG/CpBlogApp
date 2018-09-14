
'use strict';

import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    ListView,
    Platform,
    PixelRatio,
    StyleSheet,
    Text,
    Linking,
    View,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
import ViewUtils from '../../utils/ViewUtils'
import {MORE_MENU} from '../common/component/MoreMenu'
import GlobalStyles from '../../res/styles/GlobalStyles'
import AboutCommon, {FLAG_ABOUT} from './component/AboutCommon'
import AboutMePage from './component/AboutMePage'
import {UrlSetting} from '../common/component/UrlSetting'
import WebViewPage from '../../common/component/WebViewPage'
import Toast,{DURATION} from 'react-native-easy-toast'
import BaseComponent from '../common/component/BaseComponent'
export default class AboutPage extends BaseComponent{
    constructor(props) {
        super(props)
        this.aboutCommon=new AboutCommon(props,(dic)=>{this.updateState(dic),FLAG_ABOUT.flag_about})
        this.state={
            theme:this.props.theme
        }
    }
    componentDidMount(){
        super.componentDidMount()
        this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
            this.toast.show(text, DURATION.LENGTH_LONG);
        });
    }
    componentWillUnmount(){
        super.componentWillUnmount()
        if (this.listener) {
            this.listener.remove();
        }
    }
    updateState(dic){
        this.setState(dic)
    }
    onClick(tab) {
        let TargetComponent, params = {...this.props, menuType: tab};
        switch (tab) {
            case MORE_MENU.WebSite:
                TargetComponent = WebViewPage;
                params.title='CP 聚合博客';
                var url=UrlSetting.WEB_SITE;
                params.url=url;
                break;
            case MORE_MENU.About_Author:
                TargetComponent=AboutMePage;
                break;
            case MORE_MENU.FeedBack:
                var url=UrlSetting.MY_EMAIL;
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + url);
                    } else {
                        return Linking.openURL(url);
                    }
                }).catch(err =>{console.error('An error occurred', err)} );
                break;
        }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }
    renderView() {
        const { onScroll = () => {} } = this.props;
        let renderConfig={
            name:'CP 聚合博客',
            description:'这是一个个人博客，同时也是一个综合的信息平台，用来查看GitHub最受欢迎与最热项目的App，还有其他',
            avatar:'http://himg.bdimg.com/sys/portrait/item/c9d8303038365849414f5a48414e470145.jpg',
            backgroundImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528710989848&di=125af4b1566a35a12e436e63fbfb2c34&imgtype=0&src=http%3A%2F%2Fwww.taopic.com%2Fuploads%2Fallimg%2F140901%2F240422-140Z10A55999.jpg'
        }

        let contentView=<View>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.WebSite),require('./images/ic_computer.png'),'博客站点',{tintColor:this.state.theme.themeColor}, require('../../pages/my/images/ic_tiaozhuan.png'), true)}
            <View style={GlobalStyles.line}></View>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.About_Author),require('./images/ic_insert_emoticon.png'),'关于作者',{tintColor:this.state.theme.themeColor}, require('../../pages/my/images/ic_tiaozhuan.png'), true)}
            <View style={GlobalStyles.line}></View>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.FeedBack),require('./images/ic_feedback.png'),'反馈',{tintColor:this.state.theme.themeColor}, require('../../pages/my/images/ic_tiaozhuan.png'), true)}
            <View style={GlobalStyles.line}></View>
            </View>
        return this.aboutCommon.render(contentView,renderConfig)
    }
    render(){
        return(
                    this.renderView()

            )

    }
}