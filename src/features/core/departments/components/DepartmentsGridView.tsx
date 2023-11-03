import {
  Pagination,
  TablePaginationConfig,
  Dropdown,
  Menu,
  Skeleton,
} from "antd";
import type { PaginationProps } from "antd";
import { TDepartment } from "../types";
import { motion } from "framer-motion";

interface IProps {
  data?: TDepartment[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onChange: PaginationProps["onChange"];
  editDepartment: (val: TDepartment) => void;
  viewDepartment: (val: TDepartment) => void;
  deleteDepartment: (val: TDepartment) => void;
}

export const DepartmentsGridView = ({
  data,
  loading,
  pagination,
  onChange,
  editDepartment,
  deleteDepartment,
  viewDepartment,
}: IProps) => {
  return (
    <Skeleton loading={loading} paragraph={{ rows: 20 }}>
      <motion.div
        className="mt-4 flex flex-col gap-4"
        initial={{ opacity: 0, y: 400 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        key={0}
        transition={{ ease: "easeIn" }}
        exit={{ opacity: 0, y: 400 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
          {data?.map((item) => (
            <DepartmentBox
              key={item.id}
              department={item}
              editDepartment={editDepartment}
              deleteDepartment={deleteDepartment}
              viewDepartment={viewDepartment}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Pagination {...pagination} onChange={onChange} size="small" />
        </div>
      </motion.div>
    </Skeleton>
  );
};

const DepartmentBox = ({
  department,
  editDepartment,
  deleteDepartment,
  viewDepartment,
}: {
  department: TDepartment;
  editDepartment: (val: TDepartment) => void;
  viewDepartment: (val: TDepartment) => void;
  deleteDepartment: (val: TDepartment) => void;
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
                <Menu.Item onClick={() => editDepartment(department)}>
                  Edit
                </Menu.Item>
                <Menu.Item onClick={() => viewDepartment(department)}>
                  View
                </Menu.Item>
                <Menu.Item onClick={() => deleteDepartment(department)}>
                  Delete
                </Menu.Item>
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
