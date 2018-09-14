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
    TouchableOpacity
} from 'react-native';
import SideMenu from 'react-native-side-menu'
import TabNavigator from 'react-native-tab-navigator';
import HomeContainer from './views/container'
import Favorite from '../favorite'
import styles from './styles/index';
import NavigationBar from "../../common/component/NavigationBar";
import {FLAG_STORAGE} from '../../support/data/dataRepository'
import My from "../my/index"
import CpTextInput from '../../common/component/CpTextInput';
import TimeSpan from '../../support/model/TimeSpan'
import Popover from '../../common/component/Popover'
import SearchPage from "./views/searchPage";
import ViewUtils from '../../utils/ViewUtils'
import MoreMenu,{MORE_MENU} from '../common/component/MoreMenu'
import BaseComponent from '../common/component/BaseComponent'
import BroadSidePage from './views/BroadSidePage'
export const FLAG_TAB={
    flag_popularTab:'tb_popular',
    flag_trendingTab:'tb_trending',
    flag_favoriteTab:'tb_favorite',
    flag_my:'tb_my'
}
const timeSpanTextArray=[
    new TimeSpan('今 天', '?since=daily'),
    new TimeSpan('本 周', '?since=weekly'),
    new TimeSpan('本 月', '?since=monthly')]
export default class Home extends BaseComponent{
    constructor(props){
        super(props)
        this.inputKey=""
        this.state={
            selectedTab:'home',
            isOpen:false,
            isVisible:false,//趋势title popoper是否显示
            buttonRect: {},
            timeSpan: timeSpanTextArray[0],
            theme:this.props.theme,
            userInfo:this.props.userInfo,
        }
    }
    searchPosts(){

    }
    getInputValue(text){
        this.inputKey=text
    }
    titleView(){
        return <View style={styles.tab_content}>
            <View style={styles.search}>
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
                            component:SearchPage,
                            params:{
                                wordKey:this.inputKey,
                                //将this.props和改变后的theme的顺序一定是...this.props在前，不然会被原有的主题颜色给覆盖
                                ...this.props,
                                theme:this.state.theme

                            }
                        })
                    }}
                >
                    <Image source={require('./images/ic_search_white_48pt.png')} style={styles.searchIcon}/>
                </TouchableOpacity>
            </View>
        </View>
    }
    openSideView(){
        let isOpenSide=!this.state.isOpenSide;
        this.setState({
            isOpenSide:isOpenSide
        })
    }
    menuView(){
        return <TouchableHighlight style={styles.tab_left} underlayColor="transparent" onPress={()=>{this.toggle()}}>
            <Image style={[styles.image,{width:25,height:25,margin:12}]} source={require('./images/ic_menu.png')}/>
        </TouchableHighlight>
    }
    moreView(){
       return ViewUtils.getMoreButton(()=>this.refs.moreMenu.open())
    }
    moreTrendingView(){
        return ViewUtils.getMoreButton(()=>this.refs.moreTrendingMenu.open())
    }
    sideView(){
        return <BroadSidePage {...this.props} theme={this.state.theme} userInfo={this.state.userInfo}/>
    }
    toggle(){
        this.setState({
            isOpen:!this.state.isOpen,
        });
    }
    onMenuItemSelected = (item) =>{
        this.setState({
            isOpen: false ,
            selectedItem:item ,
        });
    }
    updateMenuState(isOpen){
        this.setState({
            isOpen:isOpen,
        })
    }
    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }
    closePopover() {
        this.setState({isVisible: false});
    }
    renderTrendingTitleView(){
        return <TouchableOpacity
                ref='button'
                onPress={()=>{this.showPopover()}}
        >
             <View style={{flexDirection:'row',alignItems:'center'}}>
                 <Text
                    style={{
                        fontSize:18,
                        color:'#ffffff',
                        fontWeight:'400'
                    }}
                 >趋势</Text>
                 <Image
                     style={{width:12,height:12,marginLeft:5,paddingBottom:5}}
                     source={require('./images/ic_spinner_triangle.png')}/>
             </View>
        </TouchableOpacity>
    }
    onSelectTimeSpan(timeSpan) {
        this.closePopover();
        this.setState({
            timeSpan: timeSpan
        })
    }
    renderMoreView(){
        let params={...this.props,fromPage:FLAG_TAB.flag_popularTab}
        return <MoreMenu
            ref="moreMenu"
            {...params}
            menus={[MORE_MENU.Custom_Key,MORE_MENU.Sort_Key,MORE_MENU.Remove_Key,
                MORE_MENU.About_Author,MORE_MENU.About]}
            anchorView={()=>this.refs.moreMenuButton}
        />
    }
    renderTrendingMoreView(){
        let params={...this.props,fromPage:FLAG_TAB.flag_popularTab}
        return <MoreMenu
            ref="moreTrendingMenu"
            {...params}
            menus={[MORE_MENU.Custom_Language,MORE_MENU.Sort_Language,
                MORE_MENU.About_Author,MORE_MENU.About]}
            anchorView={()=>this.refs.moreMenuButton}
        />
    }
    render() {
        const menuSide = this.sideView();
        const menu =<View onItemSelected={this.onMenuItemSelected}/>;
        let timeSpanView=
            <Popover
                isVisible={this.state.isVisible}
                fromRect={this.state.buttonRect}
                placement="bottom"
                onClose={()=>this.closePopover()}
                contentStyle={{opacity:0.82,backgroundColor:'#343434'}}
                style={{backgroundColor: 'red'}}>
                <View style={{alignItems: 'center'}}>
                    {timeSpanTextArray.map((result, i, arr) => {
                        return <TouchableOpacity key={i} onPress={()=>this.onSelectTimeSpan(arr[i])}
                                                 underlayColor='transparent'>
                            <Text
                             style={{fontSize: 18,color:'white', padding: 8, fontWeight: '400'}}>
                                {arr[i].showText}
                            </Text>
                        </TouchableOpacity>
                    })
                    }
                </View>
            </Popover>
            return (
                <View style={styles.container}>
                    <SideMenu
                        menu={menuSide}
                        isOpen ={this.state.isOpen}
                        theme={this.state.theme}
                        onChange={(isOpen)=>this.updateMenuState(isOpen)}>
                        <TabNavigator
                        tabBarStyle={{}}
                    >
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'home'}
                            title="最热"
                            renderIcon={() => <Image style={styles.image} source={require('./images/ic_polular.png')} />}
                            renderSelectedIcon={() => <Image style={[styles.image,{tintColor:this.state.theme.themeColor}]} source={require('./images/ic_polular.png')} />}
                            selectedTitleStyle={{color:this.state.theme.themeColor}}
                            onPress={() => this.setState({ selectedTab: 'home' })}>
                            <View style={styles.container}>
                                <Image source={require('./images/background_image.png')} style={styles.background_image} />
                                <View style={styles.background_color}>
                                    <NavigationBar
                                   titleView={this.titleView()}
                                   style={{backgroundColor: this.state.theme.themeColor}}
                                   leftButton={this.menuView()}
                                   rightButton={this.moreView() }
                                   statusBar={{
                                            backgroundColor: this.state.theme.themeColor
                                       }}
                                />
                                    <HomeContainer flagStorage={FLAG_STORAGE.flag_popular} {...this.props} theme={this.state.theme}/>
                                </View>
                                {this.renderMoreView()}
                            </View>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'trend'}
                            title="趋势"
                            renderIcon={() => <Image style={styles.image} source={require('./images/ic_trending.png')} />}
                            selectedTitleStyle={{color:this.state.theme.themeColor}}
                            renderSelectedIcon={() => <Image style={[styles.image,{tintColor:this.state.theme.themeColor}]} source={require('./images/ic_trending.png')} />}
                            onPress={() => this.setState({ selectedTab: 'trend' })}>
                            <View style={styles.container}>
                                <Image source={require('./images/background_image.png')} style={styles.background_image} />
                                <View style={styles.background_color}>
                                    <NavigationBar
                                        title="趋势"
                                        titleView={this.renderTrendingTitleView()}
                                        style={{backgroundColor: this.state.theme.themeColor}}
                                        rightButton={this.moreTrendingView()}
                                        statusBar={{
                                            backgroundColor: this.state.theme.themeColor
                                        }}
                                    />
                                    <HomeContainer flagStorage={FLAG_STORAGE.flag_trending} timeSpan={this.state.timeSpan} {...this.props} theme={this.state.theme}/>
                                </View>
                                {timeSpanView}
                                {this.renderTrendingMoreView()}
                            </View>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'collection'}
                            title="收藏"
                            renderIcon={() => <Image style={styles.image} source={require('./images/ic_favorite.png')} />}
                            renderSelectedIcon={() => <Image style={[styles.image,{tintColor:this.state.theme.themeColor}]} source={require('./images/ic_favorite.png')} />}
                            selectedTitleStyle={{color:this.state.theme.themeColor}}
                            onPress={() => this.setState({ selectedTab: 'collection' })}>
                            <View style={styles.container}>
                                <Image source={require('./images/background_image.png')} style={styles.background_image} />
                                <View style={styles.background_color}>
                                    <Favorite {...this.props} theme={this.state.theme}/>
                                </View>
                            </View>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'my'}
                            title="我的"
                            renderIcon={() => <Image style={styles.image} source={require('./images/ic_polular.png')} />}
                            renderSelectedIcon={() => <Image style={[styles.image,{tintColor:this.state.theme.themeColor}]} source={require('./images/ic_polular.png')} />}
                            selectedTitleStyle={{color:this.state.theme.themeColor}}
                            onPress={() => this.setState({ selectedTab: 'my' })}>
                            <View style={styles.container}>
                                <Image source={require('./images/background_image.png')} style={styles.background_image} />
                                <View style={styles.background_color}>
                                    <My {...this.props} theme={this.state.theme} userInfo={this.state.userInfo}/>
                                </View>
                            </View>
                        </TabNavigator.Item>
                    </TabNavigator>
                    </SideMenu>

                </View>
            )
        }
}