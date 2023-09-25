import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { Tabs } from "antd";
import { AssignedForTasksContainer } from "./AssignedFor/AssignedForTasksContainer";
import { AssigneeTasksContainer } from "./Assignee/AssigneeTasksContainer";
import { AddTask } from "./AddTask";

export const TasksContainer = () => {
  const [showM, setShowM] = useState(false);
  const tabItems = [
    {
      key: "My Tasks",
      label: "My Tasks",
      children: <AssignedForTasksContainer key="My Tasks" />,
    },
    {
      key: "Assigned Tasks",
      label: "Assigned Tasks",
      children: <AssigneeTasksContainer key="Assigned Tasks" />,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <AddTask open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`Assign tasks to your new employees easily`}
        actions={[{ name: "Add Task", handleClick: () => setShowM(true) }]}
      />
      <Tabs items={tabItems} />
    </div>
  );
};
