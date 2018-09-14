import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter,
    TextInput,
    TouchableHighlight
} from 'react-native';
import PopularTab from '../component/PopularTab'
import LanguageData,{FLAG_LANGUAGE} from '../../../support/data/LanguageData'
import {FLAG_STORAGE} from '../../../support/data/dataRepository'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import BaseComponent from '../../common/component/BaseComponent'
export default class HomeContainer extends BaseComponent{
    constructor(props){
        super(props);
        this.subscription={}
        this.subscriptionChange={}
        this.subscriptionLanguageChange={}
        this.subscriptionSort={}
        this.subscriptionLanguageSort={}
        if(this.props.flagStorage===FLAG_STORAGE.flag_popular){
            this.languageData=new LanguageData(FLAG_LANGUAGE.flag_key)
        }else{
            this.languageData=new LanguageData(FLAG_LANGUAGE.flag_languages)
        }

        this.state={
            theme:this.props.theme,
            languages: []
        }
        this.loadLanguage();
    }
    componentDidMount() {
        super.componentDidMount()
        //监听languages修改
        this.subscription = DeviceEventEmitter.addListener('changeCustomKey',(langulars) =>{
            if(this.props.flagStorage===FLAG_STORAGE.flag_popular){
                this.setState({
                    languages:langulars
                })
            }
        })
        this.subscriptionLanguageChange = DeviceEventEmitter.addListener('changeCustomLanguage',(langulars) =>{
            if(this.props.flagStorage===FLAG_STORAGE.flag_trending) {
                this.setState({
                    languages: langulars
                })
            }
        })
        //sortCustomKey
        this.subscriptionSort = DeviceEventEmitter.addListener('sortCustomKey',(langulars) =>{
            if(this.props.flagStorage===FLAG_STORAGE.flag_popular) {
                this.setState({
                    languages: langulars
                })
            }
        })
        this.subscriptionLanguageSort = DeviceEventEmitter.addListener('sortCustomLanguage',(langulars) =>{
            if(this.props.flagStorage===FLAG_STORAGE.flag_trending) {
                this.setState({
                    languages: langulars
                })
            }
        })

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.timeSpan!==this.props.timeSpan){
            this.props.timeSpan=nextProps.timeSpan
        }
    }
    componentWillUnmount() {
        super.componentWillUnmount()
        // 移除
        this.subscriptionSort&&this.subscriptionSort.remove();
        this.subscriptionLanguageChange&&this.subscriptionLanguageChange.remove();
        this.subscriptionLanguageSort&&this.subscriptionLanguageSort.remove();
    }
    loadLanguage(){
        this.languageData.fetch().then((langulars)=>{
            this.setState({
                languages:langulars
            })
        }).catch((error)=> {

        });
    }
    render(){
        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                renderTabBar={()=><ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 0}}
                                                    tabStyle={{height: 40}}/>}
                scrollWithoutAnimation={true}
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 1}}
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
                tabBarBackgroundColor={this.state.theme.themeColor}
                initialPage={0}
                tabBarTextStyle={{fontSize: 18}}
            >
                {
                    this.state.languages.map((result,i,arr)=>{
                        let language = arr[i];
                        return language.checked ? <PopularTab key={i} flagStorage={this.props.flagStorage} timeSpan={this.props.timeSpan} tabLabel={language.name} {...this.props}/> : null;
                    })
                }
            </ScrollableTabView> : null;
        return(

            <View style={styles.container}>
                {content}
            </View>
        )
       }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    }
})