
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Dimensions
} from 'react-native'
import HomePage from './pages/home'
import ThemeData from './support/data/ThemeData'
import ThemeFactory from './res/styles/ThemeFactory'
import Config from "./common/config";
import AsyncStorageUtils from "./utils/AsyncStorageUtils";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.theme={}
        this.state = {
            theme:{},
            title: "hello,world",
            userinfo:null,
        }
    }

    componentDidMount() {
        new ThemeData().getTheme().then((data)=>{
            this.state.theme=data;
        })
        AsyncStorageUtils.get(Config.defaultProps.USER_ID).then((id)=>{
            AsyncStorageUtils.get(`${Config.defaultProps.api}/users/${id}/`).then((user)=>{
                this.state.userInfo=user?JSON.parse(user).items:null;
            })
        })
        this.timer=setTimeout(()=> {
              this.props.navigator.resetTo({
                  component:HomePage,
                  params:{
                      theme:ThemeFactory.createTheme(this.state.theme),
                      userInfo:this.state.userInfo
                  }
              })
        }, 2000);
    }
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
    }
    render() {
        return (
        <View style={styles.container}>
            <Image source={require('./res/images/welcome.jpg')} style={styles.background_image} />
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    tips: {
        fontSize: 29
    },
    background_image:{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
})
