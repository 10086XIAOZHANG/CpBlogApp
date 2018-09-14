/**
 *创建时间:  2018/6/14
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import  React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView, Dimensions,
} from 'react-native'
import NavigationBar from '../../../common/component/NavigationBar'
import HTMLView from 'react-native-htmlview'
import BaseComponent from '../../common/component/BaseComponent'
import ViewUtils from '../../../utils/ViewUtils'
import styles from '../styles/blogActicleDetail'
export default class MyBlogArticle extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            theme:this.props.theme
        }
    }

    render() {
        var statusBar={
            backgroundColor:this.state.theme.themeColor
        }
        let data=this.props.projectModel.item?this.props.projectModel.item:this.props.projectModel;
        return (
            <View style={styles.container}>
                <Image source={require('../../../res/images/background_image.png')} style={styles.background_image} />
                <View style={styles.background_color}>
                    <NavigationBar
                        title='文章详情'
                        leftButton={
                            ViewUtils.getLeftButton(()=>{this.props.navigator.pop()})
                        }
                        style={this.state.theme.styles.backgroundColorStyle}
                        statusBar={statusBar}
                    />
                    <ScrollView
                        style={{backgroundColor:'rgba(255,255,255,0.6)'}}
                    >
                        <HTMLView
                            stylesheet={htmlviewStyles}
                            value={data.acticle_content}/>
                    </ScrollView>
                </View>
            </View>)
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
    h1: {
        fontSize:18,
        marginLeft:0,
        fontWeight:"400",
        color:'rgba(0,0,0,.85)',
    },
    a: {
        fontWeight: '300',
        color: '#2d8cff', // make links coloured pink
    },
    img: {
        height:Dimensions.get('window').width - 12,
        width:Dimensions.get('window').width - 12
    },
    code: {
        color: '#7b0fcc'
    }
});
