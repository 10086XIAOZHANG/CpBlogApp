export default class ArrayUtils{
    /**
     * 更新数组，若item已存在，则将其移除
     * */
    static updataArray(array,item){
        for (var i = 0, len = array.length; i < len; i++) {
            var temp = array[i];
            if (item=== temp) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }
    /**
     * 克隆一个数组
     * */
    static clone(from){
        if(!from){
            return null;
        }
        let to=[]
        for(let i=0;i<from.length;i++){
            to[i]=from[i]
        }
        return to;
    }
    /**
    * 判断两个数组是否相等，相等return true 不相等 return false
    * */
    static isEqual(arr1,arr2){
        if(!arr1||!arr2) return false;
        if(arr1.length!==arr2.length) return false;
        for(let i=0;i<arr1.length;i++){
            if(arr1[i]!==arr2[i]){
                return false;
            }
        }
        return true;
    }
    /**
     * 从指定数组移除元素
     * arr 数组
     * item 元素
     *
     * */
    static remove(arr,item){
        if(!arr)return
        for(let i=0;i<arr.length;i++){
            if(item===arr[i]){
                arr.splice(i,1)
            }
        }
    }
}