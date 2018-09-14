/**
 * 更多菜单
 * @flow
 */
'use strict';
import React, {Component, PropTypes} from 'react';

import {
    StyleSheet,
    Platform,
    TouchableOpacity,
    Image,
    Text,
    View,
    Linking,

} from 'react-native'
import CustomKeyPage from "../../my/component/CustomKeyPage";
import SortKeyPagePage from "../../my/component/SortKeyPagePage";
import Popover from '../../../common/component/Popover'
import {FLAG_LANGUAGE} from "../../../support/data/LanguageData";
import AboutPage from '../../about'
import AboutMePage from '../../about/component/AboutMePage'
import UrlSetting from './UrlSetting'
export const MORE_MENU = {
    Custom_Language: '自定义语言',
    Sort_Language: '语言排序',
    Custom_Theme: '自定义主题',
    Custom_Key: '自定义标签',
    Sort_Key: '标签排序',
    Remove_Key: '移除标签',
    About_Author: '关于作者',
    About: '关于',
    WebSite: 'Website',
    FeedBack: '反馈',
    Share: '分享',
    Login:'登录',
    User:'个人信息',
}
export const USER_MENU={
    MY_AVATAR:'头像',
    MY_NAME:'名字',
    MY_BIRTHDAY:'生日',
    MY_GENDER:'性别',
    MY_EMAIL:'邮箱',
    MY_PHONE:'电话'
}
export const SORTWARE_SETTING_MENU={
    SETTING_HYPE:'帮助',
    SETTING_FEEDBACK:'反馈',
    SETTING_ABOUT:'关于CP聚合博客',
    SETTING_EXIT:'退出登录',
}
export const SIDE_MENU={
    MY_ARTICLE:'我的文章',
    MY_ESSAY:'我的随笔',
    MY_FOCUS:'我的关注',
    MY_FANS:'我的粉丝',
    MY_THEME:'我的主题',
}
export const BLOG_TAG={NEWS:'最新',BLOG_HOTS:'最热',BLOG_FAVORITE:'收藏',BLOG_COMMON:'评价'};
export default class MoreMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            buttonRect: {},
        }
    }

    static propTypes = {
        contentStyle: View.propTypes.style,
        menus: PropTypes.array.isRequired,
        anchorView: PropTypes.func,
    }

    /**
     * 打开更多菜单
     */
    open() {
        this.showPopover();
    }

    showPopover() {
        if (!this.props.anchorView)return;
        let anchorView = this.props.anchorView();
        anchorView.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    closePopover() {
        this.setState({isVisible: false});
    }

    onMoreMenuSelect(tab) {
        this.closePopover();
        let TargetComponent, params = {...this.props, menuType: tab};
        switch (tab) {
            case MORE_MENU.Custom_Language:
                TargetComponent = CustomKeyPage;
                params.flag = FLAG_LANGUAGE.flag_languages;
                break;
            case MORE_MENU.Custom_Key:
                TargetComponent = CustomKeyPage;
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Remove_Key:
                TargetComponent = CustomKeyPage;
                params.isRemoveKey=true;
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Sort_Language:
                TargetComponent = SortKeyPagePage;
                params.flag = FLAG_LANGUAGE.flag_languages;
                break;
            case MORE_MENU.Sort_Key:
                TargetComponent = SortKeyPagePage;
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Custom_Theme:
                break;
            case MORE_MENU.About_Author:
                TargetComponent = AboutMePage;
                break;
            case MORE_MENU.About:
                TargetComponent = AboutPage;
                break;
            case MORE_MENU.Feedback:
                var url=UrlSetting.MY_EMAIL;
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + url);
                    } else {
                        return Linking.openURL(url);
                    }
                }).catch(err => console.error('An error occurred', err));
                break;
            case MORE_MENU.Share:
                break;
        }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }

    }

    renderMoreView() {
        let view = <Popover
            isVisible={this.state.isVisible}
            fromRect={this.state.buttonRect}
            placement="bottom"
            contentMarginRight={20}
            onClose={()=>this.closePopover()}
            contentStyle={{opacity: 0.82, backgroundColor: '#343434'}}
            style={{backgroundColor: 'red'}}>
            <View style={{alignItems: 'center'}}>
                {this.props.menus.map((result, i, arr) => {
                    return <TouchableOpacity key={i} onPress={()=>this.onMoreMenuSelect(arr[i])}
                                             underlayColor='transparent'>
                        <Text
                            style={{fontSize: 18, color: 'white', padding: 8, fontWeight: '400'}}>
                            {arr[i]}
                        </Text>
                    </TouchableOpacity>
                })
                }
            </View>
        </Popover>
        return view;
    }

    render() {
        return this.renderMoreView();
    }
}
