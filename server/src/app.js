
import express from 'express';
import cors from 'cors';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// custom middlewares
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
})

// routes import
import authRoutes  from './routes/authUser.routes.js';

// routes usage
app.use("/api/auth", authRoutes );

// exporting
export { app };
