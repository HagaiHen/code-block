import React from "react";
import Highlight from "react-highlight";
import "highlight.js/styles/default.css";
import "./CodeBlockViewer.css"; // Import the CSS file

const CodeBlockViewer = ({ code, setEditMode }) => {
  return (
    <div className="code-block-viewer" onClick={() => setEditMode(true)}>
      <Highlight className="language-javascript">
        {code}
      </Highlight>
    </div>
  );
};

export default CodeBlockViewer;