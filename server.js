import express from 'express'
import connectDB from './database/database.js'
import userRouter from './routes/user.route.js'
import userEmployeeRouter from './routes/employee.route.js'
import userDepartmentRouter from './routes/department.route.js'
import userLeaveRequestRouter from './routes/leaverequest.route.js'
import userAttendanceRouter from './routes/attendance.route.js';
import dotenv, { configDotenv } from 'dotenv';
// import { verifyToken, authorizationRoles } from './middleware/verifytoken.js';
import authRouter from './routes/auth.route.js'
const app = express()

dotenv.config();

app.use(express.json())
const PORT = process.env.PORT || 3000
connectDB().then(() => {
  // console.log('Database connected successfully')
}).catch(err => {
  console.error('Database connection failed:', err)
})


app.use('/api', userRouter)
app.use('/api', userEmployeeRouter)
app.use('/api', userDepartmentRouter)
app.use('/api', userLeaveRequestRouter)
app.use('/api', userAttendanceRouter)
app.use('/api',authRouter)

app.get('/', (req, res) => {
  res.send('Welcome to the HRMS API') 
})




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})