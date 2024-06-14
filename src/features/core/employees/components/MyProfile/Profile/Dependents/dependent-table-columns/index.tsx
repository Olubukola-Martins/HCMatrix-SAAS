import { ColumnsType } from "antd/lib/table";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { TSingleEmployee } from "features/core/employees/types";
import dayjs from "dayjs";


export const generateEmployeeHealthAccessDependantColumns = ({
  handleDelete,
  handleEdit,
}: {
  handleDelete: (item: TSingleEmployee["dependents"][0]) => void;
  handleEdit: (item: TSingleEmployee["dependents"][0]) => void;
}): ColumnsType<TSingleEmployee["dependents"][0]> => {
  const columns: ColumnsType<TSingleEmployee["dependents"][0]> = [
    {
      title: "Name",
      dataIndex: "fullName",
      render: (_, val) => <span className="capitalize">{val.fullName}</span>,
    },
    {
      title: "Date Of Birth",
      dataIndex: "dob",
      render: (_, val) => dayjs(val.dob).format(DEFAULT_DATE_FORMAT),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      render: (_, val) => <span className="">+{val?.phoneNumber}</span>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, val) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line text-lg cursor-pointer"
            onClick={() => handleEdit(val)}
          />
          <i
            className="ri-delete-bin-line text-xl cursor-pointer"
            onClick={() => handleDelete(val)}
          />
        </div>
      ),
    },
  ];
  return columns;
};
export const generateEmployeeDependantColumns = ({
  handleDelete,
  handleEdit,
}: {
  handleDelete: (item: TSingleEmployee["dependents"][0]) => void;
  handleEdit: (item: TSingleEmployee["dependents"][0]) => void;
}): ColumnsType<TSingleEmployee["dependents"][0]> => {
  const columns: ColumnsType<TSingleEmployee["dependents"][0]> = [
    {
      title: "Name",
      dataIndex: "fullName",
      render: (_, val) => <span className="capitalize">{val.fullName}</span>,
    },
    {
      title: "Date Of Birth",
      dataIndex: "dob",
      render: (_, val) => dayjs(val.dob).format(DEFAULT_DATE_FORMAT),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      render: (_, val) => <span className="">+{val?.phoneNumber}</span>,
    },
    {
      title: "Relationship",
      dataIndex: "relationship",
      render: (_, val) => (
        <span className="capitalize">{val.relationship}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, val) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line text-lg cursor-pointer"
            onClick={() => handleEdit(val)}
          />
          <i
            className="ri-delete-bin-line text-xl cursor-pointer"
            onClick={() => handleDelete(val)}
          />
        </div>
      ),
    },
  ];
  return columns;
};
