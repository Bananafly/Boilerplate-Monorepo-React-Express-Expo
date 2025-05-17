import express from "express";
import getTasksController from "./controllers/get-tasks-controller";

const router = express.Router();

router.get("/", getTasksController);

export default router;
