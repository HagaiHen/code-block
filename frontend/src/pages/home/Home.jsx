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
import "./emoji.css";

const Home = () => {
  const { codeBlocks, setCodeBlocks } = useGetCodeBlocks();
  const { authUser } = useAuthContext();
  const [placeholder, setPlaceholder] = useState("Choose Code Block");
  const [currCodeBlock, setCurrCodeBlock] = useState(null);
  const { updateCodeBlock } = useUpdateCodeBlack();
  const [editMode, setEditMode] = useState(false);
  const { socket } = useSocketContext();
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSelect = (e) => {
    setPlaceholder(e.title);
    setCurrCodeBlock(e);
  };

  const handleUpdate = async () => {
    // check that the current user is authorized to edit the code block
    if (authUser._id === currCodeBlock?.mentorId) {
      console.log("You do not have permission to update this code block.");
      return;
    }
    setEditMode(!editMode);
    try {
      await updateCodeBlock(currCodeBlock);
    } catch (error) {
      console.log("Error updating code block:", error.message);
      toast.error("Failed to update code block");
    }
  };

  //check code correctness
  useEffect(() => {
    // for first time rendering
    if (!currCodeBlock) return;
    const isCorrect = currCodeBlock?.code === currCodeBlock?.solution;

    if (isCorrect) {
      setShowEmoji(true);
      setTimeout(() => setShowEmoji(false), 3000); // Show emoji for 3 seconds
    }
  }, [currCodeBlock]);

  useEffect(() => {
    const handleUpdateCodeBlock = async (codeBlock) => {
      // Update code blocks list with updated code
      setCodeBlocks((prevCodeBlocks) =>
        prevCodeBlocks.map((cb) => (cb._id === codeBlock._id ? codeBlock : cb))
      );
      if (currCodeBlock?._id === codeBlock._id) {
        setCurrCodeBlock(codeBlock);
      }
    };

    // Add event listener for updating code block on server
    socket?.on("updateCodeBlock", handleUpdateCodeBlock);

    return () => {
      // Remove event listener for updating code block on server, cleanup function
      socket?.off("updateCodeBlock", handleUpdateCodeBlock);
    };
  }, [socket, currCodeBlock]);

  return (
    <Container>
      <h3>Code Block App</h3>
      <h5>Wellcome, {authUser?.username}</h5>
      <CodeBlockDropdown
        placeholder={placeholder}
        codeBlocks={codeBlocks}
        handleSelect={handleSelect}
      />

      {currCodeBlock && (
        <div>
          {currCodeBlock.mentorId !== authUser._id ? (
            <Button
              variant="success"
              style={{ pointerEvents: "none", fontSize: "small" }}
            >
              {" "}
              Edit Permission{" "}
            </Button>
          ) : (
            <Button
              variant="danger"
              style={{ pointerEvents: "none", fontSize: "small" }}
            >
              {" "}
              View Permission
            </Button>
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
          {showEmoji && <div className="emoji-overlay">✅</div>}
        </div>
      )}
    </Container>
  );
};

export default Home;
