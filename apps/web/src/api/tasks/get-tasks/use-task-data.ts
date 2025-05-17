import { useSession } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

import getTasks from "./get-tasks";
import type { TaskListItem } from "./transform";

export default function useTaskData() {
	const { session } = useSession();

	const fetchTasksWithToken = async () => {
		if (!session) {
			throw new Error("No session available");
		}

		const token = await session.getToken();
		if (!token) {
			throw new Error("No token available");
		}

		const data = await getTasks(token);
		return data;
	};
	const queryKey = ["taskList"];
	const {
		data: tasks = [],
		error,
		refetch,
		isLoading,
	} = useQuery<TaskListItem[], Error>({
		queryKey,
		queryFn: fetchTasksWithToken,
		enabled: !!session,
	});

	return { tasks, error, refetch, isLoading };
}
