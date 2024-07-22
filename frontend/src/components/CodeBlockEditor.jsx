import React from "react";
import Button from "react-bootstrap/Button";

const CodeBlockEditor = ({ currCodeBlock, setCurrCodeBlock, handleUpdate, setEditMode }) => {
  return (
    <div style={{ flexDirection: "column" }}>
      <textarea
        value={currCodeBlock.code}
        onChange={(e) =>
          setCurrCodeBlock({ ...currCodeBlock, code: e.target.value })
        }
        style={{
          width: "150vh",
          height: "70vh",
          whiteSpace: "pre",
          fontFamily: "monospace",
          boxSizing: "border-box",
        }}
      />
      <div>
        <Button onClick={handleUpdate}> Update Code </Button>
        <Button variant="danger" onClick={() => setEditMode(false)}> Cancel </Button>
      </div>
    </div>
  );
};

export default CodeBlockEditor;