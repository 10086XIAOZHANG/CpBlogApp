import {
    AsyncStorage,
} from 'react-native';
import ThemeFactory,{ThemeFlags}from '../../res/styles/ThemeFactory'
export const THEME_KEY='theme_key';
export default class ThemeData {
    /*
    * 获取当前主题
    * */
    getTheme(){
       return new Promise((resolve,reject)=>{
           AsyncStorage.getItem(THEME_KEY,(error,result)=>{
               if(error){
                   reject(error)
                   return;
               }
               if(!result){
                   //第一次安装app,result为空，保存设置默认主题
                   this.save(ThemeFlags.Default)
                   result=ThemeFlags.Default
               }
               resolve(result)
           })
       })
    }
    save(themeFlag){
        AsyncStorage.setItem(THEME_KEY,themeFlag,(error)=>{
        })
    }
}