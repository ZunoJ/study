class myPromise{
    constructor(fn){
        this.state = 'pending' // pending fulfilled rejected
        this.value = '' // 成功状态返回值
        this.reason = '' // 失败状态原因
        this.onfulfiledCallbacks = [] // 成功回调函数
        this.onrejectedCallbacks = [] // 失败回调函数
        let resolve = (value) => {
            if(this.state === 'pending'){
                this.state = 'fulfilled'
                if(value instanceof myPromise){
                    value.then((v) => {
                        this.value = v
                        setTimeout(() => {
                            this.onfulfiledCallbacks.forEach(f => f());
                        },0)
                    })
                }else{
                    this.value = value
                    setTimeout(() => {
                        this.onfulfiledCallbacks.forEach(f => f());
                    },0)
                }
            }
        }
        let reject = (reason) => {
            if(this.state === 'pending'){
                this.state = 'rejected'
                this.value = reason
                setTimeout(() => {
                    this.onrejectedCallbacks.forEach(f => f());
                },0)
            }
        }
        try {
            fn(resolve,reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onfulfiled,onrejected){
        function resolvePromise(promise2,res,resolve,reject){
            if(promise2 === res){
                throw new Error('error')
            }
            try {
                if(res instanceof myPromise){
                    res.then(v => {
                         resolvePromise(promise2,v,resolve,reject)
                    },e => reject(e))
                }else{
                    resolve(res)
                }
            } catch (error) {
                reject(error)
            } 
        }
        let promise2 = new myPromise((resolve,reject) => {
            this.onfulfiledCallbacks.push(() => {
                let res = onfulfiled(this.value)
                resolvePromise(promise2,res,resolve,reject)
            })
            this.onrejectedCallbacks.push(() => {
                let res = onrejected(this.reason)
                resolvePromise(promise2,res,resolve,reject)
            })
        })
        return promise2
    }
}
new myPromise((resolve,reject) => {
    resolve(new myPromise((res,rej) => {
        setTimeout(() => {
            res(5)
        },1000)
    }))
}).then(res => {
    console.log(res)
    return 3
}).then(res => {
    console.log(res)
})