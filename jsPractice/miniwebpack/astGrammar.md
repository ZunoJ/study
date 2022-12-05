ast 抽象语法树语法

# 1.初始无代码 js 类型为 program，body 为空

{
type:'program',
body: []
}

# 2 代码为let a = 1,此为一个变量的声明，声明的变量标识符为a,字面量为1

{
type:'program',
body: [{
    type:'VariableDeclaration',
    kind: 'let' // 声明类型,
    declarations: [ // 等号操作符
        {
            type: 'VariableDeclarator', // 变量声明器的意思
            id:{
                type:'Identifier', // 标识符
                name: a 
            },
            init:{ // 变量初始化
                type: 'literal', // 字面量
                value: 1
            }
        }
    ] // 声明的变量，是个数组是因为一个let可能声明多个变量
}]
}

# 2 代码为function a(b,c){return b + c},此为一个函数的声明，有两个参数parmas[a,b],有一个返回语句 a + b
{
    type:'program',
    body: [
        {
            type: 'FunctionDeclaration', // 函数声明
            id:{
                type:'Identifier',
                name: a
            },
            params:[
                {
                    type: 'Identifier',
                    name: b
                },
                {
                    type: 'Identifier',
                    name: c
                }
            ],
            body:{
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ReturnStatement',
                        argument: {
                            type: 'BinaryExpression',
                            operation: '+',
                            left: {
                                type: 'Identifier',
                                name: b
                            },
                            right: {
                                type: 'Identifier',
                                name: c
                            }
                        }
                    }
                ]
            }
        }
    ]
}
