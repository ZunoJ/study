function a(){
    let count = 0
    return function(){
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve(count++)
            },1000)
        })
        
    }
}
let c = a()
function* g(){
    let data1 = yield c()
    let data2 = yield c()
    let data3 = yield c()
}
function generatorToAsync(fn){
    return function(){
        let gen = fn()
        return new Promise((resolve,reject) => {
            function step(v){
                let {done,value} = gen.next(v)
                if(done){
                    resolve(v)
                }else{
                    Promise.resolve(value).then(v => {
                        console.log(v)
                        step(v)
                    },e => reject(e))
                }
            }
            step()
        })
    }
}
var j = generatorToAsync(g)
j()