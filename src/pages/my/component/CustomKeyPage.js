
import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    Image,
    Alert,
    Text,
    DeviceEventEmitter,
    Dimensions
} from 'react-native'
import CheckBox from 'react-native-check-box'
import LanguageData,{FLAG_LANGUAGE} from '../../../support/data/LanguageData'
import NavigationBar from '../../../common/component/NavigationBar'
import ViewUtils from '../../../utils/ViewUtils'
import ArrayUtils from '../../../utils/ArrayUtils'
import BaseComponent from "../../common/component/BaseComponent"
export default class CustomKeyPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.isRemoveKey=this.props.isRemoveKey?true:false
        this.changeValues = [];
        this.state={
            theme:this.props.theme,
            languages:[]
        }
    }
    componentDidMount(){
        super.componentDidMount()
        this.languageData=new LanguageData(this.props.flag)
        this.loadLanguage();
    }
    /**
     * 加载custom key
     * */
    loadLanguage(){
        this.languageData.fetch().then((langulars)=>{
            this.setState({
                languages:langulars
            })
        }).catch((error)=> {

        });
    }
    /**
     * 返回
     * **/
    onBack() {
        if(this.changeValues.length===0){
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '提示',
            '是否保存修改?',
            [
                {text: '取消', onPress: () =>{ this.props.navigator.pop()}},
                {text: '保存', onPress: () => {this.onSave()}},
            ]
        )
    }
    /**
     * 保存
     * */
    onSave(){
        if(this.changeValues.length===0){
            this.props.navigator.pop();
            return;
        }
        if(this.isRemoveKey){
            for(let i=0;i<this.changeValues.length;i++){
                ArrayUtils.remove(this.state.languages,this.changeValues[i])
            }
        }
        this.languageData.save(this.state.languages)
        //订阅languages 的变化
        if(this.props.flag===FLAG_LANGUAGE.flag_key){
            //自定义标签
            DeviceEventEmitter.emit('changeCustomKey',this.state.languages)
        }else{
            //自定义语音
            DeviceEventEmitter.emit('changeCustomLanguage',this.state.languages)
        }
        this.props.navigator.pop();
    }
    /*
    * 显示自定义language key
    * */
    renderView(){
        if(!this.state.languages||this.state.languages.length===0) return null;
        let len=this.state.languages.length;
        let views=[]
        let i=0;
        for(i=0;i<len-2;i+=2){
                views.push(
                    <View key={i}>
                        <View style={styles.item}>
                            {this.renderCheckBox(this.state.languages[i])}
                            {this.renderCheckBox(this.state.languages[i+1])}
                        </View>
                        <View style={styles.line}></View>
                    </View>

                )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.line}></View>
                <View style={styles.item}>
                {len % 2 === 0 ? this.renderCheckBox(this.state.languages[len - 2]) : null}
                {this.renderCheckBoxLast(this.state.languages[len - 1])}
            </View>
                {/*<View style={{flex: 1}}>*/}
                    {/*{len % 2 === 0 ?*/}
                        {/*<View style={styles.item}>*/}
                            {/*{this.renderCheckBox(this.state.languages[len - 2])}*/}
                            {/*{this.renderCheckBox(this.state.languages[len - 1])}*/}
                        {/*</View>: this.renderCheckBoxLast(this.state.languages[len - 1])}*/}

                {/*</View>*/}
            </View>
        )
        return views;
    }
    /**
     * 点击checkbox
     * */
    onClick(data){
         if(!this.isRemoveKey)data.checked=!data.checked;
        ArrayUtils.updataArray(this.changeValues, data)
    }
    /*
    * 单个CheckBox
    * */
    renderCheckBox(data){
        let leftText=data.name;
        let isChecked=this.isRemoveKey?false:data.checked//如果是移除操作，CheckBox 全为False
        return (
            <CheckBox
                style={{flex:1,padding:10}}
                onClick={()=>{this.onClick(data)}}
                leftText={leftText}
                isChecked={isChecked}
                checkedImage={<Image style={{tintColor:this.state.theme.themeColor}} source={require('../images/ic_check_box.png')}/>}
                unCheckedImage={<Image style={{tintColor:this.state.theme.themeColor}} source={require('../images/ic_check_box_outline_blank.png')}/>}
            />
        )
    }
    /**
     * 对最后一个CheckBox 特殊处理
     * */
    renderCheckBoxLast(data){
        let leftText=data.name;
        let isChecked=this.isRemoveKey?false:data.checked//如果是移除操作，CheckBox 全为False
        return (
            <CheckBox
                style={{width:Dimensions.get('window').width/2,padding:10}}
                onClick={()=>{this.onClick(data)}}
                leftText={leftText}
                isChecked={isChecked}
                checkedImage={<Image style={{tintColor:this.state.theme.themeColor}} source={require('../images/ic_check_box.png')}/>}
                unCheckedImage={<Image style={{tintColor:this.state.theme.themeColor}} source={require('../images/ic_check_box_outline_blank.png')}/>}
            />
        )
    }
    render() {
        let title=this.isRemoveKey?'移除标签':'自定义标签'
        title=this.props.flag===FLAG_LANGUAGE.flag_languages?'自定义语言':title
        let rightButtonTitle=this.isRemoveKey?'移除':'保存'
        let rightButton=<TouchableOpacity
            onPress={()=>{this.onSave()}}
        >
            <View style={{margin:10}}>
                <Text style={styles.title}>{rightButtonTitle}</Text>
            </View>
        </TouchableOpacity>
        let navigationBar =
            <NavigationBar
                title={title}
                style={{backgroundColor:this.state.theme.themeColor}}
                leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                rightButton={rightButton}
            />;
        return (
            <View style={styles.container}>
                {navigationBar}
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
    title:{
        fontSize:16,
        color:'#ffffff'
    }
})