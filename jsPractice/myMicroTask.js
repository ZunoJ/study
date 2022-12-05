function useMatationObserver(f) {
  let text = 0
  let observer = new MutationObserver(f)
  let node = document.createTextNode('')
  observer.observe(node, { characterData: true })
  return function () {
    node.textContent = text = ++text % 2
  }
}
