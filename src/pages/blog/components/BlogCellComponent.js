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
    TouchableOpacity,
    Image,
    DeviceEventEmitter, Dimensions
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import styles from '../styles/blogCell'
import {FLAG_STORAGE} from '../../../support/data/dataRepository'
import BaseComponent from '../../common/component/BaseComponent'
export default class BlogCellComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state={
            theme:this.props.theme,
        }
    }

    render() {
        let data=this.props.projectModel.item?this.props.projectModel.item:this.props.projectModel;
        let blogCell=
            <View style={styles.cell_container}>
                <Text style={styles.title}>{data.acticle_name}</Text>
                {this.props.commentContent ?
                    <Text style={styles.description}>{this.props.commentContent}</Text>
                    : <HTMLView
                    stylesheet={htmlviewStyles}
                    value={data.acticle_content.substr(0, 60)}/>
                }
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>日期:</Text>
                        <Text>{data.add_time}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>点赞数:</Text>
                        <Text>{data.fav_num}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>评价数:</Text>
                        <Text>{data.comment_num}</Text>
                    </View>
                </View>
            </View>

        return (
            <TouchableOpacity
                onPress={this.props.onSelect}
                style={styles.container}
            >
                {blogCell}
            </TouchableOpacity>
        )
    }
}
const htmlviewStyles = StyleSheet.create({
    p: {
        fontSize: 14,
        marginBottom: 2,
        color: '#3e3e3e'
    },
    div: {
        fontSize: 14,
        marginBottom: 2,
        color: '#3e3e3e'
    },
    a: {
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    },
});
