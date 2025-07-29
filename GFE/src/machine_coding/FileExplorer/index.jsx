import React, { useState } from "react";
import json from "./data.json";
import Lists from "./Lists";
import styles from "./File.module.css";
import {
  addNodeToTree,
  deleteNodeFromTree,
  updateTreeNodeDrag,
  findNodeById,
} from "./utils/func";

export default function FileExplorer() {
  const [lists, setLists] = useState(json);
  //   have all state here for the new node to be added as we add to list here
  const [fileName, setFileName] = useState("");
  const [addNode, setAddNode] = useState(false);
  const [currNode, setCurrNode] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(0);

  function parentNodeForAddFolder() {
    if (currNode?.isFolder) {
      setSelectedNodeId(currNode.id);
    } else {
      setSelectedNodeId(currNode.parentId);
    }
  }
  function handleAddNode(value) {
    console.log(value);
    const newNode = {
      id: Date.now(),
      name: value,
      isFolder: fileType === "folder",
      parentId: selectedNodeId,
      ...(fileType === "folder" ? { children: [] } : {}),
    };
    if (selectedNodeId == 0) {
      setLists((prevLists) => [...prevLists, newNode]);
    }
    setLists((prevLists) => addNodeToTree(prevLists, newNode));
  }
  function handleDeleteNode(removeNode) {
    const response = confirm(`Do you want to delete ${removeNode.name}`);
    if (response) {
      setLists((prevLists) => deleteNodeFromTree(prevLists, removeNode.id));
    }
  }
  function dndupdate(dragId, dropId) {
    setLists((prevLists) => updateTreeNodeDrag(prevLists, dragId, dropId));
  }

  return (
    <div>
      <h1>FileExplorer</h1>
      <div className={styles.iconContainer}>
        {/* have icon for add and delte folder, file */}
        <span
          className={styles.icon}
          onClick={() => {
            setAddNode(true);
            parentNodeForAddFolder();
            setFileType("folder");
          }}
        >
          📁
        </span>
        <span
          className={styles.icon}
          onClick={() => {
            setAddNode(true);
            parentNodeForAddFolder();
            setFileType("file");
          }}
        >
          📄
        </span>
        <span
          className={styles.icon}
          onClick={() => handleDeleteNode(currNode)}
        >
          🗑️
        </span>
      </div>
      <Lists
        listNodes={lists}
        setFileName={setFileName}
        fileName={fileName}
        addNode={addNode}
        setAddNode={setAddNode}
        setCurrNode={setCurrNode}
        parentNodeTobeAdded={selectedNodeId}
        handleAddNode={handleAddNode}
        handleDeleteNode={handleDeleteNode}
        currNode={currNode}
        dndupdate={dndupdate}
      />
    </div>
  );
}
