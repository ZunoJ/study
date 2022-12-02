let fs = require('fs')
let path = require('path')
let babelCore = require('@babel/core')
let parse = babelCore.parse
let transformFromAst = babelCore.transformFromAst
let traverse = require('@babel/traverse').default
var id = 0
function createAsset(entry) {
  let file = fs.readFileSync(entry, 'utf-8')
  let ast = parse(file, {
    sourceType: 'module',
  })
  let dependencies = []
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value)
    },
  })
  let code = transformFromAst(ast, null, {
    presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]],
  }).code
  return {
    id: id++,
    dependencies,
    code,
    fileName: entry,
  }
}
function createGraph(entry) {
  let entryAsset = createAsset(entry)
  let queue = [entryAsset]
  let cacheAssets = {} // 缓存解析结果，已解析的模块不用再解析
  function parse(asset) {
    let dirname = path.dirname(asset.fileName)
    asset.mapping = {} // 建立子模块的路径和id键值对
    asset.dependencies.forEach((childpath) => {
      let allChildpath = path.join(dirname, childpath)
      let childAsset = {}
      if (cacheAssets[allChildpath]) {
        childAsset = cacheAssets[allChildpath]
      } else {
        childAsset = createAsset(allChildpath)
      }
      cacheAssets[allChildpath] = childAsset
      asset.mapping[childpath] = childAsset.id
      queue.push(childAsset)
    })
  }
  parse(entryAsset)
  return queue
}
let graph = createGraph('./src/index.mjs')
console.log(graph)
function bundle(graph) {
  let modules = graph.reduce((total, item) => {
    total += `${item.id}:[function(require,module,exports){${
      item.code
    }},${JSON.stringify(item.mapping)}],`
    return total
  }, '')
  let result = `(function(modules){
    let exportsMapping = {}
    function require(id){
        if(exportsMapping[id]){
            return exportsMapping[id]
        }
        let [fn,mapping] = modules[id]
        function localRequire(name){
            return require(mapping[name])
        }
        const module = {exports:{}}
        fn(localRequire,module,module.exports)
        exportsMapping[id] = module.exports
        return module.exports
    }
    require(0)
  }({${modules}}))`
  return result
}
let result = bundle(graph)
fs.unlinkSync('./dist/main.js')
fs.rmdirSync('./dist')
fs.mkdir('./dist', (e) => {
  if (!e) {
    fs.writeFile('./dist/main.js', result, (err) => {
      if (!err) {
        console.log('打包成功')
      }
    })
  }
})
