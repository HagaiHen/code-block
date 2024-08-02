import { useState, useEffect } from "react";
import { Container, ContainerWrapper } from "./styles";
import { useAuthContext } from "../../context/useAuthContext";
import useGetCodeBlocks from "../../hooks/useGetCodeBlocks";
import useUpdateCodeBlack from "../../hooks/useUpdateCodeBlock";
import { useSocketContext } from "../../context/SocketContext";
import CodeBlockDropdown from "../../components/CodeBlockDropDown/CodeBlockDropDown";
import CodeBlockEditor from "../../components/CodeBlockEditor/CodeBlockEditor";
import CodeBlockViewer from "../../components/CodeBlockViewer/CodeBlockViewer";
import Button from "react-bootstrap/esm/Button";
import useGetCodeBlock from "../../hooks/useGetCodeBlock";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "./emoji.css";

const Home = () => {
  const { codeBlocks, setCodeBlocks } = useGetCodeBlocks();
  const [placeholder, setPlaceholder] = useState("Choose Code Block");
  const [currCodeBlock, setCurrCodeBlock] = useState(null);
  const { updateCodeBlock } = useUpdateCodeBlack();
  const [editMode, setEditMode] = useState(false);
  const { socket } = useSocketContext();
  const [showEmoji, setShowEmoji] = useState(false);
  const { codeBlock, setCodeBlock, getCodeBlock } = useGetCodeBlock();
  const [loading, setLoading] = useState(false);

  const handleSelect = async (e) => {
    const res = await getCodeBlock(e._id);
    setLoading(true);
    setPlaceholder(e.title);
    setEditMode(false);
    setCurrCodeBlock(res);

    if (res.mentorId === "") {
      const updatedCodeBlock = await updateCodeBlock({
        ...res,
        mentorId: socket.id,
      });
      setCodeBlock(updatedCodeBlock);
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    const res = await getCodeBlock(codeBlock._id);
    if (res.mentorId === "") {
      const updatedCodeBlock = await updateCodeBlock({
        ...res,
        mentorId: socket.id,
      });
      setCodeBlock(res);
      toast.error("You do not have permission to update this code block.");
      setEditMode(false);
      return;
    }
    setEditMode(false);
    try {
      await updateCodeBlock(currCodeBlock);
    } catch (error) {
      console.log("Error updating code block:", error.message);
      toast.error("Failed to update code block");
    }
  };

  useEffect(() => {
    if (!currCodeBlock) return;

    const isCorrect = currCodeBlock?.code === currCodeBlock?.solution;
    if (isCorrect) {
      setShowEmoji(true);
      setTimeout(() => setShowEmoji(false), 3000);
    }
  }, [currCodeBlock]);

  useEffect(() => {
    const handleUpdateCodeBlock = (updatedCodeBlock) => {
      setCodeBlocks((prevCodeBlocks) =>
        prevCodeBlocks.map((cb) =>
          cb._id === updatedCodeBlock._id ? updatedCodeBlock : cb
        )
      );
      if (currCodeBlock?._id === updatedCodeBlock._id) {
        setCurrCodeBlock(updatedCodeBlock);
      }
    };

    socket?.on("updateCodeBlock", handleUpdateCodeBlock);

    return () => {
      socket?.off("updateCodeBlock", handleUpdateCodeBlock);
    };
  }, [socket, currCodeBlock]);

  return (
    <Container>
      <h3>Code Block App</h3>
      <CodeBlockDropdown
        placeholder={placeholder}
        codeBlocks={codeBlocks}
        handleSelect={handleSelect}
      />

      {currCodeBlock && !loading && (
        <ContainerWrapper>
          {currCodeBlock.mentorId !== socket.id ? (
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
              View Permission{" "}
            </Button>
          )}

          {currCodeBlock.mentorId !== socket.id && editMode ? (
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
          {showEmoji && !editMode && <div className="emoji-overlay">✅</div>}
        </ContainerWrapper>
      )}
    </Container>
  );
};

export default Home;