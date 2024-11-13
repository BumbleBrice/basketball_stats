const router = require('express').Router();
const clubsController = require('../controllers/clubs.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Pages de rendu (GET)
router.get('/', verifyToken, clubsController.renderClubsList);
router.get('/create', verifyToken, clubsController.renderCreateClub);
router.get('/:id', verifyToken, clubsController.renderClubDetails);
router.get('/:id/edit', verifyToken, clubsController.renderEditClub);

// Actions (POST, PUT, DELETE)
router.post('/', verifyToken, clubsController.createClub);
router.put('/:id', verifyToken, clubsController.updateClub);
router.delete('/:id', verifyToken, clubsController.deleteClub);

module.exports = router;
