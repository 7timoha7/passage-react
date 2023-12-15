import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/users';
import path from 'path';
import categoryRouter from './routers/categories';
import productRouter from './routers/products';
import productFromApiRouter from './routers/productsFromApi';

const app = express();
const port = 8000;

const staticFilesPath = path.join(__dirname, 'public');
app.use(express.static(staticFilesPath));
app.use(express.json());
// app.use(
//   cors({
//     credentials: true,
//     methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     origin: ['http://passage.kg', 'https://passage.kg'],
//   }),
// );
app.use(cors());
app.use('/users', usersRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/productsFromApi', productFromApiRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
