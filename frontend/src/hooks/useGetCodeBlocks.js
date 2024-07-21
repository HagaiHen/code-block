import toast from 'react-hot-toast';
import { useEffect, useState } from'react';

const useGetCodeBlocks = () => {
    const [loading, setLoading] = useState(false);
    const [codeBlocks, setCodeBlocks] = useState([]);

    useEffect(() => {
        const getCodeBlocks = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/codeblocks/get`);
                const data = await response.json();
                console.log("data: get code blocks", data);
                if (data.error) {
                    console.log("Error getting code blocks:", data.error);
                    throw new Error(data.error);
                }
                if (data) setCodeBlocks(data);

            } catch (error) {
                console.error("Error getting code blocks:", error.message);
                toast.error(error.message);
                
            } finally {
                setLoading(false);
            };

        }
        getCodeBlocks();
    }, []);
    return { codeBlocks, loading };
}

export default useGetCodeBlocks;