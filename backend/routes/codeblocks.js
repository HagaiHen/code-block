import express from 'express';
import { createCodeBlock, getCodeBlocks, getCodeBlock, updateCodeBlock } from "../controllers/codeBlock.js";
import { protectRoute } from '../utils/middleware/protectRoute.js';

const router = express.Router();

router.post('/create', protectRoute, createCodeBlock);
router.get('/get', protectRoute, getCodeBlocks);
router.get('/get/:id', protectRoute, getCodeBlock);
router.put('/update/:id', protectRoute, updateCodeBlock);

export default router;