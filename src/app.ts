import express, {Application, Request, Response, NextFunction} from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import path from "path";
import {router} from "./router";

const app: Application = express();

app.use(cookieParser());
app.use(logger('dev'));

app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// load router
for (const route of router) {
    app.use(route.getRouter());
}

app.listen(5000, () => {
    console.log('Server runs on port 5000!');
})