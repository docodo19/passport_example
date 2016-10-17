import * as express from 'express';
import * as jwt from 'jsonwebtoken';

let movieRoute = express.Router();


movieRoute.get('/',authorize, function(req, res){
    console.log(req['token']);

    let movies = [
        { title: 'Star Wars 1', director: 'Lucas'},
        { title: 'Star Wars 2', director: 'Lucas'},
        { title: 'Star Wars 3', director: 'Lucas'},
        { title: 'Star Wars 4', director: 'Lucas'},
        { title: 'Star Wars 5', director: 'Lucas'},
        { title: 'Star Wars 6', director: 'Lucas'},
    ];
    res.send(movies);
});

function authorize(req, res, next){
    jwt.verify(req['token'], 'SomeSecretKey', function(err, decoded){
        if(err){
            res.sendStatus(401);
        } else {
            //res.send(JSON.stringify(decoded));
            next();
        }
    })
}


export default movieRoute;
