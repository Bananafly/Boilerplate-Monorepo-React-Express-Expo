/** @format */

import type { GetTasksDto } from "@monorepo/shared";
import { PrismaClient } from "@prisma/client";

const getTasksService = async (): Promise<GetTasksDto> => {
	const prisma = new PrismaClient();

	// if (!userId) {
	//   throw new Error('userId is required');
	// }

	const tasks = await prisma.task.findMany({
		select: {
			id: true,
			name: true,
		},
	});

	return tasks;
};

export default getTasksService;
