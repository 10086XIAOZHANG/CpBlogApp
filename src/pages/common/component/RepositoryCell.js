
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    DeviceEventEmitter
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import styles from '../styles/repositoryCell'
import {FLAG_STORAGE} from '../../../support/data/dataRepository'
import BaseComponent from './BaseComponent'
export default class RepositoryCell extends BaseComponent {
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
        this.props.onFavorite(this.props.projectModel.item,!this.state.isFavorite)
    }
    render() {
        let data=this.props.projectModel.item?this.props.projectModel.item:this.props.projectModel;
        let favoriteButton=
            <TouchableOpacity
                onPress={()=>{this.onPressFavorite()}}>
                <Image style={[{width:22,height:22},{tintColor:this.state.theme.themeColor}]} source={this.state.favoriteIcon}/>
            </TouchableOpacity>
        let polularCell=
            <View style={styles.cell_container}>
                <Text style={styles.title}>{data.full_name}</Text>
                <Text style={styles.description}>{data.description}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>作者:</Text>
                        <Image
                            style={{height:22,width:22}}
                            source={{uri:data.owner.avatar_url}}
                        />
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>点赞数:</Text>
                        <Text>{data.stargazers_count}</Text>
                    </View>
                    {favoriteButton}
                </View>
            </View>

        return (
            <TouchableOpacity
                onPress={this.props.onSelect}
                style={styles.container}
            >
                {polularCell}
            </TouchableOpacity>
        )
    }
}
