import express from "express";
import bodyParser from "body-parser";

import userRoute from './routes/user';
import expenseRoute from "./routes/expense";

const app : express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/user", userRoute);
app.use("/expense", expenseRoute);

export default app;