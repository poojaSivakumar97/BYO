import React, { useState } from "react";
import styles from "./File.module.css";
import Input from "./Input";

const Lists = ({
  listNodes,
  fileName,
  setFileName,
  addNode,
  setAddNode,
  setCurrNode,
  parentNodeTobeAdded,
  handleAddNode,
  handleDeleteNode,
}) => {
  // logic for expand and collapse
  const [isExpanded, setIsExpanded] = useState({});
  function handleExpand(nodeName) {
    setIsExpanded((prev) => ({
      ...prev,
      [nodeName]: !prev[nodeName],
    }));
  }
  function updateNodeSelect(node) {
    // update the node for delete node also
    setCurrNode(node);
    handleExpand(node.name);
  }
  function handleKeyDown(e, node) {
    if (e.key == "Delete") {
      handleDeleteNode(node);
    }
  }
  return (
    <div>
      {listNodes.map((node) => (
        <div key={node.id} className={styles.folder}>
          {node.isFolder && (
            <span onClick={() => handleExpand(node.name)}>
              {isExpanded[node.name] ? "🔽" : "▶️"}
            </span>
          )}
          <span
            tabIndex={0}
            onClick={() => updateNodeSelect(node)}
            onKeyDown={(e) => handleKeyDown(e, node)}
          >
            {node.name}
          </span>
          {addNode && node.id === parentNodeTobeAdded && (
            <Input
              fileName={fileName}
              setFileName={setFileName}
              setAddNode={setAddNode}
              handleAddNode={handleAddNode}
            />
          )}
          {isExpanded[node.name] && node.isFolder && (
            <Lists
              listNodes={node.children}
              fileName={fileName}
              setFileName={setFileName}
              addNode={addNode}
              setAddNode={setAddNode}
              setCurrNode={setCurrNode}
              parentNodeTobeAdded={parentNodeTobeAdded}
              handleAddNode={handleAddNode}
              handleDeleteNode={handleDeleteNode}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Lists;
