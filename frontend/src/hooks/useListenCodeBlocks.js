import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useUpdateCodeBlock from './useUpdateCodeBlock';


const useListenCodeBlocks = () => {
  const {socket} = useSocketContext();
  const { updateCodeBlock } = useUpdateCodeBlock();

  useEffect(() => {
    socket?.on('updateCodeBlock', async (codeBlock) => {
        await updateCodeBlock(codeBlock);
  });
  return () => socket?.off('updateCodeBlock');
  }, [socket, updateCodeBlock]);
}

export default useListenCodeBlocks