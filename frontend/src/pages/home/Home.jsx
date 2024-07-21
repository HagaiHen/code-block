import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import useGetCodeBlocks from "../../hooks/useGetCodeBlocks.js";
import { Container } from "./styles.jsx";
import { useAuthContext } from "../../context/useAuthContext.jsx";
import Highlight from "react-highlight";
import "highlight.js/styles/default.css";
import useUpdateCodeBlack from "../../hooks/useUpdateCodeBlock.js";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const { codeBlocks, setCodeBlocks } = useGetCodeBlocks();
  const { authUser } = useAuthContext();
  const [placeholder, setPlaceholder] = useState("Choose Code Block");
  const [currCodeBlock, setCurrCodeBlock] = useState(null);
  const { updateCodeBlock } = useUpdateCodeBlack();
  const [editMode, setEditMode] = useState(false);

  const handleSelect = (e) => {
    setPlaceholder(e.title);
    setCurrCodeBlock(e);
  };

  const handleUpdate = async () => {
    if (authUser._id === currCodeBlock?.mentorId) {
      console.log("You do not have permission to update this code block.");
      return;
    }
    setEditMode(!editMode);
    try {
      await updateCodeBlock(currCodeBlock);
      setCodeBlocks(
        codeBlocks.map((cb) =>
          cb._id === currCodeBlock._id ? currCodeBlock : cb
        )
      );
    } catch (error) {
      console.log("Error updating code block:", error.message);
      toast.error("Failed to update code block");
    }
  };

  return (
    <Container>
      <h3>Choose Code Block: </h3>

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {placeholder}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {codeBlocks.map((codeBlock, idx) => (
            <Dropdown.Item
              key={codeBlock._id}
              onClick={() => handleSelect(codeBlock)}
            >
              {" "}
              {codeBlock.title}{" "}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {currCodeBlock && (
        <div>
          {currCodeBlock.mentorId !== authUser._id ? (
            <h5> Edit premission </h5>
          ) : (
            <h5> View premission </h5>
          )}
          {currCodeBlock.mentorId !== authUser._id && editMode ? (
            <div style={{ flexDirection: "column" }}>
              <textarea
                value={currCodeBlock.code}
                onChange={(e) =>
                  setCurrCodeBlock({ ...currCodeBlock, code: e.target.value })
                }
                rows="20"
                cols="150"
                style={{ whiteSpace: "pre", fontFamily: "monospace" }}
              />
              <Button onClick={handleUpdate}> Update Code </Button>
            </div>
          ) : (
            <div onClick={() => setEditMode(!editMode)}>
              <Highlight className="language-javascript">
                {currCodeBlock.code}
              </Highlight>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Home;
