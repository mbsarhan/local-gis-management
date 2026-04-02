const express      = require('express');
const router       = express.Router();
const controller   = require('../controllers/usersController');
const authenticate = require('../middleware/authenticate');

// Public — no token required
router.post('/login', controller.login);

// Protected — all routes below require a valid token
router.use(authenticate);

router.get('/',                          controller.getAllUsers);
router.post('/',                         controller.addUser);
router.patch('/:id/deactivate',          controller.deactivateUser);
router.patch('/:id/reactivate',          controller.reactivateUser);
router.patch('/:id/change-password',     controller.changeUserPassword);
router.patch('/:id/change-type',         controller.changeUserType);

module.exports = router;