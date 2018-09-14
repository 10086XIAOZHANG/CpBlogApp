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
} from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'
import NavigationBar from '../../common/component/NavigationBar'
import BaseComponent from '../common/component/BaseComponent'
import ViewUtils from '../../utils/ViewUtils'
import Card from '../../common/component/Card';
import styles from './styles/index'
import {ScreenWidth} from "../../utils/UIUtiles";
export default class SignatureBook extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            theme:this.props.theme
        }
    }
    onSignatureSumit=()=>{
        this.toast.show("打卡成功",DURATION.LENGTH_LONG);
    }
    render() {
        var statusBar={
            backgroundColor:this.state.theme.themeColor
        }
        return (
            <View style={styles.container}>
                <Image source={require('./images/sign_bg.jpeg')} style={styles.background_image} />
                <View style={styles.background_color}>
                    <NavigationBar
                        title='打卡'
                        leftButton={
                            ViewUtils.getLeftButton(()=>{this.props.navigator.pop()},'返回',true)
                        }
                        style={this.state.theme.styles.backgroundColorStyle}
                        statusBar={statusBar}
                    />
                    <View style={{marginBottom:10,marginTop:20,flexDirection:'row',width:ScreenWidth - 10}}>
                        <Text style={{fontSize:20,color:'#fff',marginLeft:40}}>欢迎来打卡</Text>
                    </View>
                    <View style={{marginLeft: 8,flexDirection:'row'}}>
                        <Text style={{fontSize:12,color:'#fff',marginLeft:40}}>记录生活的每一天</Text>
                    </View>
                    <Card
                        ref={"card"+1}
                        key={1}
                        month={1}
                        onSignatureSumit={this.onSignatureSumit}
                        currentYear='2018'
                    />
                </View>
                <Toast ref={(toast)=>{
                    this.toast=toast;
                }}/>
            </View>)
    }
}