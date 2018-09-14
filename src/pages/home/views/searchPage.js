/**
 * Created by penn on 2017/10/29.
 */

import React, {Component} from "react";
import {StyleSheet,
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
import {UrlSetting} from '../../common/component/UrlSetting'
import FavoriteData from '../../../support/data/FavoriteData'
import RepositoryCell from '../../common/component/RepositoryCell'
import CpTextInput from '../../../common/component/CpTextInput';
import LanguageData,{FLAG_LANGUAGE} from '../../../support/data/LanguageData'
import FavoriteUtils from '../../../utils/FavoriteUtils'
import {FLAG_STORAGE} from '../../../support/data/dataRepository'
import ProjectModel from '../../../support/model/ProjectModel'
import RespositoryDetail from '../../detail'
import cancelableFetch from '../../../utils/CancelableFetchUtils'
import styles from '../styles/searchPage'
import BaseComponent from '../../common/component/BaseComponent'
export default class SearchPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.favoriteData = new FavoriteData(FLAG_STORAGE.flag_popular);
        this.languageData=new LanguageData(FLAG_LANGUAGE.flag_key);
        this.keys=[];
        this.cancelable={};
        this.isKeyChange=false;
        this.inputKey='';
        this.state = {
            theme:this.props.theme,
            favoriteKeys: [],
            rightButtonText: '取消',
            showBottomButton:false,
            isLoading: false,
            showBottomButton:false,
            favoriteKeys:[],//最热模块
            dataSource: new ListView.DataSource({
                rowHasChanged:(r1,r2)=>{
                    return r1 !== r2;
                },
            })
        }
    }

    componentWillMount() {
        console.log("主题色是什么：",this.props.theme)
        this.inputKey=this.props.wordKey;
        if(this.inputKey!==''){
           this.loadData()
           this.updateState({
               rightButtonText:'取消'
           })
        }
    }
    componentDidMount() {
        this.initKeys()
    }
    /*
    * 获取所有标签
    * */
    async initKeys(){
      this.keys=await this.languageData.fetch()
    }
    /*
    * 检查key是否在keys
    * */
    checkKeyIsExist(keys,key){
        for(let i=0;i<keys.length;i++){
            if(keys[i].name.toLowerCase()===key.toLowerCase()){
                return true;
            }
        }
        return false;
    }
    saveKey(){
        let key=this.inputKey;
        if(this.checkKeyIsExist(this.keys,key)){
            this.toast.show("这个["+key+"]已经存在",DURATION.LENGTH_LONG)
        }else{
            key={
                path:key,
                name:key,
                checked:true
            }
            this.keys.unshift(key);
            this.languageData.save(this.keys)
            DeviceEventEmitter.emit("changeCustomKey",this.keys)
            this.toast.show("添加标签["+key.name+"]成功",DURATION.LENGTH_LONG)
        }
    }
    updateState(dic){
        this.setState(dic)
    }
    loadData(){
        if(this.inputKey===''){
            this.toast.show('为空哦，请输入关键字搜索',DURATION.LENGTH_LONG)
        }
        this.updateState({
            isLoading:true
        })
        this.cancelable=cancelableFetch(fetch(this.genUrl(this.inputKey)))
        this.cancelable.promise
            .then(response=>response.json())
            .then(responseData=>{
                if(!this||!responseData||!responseData.items||responseData.items.length===0){
                    this.toast.show("搜索"+this.inputKey+"结果为空",DURATION.LENGTH_LONG)
                    this.updateState({isLoading:false,rightButtonText:'搜索'})
                    return
                }
                this.items=responseData.items;
                this.getFavoriteKeys()
                if(!this.checkKeyIsExist(this.keys,this.inputKey)){
                    this.updateState({showBottomButton:true})
                }
            }).catch(e=>{
                console.log(e)
                this.updateState({
                    isLoading:false,
                    rightButtonText:'搜索'
                })
        })
    }
    getFavoriteKeys(){
        this.favoriteData.getFavoriteKeys().then(keys=>{
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
    /**
     * 更新Project Item Favorite状态
     * */
    flushFavoriteState(){
        let projectModels=[];
        let items=this.items;
            for(let i=0;i<items.length;i++){
                projectModels.push(new ProjectModel(items[i], FavoriteUtils.checkFavorite(items[i],this.state.favoriteKeys)))//state.favoriteKey收藏key集合
            }
        this.updateState({
            isLoading:false,
            dataSource:this.getDataSource(projectModels)
        })
    }
    getDataSource(data){
        return this.state.dataSource.cloneWithRows(data)
    }
    renderRow(projectModel){
        console.log(projectModel,"searchPAGE")
        return <View>
                <RepositoryCell {...this.props} onFavorite={(item,isFavorite)=>this.onFavorite(item,isFavorite)} projectModel={projectModel} onSelect={()=>{this.onSelect(projectModel)}}/>
        </View>
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
                flag:FLAG_STORAGE.flag_popular,
                ...this.props
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
            this.favoriteData.saveFavoriteItem(item.id.toString(), JSON.stringify(item));
        } else {
            this.favoriteData.removeFavoriteItem(item.id.toString());
        }
    }
    genUrl(key){
        let url='';
        url=UrlSetting.URL+key+UrlSetting.QUERY_STR
        return url;
    }
    getInputValue(text){
        this.inputKey=text
        if(text!==""){
            this.setState({
                rightButtonText:'搜索'
            })
        }else{
            this.setState({
                rightButtonText:'取消'
            })
        }

    }
    onRightButtonClick(){
        if(this.state.rightButtonText==='搜索'){
            this.loadData()
            this.updateState({rightButtonText:'取消'})
        }else{
            //如果点击取消返回上一页
            this.refs.input.blur()
            if(!this.cancelable){
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
                    onChangeText={(text)=>{this.getInputValue(text)}}
                    style={styles.textInput}>
                </CpTextInput>
                <TouchableOpacity
                    onPress={()=>{
                        this.loadData()
                    }}
                >
                    <Image source={require('../images/ic_search_white_48pt.png')} style={styles.searchIcon}/>
                </TouchableOpacity>

            </View>
        let rightButton =
            <TouchableOpacity
                onPress={()=> {
                    this.refs.input.blur();
                    this.onRightButtonClick();
                } }
            >
                <View style={{marginRight: 10}}>
                    <Text style={styles.title}>{this.state.rightButtonText}</Text>
                </View>
            </TouchableOpacity>
        return <View style={[{
            flexDirection: 'row',
            alignItems: 'center',
            height: (Platform.OS === 'ios') ?40 : 50
        },this.state.theme.styles.backgroundColorStyle]}>
            {inputView}
            {rightButton}
        </View>
    }

    render() {
        let statusBar = null;
        if (Platform.OS === 'ios') {
            statusBar = <View style={[styles.statusBar, this.state.theme.styles.backgroundColorStyle ]}/>
        }
        let listView=!this.state.isLoading?
            <ListView
            style={{marginBottom:23}}
            dataSource={this.state.dataSource}
            renderRow={(e)=>this.renderRow(e)}
        >
        </ListView>:null;
        let indicatorView=this.state.isLoading?
            <ActivityIndicator
                animating={this.state.isLoading}
                style={[styles.centering,styles.fullScreenHeight]}
                size="large" />:null;
        let resultView=<View style={{flex:1}}>
            {indicatorView}
            {listView}
        </View>
        let bottomButton=this.state.showBottomButton?
            <TouchableOpacity
                style={[styles.bottomButton,this.props.theme.styles.backgroundColorStyle]}
                onPress={()=>{
                    this.saveKey();
                }
                }
            >
                <View style={{justifyContent:'center'}}>
                    <Text style={styles.title}>添加{this.inputKey}标签</Text>
                </View>
            </TouchableOpacity>:null;
        return <View style={GlobalStyles.root_container}>
            <Image source={require('../images/background_image.png')} style={styles.background_image} />
            <View style={styles.background_color}>
            {statusBar}
            {this.renderNavBar()}
            {resultView}
            {bottomButton}
            </View>
            <Toast ref={toast=>this.toast=toast}/>
        </View>
    }
}

