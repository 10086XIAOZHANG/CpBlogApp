
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import styles from '../styles/respositoryTrendingCell'
import {FLAG_STORAGE} from '../../../support/data/dataRepository'
import BaseComponent from './BaseComponent'
export default class RespositoryTrendingCell extends BaseComponent {
    constructor(props) {
        super(props);
        this.state={
            theme:this.props.theme,
            isFavorite:this.props.projectModel.isFavorite,
            favoriteIcon:this.props.projectModel.isFavorite?require('../images/ic_star.png'):
                require('../images/ic_unstar_transparent.png')
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setFavoriteState(nextProps.projectModel.isFavorite)
    }
    setFavoriteState(isFavorite){
        this.setState({
            isFavorite:isFavorite,
            favoriteIcon:isFavorite?require('../images/ic_star.png'):require('../images/ic_unstar_transparent.png')
        })
    }
    onPressFavorite(){
        this.setFavoriteState(!this.state.isFavorite)
        this.props.onTrendingFavorite(this.props.projectModel.item,!this.state.isFavorite)
    }

    render() {
        let data=this.props.projectModel.item?this.props.projectModel.item:this.props.projectModel;
        let description='<p>'+data.description+'</p>';
        let favoriteButton=
            <TouchableOpacity
                onPress={()=>{this.onPressFavorite()}}>
                <Image style={[{width:22,height:22},{tintColor:this.state.theme.themeColor}]} source={this.state.favoriteIcon}/>
            </TouchableOpacity>
        let trendingCell=
            <View style={styles.trending_cell_container}>
                <Text style={styles.trending_title}>{data.fullName}</Text>
                <HTMLView
                    value={description}
                    onLinkPress={(url) => {
                    }}
                    stylesheet={{
                        p:styles.trending_description,
                        a:styles.trending_description,
                    }}
                />
                <Text style={[styles.trending_description, {fontSize: 14}]}>
                    {data.meta}
                </Text>
                <View style={styles.trending_row}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.trending_author}>贡献者:  </Text>
                        {data.contributors.map((result, i, arr) => {
                            return <Image
                                key={i}
                                style={{width: 22, height: 22,margin:2}}
                                source={{uri: arr[i]}}
                            />
                        })
                        }
                    </View>
                    {favoriteButton}
                </View>
            </View>
        return (
            <TouchableOpacity
                onPress={this.props.onSelect}
                style={styles.container}
            >
                {trendingCell}
            </TouchableOpacity>
        )
    }
}
