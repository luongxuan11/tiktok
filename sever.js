import express from "express";
import cors from 'cors'
import './connectDB'
import dotenv from 'dotenv'
dotenv.config()
const cookieParser = require('cookie-parser') // reding cookie

import initRouter from './src/routes'

const port = process.env.PORT || 3001;


// create a app with express
const app = express();

app.use(
  cors({
    // dùng để đăng kí 1 middleware được phép truy cập
    origin: process.env.CLIENT_URL, // origin là tên miền được phép truy cập
    optionsSuccessStatus: 200, // Được vào với state 200
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Cho phép sử dụng Cookie
  })
);

// middleware đọc data
app.use(cookieParser()) // tương tác cookie
app.use(express.json()); // đọc được kiểu dữ liệu json được gửi lên từ client
app.use(express.urlencoded({ extended: true })); // giúp đọc được dạng formData như kiểu body

initRouter(app)

const listener = app.listen(port, () => {
  console.log(`sever's running on the port ${listener.address().port}`)
});