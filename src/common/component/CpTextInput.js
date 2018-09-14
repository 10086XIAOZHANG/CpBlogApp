/**
 *创建时间:  2018/6/12
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import {TextInput} from 'react-native';

export default class CpTextInput extends TextInput {

    //设置默认属性
    static defaultProps = {
        autoCapitalize: "none", //不自动大写
        autoCorrect: false, //不自动纠正拼写
    };

}