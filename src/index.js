import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import cookie from "cookie-parser";


import productsRouter from './routes/product.routes.js';
import authRouter from './routes/auth.routes.js';

import mongoose from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


//setings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookie());

//Routes
app.use('/api/product', productsRouter);
app.use('/api',authRouter);

//Static files 
app.use(express.static(path.join(__dirname, 'public')))

//Starting server
app.listen(app.get('port'), () =>{
  console.log(`sever on port ${(app.get('port'))}`)
});



