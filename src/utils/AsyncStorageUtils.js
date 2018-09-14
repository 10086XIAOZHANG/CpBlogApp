import React, {
    AsyncStorage
}from 'react-native';

class AsyncStorageUtils {
    /**
     * 获取
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     */

    static get(key) {
        return AsyncStorage.getItem(key,(error,value)=>{
            if (!error) {
                try {
                    return JSON.parse(value);
                } catch (e) {
                    return '';
                }
            } else {
                return '';
            }
        })
    }


    /**
     * 保存
     * @param key
     * @param value
     * @returns {*}
     */
    static save(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }


    /**
     * 更新
     * @param key
     * @param value
     * @returns {Promise<T>|Promise.<TResult>}
     */
    static update(key, value) {
        return AsyncStorageUtils.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        });
    }


    /**
     * 更新
     * @param key
     * @returns {*}
     */
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }

    /**
     * 清空
     * @param key
     * @returns {*}
     */
    static clearAll(){
        AsyncStorage.clear(function (error) {
            console.log(error);
        })
    }

}

export default AsyncStorageUtils;