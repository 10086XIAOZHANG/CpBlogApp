import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableHighlight,
    Image, DeviceEventEmitter
} from 'react-native'
import CustomKeyPage from './component/CustomKeyPage'
import SortKeyPagePage from './component/SortKeyPagePage'
import NavigationBar from '../../common/component/NavigationBar'
import {FLAG_LANGUAGE} from '../../support/data/LanguageData'
import {MORE_MENU} from '../common/component/MoreMenu'
import GlobalStyles  from '../../res/styles/GlobalStyles'
import styles from './styles/index'
import ViewUtils from '../../utils/ViewUtils'
import AboutPage from '../about/index'
import AboutMePage from '../about/component/AboutMePage'
import CustomTheme from './component/CustomTheme'
import BaseComponent from '../common/component/BaseComponent'
import Login from '../login'
import User from '../user'
import {ImageCache, CachedImage} from "react-native-img-cache";
import {ACTION_BroadSide} from "../home/views/BroadSidePage";
export default class My extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            what: '',
            theme:this.props.theme,
            isVisibleModal:false,
            userInfo:this.props.userInfo,
        }
    }
    componentDidMount(){
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            theme:{...nextProps.theme},
        })
    }
    onClick(tab){
        let TargetComponent, params = {...this.props,menuType: tab};
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
                params.flag = FLAG_LANGUAGE.flag_key;
                params.isRemoveKey=true
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
                this.setState({
                    isVisibleModal:true
                })
                break;
            case MORE_MENU.About_Author:
                TargetComponent=AboutMePage;
                break;
            case MORE_MENU.About:
                TargetComponent=AboutPage;
                break;
            case MORE_MENU.Login:
                TargetComponent=Login;
                params.callBackInfo=(user)=>{
                    DeviceEventEmitter.emit('ACTION_BroadSide',ACTION_BroadSide.A_USER,user);
                    this.setState({
                        userInfo:{...user},
                    })
                };
                break;
            case MORE_MENU.User:
                TargetComponent = User;
                params.userInfo=this.state.userInfo;

        }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }
    getItem(tag,icon,text){
        return ViewUtils.getSettingItem(()=>{this.onClick(tag)},icon,text,{tintColor:'#FFFFFF'},null,false)
    }
    renderCustomThemeView(){
        return (<CustomTheme
            isVisibleModal={this.state.isVisibleModal}
            {...this.props}
            onRequestClose={()=>{
                this.setState({
                    isVisibleModal:false
                })
            }}
        />)
    }
    render() {
        var navigationBar=
            <NavigationBar
                title={'我的'}
                style={{backgroundColor:this.state.theme.themeColor}}
                statusBar={{backgroundColor:this.state.theme.themeColor}}
            />
        const loginMenu=this.state.userInfo?MORE_MENU.User:MORE_MENU.Login;
        return (
            <View style={styles.container}>
                {navigationBar}

                <ScrollView
                    style={{marginBottom:74}}
                >
                    <TouchableHighlight
                        onPress={()=>{this.onClick(loginMenu)}}
                    >
                        <View style={[styles.item,{height:90}]}>
                            {!this.state.userInfo ?
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image
                                        source={require('./images/ic_logo.png')}
                                        style={[{width: 40, height: 40, marginRight: 10}, {tintColor: '#FFFFFF'}]}
                                    />
                                    <Text style={{color: "#ffffff"}}>请 登 录</Text>
                                </View> :
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    {ImageCache.get().bust(this.state.userInfo.avatar) || <CachedImage style={styles.avatarImage} source={{ uri: this.state.userInfo && this.state.userInfo.avatar?this.state.userInfo.avatar:'jpg',height: 40,
                                    width: 40 }} style={styles.avatarText} />}
                                    <Text style={{color: "#ffffff"}}>{this.state.userInfo.name}</Text>
                                </View>
                            }
                        </View>
                    </TouchableHighlight>
                    <View style={GlobalStyles.line} />
                    <View style={GlobalStyles.line} />
                    {/*趋势管理*/}
                    <Text style={styles.groupTitle}>趋势管理</Text>
                    {/*自定义语言*/}
                    {this.getItem(MORE_MENU.Custom_Language,require('./images/ic_custom_language.png'),'自定义语言')}
                    <View style={GlobalStyles.line} />
                    {/*语言排序*/}
                    {this.getItem(MORE_MENU.Sort_Language,require('./images/ic_sort.png'),'语言排序')}
                    <View style={GlobalStyles.line} />
                    <View style={GlobalStyles.line} />
                    {/*标签管理*/}
                    <Text style={styles.groupTitle}>标签管理</Text>
                    {/*自定义标签*/}
                    {this.getItem(MORE_MENU.Custom_Key,require('./images/ic_trending.png'),'自定义标签')}
                    <View style={GlobalStyles.line} />
                    {/*标签排序*/}
                    {this.getItem(MORE_MENU.Sort_Key,require('./images/ic_swap_vert.png'),'标签排序')}
                    <View style={GlobalStyles.line} />
                    {/*标签移除*/}
                    {this.getItem(MORE_MENU.Remove_Key,require('./images/ic_remove.png'),'标签移除')}
                    <View style={GlobalStyles.line} />

                    {/*设置*/}
                    <Text style={styles.groupTitle}>设置</Text>
                    {/*自定义主题*/}
                    {this.getItem(MORE_MENU.Custom_Theme,require('./images/ic_custom_theme.png'),'自定义主题')}
                    <View style={GlobalStyles.line} />
                    <View style={GlobalStyles.line} />
                    {/*关于作者*/}
                    {this.getItem(MORE_MENU.About_Author,require('./images/ic_insert_emoticon.png'),'关于作者')}
                    <View style={GlobalStyles.line} />
                    {/*/!*关于*!/*/}
                    <View style={GlobalStyles.line} />
                    {this.getItem(MORE_MENU.About,require('./images/ic_view_quilt.png'),'关于')}
                    <View style={GlobalStyles.line}/>
                </ScrollView>
                {this.renderCustomThemeView()}
            </View>)
    }
}