import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TDepartment } from "../../../../AppTypes/DataEntitities";
import {
  Pagination,
  TableProps,
  TablePaginationConfig,
  Dropdown,
  Menu,
} from "antd";
import type { PaginationProps } from "antd";

interface IProps {
  departments: TDepartment[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange: PaginationProps["onChange"];
  editDepartment: (val: number) => void;
}

export const DepartmentsGridView = ({
  departments,
  loading,
  pagination,
  onChange,
  editDepartment,
}: IProps) => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
        {departments.map((item) => (
          <DepartmentBox
            key={item.id}
            department={item}
            editDepartment={editDepartment}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Pagination {...pagination} onChange={onChange} size="small" />
      </div>
    </div>
  );
};

const DepartmentBox = ({
  department,
  editDepartment,
}: {
  department: TDepartment;
  editDepartment: (val: number) => void;
}) => {
  return (
    <>
      {/* view */}

      <div className="border px-4 py-2 rounded-lg grid grid-cols-1 gap-4 border-caramel">
        <div className="flex justify-between">
          <h6 className="text-xl font-thin capitalize">{department.name}</h6>

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => editDepartment(department.id)}>
                  Edit
                </Menu.Item>
                <Menu.Item>Delete</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <i className="fa-solid fa-ellipsis cursor-pointer"></i>
          </Dropdown>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">{department.email}</p>
          <div className="rounded-full bg-caramel h-6 w-6 flex items-center justify-center ">
            <span className="text-sm">{department.employeeCount}</span>
          </div>
        </div>
      </div>
    </>
  );
};
