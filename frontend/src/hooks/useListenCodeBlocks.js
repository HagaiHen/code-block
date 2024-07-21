import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useUpdateCodeBlock from './useUpdateCodeBlock';


const useListenCodeBlocks = () => {
  
    const { socket, io } = useSocketContext();
    const { updateCodeBlock } = useUpdateCodeBlock();


    useEffect(() => {
        const handleUpdateCodeBlock = async (codeBlock) => {
            await updateCodeBlock(codeBlock);
        };
    
        socket?.on('updateCodeBlock', handleUpdateCodeBlock);
        
        return () => {
            socket?.off('updateCodeBlock', handleUpdateCodeBlock);
        };
    }, [socket, updateCodeBlock]);
}

export default useListenCodeBlocks;
