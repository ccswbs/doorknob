const { toTitleCase } = require("./to-title-case.js")

class SlugTreeNode {
  constructor(part, name) {
    this.part = part ?? ""
    this._children = {}
    this._isLeaf = true
    this._parent = null
    this._slug = ""
    this._name = name ?? toTitleCase(this.part.replaceAll("-", " "))
  }
  add(...nodes) {
    for (let node of nodes) {
      if (node instanceof SlugTreeNode) {
        this._children[node.part] = node
        this._isLeaf = false
        node._parent = this
        node._slug = this.part === "" ? node.part : `${this._slug}/${node.part}`
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
  get slug() {
    return this._slug
  }
  get name() {
    return this._name
  }
}

class SlugTree {
  constructor() {
    this.root = new SlugTreeNode()
    this._stack = []
  }
  addSlugs(...slugs) {
    for (const slug of slugs) {
      const parts = typeof slug === "string" ? slug.split("/") : slug.slug.split("/")
      let current = this.root

      for (const part of parts) {
        let next = current.getChild(part)

        if (!(next instanceof SlugTreeNode) && part !== "") {
          const newNode = new SlugTreeNode(part, typeof slug === "object" && slug.name)
          current.add(newNode)
          next = newNode
        }

        current = next
      }
    }
  }
  getNode(...parts) {
    let current = this.root
    for (const part of parts) {
      current = current.getChild(part)
      if (!current) {
        return null
      }
    }
    return current
  }
  stringify(space = 0) {
    return JSON.stringify(this.root, ["part", "children"], space)
  }
  traverse(callback) {
    if (typeof callback !== "function") {
      throw new TypeError("callback must be a function")
    }

    const _traverse = (node, stack) => {
      const isWildcard = node.part === "*"

      if (isWildcard) {
        for (const sibling of node.parent?.children) {
          if (sibling !== node) {
            for (const child of node.children) {
              this._stack.push({ node: sibling, wildcard: true })
              _traverse(child, this._stack)
              this._stack.pop()
            }
          }
        }
      } else {
        for (const child of node.children) {
          this._stack.push(node)
          _traverse(child, this._stack)
          this._stack.pop()
        }
      }

      callback(node, stack)
    }

    _traverse(this.root, this._stack)
  }
}

module.exports = {
  SlugTree,
  SlugTreeNode,
}
