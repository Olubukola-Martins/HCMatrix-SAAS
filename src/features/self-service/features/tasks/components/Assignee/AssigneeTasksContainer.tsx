import { TasksTable } from "../TasksTable";
import { useGetAllTasksAssignedToEmployee } from "../../hooks/assignedFor/useGetAllTasksAssignedToEmployee";
import { usePagination } from "hooks/usePagination";
import {
  TTaskStatusAndPriorityContainerProps,
  withTaskStatusAndPriorityContainer,
} from "../TaskStatusAndPriorityContainer";
import { useGetAllTasksAssignedByEmployee } from "../../hooks/assignee/useGetAllTasksAssignedByEmployee";

interface ComponentProps {
  export: () => void;
}

const Component: React.FC<
  ComponentProps & TTaskStatusAndPriorityContainerProps
> = ({ status, priority }) => {
  const { pagination, onChange } = usePagination();

  const { data, isLoading } = useGetAllTasksAssignedByEmployee({
    pagination,
    priority,
    status,
  });
  return (
    <div>
      <TasksTable
        {...{
          data: data?.data,
          loading: isLoading,
          onChange,
          pagination,
          total: data?.total,
          isTaskAssigner: true,
        }}
      />
    </div>
  );
};
const ComponentWithHOC = withTaskStatusAndPriorityContainer(Component);

export const AssigneeTasksContainer: React.FC = () => {
  return <ComponentWithHOC export={() => {}} />;
};
