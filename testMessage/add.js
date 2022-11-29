function fn(){
    let result = []
    function add(){
        result = [...result,...arguments]
        return add
    }
    add.toString = () => result.reduce((total,item) => {
        total= total + item
        return total
    },0)
    return add
}
let add = fn()

function randomList(list){
    return list.sort(function(a,b){
        return Math.random() - 0.5
    })
}
console.log(randomList([1,2,3,4,5,6,7]))