import React from "react";
import { TSingleEmployeeHealthAccess } from "../../../types/employee";
import { Tabs } from "antd";

type TProps = {
  data?: Partial<
    Pick<
      TSingleEmployeeHealthAccess,
      "medicalHistory" | "medicalInfo" | "dependents"
    >
  >;
};
const SingleEmployeeHealthAccessTabs: React.FC<TProps> = ({ data }) => {
  return (
    <Tabs
      defaultActiveKey="Medical Info"
      className="tabBlackActive"
      items={[
        { key: "Medical Info", label: "Medical Info", children: <></> },
        { key: "Dependents", label: "Dependents", children: <></> },
        { key: "Medical History", label: "Medical History", children: <></> },
      ]}
    />
  );
};

export default SingleEmployeeHealthAccessTabs;
