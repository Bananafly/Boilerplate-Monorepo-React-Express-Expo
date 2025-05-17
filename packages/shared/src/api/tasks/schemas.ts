import { z } from "zod";

const taskSchema = z.object({
	id: z.string(),
	name: z.string(),
});

export const getTasksSchema = z.array(taskSchema);

// Response schemas

// Inferred types
export type GetTasksDto = z.infer<typeof getTasksSchema>;
