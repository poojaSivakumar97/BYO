export function addNodeToTree(nodes, newNode) {
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
