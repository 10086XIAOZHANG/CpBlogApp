import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter,
    TextInput,
    TouchableHighlight,
    ListView,
    RefreshControl
} from 'react-native';
import DataRepository,{FLAG_STORAGE} from '../../../support/data/dataRepository'
import styles from '../styles/popularTab'
import RepositoryCell from '../../common/component/RepositoryCell'
import RespositoryTrendingCell from '../../common/component/RespositoryTrendingCell'
import RespositoryDetail from '../../detail'
import FavoriteUtils from '../../../utils/FavoriteUtils'
import ProjectModel from '../../../support/model/ProjectModel'
import FavoriteData from '../../../support/data/FavoriteData'
import {UrlSetting} from '../../common/component/UrlSetting'
import BaseComponent from '../../common/component/BaseComponent'
const URL=UrlSetting.URL
const QUERY_STR=UrlSetting.QUERY_STR
const TRENDING_URL=UrlSetting.TRENDING_URL
var favoriteData=new FavoriteData(FLAG_STORAGE.flag_popular)
var favoriteTrendingData=new FavoriteData(FLAG_STORAGE.flag_trending)
export default class PopularTab extends  BaseComponent{
    constructor(props){
        super(props);
        this.isFavoriteChanged=false;
        this.dataRespository=new DataRepository();
        this.state={
            result:'',
            theme:this.props.theme,
            isLoading:false,
            favoriteKeys:[],//最热模块
            favoriteTrendingKeys:[],//趋势模块
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>{
                    if (r1 !== r2) {
                        console.log("不相等=");
                        console.log(r1);
                    } else {
                        console.log("相等=");
                        console.log(r1);
                        console.log(r2);
                    }
                    return r1 !== r2;

            }}),
            timeSpan:this.props.timeSpan
        }
    }
    componentDidMount(){
        super.componentDidMount()
        // this.listener = DeviceEventEmitter.addListener('favoriteChanged_popular', () => {
        //     this.isFavoriteChanged=true;
        // });
        this.setState({
            timeSpan:this.props.timeSpan
        })
        this.onLoad(this.state.timeSpan)
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.timeSpan)
        if(nextProps.timeSpan!==this.props.timeSpan){
            this.onLoad(nextProps.timeSpan)
        }
        if(this.isFavoriteChanged){
            this.isFavoriteChanged=false;
            console.log("isFavoriteChanged")
            this.getFavoriteKeys();
        }
    }
    componentWillUnmount(){
        super.componentWillUnmount()
        // if (this.listener) {
        //     this.listener.remove();
        // }
    }
    /**
     * 更新Project Item Favorite状态
     * */
    flushFavoriteState(){
        let projectModels=[];
        let items=this.items;
        if(FLAG_STORAGE.flag_popular===this.props.flagStorage){
            for(let i=0;i<items.length;i++){
                projectModels.push(new ProjectModel(items[i], FavoriteUtils.checkFavorite(items[i],this.state.favoriteKeys)))//state.favoriteKey收藏key集合
            }
        }else{
            for(let i=0;i<items.length;i++){
                projectModels.push(new ProjectModel(items[i], FavoriteUtils.checkFavorite(items[i],this.state.favoriteTrendingKeys)))//state.favoriteKey收藏key集合
            }
        }
        this.updateState({
            isLoading:false,
            dataSource:this.getDataSource(projectModels)
        })
    }
    getDataSource(data){
        return this.state.dataSource.cloneWithRows(data)
    }
    updateState(dic){
        if(!this) return;
        this.setState(dic)
    }
    onLoad(timeSpan){
        this.setState({
            isLoading:true
        })
        let url=this.genUrl(timeSpan,this.props.tabLabel)
        this.dataRespository.fetchRepository(url)
            .then(result=> {
                this.items=result && result.items ? result.items : result ? result : [];
                FLAG_STORAGE.flag_popular===this.props.flagStorage?this.getFavoriteKeys(): this.getFavoriteTrendingKeys()
                if (result && result.update_date && !this.dataRespository.checkDate(result.update_date))return this.dataRespository.fetchNetRepository(url);
            })
            .then((items)=> {
                if (!items || items.length === 0)return;
                this.items=items
                FLAG_STORAGE.flag_popular===this.props.flagStorage?this.getFavoriteKeys(): this.getFavoriteTrendingKeys()
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                });
            })
            .catch(error=> {
                console.log(error);
                this.updateState({
                    isLoading: false
                });
            })
    }
    genUrl(timeSpan,key){
        let url='';
        if(FLAG_STORAGE.flag_popular===this.props.flagStorage){
            url=URL+key+QUERY_STR
        }
        if(FLAG_STORAGE.flag_trending===this.props.flagStorage){
            url= TRENDING_URL+key+timeSpan.searchText;
        }
        return url;
    }
    /**
     * 点击进入详情页
     * */
    onSelect(projectModel){
        console.log(projectModel)
        this.props.navigator.push({
            component:RespositoryDetail,
            params:{
                projectModel:projectModel,
                flag:this.props.flagStorage,
                //将this.props和改变后的theme的顺序一定是...this.props在前，不然会被原有的主题颜色给覆盖
                ...this.props,
                theme:this.state.theme
            }
        })
    }
    /**
     * favoriteIcon单击回调函数
     * @param item
     * @param isFavorite
     */
    onFavorite(item, isFavorite) {
        if (isFavorite) {
            favoriteData.saveFavoriteItem(item.id.toString(), JSON.stringify(item));
        } else {
            favoriteData.removeFavoriteItem(item.id.toString());
        }
    }
    onTrendingFavorite(item,isFavorite){
        if (isFavorite) {
            favoriteTrendingData.saveFavoriteItem(item.fullName.toString(), JSON.stringify(item));
        } else {
            favoriteTrendingData.removeFavoriteItem(item.fullName.toString());
        }
    }
    getFavoriteKeys(){
        favoriteData.getFavoriteKeys().then(keys=>{
            if(keys){
                this.setState({
                    favoriteKeys:keys
                })
                console.log(this.state.favoriteKeys)
                this.updateState({favoriteKeys:keys})
            }
            this.flushFavoriteState()
        }).catch(error=>{
            this.flushFavoriteState()
            console.log(error);
        })
    }
    getFavoriteTrendingKeys(){
        favoriteTrendingData.getFavoriteKeys().then(keys=>{
            if(keys){
                this.updateState({favoriteTrendingKeys:keys})
            }
            this.flushFavoriteState()
        }).catch(error=>{
            this.flushFavoriteState()
            console.log(error);
        })
    }
    renderRow(projectModel){
        console.log(projectModel)
        return <View>
            {(FLAG_STORAGE.flag_popular===this.props.flagStorage)?
                <RepositoryCell {...this.props} onFavorite={(item,isFavorite)=>this.onFavorite(item,isFavorite)} projectModel={projectModel} onSelect={()=>{this.onSelect(projectModel)}}/>:
                <RespositoryTrendingCell {...this.props} onTrendingFavorite={(item,isFavorite)=>this.onTrendingFavorite(item,isFavorite)} projectModel={projectModel}  onSelect={()=>{this.onSelect(projectModel)}}/>
            }
        </View>
    }
    render(){
        return(
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data)=>this.renderRow(data)}
                    //下拉刷新
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={()=>this.onLoad(this.state.timeSpan)}
                            colors={this.state.theme.styles.themeColor}
                            tintColor={this.state.theme.themeColor}
                            title={'Loading……'}
                            titleColor={this.state.theme.themeColor}
                        /> }
                />
            </View>
        )
    }
}