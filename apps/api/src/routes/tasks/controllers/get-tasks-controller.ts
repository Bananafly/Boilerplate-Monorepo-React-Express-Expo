import type { NextFunction, Request, Response } from "express";
import getTasksService from "../services/get-tasks-service";

const getTasksController = async (
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	try {
		const tasks = await getTasksService();
		res.json(tasks);
	} catch (error) {
		console.error("Failed to retrieve tasks:", error);
		res.status(500).json({ error: "Failed to retrieve tasks" });
	}
};

export default getTasksController;
