import { TasksTable } from "../TasksTable";
import { useGetAllTasksAssignedToEmployee } from "../../hooks/assignedFor/useGetAllTasksAssignedToEmployee";
import { usePagination } from "hooks/usePagination";
import {
  TTaskStatusAndPriorityContainerProps,
  withTaskStatusAndPriorityContainer,
} from "../TaskStatusAndPriorityContainer";

interface ComponentProps {
  export: () => void;
}

const Component: React.FC<
  ComponentProps & TTaskStatusAndPriorityContainerProps
> = ({ status, priority }) => {
  const { pagination, onChange } = usePagination();
  const { data, isLoading } = useGetAllTasksAssignedToEmployee({
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
        }}
      />
    </div>
  );
};
const ComponentWithHOC = withTaskStatusAndPriorityContainer(Component);

export const AssignedForTasksContainer: React.FC = () => {
  return <ComponentWithHOC export={() => {}} />;
};
