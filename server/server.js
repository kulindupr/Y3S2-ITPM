import'./config/instrument.js';

import express from 'express'
import cors from 'cors'
import'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { celeryWebhook } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRotes.js';
import userRoutes from './routes/userRoutes.js';
import cvRoutes from './routes/cvRoutes.js';
import {clerkMiddleware} from '@clerk/express';






//Initialize Express
const app=express();
await connectDB();
await connectCloudinary();

//middleware3
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

//route
app.get('/',(req,res)=>res.send('API Working!'));

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
  app.post('/webhooks', celeryWebhook) 
  app.use('/api/company', companyRoutes);
  app.use('/api/jobs', jobRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/cv', cvRoutes);


//port
const PORT=process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    

})