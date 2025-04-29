import express from 'express'
import cors from 'cors'
import'dotenv/config';

//Initialize Express
const app=express();

//middleware3
app.use(cors());
app.use(express.json());

//route
app.get('/',(req,res)=>res.send('API Working!'));


//port
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
    
})