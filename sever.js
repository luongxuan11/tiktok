import express from "express";
import cors from "cors";
import "./connectDB";
import dotenv from "dotenv";
dotenv.config();
const cookieParser = require("cookie-parser"); // reding cookie
import initRouter from "./src/routes";
const path = require("path");

const port = process.env.PORT || 3001;

// create a app with express
const app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server, {
   cors: {
      origin: "*",
   },
});
const allowedOrigins = ["http://localhost:3000", "https://tiktok-nine-mu.vercel.app/"];

const corsOptions = {
   origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
         callback(null, true);
      } else {
         callback(new Error("Not allowed by CORS"));
      }
   },
   credentials: true, // Cho phép sử dụng Cookie
   optionsSuccessStatus: 200,
   methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

// middleware đọc data
app.use(cookieParser()); // tương tác cookie
app.use(express.json()); // đọc được kiểu dữ liệu json được gửi lên từ client
app.use(express.urlencoded({ extended: true })); // giúp đọc được dạng formData như kiểu body

const publicDir = path.join(__dirname, "src", "onOutput");
app.use("/public", express.static(publicDir));

initRouter(app, io);

const listener = server.listen(port, () => {
   console.log(`sever's running on the port ${listener.address().port}`);
});
