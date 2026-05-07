import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { config } from './config/config.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import ProjectRoutes from './routes/project.routes.js';
import taskRoutes from "./routes/task.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://projectflow-frontend-production.up.railway.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', ProjectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get('/', (req,res) => {
    res.send("Hello World!");
})

export default app;