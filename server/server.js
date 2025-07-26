import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js'
import adminRouter from './route/adminRoute.js'
import blogRouter from './route/blogroutes.js'
const app=express()
//monogoose atlas set calling
app.use(express.json());

await connectDB()
app.use(cors())
app.get('/',(req,res)=>{
    res.send("this is the root server")
})
//route for admin login
app.use('/api/admin',adminRouter)

app.use('/api/blogs',blogRouter)
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('server is running on port '+PORT)
})
export default app