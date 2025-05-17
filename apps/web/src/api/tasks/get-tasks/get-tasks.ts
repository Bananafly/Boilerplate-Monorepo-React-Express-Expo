import apiClient from "@/api/client.ts";

import { getTasksSchema } from "@monorepo/shared";
import { type TaskOverviewData, dtoToTasks } from "./transform";

const getTasks = async (authToken: string): Promise<TaskOverviewData> => {
	try {
		const response = await apiClient.get<unknown>("/tasks", {
			headers: {
				// biome-ignore lint/style/useNamingConvention: I don't control the API
				Authorization: `Bearer ${authToken}`,
			},
		});
		const tasksData = response.data;

		// Validate the response data using Zod schema
		const parsedTasks = getTasksSchema.parse(tasksData);
		if (!parsedTasks) {
			throw new Error("Invalid task data");
		}

		const transformedTasks = dtoToTasks(parsedTasks);

		return transformedTasks;
	} catch (error) {
		console.error("Error in getTasks:", error);
		throw new Error("Failed to fetch tasks");
	}
};

export default getTasks;
