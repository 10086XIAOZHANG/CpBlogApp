

export default  function cancelableFetch(promise) {
    let hasCancelabled_=false;
    const wrapperPromise=new Promise((resolve,reject)=>{
        promise.then((val)=>{
            hasCancelabled_?reject({isCancelebled:true}):resolve(val)
        })
        promise.catch((error)=>{
            hasCancelabled_?reject({isCancelebled:true}):resolve(error)
        })
    });
    return {
        promise:wrapperPromise,
        cancel(){
            hasCancelabled_=true;
        }
    }
}