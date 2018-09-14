import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    View,
    Image,
    Text,
    Alert,
    DeviceEventEmitter
} from 'react-native'
import SortableListView from 'react-native-sortable-listview'
import SortCell from './SortCellPage'
import LanguageData,{FLAG_LANGUAGE} from '../../../support/data/LanguageData'
import NavigationBar from '../../../common/component/NavigationBar'
import ViewUtils from '../../../utils/ViewUtils'
import ArrayUtils from '../../../utils/ArrayUtils'
import BaseComponent from "../../common/component/BaseComponent"
export default class SortKeyPage extends BaseComponent {
    constructor(props) {
        super(props);

        this.dataArray = [];//原始数组
        this.sortResultArray = [];//排序后新生成的数组
        this.originalCheckedArray = [];//用户订阅的数组
        this.state = {
            checkedArray: [],//对筛选的数组进行排序
            theme:this.props.theme
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.languageData=new LanguageData(this.props.flag)
        this.loadData()
    }
    loadData(){
        this.languageData.fetch().then(
            result=>{
                this.getCheckedItems(result)
            }).catch(error=>{

        })
    }
    getCheckedItems(result){
        this.dataArray=result;
        let checkedArray=[];
        for(let i=0;i<result.length;i++){
            let data=result[i]
            if(data.checked){
                checkedArray.push(data)
            }
        }
        this.setState({
            checkedArray:checkedArray
        })
       this.originalCheckedArray=ArrayUtils.clone(checkedArray);
    }
    onBack(){
        if(ArrayUtils.isEqual(this.state.checkedArray,this.originalCheckedArray)){
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '提示',
            '是否保存修改?',
            [
                {text: '取消', onPress: () =>{ this.props.navigator.pop()}},
                {text: '保存', onPress: () => {this.onSave(true)}},
            ]
        )
    }
    onSave(isChecked){
        //isChecked 单击返回按钮验证过就不再验证isEqual
        if(!isChecked&&ArrayUtils.isEqual(this.state.checkedArray,this.originalCheckedArray)){
            this.props.navigator.pop()
            return
        }
        this.getSortResult()
        this.languageData.save(this.sortResultArray)//持久化保存到数据库中
        //订阅languages 的变化
        if(this.props.flag===FLAG_LANGUAGE.flag_key){
            //自定义标签
            DeviceEventEmitter.emit('sortCustomKey',this.sortResultArray)
        }else{
            //自定义语言
            DeviceEventEmitter.emit('sortCustomLanguage',this.sortResultArray)
        }
        this.props.navigator.pop()
    }
    getSortResult(){
        this.sortResultArray=ArrayUtils.clone(this.dataArray)
        for(let i=0;i<this.originalCheckedArray.length;i++){
            let item=this.originalCheckedArray[i];
            let index=this.dataArray.indexOf(item);
            this.sortResultArray[index]=this.state.checkedArray[i];//或者 this.sortResultArray.splice(index,1,this.state.checkedArray[i])
        }
    }
    render() {
        let title = this.props.flag === FLAG_LANGUAGE.flag_languages ? '语言排序' : '标签排序';
        let navigationBar =
            <NavigationBar
                title={title}
                style={{backgroundColor:this.state.theme.themeColor}}
                statusBar={{backgroundColor:this.state.theme.themeColor}}
                leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                rightButton={ViewUtils.getRightButton('保存',()=>this.onSave(false))}/>;
        return (
            <View style={styles.container}>
                {navigationBar}
                <SortableListView
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={(e) => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                        this.forceUpdate();
                    }}
                    renderRow={row => <SortCell {...this.props} data={row} />}
                />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    hidden: {
        height: 0
    },
    item: {
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 50,
        justifyContent: 'center'
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})