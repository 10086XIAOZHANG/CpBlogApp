/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能: 我的文章
 */

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image, Dimensions
} from 'react-native';
import MyBlogNews from './views/blogLists';
import MyBlogFavorite from './views/blogFavorite';
import TabNavigator from 'react-native-tab-navigator'
import { BLOG_TAG } from '../common/component/MoreMenu';
export default class MyBlogArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'News',
            theme:this.props.theme,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        //设置选中的位置
                        selected={this.state.selectedTab === 'News'}
                        //标题
                        title="最新"
                        //标题样式
                        titleStyle={styles.tabText}
                        //选中时标题文字样式
                        selectedTitleStyle={{color:this.state.theme.themeColor}}
                        //图标
                        renderIcon={() => <Image style={[styles.icon,{tintColor:'#515151'}]} source={require("./images/ic_new.png")} />}
                        //选中时图标
                        renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:this.state.theme.themeColor}]} source={require("./images/ic_new.png")} />}
                        //点击Event
                        onPress={() => this.setState({ selectedTab: 'News' })}>
                        <View style={styles.container}>
                            <Image source={require('./images/background_image.png')} style={styles.background_image} />
                            <View style={styles.background_color}>
                                <MyBlogNews {...this.props} blogTag={BLOG_TAG.NEWS} theme={this.state.theme}/>
                            </View>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Hots'}
                        title="最热"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={{color:this.state.theme.themeColor}}
                        renderIcon={() => <Image style={[styles.icon,{tintColor:'#515151'}]} source={require("./images/ic_trending.png")} />}
                        renderSelectedIcon={() =>  <Image style={[styles.icon,{tintColor:this.state.theme.themeColor}]} source={require("./images/ic_trending.png")} />}
                        onPress={() => this.setState({ selectedTab: 'Hots' })}>
                        <View style={styles.container}>
                            <Image source={require('./images/background_image.png')} style={styles.background_image} />
                            <View style={styles.background_color}>
                                <MyBlogNews {...this.props} blogTag={BLOG_TAG.BLOG_HOTS} theme={this.state.theme}/>
                            </View>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Device'}
                        title="收藏"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={{color:this.state.theme.themeColor}}
                        renderIcon={() => <Image style={[styles.icon,{tintColor:'#515151'}]} source={require("./images/ic_favorite.png")} />}
                        renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:this.state.theme.themeColor}]} source={require("./images/ic_favorite.png")} />}
                        onPress={() => this.setState({ selectedTab: 'Device' })}>
                        <View style={styles.container}>
                            <Image source={require('./images/background_image.png')} style={styles.background_image} />
                            <View style={styles.background_color}>
                                <MyBlogFavorite {...this.props} blogTag={BLOG_TAG.BLOG_FAVORITE} theme={this.state.theme}/>
                            </View>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'User'}
                        title="评论"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={{color:this.state.theme.themeColor}}
                        renderIcon={() => <Image style={[styles.icon,{tintColor:'#515151'}]} source={require("./images/ic_common.png")} />}
                        renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:this.state.theme.themeColor}]} source={require("./images/ic_common.png")} />}
                        onPress={() => this.setState({ selectedTab: 'User' })}>
                        <View style={styles.container}>
                            <Image source={require('./images/background_image.png')} style={styles.background_image} />
                            <View style={styles.background_color}>
                                <MyBlogFavorite {...this.props} blogTag={BLOG_TAG.BLOG_COMMON} theme={this.state.theme}/>
                            </View>
                        </View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        fontSize: 10,
        color: 'black'
    },
    selectedTabText: {
        fontSize: 10,
        color: 'red'
    },
    icon: {
        width: 22,
        height: 22
    },
    page0: {
        flex: 1,
        backgroundColor: 'yellow'
    },
    page1: {
        flex: 1,
        backgroundColor: 'blue'
    },
    background_image:{
        height: Dimensions.get('window').height,
            width: Dimensions.get('window').width
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.01)',
        position: 'relative'
    },
    background_color: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
});