import "./App.css";
import Folder from "./component/Folder";
import explorer from "./assets/data";
import useTraverseTree from "./hooks/useTraverse";
import { useState } from "react";

function App() {
  const { insertNode } = useTraverseTree();

  const [data, setData] = useState(explorer);

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(data, folderId, item, isFolder);
    setData(finalTree);
  };
  return (
    <div className="app">
      <div className="content">
        <Folder explorer={data} handleInsertNode={handleInsertNode} />
      </div>
    </div>
  );
}

export default App;
