import {s} from './child2.mjs'
import b,{add as plus} from './child1.mjs'
console.log(s)
console.log(b)
console.log(plus)

function fn(){
    return (() => {
        return this.o
    })()
}
let a = () => {
    console.log(this)
}
var p = {
    o:2
}
a()