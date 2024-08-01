import express from 'express';
import { createCodeBlock, getCodeBlocks, getCodeBlock, updateCodeBlock } from "../controllers/codeBlock.js";
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/create', createCodeBlock);
router.get('/', getCodeBlocks);
router.get('/get/:id', getCodeBlock);
router.put('/update/:id', updateCodeBlock);

export default router;