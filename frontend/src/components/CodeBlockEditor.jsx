import React from "react";
import Button from "react-bootstrap/Button";
import useGetCodeBlock from "../hooks/useGetCodeBlock";

const CodeBlockEditor = ({ currCodeBlock, setCurrCodeBlock, handleUpdate, setEditMode }) => {
  const { codeBlock, getCodeBlock } = useGetCodeBlock();
  const handleCancel = async () => {
    setEditMode(false);
    const res = await getCodeBlock(currCodeBlock._id)
    if (currCodeBlock.code !== res.code) {
      setCurrCodeBlock(res);
    }
  };
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
        <Button variant="danger" onClick={handleCancel}> Cancel </Button>
      </div>
    </div>
  );
};

export default CodeBlockEditor;