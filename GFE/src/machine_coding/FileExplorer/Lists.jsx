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
  currNode,
  dndupdate,
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
    if (e.key == "Enter") {
      handleExpand(node.name);
    }
  }
  function handleDragStart(e, node) {
    // when dragging begins
    e.stopPropagation();
    e.dataTransfer.setData(
      "application/node-id",
      JSON.stringify({ id: node.id })
    );
  }
  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e, targetId) {
    e.preventDefault();
    e.stopPropagation();
    // add the logic for changing manipulating tree data
    const dragId = JSON.parse(e.dataTransfer.getData("application/node-id"));
    dndupdate(dragId.id, targetId);
  }
  return (
    <div className={styles.container}>
      {listNodes.map((node) => (
        <div
          key={node.id}
          className={styles.folder}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, node.id)}
        >
          {node.isFolder && (
            <span onClick={() => handleExpand(node.name)}>
              {isExpanded[node.name] ? "🔽" : "▶️"}
            </span>
          )}
          <span
            draggable={true}
            onDragStart={(e) => {
              handleDragStart(e, node);
            }}
            tabIndex={0}
            onClick={() => updateNodeSelect(node)}
            onKeyDown={(e) => handleKeyDown(e, node)}
            // className={node.id === currNode && styles["selectedNode"]}
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
              currNode={currNode}
              dndupdate={dndupdate}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Lists;
