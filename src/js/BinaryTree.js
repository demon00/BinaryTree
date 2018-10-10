class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class BinaryTree {
  constructor(comparator = cmp) {
    this.comparator = comparator;
    this.root = null;
  }

  contains(data) {
    let found = false;
    let node = this.root;

    while (!found && node) {
      if (this.comparator(data, node.data)) {
        node = node.left;
      } else if (data > node.data) {
        node = node.right;
      } else {
        found = true;
      }
    }

    return found;
  };

  insert(str) {
    const newNode = new Node(str);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (this.contains(newNode.data)) {
      throw new Error(`This tree already contains '${newNode.data}'`);
    } else {
      if (this.comparator(newNode.data, node.data)) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          this.insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          this.insertNode(node.right, newNode);
        }
      }
    }

  }

  remove(str) {
    this.root = this.removeNode(this.root, str);
  }

  removeNode(node, key) {

    if (!this.contains(key)) {
      throw new Error(`This tree does not contain '${key}'`);
    } else {

      if (node === null) {
        return null;
      } else if (this.comparator(key.data, node.data)) {
        node.left = this.removeNode(node.left, key);
        return node;
      } else if (key > node.data) {
        node.right = this.removeNode(node.right, key);
        return node;
      } else {

        if (node.left === null && node.right === null) {
          node = null;
          return node;
        }

        if (node.left === null) {
          node = node.right;
          return node;
        } else if (node.right === null) {
          node = node.left;
          return node;
        }

        var aux = this.findMinNode(node.right);
        node.data = aux.data;

        node.right = this.removeNode(node.right, aux.data);
        return node;
      }
    }
  }

  findMinNode(node) {
    if (node.left === null)
      return node;
    else
      return this.findMinNode(node.left);
  }

  height() {
    let height = 0;
    let node = this.root;
    let start = 0;

    function traverse(node, depth) {
      if (!node) return null;

      if (node) {
        depth++;
        height = depth > height ? depth : height;
        traverse(node.left, depth);
        traverse(node.right, depth);
      }

    };

    traverse(node, start);

    return height;
  }

  forEach(process) {

    function inOrder(node) {
      if (node) {
        if (node.left !== null) {
          inOrder(node.left);
        }

        // Call the process method on this node
        process.call(this, node);

        if (node.right !== null) {
          inOrder(node.right);
        }
      }
    }

    inOrder(this.root);
  }

  toArray() {
    let arr = [];

    this.forEach(function(node) {
      arr.push(node.data);
    });

    return arr;
  }

};

let cmp = function(str1, str2) {
  return str1 < str2;
};
