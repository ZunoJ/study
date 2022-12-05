let generator = require('@babel/generator') // 将 AST 抽象语法树 ------->>> js 代码
let parser = require('@babel/parser') // 将 js 代码 ------->>> AST 抽象语法树
let traverse = require('@babel/traverse') // 递归遍历AST 抽象语法树
let types = require('@babel/types') // 具体的 AST 节点进行进行修改

function myJsCompile(code) {
  // 将代码编译称ast抽象语法树
  let astTree = parser.parse(code)
  const visitor = {
    FunctionDeclaration(path) {
      if (
        path.node.type === 'FunctionDeclaration' &&
        path.node.id.name === 'a'
      ) {
        path.node.id = types.identifier('xxxx')
      }
    },
    CallExpression(path) {
      let { callee } = path.node

      if (
        path.node.type === 'CallExpression' &&
        callee.object.name === 'console' &&
        callee.property.name === 'log'
      ) {
        const funcPath = path.findParent((p) => {
          return p.isFunctionDeclaration()
        })
        // 取函数的名称
        const funcName = funcPath.node.id.name
        path.node.arguments.unshift(types.stringLiteral(funcName))
      }
    },
  }
  traverse.default(astTree, visitor)

  let result = generator.default(astTree, {}, code)

  console.log(result)
}
let code = `
function a(){
    console.log('data')
}
`
console.log(myJsCompile(code))
