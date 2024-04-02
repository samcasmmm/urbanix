import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();

const checkHealth = asyncHandler(async (req, res, next) => {
    res.json({
        status: res.statusCode,
        message: 'Health is Good',
        meta: null,
        data: null,
    });
});

router.get('/health', checkHealth);

export default router;
