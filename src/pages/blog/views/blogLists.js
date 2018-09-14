/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能: 我的文章
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ListView,
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from 'react-native'
import {stringify} from 'qs';
import NavigationBar from '../../../common/component/NavigationBar'
import BaseComponent from '../../common/component/BaseComponent'
import CpTextInput from '../../../common/component/CpTextInput';
import ViewUtils from '../../../utils/ViewUtils'
import styles from '../styles/blogLists'
import BlogCellComponent from "../components/BlogCellComponent";
import DataRepository, {FLAG_STORAGE} from "../../../support/data/dataRepository";
import Config from "../../../common/config";
import AsyncStorageUtils from "../../../utils/AsyncStorageUtils";
import BlogSearchPage from "./blogSearchPage";
import { BLOG_TAG } from '../../common/component/MoreMenu';
import blogActicleDetail from './blogActicleDetail';
export default class MyBlogNews extends BaseComponent {
    constructor(props) {
        super(props);
        this.dataRespository=new DataRepository();
        this.state = {
            token:null,
            theme:this.props.theme,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2)=>{ return r1 !== r2}}),
            isLoading: false,
        }
    }
    componentDidMount() {
        this.loadData(true);
    }
    componentWillReceiveProps(nextProps) {
        this.loadData(false);
    }
    loadData(isShowLoading) {
        let params;
        if (isShowLoading)
            this.setState({
                isLoading: true,
            });
        if(this.props.blogTag===BLOG_TAG.NEWS){
            params={
                page_size: 100,
                ordering: '-add_time',
                search: this.state.search_text,
            };
        }else {
            params={
                page_size: 100,
                ordering: '-click_num',
                search: this.state.search_text,
            };
        }
        const url=`/blogActicle/?${stringify(params)}`;
        AsyncStorageUtils.get(Config.defaultProps.USER_TOKEN).then((token)=>{
            this.setState({
                token:JSON.parse(token),
            });
            const config= {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            }
            this.dataRespository.fetchServerRepository(url,config).then(result=> {
                this.items=result && result.items ? result.items.results : result ? result.results : [];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.items),
                    isLoading: false,
                });
                if (result && result.update_date && !this.dataRespository.checkDate(result.update_date))return this.dataRespository.fetchNetRepository(url);
            }).then((items)=> {
                if (!items || items.length === 0)return;
                this.items=items
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                    isLoading: false,
                });
            }).catch(error=> {
                    console.log(error);
                })
        })

    }
    onRefresh(){
        this.loadData(true);
    }
    onSelectRepository=(projectModel)=>{ //进入博客文章详情
        const params = {...this.props};
        params.projectModel=projectModel;
        this.props.navigator.push({
            component: blogActicleDetail,
            params: params,
        });
    }
    renderRow = (projectModel)=>{
        let {navigator}=this.props;
        return (
            <BlogCellComponent
                {...this.props}
                key={projectModel.id}
                {...{navigator}}
                onSelect={()=>this.onSelectRepository(projectModel)}
                projectModel={projectModel}/>
        );
    }
    searchPosts(){

    }
    getInputValue(text){
        this.inputKey=text
    }
    render() {
        var statusBar={
            backgroundColor:this.state.theme.themeColor
        }
        let navigationBar =
            <NavigationBar
                title={this.props.blogTag}
                leftButton={
                    ViewUtils.getLeftButton(()=>{this.props.navigator.pop()},'返回',true)
                }
                style={this.state.theme.styles.backgroundColorStyle}
                statusBar={statusBar}
            />;
        const content =
            <ListView
                ref="listView"
                style={styles.listView}
                renderRow={(e)=>this.renderRow(e)}
                renderFooter={()=> {
                    return <View style={{height: 50}}/>
                }}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={()=>this.onRefresh()}
                        colors={this.state.theme.styles.themeColor}
                        tintColor={this.state.theme.themeColor}
                        title={'Loading……'}
                        titleColor={this.state.theme.themeColor}
                    />
                }
            />;

        const searchRow=
            <View style={styles.searchRow}>
                <View style={[styles.search,{borderColor:this.state.theme.themeColor}]}>
                    <CpTextInput style={styles.search_content}
                               placeholder='搜索文章关键字'
                               ref= {(input)=>{this.input=input}}
                               placeholderTextColor='rgba(255,255,255,0.4)'
                               onSubmitEditing={this.searchPosts()}
                               onChangeText={(text)=>{this.getInputValue(text)}}
                               returnKeyType="search"
                               underlineColorAndroid = "transparent"
                    />
                    <TouchableOpacity
                        onPress={()=>{
                            this.input.blur()//使input标签失去焦点，隐藏手机软键盘
                            this.props.navigator.push({
                                component:BlogSearchPage,
                                params:{
                                    wordKey:this.inputKey?this.inputKey:'',
                                    //将this.props和改变后的theme的顺序一定是...this.props在前，不然会被原有的主题颜色给覆盖
                                    ...this.props,
                                    theme:this.state.theme,
                                    token: this.state.token,
                                }
                            })
                        }}
                    >
                        <Image source={require('../images/ic_search_white_48pt.png')} style={[{tintColor:'#fff'},styles.searchIcon]}/>
                    </TouchableOpacity>
                </View>
            </View>
        let indicatorView=this.state.isLoading?
            <ActivityIndicator
                animating={this.state.isLoading}
                style={[styles.centering,styles.fullScreenHeight]}
                size="large" />:null;
        return (
            <View style={styles.container}>
                {navigationBar}
                {searchRow}
                {content}
            </View>)
    }
}
