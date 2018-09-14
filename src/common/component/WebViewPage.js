/**
 * WebViewPage
 * @flow
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
} from 'react-native'
import NavigationBar from './NavigationBar'
import GlobalStyles from '../../res/styles/GlobalStyles'
import ViewUtils from '../../utils/ViewUtils'
import BaseComponent from "../../pages/common/component/BaseComponent";


export default class WebViewPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            theme:this.props.theme,
            url: this.props.url,
            canGoBack: false,
            title: this.props.title,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            theme:nextProps.theme,
        })
    }
    onBackPress(e) {
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

    render() {
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    navigator={this.props.navigator}
                    popEnabled={false}
                    style={{backgroundColor:this.state.theme.themeColor}}
                    leftButton={ViewUtils.getLeftButton(()=>this.onBackPress())}
                    title={this.state.title}
                />
                <WebView
                    ref={webView=>this.webView=webView}
                    startInLoadingState={true}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    source={{uri: this.props.url}}/>
            </View>

        );
    }
}
