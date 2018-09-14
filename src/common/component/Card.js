/**
 *创建时间:  2018/6/14
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
// Default
import React, { Component, PureComponent } from 'react';
import {
    Platform,
    StyleSheet,
    Easing,
    Text,
    View,
    Animated,
    Image,
    ScrollView,
    TouchableOpacity,
    InteractionManager, Dimensions
} from 'react-native';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/UIUtiles';

const DURATION = 250;
const CARD_WIDTH = ScreenWidth - 20;
const CARD_HEIGHT = CARD_WIDTH / 5 * 6;

class Card extends PureComponent {

    //=================== 初始化 ===================//
    constructor(props) {
        super(props);
        this.state = {
            rotateValue: new Animated.Value(0),
            isAnimated: false,
            isPositive: true,
            needsComponent: true,
        }
    }
    componentDidMount() {
        this.refs.subview.shadowOpacity = 5;
    }
    componentWillUpdate = (nextProps, nextState) => {
    }
    onPress=()=>{
        this.show(false);
        this.setState({
            needsComponent:!this.state.needsComponent,
        })
    }

    //==================== 动画 ====================//
    show(show) {
        if (show == true) {
            this.hidePositive();
        } else {
            this.hideOpposite();
        }
    }
    showPositive() {
        this.state.rotateValue.setValue(270);
        Animated.timing(this.state.rotateValue,{
            toValue: 360,
            duration: DURATION,
            easing: Easing.linear
        }).start((result)=>{
            this.state.isAnimated = false;
            this.state.isPositive = true;
            this.refs.subview.setNativeProps({
                style: {
                    shadowRadius: 5
                }
            });
        });
    }
    hidePositive() {
        InteractionManager.runAfterInteractions(() => {
            this.state.rotateValue.setValue(0);
            this.state.isAnimated = true;
            this.refs.subview.setNativeProps({
                style: {
                    shadowRadius: 0
                }
            });
            Animated.timing(this.state.rotateValue,{
                toValue: 90,
                duration: DURATION,
                easing: Easing.linear
            }).start((result)=>{
                this.showOpposite();
                // this.setState({
                //     needsComponent:true,
                // })
            });
        })
    }
    showOpposite() {
        this.state.rotateValue.setValue(90);
        Animated.timing(this.state.rotateValue,{
            toValue: 180,
            duration: DURATION,
            easing: Easing.linear
        }).start((result)=>{
            this.state.isAnimated = false;
            this.state.isPositive = false;
            this.refs.subview.setNativeProps({
                style: {
                    shadowRadius: 5
                },
            });
        });
    }
    hideOpposite() {
        InteractionManager.runAfterInteractions(() => {
            this.state.rotateValue.setValue(180);
            this.state.isAnimated = true;
            this.refs.subview.setNativeProps({
                style: {
                    shadowRadius: 0
                }
            });
            Animated.timing(this.state.rotateValue,{
                toValue: 270,
                duration: DURATION,
                easing: Easing.linear
            }).start((result)=>{
                this.showPositive();
            });
        })
    }


    //==================== 控件 ====================//
    shadow() {
        return (
            <Animated.View pointerEvents={"none"} ref={"shadow"} style={[styles.shadow, {
                opacity: this.state.rotateValue.interpolate({
                    inputRange: [0, 90, 180, 270, 360],
                    outputRange: [0, 0.3, 0, 0.3, 0],
                })

            }]}>
            </Animated.View>
        )
    }
    frontViews=()=>{
        const week= "星期" + "日一二三四五六".charAt(new Date().getDay());
        return (
            <Animated.View style={[{flex:1},styles.cardShadow]} ref={(view)=>{this.frontView=view;}} style={{height:CARD_HEIGHT,width:CARD_WIDTH,backgroundColor:'rgba(255,255,255,0.6)'}}>
                <Image source={require('../images/card_front_bg.png')} style={styles.backgroundImage} />
                <View style={{ position: 'absolute', bottom: 20, left: 20,}}>
                <Text style={{marginTop:30,fontSize:16}}>{week}</Text>
                <Text style={{marginTop:10,fontSize:16}}>{`${new Date().getFullYear()}\.${new Date().getMonth()+1}`}</Text>
                <Text style={{marginTop:5,fontSize:80,fontWeight:'800'}}>{new Date().getDate()}</Text>
                <TouchableOpacity
                    style={styles.btnStyle}
                    underlayColor={'transparent'}
                    onPress={this.props.onSignatureSumit}
                >
                    <Text style={{color:'#333'}}>立即打卡</Text>
                </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }
    backViews=()=>{
        return (
            <Animated.View ref={(view)=>{this.backView=view;}} style={[{height:CARD_HEIGHT,width:CARD_WIDTH,backgroundColor:'rgba(255,255,255,0.6)'},styles.cardShadow]}>
                <Image source={require('../images/card_back_bg.png')} style={styles.backgroundImage} />
                <View style={{ position: 'absolute', top: CARD_HEIGHT/4, left: (CARD_WIDTH/5),}}>
                    <Text style={{fontSize:16}}>已经打卡天数</Text>
                    <Text style={{marginTop:5,fontSize:180,fontWeight:'800'}}>{new Date().getDate()}</Text>
                </View>
            </Animated.View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={1} onPress={this.onPress}>
                    {this.state.needsComponent?
                    <Animated.View ref={"subview"} style={[styles.subview,{
                        transform: [
                            //透视
                            {perspective: 1500},
                            {scale: 0.9},
                            //3d 旋转
                            {
                                rotateY: this.state.rotateValue.interpolate({
                                    inputRange: [0, 360],
                                    outputRange: ['0deg','360deg'],
                                })
                            },
                            {
                                scale: this.state.rotateValue.interpolate({
                                    inputRange: [0, 90, 180, 270, 360],
                                    outputRange: [1, 0.95, 1, 0.95, 1]})
                            },
                            {
                                translateY: this.state.rotateValue.interpolate({
                                    inputRange: [0, 90, 180, 270, 360],
                                    outputRange: [0, 5, 0, 5, 0]})
                            }
                        ]
                    }]}>
                        {this.frontViews()}
                        {this.shadow()}
                    </Animated.View>:
                    <Animated.View ref={"subview"} style={[styles.subview,{
                    transform: [
                        //透视
                        // {perspective: 1500},
                        {scale: 0.9},
                        //3d 旋转
                        {
                            rotateY: this.state.rotateValue.interpolate({
                                inputRange: [0, 360],
                                outputRange: ['0deg','360deg'],
                            })
                        },
                        {
                            scale: this.state.rotateValue.interpolate({
                                inputRange: [0, 90, 180, 270, 360],
                                outputRange: [1, 0.95, 1, 0.95, 1]})
                        },
                        {
                            translateY: this.state.rotateValue.interpolate({
                                inputRange: [0, 90, 180, 270, 360],
                                outputRange: [0, 5, 0, 5, 0]})
                        }
                    ]
                }]}>
                    {this.backViews()}
                    {this.shadow()}
                    </Animated.View>
                        }
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
    },
    subview: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
    },
    shadow: {
        backgroundColor: 'black',
        position: 'absolute',
        left: 0,
        top: 0,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 10,
    },
    backgroundImage:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:null,
        height:null,
        //祛除内部元素的白色背景
        backgroundColor:'rgba(0,0,0,0)',
    },
    btnStyle: {
        height: 40,
        width: (Dimensions.get('window').width)/2 - 12,
        borderRadius: 5,
        marginTop: 20,
        flexDirection:'row',
        backgroundColor: '#f9fdfc',
        justifyContent: 'center',
        alignItems:'center',
        borderColor:'#9ea2a1',
        shadowColor:'#9ea2a1',
        shadowOffset:{h:2,w:2},
        shadowRadius:3,
        shadowOpacity:0.6,
    },
    loginText: {
        height: 40,
        lineHeight:40,
        textAlign: 'center',
        color: '#333',
        fontSize:24,
        textAlignVertical: 'center',
    },
    cardShadow:{
        borderColor:'#9ea2a1',
        shadowColor:'#9ea2a1',
        shadowOffset:{h:2,w:2},
        shadowRadius:3,
        shadowOpacity:0.6,
    }
});

export default Card;