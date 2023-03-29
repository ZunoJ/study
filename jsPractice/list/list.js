class Node {
  constructor(content, next) {
    this.content = content
    this.next = next || null
  }
}

class List {
  constructor() {
    this.length = 0
    this.head = null
  }

  addNode(content, next) {
    let node = new Node(content, next)
    if (this.head) {
      let item = this.head
      while (item.next) {
        item = item.next
      }
      item.next = node
    } else {
      this.head = node
    }
    this.length++
  }

  searchNode(content) {
    let item = this.head
    while (item) {
      if (item.content === content) {
        return item
      }
      item = item.next
    }
  }

  insertNode(content, prevIndex) {
    if (!this.length) {
      return
    }
    let node = new Node(content)
    let item = this.head
    while (item.next) {
      if (prevIndex === item.content) {
        let next = item.next
        item.next = node
        node.next = next
        this.length++
        return
      }
      item = item.next
    }
    if (prevIndex === item.content) {
      let next = item.next
      item.next = node
      node.next = next
      this.length++
      return
    }
  }

  deleteNode(content) {
    let item = this.head
    let prev = this.head
    if (!this.head) return
    while (item) {
      if (item.content === content) {
        item = item.next
        prev.next = item
      } else {
        prev = item
        item = item.next
      }
    }
  }
}

let list1 = new List()
let list2 = new List()
list1.addNode(1)
list1.addNode(3)
list1.addNode(6)
list2.addNode(2)
list2.addNode(5)
list2.addNode(7)
function mergeList(l1, l2) {
  if (l1 === null) {
    return l2
  }
  if (l2 === null) {
    return l1
  }
  if (l1.content > l2.content) {
    l2.next = mergeList(l1, l2.next)
    return l2
  } else {
    l1.next = mergeList(l1.next, l2)
    return l1
  }
}
let list3 = mergeList(list1.head, list2.head)
// let item = list3
// while (item) {
//   console.log(item.content)
//   item = item.next
// }

function isCircleList(list) {
  let fastIndex = list.next.next,
    slowindex = list.next
  while (fastIndex.content !== slowindex.content) {
    if (!fastIndex || !fastIndex.next) {
      return false
    }
    fastIndex = fastIndex.next.next
    slowindex = slowindex.next
  }
  return true
}
let list4 = new List()
list4.addNode(1)
list4.addNode(3)
list4.addNode(6)
// list4.addNode(4, new Node(3, 6))

// console.log(isCircleList(list4.head))

var reverseList = function (head) {
  if (!head || !head.next) return head
  function reverse(prev, curr) {
    if (!curr) {
      console.log(prev)
      return prev
    }
    let next = curr.next
    curr.next = prev
    prev = curr
    curr = next
    return reverse(prev, curr)
  }
  return reverse(null, head)
}
let list5 = reverseList(list4.head)
console.log(list5)
let item = list5.head
while (item) {
  console.log(item)
  item = item.next
}
