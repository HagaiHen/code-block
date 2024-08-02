import React from "react";
import Button from "react-bootstrap/Button";
import useGetCodeBlock from "../../hooks/useGetCodeBlock";
import "./CodeBlockEditor.css"; // Import the CSS file

const CodeBlockEditor = ({ currCodeBlock, setCurrCodeBlock, handleUpdate, setEditMode }) => {
  const { codeBlock, getCodeBlock } = useGetCodeBlock();

  const handleCancel = async () => {
    setEditMode(false);
    const res = await getCodeBlock(currCodeBlock._id);
    if (currCodeBlock.code !== res.code) {
      setCurrCodeBlock(res);
    }
  };

  return (
    <div className="code-block-editor">
      <textarea
        value={currCodeBlock.code}
        onChange={(e) =>
          setCurrCodeBlock({ ...currCodeBlock, code: e.target.value })
        }
        className="code-block-editor-textarea"
      />
      <div className="code-block-editor-buttons">
        <Button onClick={handleUpdate}>Update Code</Button>
        <Button variant="danger" onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default CodeBlockEditor;