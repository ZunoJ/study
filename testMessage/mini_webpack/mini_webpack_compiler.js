var babelCore = require('@babel/core')
var fs = require('fs')
var path = require('path')
var traverse = require('@babel/traverse').default
console.log(traverse)
transformFromAst = babelCore.transformFromAst
parse = babelCore.parse
let ID = 0
function createAsset(filename) {
  // 文件路径
  // 处理文件的一个函数，将代码用babel-parse转化为ast语法树，
  // 并且通过babel - traverse找到ast语法树所有import节点, 放入依赖数组，
  // 将代码处理用transformast预设babel/preset-env给处理了,返回处理后的代码 id 依赖 文件路径

  let file = fs.readFileSync(filename, 'utf-8')
  let ast = parse(file, {
    sourceType: 'module',
  })
  const dependencies = []
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      // 查找import节点
      dependencies.push(node.source.value)
    },
  })
  let { code } = transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  })
  return {
    id: ++ID,
    dependencies,
    code,
    filename,
  }
}
// 创建依赖图谱
// 1. 先解析入口文件
// 2. 使用一个数组接受所有模块
// 3. 从入口文件递归解析所有依赖项，建立依赖图谱
function createGraph(entry) {
  let main = createAsset(entry)
  let mainAssets = [main]
  // for (const asset of mainAssets) {
  //   asset.mapping = {} // 获取这个模块所在的目录
  //   const dirname = path.dirname(asset.filename)
  //   asset.dependencies.forEach((childPath) => {
  //     // childPath是相对主模块的路径
  //     let allchildpath = path.join(dirname, childPath)
  //     let child = createAsset(allchildpath)
  //     asset.mapping[allchildpath] = child.id
  //     mainAssets.push(child)
  //   })
  // }
  function handleAsset(main) {
    main.mapping = {}
    let dirname = path.dirname(main.filename)
    main.dependencies.forEach((childpath) => {
      let allChildpath = path.join(dirname, childpath)
      let child = createAsset(allChildpath)
      main.mapping[childpath] = child.id
      mainAssets.push(child)
      handleAsset(child)
    })
  }
  handleAsset(main)
  return mainAssets
}
function bundle(graph) {
  let modules = ''
  graph.forEach((mod) => {
    modules += `${mod.id}: [
      function (require, module, exports) { ${mod.code} },
      ${JSON.stringify(mod.mapping)},
    ],`
  })
  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];
        function localRequire(name) {
          return require(mapping[name]);
        }
        const module = { exports : {} };
        fn(localRequire, module, module.exports); 
        return module.exports;
      }
      require(0);
    })({${modules}})
  `
  return result
}
let graph = createGraph('./src/index.mjs')
console.log(graph)
const result = bundle(graph)

// ⬅️ 创建dist目录，将打包的内容写入main.js中
fs.mkdir('dist', (err) => {
  if (!err)
    fs.writeFile('dist/main.js', result, (err1) => {
      if (!err1) console.log('打包成功')
    })
})
