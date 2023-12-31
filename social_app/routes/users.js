const Express = require('express');
const router = Express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');


router.get('/profile',passport.checkAuthentication,usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);

//use pass port as a middle ware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

module.exports = router;