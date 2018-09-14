import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    View,
    Image,
    Text,
} from 'react-native'
import BaseComponent from "../../common/component/BaseComponent"
export default class SortCell extends BaseComponent{
    constructor(props){
        super(props)
        this.state={
            theme:this.props.theme
        }
    }
    render(){
        return(
            <TouchableHighlight
                underlayColor={'#eee'}
                style={styles.item}
                {...this.props.sortHandlers}>
                <View style={{marginLeft: 10, flexDirection: 'row'}}>
                    <Image source={require('../images/ic_sort.png')} resizeMode='stretch' style={[{
                        opacity: 1,
                        width: 16,
                        height: 16,
                        marginRight: 10
                    },styles.image,{tintColor:this.state.theme.themeColor}]}/>
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    item:{
        padding:15,
        backgroundColor:"#F8F8F8",
        borderBottomWidth:1,
        borderColor:'#eee'
    },
    image:{
        // backgroundColor:'#2196F3',
        height:16,
        width:16,
        marginRight:10
    }
})