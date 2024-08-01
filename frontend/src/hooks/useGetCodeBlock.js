import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const useGetCodeBlock = (codeBlockId) => {
    const [loading, setLoading] = useState(false);
    const [codeBlock, setCodeBlock] = useState([]);

    useEffect(() => {
        // Function to fetch code blocks from the server
        const getCodeBlock = async () => {
            try {
                if (codeBlockId) {
                    setLoading(true);
                    const response = await fetch(`/api/codeblocks/get/${codeBlockId ? codeBlockId : ""}`);
                    const data = await response.json();
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    if (data) setCodeBlock(data);
                }

            } catch (error) {
                console.log("Error getting code block:", error.message);
                toast.error(error.message);

            } finally {
                setLoading(false);
            };

        }
        getCodeBlock();
    }, [setCodeBlock, codeBlockId]); // runs when setCodeBlock changes
    return { codeBlock, setCodeBlock, loading };
}

export default useGetCodeBlock;