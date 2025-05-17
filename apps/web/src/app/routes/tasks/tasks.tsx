/** @format */

import useTaskData from "@/api/tasks/get-tasks/use-task-data";
import { Spinner } from "@/components/ui/spinner/spinner";

export function TasksPage() {
  const { tasks, isLoading, error } = useTaskData();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <h1>Tasks</h1>
      {tasks.map((task) => (
        <div key={task.id}>
          {task.name} with id {task.id}
        </div>
      ))}
    </div>
  );
}
