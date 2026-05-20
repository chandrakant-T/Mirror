import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import languagesRouter from "./routes/languages.js";
import codeRouter from "./routes/code.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://mirror-frontend-lyart.vercel.app"
    ]
}))

app.get('/', (req, res) => {
    res.send("Welcome to Mirror Compiler");
});

app.use('/languages', languagesRouter);
app.use('/code-submit', codeRouter);

app.listen(PORT, () => {
    console.log(`The Server is started at port ${PORT}`);
});