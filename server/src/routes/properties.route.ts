import express from 'express';
const router = express.Router();

router.get('/health', (req, res) => {
    res.json({
        status: res.statusCode,
        message: 'Properties Route health is good',
        url: req.url,
        meta: null,
        data: null,
    });
});

export default router;
