/**
 * RepositoryDetail
 *
 **/
'use strict'
import React, {Component} from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    WebView,
    Platform,
    TouchableOpacity,
    Text,
    View,
    DeviceEventEmitter
} from 'react-native'
import NavigationBar from '../../common/component/NavigationBar'
import ViewUtils from '../../utils/ViewUtils'
import FavoriteData from '../../support/data/FavoriteData'
import styles from './styles/index'
import {UrlSetting} from '../common/component/UrlSetting'
import BaseComponent from '../common/component/BaseComponent'
const DETAIL_TRENDING_URL=UrlSetting.DETAIL_TRENDING_URL

export default class RepositoryDetail extends BaseComponent{
    constructor(props) {
        super(props);
        this.url = this.props.projectModel.item.html_url?this.props.projectModel.item.html_url:DETAIL_TRENDING_URL+this.props.projectModel.item.fullName;
        var title = this.props.projectModel.item.full_name?this.props.projectModel.item.full_name:this.props.projectModel.item.fullName;
        this.favoriteData = new FavoriteData(this.props.flag);
        this.state = {
            theme:this.props.theme,
            url: this.url,
            canGoBack: false,
            title: title,
            isFavorite:this.props.projectModel.isFavorite,
            favoriteIcon:this.props.projectModel.isFavorite?require('./images/ic_star.png'):
                require('./images/ic_unstar_navbar.png')
        }
    }
    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        });
    }
    setFavoriteState(isFavorite) {
        this.setState({
            isFavorite: isFavorite,
            favoriteIcon: isFavorite ? require('./images/ic_star.png') : require('./images/ic_unstar_navbar.png')
        })
    }
    onRightBtnClick() {//favoriteIcon单击回调函数
        var projectModel = this.props.projectModel;
        this.setFavoriteState(projectModel.isFavorite = !projectModel.isFavorite);

        var key = projectModel.item.fullName ? projectModel.item.fullName : projectModel.item.id.toString();
        if (projectModel.isFavorite) {
            this.favoriteData.saveFavoriteItem(key, JSON.stringify(projectModel.item));
        } else {
            this.favoriteData.removeFavoriteItem(key);
        }
    }
    renderRightButton(){
        return <TouchableOpacity
            onPress={()=>{this.onRightBtnClick()}}
        >
            <Image
                style={{width:20,height:20,marginRight:10}}
                source={this.state.favoriteIcon}/>
        </TouchableOpacity>
    }
    render() {
        var statusBar={
            backgroundColor:this.state.theme.themeColor
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                    style={{backgroundColor:this.state.theme.themeColor}}
                    statusBar={statusBar}
                    popEnabled={false}
                    title={this.state.title}
                    rightButton={this.renderRightButton()}
                />
                <WebView
                    ref={webView=>this.webView=webView}
                    startInLoadingState={true}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}/>
            </View>

        );
    }
}


