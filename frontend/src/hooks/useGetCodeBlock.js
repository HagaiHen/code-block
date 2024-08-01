import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const useGetCodeBlock = () => {
    const [loading, setLoading] = useState(false);
    const [codeBlock, setCodeBlock] = useState();

    // useEffect(() => {
    //     // Function to fetch code blocks from the server
        const getCodeBlock = async (id) => {
            try {
                if (id) {
                    console.log("getcodeblock()", id)
                    setLoading(true);
                    const response = await fetch(`/api/codeblocks/get/${id}`);
                    const data = await response.json();
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    if (data) {
                        setCodeBlock(data);
                        return data
                    }
                }

            } catch (error) {
                console.log("Error getting code block:", error.message);
                toast.error(error.message);

            } finally {
                setLoading(false);
            };

        }
    //     getCodeBlock();
    // }, [setCodeBlock, codeBlockId]); // runs when setCodeBlock and codeBlockId changes
    return { codeBlock, setCodeBlock, getCodeBlock, loading };
}

export default useGetCodeBlock;