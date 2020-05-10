import {Router, Request, Response} from 'express';
const  jwt   =require( 'jsonwebtoken');
const  bcrypt = require( 'bcryptjs'); 
import sql from '../database';

const SECRET_KEY = "secretkey23456";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    console.log('/users');

    sql.query("SELECT * FROM user", [], (err, result) => {
        if (err) throw err;
        res.status(200).send({status: 200, message: "here there are", data: result});
    });
});

router.post('/signin', (req: Request, res: Response) => {
    console.log("/signin");

    console.log(req.body);

    const  email  =  req.body.email;
    const  password  =  req.body.password;
    sql.query("SELECT * FROM user WHERE email_user=?", [email], (err, result) => {
        if (err) throw err;
        if (result.length <= 0) {
            res.status(401).send({status: 401, message: "error no account with this email"});
        }else{
            const  comparisonResult  =  bcrypt.compareSync(password, result[0].passwd_user);
            if(!comparisonResult) return  res.status(401).send('Password not valid!');

            const  expiresIn  =  24  *  60  *  60;
            const  accessToken  =  jwt.sign({ id:  result[0].id_user }, SECRET_KEY, {
                expiresIn:  expiresIn
            });
            res.status(200).send({status: 200, "message": "enjoy your token", "id_user":  result[0].id_user, "access_token":  accessToken, "expires_in":  expiresIn});
        }
    });
});

router.post('/signup', (req: Request, res: Response) => {
    console.log('/signup');

    const  name  =  req.body.name;
    const  email  =  req.body.email;
    const  password  =  bcrypt.hashSync(req.body.password);

    sql.query("SELECT * FROM user WHERE email_user=?", [email], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.status(200).send({status: 200, message: "error email already used"});
        }else{
            sql.query("INSERT INTO user(name_user, email_user, passwd_user) VALUES(?,?,?)", [name, email, password], (err, result) => {
                if (err) throw err;
                const  expiresIn  =  24  *  60  *  60;
                const  accessToken  =  jwt.sign({ id:  result.insertId }, SECRET_KEY, {
                    expiresIn:  expiresIn
                });
                res.status(200).send({ status: 200, message: "enjoy your token", "id_user":  result.insertId, "access_token":  accessToken, "expires_in":  expiresIn});
            });
        }
    });
});

export default router;