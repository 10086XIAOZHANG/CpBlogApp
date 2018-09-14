
import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    TouchableHighlight,
    Image,
    Alert,
    Text,
    DeviceEventEmitter,
    Dimensions,
    Modal,
    Platform
} from 'react-native'
import ThemeData from '../../../support/data/ThemeData'
import ThemeFactory,{ThemeFlags} from '../../../res/styles/ThemeFactory'
import {ACTION_HOME} from "../../common/component/ComponentSetting"
export default class CustomThemePage extends Component {
    constructor(props) {
        super(props);
        this.themeData=new ThemeData()
    }
    /**
     * 单击主题颜色
     * */
    onSelectTheme(themeKey){
        this.themeData.save(ThemeFlags[themeKey])
        DeviceEventEmitter.emit("ACTION_BASE",ACTION_HOME.A_THEME,ThemeFactory.createTheme(ThemeFlags[themeKey]))
        this.props.onRequestClose()
    }
    /*
    * 创建主题
    * */
    getThemeItem(themeKey){
        return (<TouchableHighlight
            style={{flex:1}}
            underlayColor='#ffffff'
            onPress={()=>{this.onSelectTheme(themeKey)}}

        >
            <View style={[{backgroundColor:ThemeFlags[themeKey]},styles.themeItem]}>
                <Text style={styles.themeText}>{themeKey}</Text>
            </View>
        </TouchableHighlight>)
    }
    /**
     * 创建主题列表
     * */
    renderThemeItems(){
        var views=[];
        for(var i=0;l=Object.keys(ThemeFlags),i<l.length;i=i+3){
            key1=l[i],key2=l[i+1],key3=l[i+2]
            views.push(<View key={i} style={{flexDirection:'row',flex:1}}>
                {this.getThemeItem(key1)}
                {this.getThemeItem(key2)}
                {this.getThemeItem(key3)}
            </View>)
        }
        return views;
    }
    rederContentView(){
        {/* 初始化Modal */}
       return (<Modal
            animationType='slide'           // 从底部滑入
            transparent={true}             // 透明
            visible={this.props.isVisibleModal}    // 根据isModal决定是否显示
            onRequestClose={() => {this.props.onRequestClose()}}  // android必须实现
        >
            <View style={styles.modelContainer}>
                <ScrollView>
                    {this.renderThemeItems()}
                </ScrollView>
            </View>
        </Modal>)
    }
    render() {
        let view =this.props.isVisibleModal? <View style={styles.container}>
            {this.rederContentView()}
        </View>:null;
        return view
    }

}

const styles = StyleSheet.create({
    container:{

        flex:1
    },
    modelContainer:{
        flex:1,
        margin:10,
        marginTop:Platform.OS==='ios'?20:10,
        shadowColor:'gray',
        shadowOpacity:0.5,
        padding:3,
        shadowRadius:5,
        shadowOffset:{width:2,height:2}
    },
    themeItem:{
        flex:1,
        height:120,
        margin:3,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    themeText:{
        color:'#ffffff',
        fontWeight:'500',
        fontSize:16
    }
})