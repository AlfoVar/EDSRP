import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import cookie from "cookie-parser";
import cors from 'cors';


import productsRouter from './routes/product.routes.js';
import authRouter from './routes/auth.routes.js';
import pumpRouter from './routes/pump.routes.js';
import closingProductRoutes from './routes/closingProduct.routes.js';
import grocerRouter from './routes/grocer.routes.js';
import closingGasRouters from './routes/closingGas.routes.js';
import closingRouter from './routes/closing.routes.js';

import mongoose from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


//setings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookie());

//Routes
app.use('/api/closing', closingRouter);
app.use('/api/closinggas', closingGasRouters);
app.use('/api/grocer', grocerRouter);
app.use('/api/closingproducts', closingProductRoutes);
app.use('/api/pump', pumpRouter);
app.use('/api/product', productsRouter);
app.use('/api',authRouter);

//Static files 
app.use(express.static(path.join(__dirname, 'public')))

//Starting server
app.listen(app.get('port'), () =>{
  console.log(`sever on port ${(app.get('port'))}`)
});



