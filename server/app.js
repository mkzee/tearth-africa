import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from "./routes/authRoutes.js";
import connectDb from "./db/connect.js"
import errorHandler from "./middlewares/errorHandler.js"

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: [process.env.PUBLIC_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use('/users', authRoutes);
app.use(errorHandler);


const start = () => {
    connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

start()