// function singlton(name){
//     this.name = name
// }
// singlton.instance = null
// singlton.getInstance = function(){
//     if(singlton.instance){
//         return singlton.instance
//     }else{
//         singlton.instance = new singlton(...arguments)
//         return singlton.instance
//     }
// }
// let a = singlton.getInstance('a')
// let b = singlton.getInstance('b')
let proxySinglton = (function (){
    let instance = null
    return function singlton(name){
        if(instance){
            return instance
        }
        this.name = name
        return instance = this
    }
})()
let a = new proxySinglton('a')
let b = new proxySinglton('b')
console.log(a)
console.log(b)
console.log(a === b)