import express from "express";
import morgan from "morgan";
import indexRoutes from './routes/index.routes.js'
import arduinoApiRoutes from './routes/arduinoApi.routes.js';
import {PORT} from './config.js';

const app = express();

// sets
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use(indexRoutes);
app.use(arduinoApiRoutes);

//static 
app.use('/css', express.static('../node_modules/bootstrap/dist/css'));
app.use('/css', express.static('../node_modules/bootstrap-icons/font/'));
app.use('/public',express.static('public'));


app.listen(PORT);
console.log(`Server on port ${PORT}`)