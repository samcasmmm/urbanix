import express from 'express';
import {
    createProperty,
    updateProperty,
    getProperty,
    getAllProperties,
    deleteProperty,
} from '../controllers/properties.controller';
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

router.post('/', createProperty);
router.get('/', getAllProperties);
router.get('/id', getProperty);
router.put('/id', updateProperty);
router.delete('/id', deleteProperty);

export default router;
