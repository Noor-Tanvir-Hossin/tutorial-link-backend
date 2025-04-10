import express, { Request, Response } from 'express';
import cors from 'cors';
import { bookRoutes } from './app/modules/book/book.route';
import notFound from './app/utils/notFound';
import globalErrorHandler from './app/utils/globalErrorHandler';
import { orderRoutes } from './app/modules/order/order.route';
import router from './app/routes';
import authRouter from './app/modules/auth/auth.route';

import cookieParser from 'cookie-parser';

const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true}))

//application routes
app.use('/api',router)
// app.use("/api/products", bookRoutes);
//app.use("/api/orders", orderRoutes);
// app.use("/api/auth", authRouter);


app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
  })

  app.use(globalErrorHandler )
  app.use(notFound)
  

export default app;