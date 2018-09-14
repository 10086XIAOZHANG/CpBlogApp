/**
 *创建时间:  2018/6/12
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import Config from '../config'
import AsyncStorageUtils from '../../utils/AsyncStorageUtils'

const UrlConfig = {};
UrlConfig.TOKENURL='/login/';
UrlConfig.TOKEN = (account,pwd)=>{
    return {
        URL: '/login/',
        CONFIG: {
            method: 'POST',
            body: {
                username: account,
                password: pwd,
            },
        }
    }
};
UrlConfig.USER =(data)=>{

    return {
        URL: `/users/${data.user_id}/`,
        CONFIG: {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${data.token}`,
            },
        }
    }
    // AsyncStorageUtils.get(Config.defaultProps.USER_ID).then((result)=>{
    //     AsyncStorageUtils.get(Config.defaultProps.USER_TOKEN).then((data)=>{
    //         return {
    //             URL: `/users/${result}/`,
    //             CONFIG: {
    //                 method: 'GET',
    //                 headers: {
    //                     Authorization: `Bearer ${data}`,
    //                 },
    //             }
    //         }
    //     });
    // });
}
async function getUser(){
    const userId=await AsyncStorageUtils.get(Config.defaultProps.USER_ID);
    const userToken=await AsyncStorageUtils.get(Config.defaultProps.USER_TOKEN);
    return {userId,userToken}
}
export default UrlConfig;