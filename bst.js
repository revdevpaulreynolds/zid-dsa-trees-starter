// Problem: Given an array containing a post-order traversal of a BST,
// turn it back to a valid BST

class Bst {
    constructor(key) {
      this.key = key;
      this.left = null;
      this.right = null;
    }
  }
  
  function postToBst(arr, start=0, end=arr.length) {
      if (start === end) return null;
      const rootValue = arr[end - 1];
      let i = start;
      while (arr[i] < rootValue) {
          i++;
      }
      const node = new Bst(rootValue);
      node.left = postToBst(arr, start, i);
      node.right = postToBst(arr, i, end - 1);
      return node;
  }

//   function postToBst(arr) {
//     // return BST given a post-order traversal array
//     // Recursive method from Dennis
//     // if (!arr.length) return null;

//     // const rootValue = arr[arr.length-1];
//     // const lessThan = arr.filter((item, index) => item <= rootValue && index < arr.length-1);
//     // const greaterThan = arr.filter((item, index) => item >= rootValue && index < arr.length-1);


//     // let node = new Bst(rootValue); // Construct BST
//     // node.left = postToBst(lessThan); // Recursively construct left side
//     // node.right = postToBst(greaterThan); // Recursively construct right side

//     // return node;

//     // Without using extra memory

//     // My sad attempt
//     // let currentBst = bst;
//     // bst.key = arr[arr.length - 1];
//     // for (let i = arr.length - 2; i >= 0; i--) {
//     //     let newBst = new Bst();
//     //     newBst.key = arr[i];
//     //     if (newBst.key < currentBst.key) {
//     //         currentBst.left = newBst;
//     //     } else {
//     //         currentBst.right = newBst;
//     //     }
//     //     currentBst = newBst;

//     // }
//     // return bst;
//   }
  
  // console.dir with depth set to null stops Node from truncating the output
  console.dir(postToBst([8, 12, 10, 16, 25, 20, 15]), { depth: null });
  console.dir(postToBst([]), { depth: null });