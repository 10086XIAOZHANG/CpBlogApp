/**
 *创建时间:  2018/6/13
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
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
import NavigationBar from '../../../common/component/NavigationBar'
import BaseComponent from '../../common/component/BaseComponent'
import ViewUtils from '../../../utils/ViewUtils'
import styles from '../styles/blogFavorite'
import BlogCellComponent from "../components/BlogCellComponent";
import DataRepository from "../../../support/data/dataRepository";
import Config from "../../../common/config";
import AsyncStorageUtils from "../../../utils/AsyncStorageUtils";
import { BLOG_TAG } from '../../common/component/MoreMenu';
import blogActicleDetail from "./blogActicleDetail";
export default class MyBlogFavorite extends BaseComponent {
    constructor(props) {
        super(props);
        this.dataRespository=new DataRepository();
        this.state = {
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
        if (isShowLoading)
            this.setState({
                isLoading: true,
            });
        const url=this.props.blogTag===BLOG_TAG.BLOG_FAVORITE?`/userFavs/`:'/userComment/';
        AsyncStorageUtils.get(Config.defaultProps.USER_TOKEN).then((token)=>{
            const config= {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            }
            this.dataRespository.fetchServerRepository(url,config).then(result=> {
                this.items=result && result.items ? result.items.results : result ? result : [];
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
                this.setState({
                    isLoading: false
                });
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
                onSelect={()=>this.onSelectRepository(projectModel.acticle)}
                projectModel={projectModel.acticle}
                commentContent={projectModel.comment_content}
            />
        );
    }
    searchPosts(){

    }
    getInputValue(){

    }
    render() {
        var statusBar={
            backgroundColor:this.state.theme.themeColor
        }
        let navigationBar =
            <NavigationBar
                title={this.props.blogTag}
                leftButton={
                    ViewUtils.getLeftButton(()=>{this.props.navigator.pop()},'文章列表',true)
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
        return (
            <View style={styles.container}>
                {navigationBar}
                {content}
            </View>)
    }
}
