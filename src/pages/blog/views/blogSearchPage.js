/**
 *创建时间:  2018/6/14
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

/**
 * Created by penn on 2017/10/29.
 */

import React, {Component} from "react";
import {
    StyleSheet,
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
import Toast, {DURATION} from "react-native-easy-toast";
import GlobalStyles from "../../../res/styles/GlobalStyles";
import CpTextInput from '../../../common/component/CpTextInput';
import {UrlSetting} from '../../common/component/UrlSetting'
import BlogCellComponent from '../components/BlogCellComponent'
import {FLAG_STORAGE} from '../../../support/data/dataRepository'
import RespositoryDetail from '../../detail'
import cancelableFetch from '../../../utils/CancelableFetchUtils'
import styles from '../styles/blogSearchPage'
import BaseComponent from '../../common/component/BaseComponent'
import blogActicleDetail from "./blogActicleDetail";

export default class SearchPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.keys = [];
        this.cancelable = {};
        this.isKeyChange = false;
        this.inputKey = '';
        this.state = {
            theme: this.props.theme,
            token:this.props.token,
            rightButtonText: '取消',
            showBottomButton: false,
            isLoading: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => {
                    return r1 !== r2;
                },
            })
        }
    }

    componentWillMount() {
        this.inputKey = this.props.wordKey;
        if (this.inputKey !== '') {
            this.loadData()
            this.updateState({
                rightButtonText: '取消'
            })
        }else if(this.inputKey === ''){
            this.updateState({
                rightButtonText: '取消'
            })
        }
    }

    updateState(dic) {
        this.setState(dic)
    }

    loadData() {
        if (this.inputKey === '') {
            this.toast.show('为空哦，请输入关键字搜索', DURATION.LENGTH_LONG)
        }
        this.updateState({
            isLoading: true
        })
        const config = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.state.token}`,
            },
        }
        this.cancelable = cancelableFetch(fetch(this.genUrl(this.inputKey), config));
        this.cancelable.promise
            .then(response => response.json())
            .then(responseData => {
                if (!this || !responseData || !responseData.results || responseData.results.length === 0) {
                    this.toast.show("搜索" + this.inputKey + "结果为空", DURATION.LENGTH_LONG)
                    this.updateState({isLoading: false, rightButtonText: '搜索'})
                    return
                }
                this.items = responseData.results;
                this.updateState({
                    isLoading:false,
                    dataSource:this.getDataSource(this.items)
                })
                if (!this.checkKeyIsExist(this.keys, this.inputKey)) {
                    this.updateState({showBottomButton: true})
                }
            }).catch(e => {
            console.log(e)
            this.updateState({
                isLoading: false,
                rightButtonText: '搜索'
            })
        })
    }

    getDataSource(data) {
        return this.state.dataSource.cloneWithRows(data)
    }
    onSelectRepository=(projectModel)=>{ //进入博客文章详情
        const params = {...this.props};
        params.projectModel=projectModel;
        this.props.navigator.push({
            component: blogActicleDetail,
            params: params,
        });
    }
    /**
     * item 项
     * */
    renderRow(projectModel) {
        console.log(projectModel, "searchPAGE")
        return <View>
            <BlogCellComponent
                {...this.props}
                key={projectModel.id}
                {...{navigator}}
                onSelect={() => this.onSelectRepository(projectModel)}
                projectModel={projectModel}/>
        </View>
    }

    /**
     * 点击进入详情页
     * */
    onSelect(projectModel) {
        const params = {...this.props};
        params.projectModel = projectModel;
        this.props.navigator.push({
            component: blogActicleDetail,
            params: params,
        });
    }

    genUrl(key) {
        const url = UrlSetting.PYTHON_WEB_SERVER + UrlSetting.WEB_SERVER_ACTICLE_QUERY_STR + key;
        return url;
    }

    getInputValue(text) {
        this.inputKey = text
        if (text !== "") {
            this.setState({
                rightButtonText: '搜索'
            })
        } else {
            this.setState({
                rightButtonText: '取消'
            })
        }

    }

    onRightButtonClick() {
        if (this.state.rightButtonText === '搜索') {
            this.loadData()
            this.updateState({rightButtonText: '取消'})
        } else {
            //如果点击取消返回上一页
            this.refs.input.blur()
            if (!this.cancelable) {
                this.cancelable.cancel()
            }
            this.props.navigator.pop()

        }
    }

    renderNavBar() {
        let inputView =
            <View style={styles.container_row}>
                <CpTextInput
                    placeholder='搜索文章关键字'
                    placeholderTextColor='rgba(255,255,255,0.4)'
                    ref="input"
                    defaultValue={this.inputKey}
                    onChangeText={(text) => {
                        this.getInputValue(text)
                    }}
                    style={styles.textInput}>
                </CpTextInput>
                <TouchableOpacity
                    onPress={() => {
                        this.loadData()
                    }}
                >
                    <Image source={require('../images/ic_search_white_48pt.png')} style={styles.searchIcon}/>
                </TouchableOpacity>

            </View>
        let rightButton =
            <TouchableOpacity
                onPress={() => {
                    this.refs.input.blur();
                    this.onRightButtonClick();
                }}
            >
                <View style={{marginRight: 10}}>
                    <Text style={styles.title}>{this.state.rightButtonText}</Text>
                </View>
            </TouchableOpacity>
        return <View style={[{
            flexDirection: 'row',
            alignItems: 'center',
            height: (Platform.OS === 'ios') ? 40 : 50
        }, this.state.theme.styles.backgroundColorStyle]}>
            {inputView}
            {rightButton}
        </View>
    }

    render() {
        let statusBar = null;
        if (Platform.OS === 'ios') {
            statusBar = <View style={[styles.statusBar, this.state.theme.styles.backgroundColorStyle]}/>
        }
        let listView = !this.state.isLoading ?
            <ListView
                style={{marginBottom: 23}}
                dataSource={this.state.dataSource}
                renderRow={(e) => this.renderRow(e)}
            >
            </ListView> : null;
        let indicatorView = this.state.isLoading ?
            <ActivityIndicator
                animating={this.state.isLoading}
                style={[styles.centering, styles.fullScreenHeight]}
                size="large"/> : null;
        let resultView = <View style={{flex: 1}}>
            {indicatorView}
            {listView}
        </View>
        return <View style={GlobalStyles.root_container}>
            <Image source={require('../images/background_image.png')} style={styles.background_image}/>
            <View style={styles.background_color}>
                {statusBar}
                {this.renderNavBar()}
                {resultView}
            </View>
            <Toast ref={toast => this.toast = toast}/>
        </View>
    }
}

