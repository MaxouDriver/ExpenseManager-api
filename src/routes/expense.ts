import {Router, Request, Response} from 'express';
import sql from '../database';

const router: Router = Router();

router.get('/expenses', (req: Request, res: Response) => {
    console.log('/expenses');

    sql.query("SELECT name_user, name_expense_type, name_expense, description_expense, isShared_expense, amount_expense, date_expense FROM expense JOIN user ON user.id_user = expense.id_user JOIN expense_type ON expense.id_expense_type = expense_type.id_expense_type", [], (err, result) => {
        if (err) throw err;
        res.status(200).send({status: 200, message: "here there are", data: result});
    });
});

router.post('/expense', (req: Request, res: Response) => {
    console.log('/expense');
    const  name  =  req.body.name;
    const  description  =  req.body.description;
    const  amount  =  req.body.amount;
    const  type  =  req.body.type;
    const  payer  =  req.body.payer;
    const  date  =  req.body.date;
    const  isShared = req.body.isShared;


    sql.query("INSERT INTO expense(id_user, id_expense_type, name_expense, description_expense, isShared_expense, amount_expense, date_expense) VALUES(?,?,?,?,?,?,?)", [payer, type, name, description, isShared, amount, date], (err, result) => {
        if (err) throw err;
        res.status(200).send({ status: 200, message: "Successully inserted"});
    });
});

router.get('/expenseTypes', (req: Request, res: Response) => {
    console.log('/expenseTypes');

    sql.query("SELECT * FROM expense_type", [], (err, result) => {
        if (err) throw err;
        res.status(200).send({status: 200, message: "here there are", data: result});
    });
});


export default router;
