import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import categoryRoutes from './routes/category.routes.js'
import ticketRoutes from './routes/ticket.routes.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/user", userRoutes)
app.use("/ticket", ticketRoutes)
app.use("/login", authRoutes)
app.use("/category", categoryRoutes)


export default app