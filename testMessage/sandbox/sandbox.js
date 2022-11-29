// proxy + with + iframe直接
function withCode(code){
    let sandFunction = new Function('sandboxObj',`with(sandboxObj){${code}}`)
    return sandFunction
}
function evalCode(sandboxObj,code){
    code = `with(sandboxObj){${code}}` 
    eval(code)
}
class sandboxObj{
    constructor(whiteList,blackList){
        let myIframe = document.createElement('iframe',{url:"about:blank"})
        myIframe.style.display = 'none'
        document.body.appendChild(myIframe)
        let sandboxWindow = myIframe.contentWindow
        return new Proxy(sandboxWindow,{
            has:function (obj,prop) {
                if(blackList.includes(prop)){ // 黑名单
                    throw new Error("你的思想很危险")
                }
                if(whiteList.includes(prop)){ // 白名单
                    return false // 去外层作用域查
                }
                let isHas = Object.hasOwnProperty.call(obj,prop)
                if(isHas){
                    return isHas
                }else{
                    throw new Error("你的思想很危险")
                }
            }
        })
    }
}

let code = `
    console.log(this.alert === alert)
`
let sandboxObj1 = new sandboxObj(['alert'],[])
evalCode.call(sandboxObj1,sandboxObj1,code)
// withCode(code).call(sandboxObj1,sandboxObj1)