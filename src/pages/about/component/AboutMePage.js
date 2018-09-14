/**
 * AboutMePage
 * 关于
 * @flow
 */
'use strict';


import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    Linking,
    Clipboard,
} from 'react-native';

import WebViewPage from '../../../common/component/WebViewPage';
import ViewUtils from '../../../utils/ViewUtils'
import GlobalStyles from '../../../res/styles/GlobalStyles'
import AboutCommon,{FLAG_ABOUT} from './AboutCommon'
import Toast from 'react-native-easy-toast'
import BaseComponent from '../../common/component/BaseComponent'
const FLAG = {
    REPOSITORY: '开源项目',
    BLOG: {
        name: '技术博客',
        items: {
            PERSONAL_BLOG: {
                title: '个人博客',
                url: 'https://www.cnblogs.com/fuGuy/',
            },
            CSDN: {
                title: 'CSDN',
                url: 'https://blog.csdn.net/XIAOZHANG86',
            },
            JIANSHU: {
                title: '简书',
                url: 'https://www.jianshu.com/users/85d3f3df804c/timeline',
            },
            GITHUB: {
                title: 'GitHub',
                url: 'https://github.com/10086XIAOZHANG',
            },
        }
    },
    CONTACT: {
        name: '联系方式',
        items: {
            QQ: {
                title: 'QQ',
                account: '1280033048',
            },
            Email: {
                title: 'Email',
                account: '10086xiaozhang@gmail.com',
            },
        }
    },
    QQ: {
        name: '技术交流群',
        items: {
            MD: {
                title: '移动开发者技术分享群',
                account: '335939197',
            },
            RN: {
                title: 'React Native学习交流群',
                account: '165774887',
            }
        },
    },

};

export default class AboutMePage extends BaseComponent {
    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props, (dic)=>this.updateState(dic),FLAG_ABOUT.flag_about_me);
        this.state = {
            theme:this.props.theme,
            projectModels: null,
            showBlog: false,
            showQQ: false,
            showContact: false,

        }
    }

    updateState(dic) {
        this.setState(dic);
    }

    onClick(tab) {
        let TargetComponent, params = {...this.props, menuType: tab};
        switch (tab) {
            case FLAG.CONTACT.items.Email:
                var url='mailto://:'+tab.account;
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + url);
                    } else {
                        return Linking.openURL(url);
                    }
                }).catch(err =>{console.error('An error occurred', err)} );
                break;
            case FLAG.CONTACT.items.QQ:
                this.toast.show('QQ:' + tab.account + '已复制到剪切板。');
                Clipboard.setString(tab.account);
                break;
            case FLAG.QQ.items.MD:
            case FLAG.QQ.items.RN:
                this.toast.show('群号:' + tab.account + '已复制到剪切板。');
                Clipboard.setString(tab.account);
                break;
            case FLAG.BLOG.items.CSDN:
            case FLAG.BLOG.items.GITHUB:
            case FLAG.BLOG.items.JIANSHU:
            case FLAG.BLOG.items.PERSONAL_BLOG:
                TargetComponent = WebViewPage;
                params.theme=this.state.theme;
                params.title = tab.title;
                params.url = tab.url;
                break;
            case FLAG.BLOG:
                this.updateState({showBlog: !this.state.showBlog});
                break;
            case FLAG.QQ:
                this.updateState({showQQ: !this.state.showQQ});
                break;
            case FLAG.CONTACT:
                this.updateState({showContact: !this.state.showContact});
                break;

        }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }

    /**
     * 显示列表数据
     * @param dic
     * @param isShowAccount
     * @return {*}
     */
    renderItems(dic, isShowAccount) {
        if (!dic)return null;
        let views = [];
        for (let i in dic) {
            let title = isShowAccount ? dic[i].title + ':' + dic[i].account : dic[i].title;
            views.push(
                <View key={i}>
                    {ViewUtils.getSettingItem(()=>this.onClick(dic[i]), '', title, {tintColor:this.props.theme.themeColor}, require('../../../pages/my/images/ic_tiaozhuan.png'), true)}
                    <View style={GlobalStyles.line}/>
                </View>
            );
        }
        return views;
    }

    /**
     * 获取item右侧图标
     * @param isShow
     * @return {*}
     */
    getClickIcon(isShow) {
        return isShow ? require('../images/ic_tiaozhuan_up.png') : require('../images/ic_tiaozhuan_down.png');
    }

    render() {
        let renderConfig={
            name:'10086XIAOZHANG',
            description:'專注于移動開發，分享知識，共享知識',
            avatar:'http://himg.bdimg.com/sys/portrait/item/c9d8303038365849414f5a48414e470145.jpg',
            backgroundImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509213351858&di=58aa603cd4579a0aa2edc492c40da723&imgtype=0&src=http%3A%2F%2Fwww.pp3.cn%2Fuploads%2F201409%2F2014091807.jpg'
        }
        let content = <View>
            {ViewUtils.getSettingItem(()=>this.onClick(FLAG.BLOG), require('../images/ic_computer.png'),
                FLAG.BLOG.name, {tintColor:this.props.theme.themeColor}, this.getClickIcon(this.state.showBlog), true)}
            <View style={GlobalStyles.line}/>
            {this.state.showBlog ? this.renderItems(FLAG.BLOG.items) : null}

            {ViewUtils.getSettingItem(()=>this.onClick(FLAG.QQ), require('../images/ic_computer.png'),
                FLAG.QQ.name, {tintColor:this.props.theme.themeColor}, this.getClickIcon(this.state.showQQ), true)}
            <View style={GlobalStyles.line}/>
            {this.state.showQQ ? this.renderItems(FLAG.QQ.items, true) : null}

            {ViewUtils.getSettingItem(()=>this.onClick(FLAG.CONTACT), require('../images/ic_contacts.png'),
                FLAG.CONTACT.name, {tintColor:this.props.theme.themeColor}, this.getClickIcon(this.state.showContact), true)}
            <View style={GlobalStyles.line}/>
            {this.state.showContact ? this.renderItems(FLAG.CONTACT.items, true) : null}
        </View>
        return (
            <View style={styles.container}>
                {this.aboutCommon.render(content, renderConfig)}
                <Toast ref={e=>this.toast = e}/>
            </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
