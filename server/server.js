import'./config/instrument.js';

import express from 'express'
import cors from 'cors'
import'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { celeryWebhook } from './controllers/webhooks.js';

//Initialize Express
const app=express();
await connectDB();

//middleware3
app.use(cors());
app.use(express.json());

//route
app.get('/',(req,res)=>res.send('API Working!'));

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
  app.post('/webhook', celeryWebhook) 

//port
const PORT=process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    

})