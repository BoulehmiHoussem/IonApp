var express         = require('express'),
    routes          = express.Router();
var UserController  = require('../src/controllers/user-controller');
var passport        = require('passport');


routes.get('/', (req, res) => {
    return res.send('Hello this is our API');
})

routes.post('/register', UserController.registerUser)
routes.post('/login', UserController.loginUser)

routes.get('/special', passport.authenticate('jwt', {session:false}) , (req, res) => {
    
    return res.json({ msg: `hey ${req.user.email}! I open at the close` })
})

module.exports = routes;