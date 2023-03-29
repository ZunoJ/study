let root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]

// 数组存储法
function hasPathSum(root, targetSum) {
  for (let index = 0; index < root.length; index++) {
    const item = root[index]
    let paths = [index]
    let pathIndex = Math.floor(index / 2)
    let res = 0
    while (pathIndex && pathIndex > 0) {
      paths.push(pathIndex)
      pathIndex = Math.floor(pathIndex / 2)
    }
    for (const i of paths) {
      res += parseInt(item)
    }
    if (res === parseInt(targetSum)) {
      return true
    }
  }
  return false
}
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
// 递归
function nodePathSum(root, targetSum) {
  if (root === null) {
    return false
  }
  if (root.val === targetSum) {
    return true
  }
  return (
    nodePathSum(root.left.val, targetSum - root.val) ||
    nodePathSum(root.right.val, targetSum - root.val)
  )
}
// 遍历
function dfsNodePathSum(root, targetSum) {
  if (root === null) {
    return false
  }
  let queue1 = [root]
  let queue2 = [root.val]
  while (queue1.length) {
    let node = queue1.pop()
    let val = queue2.pop()
    if (node.left === null && node.right === null && val === targetSum) {
      return true
    }
    if (node.left) {
      queue1.push(node.left)
      queue2.push(val + node.left.val)
    }
    if (node.right) {
      queue1.push(node.right)
      queue2.push(val + node.right.val)
    }
  }
  return false
}
console.log(hasPathSum(root, 22))
