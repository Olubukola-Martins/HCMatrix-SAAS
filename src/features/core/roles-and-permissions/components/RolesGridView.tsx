import { Link } from "react-router-dom";
import { TablePaginationConfig, Pagination, Skeleton } from "antd";
import type { PaginationProps } from "antd";
import dayjs from "dayjs";
import { appRoutes } from "config/router/paths";
import { TRole } from "../types";
import { motion } from "framer-motion";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import AppTooltip from "components/tooltip/AppTooltip";
import {
  PREDEFINED_LABEL_NAME_FOR_EMPLOYEE_ROLE,
  PREDEFINED_LABEL_NAME_FOR_ADMIN_ROLE,
} from "../hooks/useFetchPermissions";

interface IProps {
  data?: TRole[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onChange: PaginationProps["onChange"];
  deleteRole: (item: TRole) => void;
}

export const RolesGridView = ({
  data,
  loading,
  pagination,
  onChange,
  deleteRole,
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-10 gap-y-5">
          {data?.map((item) => (
            <RoleBox key={item.id} data={item} deleteRole={deleteRole} />
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Pagination {...pagination} onChange={onChange} size="small" />
        </div>
      </motion.div>
    </Skeleton>
  );
};

const RoleBox = ({
  data,
  deleteRole,
}: {
  data: TRole;
  deleteRole: (item: TRole) => void;
}) => {
  const hideDeleteBtn =
    data.label === PREDEFINED_LABEL_NAME_FOR_EMPLOYEE_ROLE ||
    data.label === PREDEFINED_LABEL_NAME_FOR_ADMIN_ROLE ||
    data.userCount > 0;
  const hideEditBtn = data.label === PREDEFINED_LABEL_NAME_FOR_ADMIN_ROLE;
  // TO DO : apply logic to edit Role page
  return (
    <>
      {/* view */}
      <div className="rounded border shadow bg-mainBg">
        <div className="bg-card p-3 flex justify-between items-center">
          <h4 className="font-medium text-lg">{data.name}</h4>
          <div className="flex gap-2 text-lg">
            {hideEditBtn ? null : (
              <Link to={appRoutes.editRole(data.id).path}>
                <i className="ri-pencil-line cursor-pointer hover:text-caramel" />
              </Link>
            )}
            {hideDeleteBtn ? null : (
              <i
                className="ri-delete-bin-line cursor-pointer hover:text-caramel"
                onClick={() => deleteRole(data)}
              />
            )}
          </div>
        </div>
        <div className="px-3">
          <div className="border-b flex gap-5 text-sm">
            <div className="py-7">
              <p className="pb-2">
                Date Created:{" "}
                {dayjs(data.createdAt).format(DEFAULT_DATE_FORMAT)}
              </p>
              <p>
                Last Modified:{" "}
                {dayjs(data.updatedAt).format(DEFAULT_DATE_FORMAT)}
              </p>
            </div>
            <div className="border-r-2" />
            <div className="py-7">
              <p className="pb-2">Number of Record</p>
              <span className="bg-card px-3 rounded-lg font-medium">
                {data.userCount}
              </span>
            </div>
          </div>

          <div className="py-4">
            <AppTooltip
              tooltipProps={{
                title: (
                  <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-semibold">
                      You can set-up permissions from here
                    </h4>
                  </div>
                ),
              }}
            >
              <Link
                to={appRoutes.editRole(data.id).path}
                className="rounded-xl font-medium py-1 px-2 my-5 text-green-700 text-xs bg-green-100 cursor-pointer"
              >
                Set-up Permission
              </Link>
            </AppTooltip>
          </div>
        </div>
      </div>
    </>
  );
};
