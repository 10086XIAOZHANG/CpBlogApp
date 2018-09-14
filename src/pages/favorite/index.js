import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    ListView,
    RefreshControl,
    DeviceEventEmitter
} from 'react-native';
import NavigationBar from '../../common/component/NavigationBar'
import {FLAG_STORAGE} from '../../support/data/dataRepository'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import FavoriteData from '../../support/data/FavoriteData'
import ProjectModel from '../../support/model/ProjectModel'
import ArrayUtils from '../../utils/ArrayUtils'
import styles from './styles/index'
import RepositoryCell from '../common/component/RepositoryCell'
import TrendingRepoCell from '../common/component/RespositoryTrendingCell'
import RepositoryDetail from '../detail'
import BaseComponent from "../common/component/BaseComponent"
export default class FavoritePage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            theme:this.props.theme
        }
    }
    render() {
        var statusBar = {
            backgroundColor: this.state.theme.themeColor
        }
        let navigationBar =
            <NavigationBar
                title={'收藏'}
                style={this.state.theme.styles.backgroundColorStyle}
                statusBar={statusBar}
            />;
        return <View style={styles.container}>
            {navigationBar}
            <ScrollableTabView
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
                ref="scrollableTabView"
                tabBarBackgroundColor={this.state.theme.themeColor}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                                      tabStyle={{height: 39}}/>}
            >
                <FavoriteTab {...this.props} tabLabel='最热' flag={FLAG_STORAGE.flag_popular}/>
                <FavoriteTab {...this.props} tabLabel='趋势' flag={FLAG_STORAGE.flag_trending}/>

            </ScrollableTabView>
        </View>
    }
}
class FavoriteTab extends Component {
    constructor(props) {
        super(props);
        this.unFavoriteItems=[];
        this.favoriteDao = new FavoriteData(this.props.flag);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2)=>{ return r1 !== r2}}),
            isLoading: false,
            favoriteKeys: [],
        }
    }

    componentDidMount() {
        this.loadData();
    }
    componentWillReceiveProps(nextProps) {
        this.loadData(false);
    }
    loadData(isShowLoading) {
        if (isShowLoading)
            this.setState({
                isLoading: true,
            });
        this.favoriteDao.getAllItems().then((items)=> {
            var resultData = [];
            for (var i = 0, len = items.length; i < len; i++) {
                resultData.push(new ProjectModel(items[i], true));
            }
            this.setState({
                isLoading: false,
                dataSource: this.getDataSource(resultData),
            });
        }).catch((error)=> {
            this.setState({
                isLoading: false,
            });
        });
    }

    onRefresh() {
        this.loadData(true);
    }

    getDataSource(items) {
        return this.state.dataSource.cloneWithRows(items);
    }

    onSelectRepository(projectModel) {
        var belongNavigator = this.props.navigator ? this.props.navigator : this.props.homeComponent.refs.navFavorite;
        var item = projectModel.item;
        belongNavigator.push({
            title: item.full_name,
            component: RepositoryDetail,
            params: {
                projectModel: projectModel,
                flag: this.props.flag,
                ...this.props
            },
        });
    }

    onFavorite(item, isFavorite) {
        var key = this.props.flag === FLAG_STORAGE.flag_popular ? item.id.toString() : item.fullName;
        if (isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }
        ArrayUtils.updataArray(this.unFavoriteItems, item);
        if(this.unFavoriteItems.length>0){
            if (this.props.flag===FLAG_STORAGE.flag_popular){
                DeviceEventEmitter.emit('favoriteChanged_popular');
            }else {
                DeviceEventEmitter.emit('favoriteChanged_trending');
            }
        }
    }
    onTrendingFavorite(item,isFavorite){
        var key = this.props.flag === FLAG_STORAGE.flag_popular ? item.id.toString() : item.fullName;
        if (isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }
        ArrayUtils.updataArray(this.unFavoriteItems, item);
        if(this.unFavoriteItems.length>0){
            if (this.props.flag===FLAG_STORAGE.flag_popular){
                DeviceEventEmitter.emit('favoriteChanged_popular');
            }else {
                DeviceEventEmitter.emit('favoriteChanged_trending');
            }
        }
    }

    renderRow(projectModel, sectionID, rowID) {
        let CellComponent = this.props.flag === FLAG_STORAGE.flag_popular ? RepositoryCell : TrendingRepoCell;
        let {navigator}=this.props;
        return (
            <CellComponent
                {...this.props}
                key={this.props.flag === FLAG_STORAGE.flag_popular ? projectModel.item.id : projectModel.item.fullName}
                onFavorite={(item, isFavorite)=>this.onFavorite(item, isFavorite)}
                onTrendingFavorite={(item,isFavorite)=>this.onTrendingFavorite(item,isFavorite)}
                isFavorite={true}
                {...{navigator}}
                onSelect={()=>this.onSelectRepository(projectModel)}
                projectModel={projectModel}/>
        );
    }

    render() {
        var content =
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
                        title='Loading...'
                        titleColor='#2196F3'
                        colors={['#2196F3']}
                        refreshing={this.state.isLoading}
                        onRefresh={()=>this.onRefresh()}
                        tintColor='#2196F3'
                    />}
            />;
        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
}


