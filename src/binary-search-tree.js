const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    function addValue(node, value) {
      if (!node) {
        return new Node(value);
      }

      if (node.data === value) {
        return node;
      }

      if (value < node.data) {
        node.left = addValue(node.left, value);
      } else {
        node.right = addValue(node.right, value);
      }
      return node;
    }
    this.tree = addValue(this.tree, data);
  }

  has(data) {
    function search(node, value) {
      if (!node) {
        return false;
      }

      if (node.data === value) {
        return true;
      }

      if (node.data > value) {
        return search(node.left, value);
      } else {
        return search(node.right, value);
      }
    }

    return search(this.tree, data);
  }

  find(data) {
    function findNode(node, value) {
      if (!node) {
        return null;
      }

      if (node.data === value) {
        return node;
      }

      if (node.data > value) {
        return findNode(node.left, value);
      } else {
        return findNode(node.right, value);
      }
    }

    return findNode(this.tree, data);
  }

  remove(data) {
    function removeNode(node, value) {
      if (!node) {
        return null;
      }

      if (node.data > value) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (node.data < value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;

        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    }

    this.tree = removeNode(this.tree, data);
  }

  min() {
    if (!this.tree) {
      return;
    }

    let node = this.tree;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.tree) {
      return;
    }

    let node = this.tree;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
};
