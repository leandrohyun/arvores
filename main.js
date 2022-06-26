/*
No Cities Skylines, como simulador de cidades reais nos permite criar
estradas para ajudar na locomoção de pessoas e mercadorias.

É possivel encontrar veículos em todos os pontos da cidade, no fluxo 
vai depender das necessidades e da concentração de habitantes em 
determinada área.

A “Árvore Binária” será usada para organizar veículos da cidade, já
que qualquer veículo pode ser acessado e é possível visualizar suas
informações. Os veículos foram divididos em 4 tipos, sendo eles, 
Transporte Público, Comercial, Particular e Serviços.

O transporte particular e o comercial normalmente são gerados de 
modo aleatório no jogo, pois dependem do número de habitantes e 
da produção de mercadorias e matéria prima gerada na cidade que 
precisa ser transportada. Enquanto isso, o transporte público e 
o comercial são gerados de modo manual pois são colocados para 
suprir as necessidades e demandas da cidade.
*/
class Node{
    constructor(key){
        this.key = key;
        this.left = undefined;
        this.right = undefined;
    }
    toString(){
        return `${THIS.KEY}`;
    }
}

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};

function defaultCompare(a,b){
    if (a==b){
    return 0;
}
return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = undefined;
  }
  insert(key) {
    // special case: first key
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else if (node.right == null) {
      node.right = new Node(key);
    } else {
      this.insertNode(node.right, key);
    }
  }
  getRoot() {
    return this.root;
  }
  search(key) {
    return this.searchNode(this.root, key);
  }
  searchNode(node, key) {
    if (node == null) {
      return false;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    }
    return true;
  }
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }
  inOrderTraverseNode(node, callback) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }
  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }
  min() {
    return this.minNode(this.root);
  }
  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }
  max() {
    return this.maxNode(this.root);
  }
  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }
  remove(key) {
    this.root = this.removeNode(this.root, key);
  }
  removeNode(node, key) {
    if (node == null) {
      return undefined;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    }
    // key is equal to node.item
    // handle 3 special conditions
    // 1 - a leaf node
    // 2 - a node with only 1 child
    // 3 - a node with 2 children
    // case 1
    if (node.left == null && node.right == null) {
      node = undefined;
      return node;
    }
    // case 2
    if (node.left == null) {
      node = node.right;
      return node;
    } else if (node.right == null) {
      node = node.left;
      return node;
    }
    // case 3
    const aux = this.minNode(node.right);
    node.key = aux.key;
    node.right = this.removeNode(node.right, aux.key);
    return node;
  }
}

// Insert

const transportePublico = new BinarySearchTree();
transportePublico.insert(10);
transportePublico.insert(12);
transportePublico.insert(6);
transportePublico.insert(3);
transportePublico.insert(9);
transportePublico.insert(14);

const comercial = new BinarySearchTree();
comercial.insert(23);
comercial.insert(15);
comercial.insert(29);
comercial.insert(31);
comercial.insert(12);
comercial.insert(3);

const particular = new BinarySearchTree();
particular.insert(15);
particular.insert(17);
particular.insert(19);
particular.insert(11);
particular.insert(20);

const serviços = new BinarySearchTree();
serviços.insert(20);
serviços.insert(11);
serviços.insert(21);
serviços.insert(27);
serviços.insert(55);
serviços.insert(6);
serviços.insert(2);

console.log(transportePublico);
console.log(comercial);
console.log(particular);
console.log(serviços);

//Search

console.log(serviços.search(27));
console.log(serviços.search(1));

/* InOrderTraverse

console.log(serviços.inOrderTraverse(20));

// preOrderTraverse
console.log(comercial.preOrderTraverse(23));

// postOrderTraverse
console.log(transportePublico.postOrderTraverse(10));
*/

//Min

console.log(serviços.min());

//Max

console.log(particular.max());

//REMOVE

console.log(transportePublico);
transportePublico.remove(9);
console.log(transportePublico);

