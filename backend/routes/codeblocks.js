import express from 'express';
import { createCodeBlock, getCodeBlocks } from "../controllers/codeBlock.js";
import { protectRoute } from '../utils/middleware/protectRoute.js';

const router = express.Router();

router.post('/create', protectRoute, createCodeBlock);
router.get('/get', protectRoute, getCodeBlocks);

export default router;