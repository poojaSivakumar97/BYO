export function addNodeToTree(nodes, newNode) {
  if (newNode.parentId == 0) {
    return [...nodes, newNode];
  }
  return nodes.map((node) => {
    if (node.id == newNode.parentId) {
      return {
        ...node,
        children: node.children ? [...node.children, newNode] : [newNode],
      };
    }

    if (node.children) {
      return { ...node, children: addNodeToTree(node.children, newNode) };
    }
    return node;
  });
}

export function deleteNodeFromTree(nodes, removeNodeId) {
  return nodes
    .filter((node) => node.id != removeNodeId)
    .map((node) => {
      if (node.children) {
        return {
          ...node,
          children: deleteNodeFromTree(node.children, removeNodeId),
        };
      }
      return node;
    });
}
export function findNodeById(root, currNodeId) {
  for (let node of root) {
    if (node.id == currNodeId) return node;

    if (node.children) {
      const result = findNodeById(node.children, currNodeId);
      if (result) return result;
    }
  }
  return null;
}

export function updateTreeNodeDrag(nodes, draggedId, dropId) {
  // 1. Find the node to move
  const nodeToMove = findNodeById(nodes, draggedId);
  if (!nodeToMove) return nodes;
  // 2. Remove it from its current location
  const treeWithoutNode = deleteNodeFromTree(nodes, draggedId);
  // 3. Update its parentId
  const newParentNode = findNodeById(nodes, dropId);
  const newParentNodeId = newParentNode.isFolder
    ? newParentNode.id
    : newParentNode.parentId;
  const updatedNode = {
    ...nodeToMove,
    parentId: newParentNodeId,
  };

  // 4. Add to new parent
  const updatedTree = addNodeToTree(treeWithoutNode, updatedNode);

  return updatedTree;
}
