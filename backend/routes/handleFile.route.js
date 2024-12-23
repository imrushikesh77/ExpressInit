import express from 'express';
const router = express.Router();

import generateDirectory from '../controllers/handleFile.controller.js';
import {
    getUsers,
    updateUsers
} from '../controllers/users.controller.js';

router.post('/generate', generateDirectory);
router.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy and running' });
});
router.get('/users', getUsers);
router.put('/users', updateUsers);

export default router;