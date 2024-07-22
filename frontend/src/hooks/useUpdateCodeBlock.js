import toast from 'react-hot-toast';
import { useState } from 'react';

// Custom hook for updating code blocks
const useUpdateCodeBlock = () => {
    const [loading, setLoading] = useState(false);

    // Function to update a code block
    const updateCodeBlock = async (codeBlock) => {
        try {
            setLoading(true);
            // Send PUT request to update the code block
            const response = await fetch(`/api/codeblocks/update/${codeBlock._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                body: JSON.stringify(codeBlock), // Send the data as JSON payload
            });
            const data = await response.json(); // Parse JSON response from the server
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