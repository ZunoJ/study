var babelCore = require("@babel/core");
var fs = require("fs");
var path = require("path");
var traverse = require('@babel/traverse').default
console.log(traverse)
transformFromAst = babelCore.transformFromAst;
parse = babelCore.parse;
let ID = 0;
function createAsset(filename) {
  // 文件路径
  let file = fs.readFileSync(filename, "utf-8");
  let ast = parse(file, {
    sourceType: "module",
  });
  const dependencies = []
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
        // 查找import节点
        dependencies.push(node.source.value);
    }
  });
  let code = transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })
  console.log(ast);
  console.log(dependencies)
  console.log(code)
}
createAsset("./src/index.mjs");
