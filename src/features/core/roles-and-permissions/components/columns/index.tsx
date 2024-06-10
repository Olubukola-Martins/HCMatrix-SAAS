import { ColumnsType } from "antd/lib/table";
import { TRole } from "../../types";
import { appRoutes } from "config/router/paths";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  PREDEFINED_LABEL_NAME_FOR_ADMIN_ROLE,
  PREDEFINED_LABEL_NAME_FOR_EMPLOYEE_ROLE,
} from "../../hooks/useFetchPermissions";

export const ROLES_TABLE_COLUMNS = (
  deleteRole: (val: TRole) => void
): ColumnsType<TRole> => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, item) => <span className="capitalize">{item.name}</span>,
  },

  {
    title: "User Count",
    dataIndex: "userCount",
    key: "userCount",
    render: (_, item) => <span className="capitalize">{item.userCount}</span>,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (val, item) => (
      <span className="">
        {moment(item.createdAt).format(DEFAULT_DATE_FORMAT)}
      </span>
    ),
  },
  {
    title: "Last Modified",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (val, item) => (
      <span className="">
        {moment(item.updatedAt).format(DEFAULT_DATE_FORMAT)}
      </span>
    ),
  },

  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, item) => {
      const hideDeleteBtn =
        item.label === PREDEFINED_LABEL_NAME_FOR_EMPLOYEE_ROLE ||
        item.label === PREDEFINED_LABEL_NAME_FOR_ADMIN_ROLE ||
        item.userCount > 0;
      const hideEditBtn = item.label === PREDEFINED_LABEL_NAME_FOR_ADMIN_ROLE;
      return (
        <div className="flex items-center gap-3 text-lg">
          {hideEditBtn ? null : (
            <Link to={appRoutes.editRole(item.id).path}>
              <i className="ri-pencil-line cursor-pointer hover:text-caramel" />
            </Link>
          )}

          {hideDeleteBtn ? null : (
            <i
              className="ri-delete-bin-line cursor-pointer hover:text-caramel"
              onClick={() => deleteRole(item)}
            />
          )}
        </div>
      );
    },
  },
];
export const ROLES_EXPORT_COLUMNS = (
  items?: TRole[]
): Record<string, string | number>[] => {
  return (
    items?.map((item) => ({
      Name: item.name,
      "User Count": item.userCount,

      "Created At": moment(item.createdAt).format(DEFAULT_DATE_FORMAT),
      "Last Modified": moment(item.updatedAt).format(DEFAULT_DATE_FORMAT),
    })) ?? []
  );
};
