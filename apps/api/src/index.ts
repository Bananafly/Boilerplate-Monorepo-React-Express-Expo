/** @format */
import express, {
	type Request,
	type Response,
	type NextFunction,
} from "express";
import "dotenv/config";
import cors from "cors";
import taskRouter from "./routes/tasks/task-router";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
	// eslint-disable-next-line no-console
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

	next();
});

app.use("/api/v1/tasks", taskRouter);

// app.use('/webhooks/v1', webhooks);

// Error handling middleware
app.use(
	(
		err: any,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		if (res.headersSent) {
			return next(err);
		}
		console.error("Error:", err.stack);
		res.status(401).json({ message: "Unauthenticated!", error: err.message });
	},
);

export default app;
