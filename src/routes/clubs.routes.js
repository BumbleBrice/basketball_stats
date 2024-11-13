import { Router } from 'express';
import { 
    renderClubsList, 
    renderCreateClub, 
    renderClubDetails, 
    renderEditClub, 
    createClub, 
    updateClub, 
    deleteClub 
} from '../controllers/clubs.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, renderClubsList);
router.get('/create', verifyToken, renderCreateClub);
router.get('/:id', verifyToken, renderClubDetails);
router.get('/:id/edit', verifyToken, renderEditClub);

router.post('/', verifyToken, createClub);
router.put('/:id', verifyToken, updateClub);
router.delete('/:id', verifyToken, deleteClub);

export default router;
