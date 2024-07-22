import React from "react";
import Highlight from "react-highlight";
import "highlight.js/styles/default.css";

const CodeBlockViewer = ({ code, setEditMode }) => {
  return (
    <div onClick={() => setEditMode(true)}>
      <Highlight className="language-javascript">
        {code}
      </Highlight>
    </div>
  );
};

export default CodeBlockViewer;