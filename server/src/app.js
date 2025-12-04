

import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import { globalLimiter } from "./middlewares/rateLimiter.js";

const app = express();

// -------------------------------
//   SECURITY + GLOBAL MIDDLEWARES
// -------------------------------
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(helmet());
app.use(hpp());
app.use(cookieParser());

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(globalLimiter); 
app.use(express.static("public"));

// -------------------------------
///   CUSTOM LOG MIDDLEWARE
// -------------------------------
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// -------------------------------
//   ROUTES IMPORT
// -------------------------------
import authRoutes from "./routes/authUser.routes.js";
import budgetRoutes from "./routes/BudgetRoutes/budget.routes.js";
import todoRoutes from "./routes/TodoRoutes/todo.routes.js";
import transactionRoutes from "./routes/TransactionRoutes/transaction.routes.js";

// -------------------------------
//   ROUTES USAGE
// -------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/transactions", transactionRoutes);

// -------------------------------
//   EXPORT APP
// --------------------------------*/
export { app };


// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import hpp from "hpp";
// import cookieParser from "cookie-parser";

// const app = express();

// // middlewares
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );
// app.use(helmet());
// app.use(hpp());
// app.use(express.json({ limit: "10kb" })); // limit body size
// app.use(cookieParser());
// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));

// // custom middlewares
// app.use((req, res, next) => {
//   console.log(`Incoming Request: ${req.method} ${req.url}`);
//   next();
// });

// // routes import
// import authRoutes from "./routes/authUser.routes.js";
// import budgetRoutes from "./routes/BudgetRoutes/budget.routes.js";
// import todoRoutes from "./routes/TodoRoutes/todo.routes.js";
// import transactionRoutes from "./routes/TransactionRoutes/transaction.routes.js";

// // routes usage
// app.use("/api/auth", authRoutes);
// app.use("/api/budgets", budgetRoutes);
// app.use("/api/todos", todoRoutes);
// app.use("/api/transactions", transactionRoutes);

// // exporting
// export { app };

// // import { globalLimiter } from "./middleware/rateLimiter.js";
// // app.use(globalLimiter);

// // // apply authLimiter on auth routes (in routes file)
// // router.post("/login", authLimiter, emailLogin);
// // router.post("/signup", authLimiter, emailSignup);
// // router.post("/send-otp", authLimiter, sendOtp);
