import React, { useState } from "react";
import "./Folder.css";

const Folder = ({ explorer, handleInsertNode = () => {} }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  //adding folder

  const addFolder = (e) => {
    if (e.keyCode == 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder)
    return (
      <div className="folder-div">
        <div className="folder-header" onClick={() => setExpand(!expand)}>
          <div className="folder-name">📂{explorer.name}</div>
          <div className="folder-button">
            <button onClick={(e) => handleNewFolder(e, false)}>+📝</button>
            <button onClick={(e) => handleNewFolder(e, true)}>+📂</button>
          </div>
        </div>
        {showInput.visible && (
          <div className="input-div">
            {showInput.isFolder ? "📂" : "📝"}
            <input
              type="text"
              autoFocus
              onKeyDown={addFolder}
              onBlur={(e) => setShowInput({ ...showInput, visible: false })}
            />
          </div>
        )}
        {expand && (
          <div className="folder-body">
            {explorer.items.map((item) => {
              return (
                <Folder
                  explorer={item}
                  key={item.id}
                  handleInsertNode={handleInsertNode}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  else
    return (
      <div className="folder-div">
        <div className="file-div">📝 {explorer.name}</div>
      </div>
    );
};

export default Folder;
