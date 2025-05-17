import type { GetTasksDto } from "@monorepo/shared";

export function dtoToTasks(dtos: GetTasksDto): TaskListItem[] {
	return dtos.map((dto) => ({
		id: dto.id,
		name: dto.name,
	}));
}

export type TaskListItem = {
	id: string;
	name: string;
};
