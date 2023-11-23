class SlugTreeNode {
  constructor(part) {
    this.part = part ?? ""
    this._children = {}
    this._isLeaf = true
    this._parent = null
  }
  add(...nodes) {
    for (let node of nodes) {
      if (node instanceof SlugTreeNode) {
        this._children[node.part] = node
        this._isLeaf = false
        node._parent = this
      }
    }
  }
  getChild(part) {
    return this._children[part] ?? null
  }
  get children() {
    return Object.values(this._children)
  }
  get isLeaf() {
    return this._isLeaf
  }
  get part() {
    return this._part
  }
  set part(val) {
    this._part = val
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-*]/g, "")
      .replace(/^-+|-+$/g, "")
  }
  get parent() {
    return this._parent
  }
}

class SlugTree {
  constructor() {
    this.root = new SlugTreeNode()
    this._stack = [];
  }
  addSlugs(...slugs) {
    for (const slug of slugs) {
      const parts = slug.split("/")
      let current = this.root

      for (const part of parts) {
        let next = current.getChild(part)

        if (!(next instanceof SlugTreeNode)) {
          const newNode = new SlugTreeNode(part)
          current.add(newNode)
          next = newNode
        }

        current = next
      }
    }
  }
  stringify(space = 0) {
    return JSON.stringify(this.root, ["part", "children"], space)
  }
  traverse(callback) {
    if (typeof callback !== "function") {
      throw new TypeError("callback must be a function")
    }
    
    const _traverse = (node, stack) => {
      const isWildcard = node.part === '*';
      
      if (isWildcard) {
        for(const sibling of node.parent?.children) {
          if(sibling !== node) {
            for(const child of node.children) {
              this._stack.push({ node: sibling, wildcard: true });
              _traverse(child, this._stack)
              this._stack.pop();
            }
          }
        }
      } else {
        for (const child of node.children) {
          this._stack.push(node);
          _traverse(child, this._stack)
          this._stack.pop();
        }
      }
      
      callback(node, stack);
    }
    
    _traverse(this.root, this._stack)
  }
}

module.exports = {
  SlugTree,
  SlugTreeNode
}