const Controller = require('../../lib/controller')
const userFacade = require('./facade')
var jwt = require('jsonwebtoken')

class UserController extends Controller {
    create(req, res, next){
        var err = '';
        const {first_name, last_name, username, password} = req.body;
        if(first_name  == null) err = 'First name cannot be empty';
        else if(last_name  == null) err = 'Last name cannot be empty';
        else if(username  == null) err = 'Username cannot be empty';
        else if(password  == null) err = 'Password cannot be empty';
        else{
            console.log(process.env.JWT_SECRET)
            var token = jwt.sign(req.body,process.env.JWT_SECRET)
            req.body.access_token = token;
            userFacade.create(req.body)
            .then(data=> res.status(201).json(data))
            .catch(err=>res.status(500).send(err))
        }
        if(err != ''){
            res.status(500).send({err})
        }
    }
}

module.exports = new UserController(userFacade)
