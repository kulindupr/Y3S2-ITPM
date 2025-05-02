import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { celeryWebhook } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRotes.js';
import userRoutes from './routes/userroutes.js';
import cvRoutes from './routes/cvRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Initialize Express
const app = express();
await connectDB();
await connectCloudinary();

//middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Serve static files from the client's public directory
app.use('/assets', express.static(path.join(__dirname, '../client/public/assets')));

//routes
app.get('/', (req, res) => res.send('API Working!'));

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

app.post('/webhooks', celeryWebhook);
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cv', cvRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

//port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});