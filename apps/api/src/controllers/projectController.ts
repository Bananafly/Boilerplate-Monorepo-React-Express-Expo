/** @format */

import * as projectService from "../../services/projectService";
import * as projectDetailService from "../../services/projectService/oldprojectDetailService";
import { Request, Response, NextFunction } from "express";
import {
  createProjectSchema,
  getProjectByIdSchema,
  getProjectsSchema,
  updateProjectSchema,
  updateSharedProjectSchema,
} from "./validators/projectValidator";

export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    const validation = getProjectByIdSchema.safeParse(project);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }
    res.json(validation.data);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validation = createProjectSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }
    const newProject = await projectService.createProject(validation.data);
    res.json(newProject);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validation = updateProjectSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }
    const updatedProject = await projectService.updateProject(
      req.params.id,
      validation.data
    );
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await projectService.deleteProject(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await projectService.getProjects();

    // Convert to JSON and parse back to ensure consistent representation
    const jsonCustomers = JSON.parse(JSON.stringify(projects));

    const validation = getProjectsSchema.safeParse(jsonCustomers);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    res.json(validation.data);
  } catch (error) {
    next(error);
  }
};

export const getPreparationAppointmentCreation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await projectService.getPreparationAppointmentCreation(
      req.params.id
    );
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const getActivityLogsByProjectId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const activityLogs = await projectDetailService.getActivityLogsByProjectId(
      req.params.id
    );
    res.json(activityLogs);
  } catch (error) {
    next(error);
  }
};

export const getPhasesByProjectId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectOverview = await projectDetailService.getPhasesByProjectId(
      req.params.id
    );
    res.json(projectOverview);
  } catch (error) {
    next(error);
  }
};

export const changeProjectStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await projectService.updateProjectStatus(
      req.params.projectId,
      req.params.stepId
    );
    res.json(project);
  } catch (error) {
    next(error);
  }
};

export const getProjectsByCustomerId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await projectService.getProjectsByCustomerId(
      req.params.customerId
    );
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const updateSharedProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validation = updateSharedProjectSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }
    const updatedProject = await projectService.updateSharedProject(
      validation.data,
      req.params.id,
    );
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};


