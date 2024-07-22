import { useState, useEffect } from "react";
import { Container } from "./styles";
import { useAuthContext } from "../../context/useAuthContext";
import useGetCodeBlocks from "../../hooks/useGetCodeBlocks";
import useUpdateCodeBlack from "../../hooks/useUpdateCodeBlock";
import { useSocketContext } from "../../context/SocketContext";
import CodeBlockDropdown from "../../components/CodeBlockDropDown";
import CodeBlockEditor from "../../components/CodeBlockEditor";
import CodeBlockViewer from "../../components/CodeBlockViewer";
import Button from "react-bootstrap/esm/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const { codeBlocks, setCodeBlocks } = useGetCodeBlocks();
  const { authUser } = useAuthContext();
  const [placeholder, setPlaceholder] = useState("Choose Code Block");
  const [currCodeBlock, setCurrCodeBlock] = useState(null);
  const { updateCodeBlock } = useUpdateCodeBlack();
  const [editMode, setEditMode] = useState(false);
  const { socket } = useSocketContext();

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

  const handleContainerClick = () => {
    if (editMode) {
      setEditMode(false);
    }
  }

  useEffect(() => {
    const handleUpdateCodeBlock = async (codeBlock) => {
      setCodeBlocks((prevCodeBlocks) =>
        prevCodeBlocks.map((cb) => (cb._id === codeBlock._id ? codeBlock : cb))
      );
      if (currCodeBlock?._id === codeBlock._id) {
        setCurrCodeBlock(codeBlock);
      }
    };

    socket?.on("updateCodeBlock", handleUpdateCodeBlock);

    return () => {
      socket?.off("updateCodeBlock", handleUpdateCodeBlock);
    };
  }, [socket, currCodeBlock]);

  return (
    <Container onClick={handleContainerClick}>
      <h3>Code Block App</h3>
      <CodeBlockDropdown
        placeholder={placeholder}
        codeBlocks={codeBlocks}
        handleSelect={handleSelect}
      />

      {currCodeBlock && (
        <div>
          {currCodeBlock.mentorId !== authUser._id ? (
            <Button variant="success" style={{ pointerEvents: "none", fontSize: "small" }}> Edit Permission </Button>
          ) : (
            <Button variant="danger" style={{ pointerEvents: "none", fontSize: "small" }}> View Permission</Button>
          )}

          {currCodeBlock.mentorId !== authUser._id && editMode ? (
            <CodeBlockEditor
              currCodeBlock={currCodeBlock}
              setCurrCodeBlock={setCurrCodeBlock}
              handleUpdate={handleUpdate}
              setEditMode={setEditMode}
            />
          ) : (
            <CodeBlockViewer
              code={currCodeBlock.code}
              setEditMode={setEditMode}
            />
          )}
        </div>
      )}
    </Container>
  );
};

export default Home;