const Queue = require("./Queue");

class BinarySearchTree {
  // your code here

  //example from class
  constructor(key = null, value = null, parent = null) {
    this.key = key,
    this.value = value,
    this.parent = parent,
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    // if the tree is empty or missing root node 
    // key is inserted as the root
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key){
      // if tree exists, we want to compare key
      // if key is smaller than current key, insert to left
      if (this.left == null) {
        // insert left tree if node is empty to left
        this.left = new BinarySearchTree(key, value, this)
      } else {
        // otherwise there is existing left child
        // recursively call insert() method so node is added further down.
        this.left.insert(key, value);
      }
    } else {
      // Do the same thing but for right side
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      // searched whole tree and didn't find the key
      throw new Error("Key Not Found");
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      // If the node only has a left child,
      // replace with its left child
      else if (this.left) {
        this._replaceWith(this.left);
      }
      // node has only right child, replace with right child
      else if (this.right) {
        this._replaceWith(this.right);
      }
      // If it has no children, remove references
      else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Not Found');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  dfsInOrder(values = []) {
    // First process left node recursively
    if (this.left) {
      values = this.left.dfsInOrder(values);
    }

    // Next, process current node
    values.push(this.value);

    // Process right node recursively
    if (this.right) {
      values = this.right.dfsInOrder(values);
    }

    return values;
  }

  dfsPreOrder(values = []) {
    // First process current node
    values.push(this.value);

    // Process left node recursively
    if (this.left) {
      values = this.left.dfsPreOrder(values);
    }

    // Process right node recursively
    if (this.right) {
      values = this.right.dfsPreOrder(values);
    }
    return values;
  }

  dfsPostOrder(values = []) {
    // First process left node recursively
    if (this.left) {
      values = this.left.dfsPostOrder(values);
    }

    // Process right node recursively
    if (this.right) {
      values = this.right.dfsPostOrder(values);
    }

    values.push(this.value);
    return values;
  }

  bfs(tree, values = []) {
    const queue = new Queue();
    queue.enqueue(tree); // Start traversal at tree & add tree node to queue
    let node = queue.dequeue(); // Remove from queue
    while (node) {
      values.push(node.value); // Add value from queue to array
      if (node.left) {
        queue.enqueue(node.left); // Add left child
      }
      if (node.right) {
        queue.enqueue(node.right); // Add right child
      }
      node = queue.dequeue();
    }
    return values;
  }

}



const bst = new BinarySearchTree();

bst.insert(5, 5)
