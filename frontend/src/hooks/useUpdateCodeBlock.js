import toast from 'react-hot-toast';
import { useState } from'react';

const useUpdateCodeBlock = () => {
    const [loading, setLoading] = useState(false);

        const updateCodeBlock = async (codeBlock) => {
            try {
                setLoading(true);
                const response = await fetch(`/api/codeblocks/update/${codeBlock._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(codeBlock),
                });
                const data = await response.json();
                if (data.error) {
                    console.log("Error getting code blocks:", data.error);
                    throw new Error(data.error);
                }

            } catch (error) {
                console.error("Error getting code blocks:", error.message);
                toast.error(error.message);
                
            } finally {
                setLoading(false);
            };
        }
    return { updateCodeBlock, loading };

}


export default useUpdateCodeBlock;