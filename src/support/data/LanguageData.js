'use strict'
import {
    AsyncStorage
} from 'react-native'
import keyData from '../../res/data/keys.json'
import langsData from '../../res/data/langs.json'
export var FLAG_LANGUAGE={flag_languages:'language_dao_language',flag_key:'language_dao_key'}
export default class LanguageData{
    constructor(flag){
        this.flag=flag;
    }
    fetch(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.flag,(error,result)=>{
                if(error){
                    reject(error);
                    return;
                }
                if(!result){
                    var data=this.flag===FLAG_LANGUAGE.flag_languages?langsData:keyData;
                    this.save(data)
                    resolve(data)
                }else{
                    try{
                        resolve(JSON.parse(result));
                    }catch(e){
                        reject(error);
                    }
                }
            })
        })
    }
    save(objectData){
        var stringData=JSON.stringify(objectData);
        AsyncStorage.setItem(this.flag,stringData,(error,result)=>{

        })
    }
}