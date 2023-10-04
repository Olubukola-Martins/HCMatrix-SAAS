import { Cascader, Form, Popconfirm, Skeleton, Table } from "antd";
import { AppButton } from "components/button/AppButton";
import { DeleteFilled } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { TFileAccessListItem } from "../types";
import { ColumnsType } from "antd/lib/table";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useAddAccessToFile } from "../hooks/file/access/useAddAccessToFile";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useFetchDepartments } from "features/core/departments/hooks/useFetchDepartments";
import { useFetchGroups } from "features/core/groups/hooks/useFetchGroups";
import { useFetchRoles } from "features/core/roles-and-permissions/hooks/useFetchRoles";
import { useApiAuth } from "hooks/useApiAuth";
import { QUERY_KEY_FOR_ALL_ACCESSES_TO_A_FILE } from "../hooks/file/access/useGetAllAccessToFile";
import { useRemoveAccessToFile } from "../hooks/file/access/useRemoveAccessToFile";

interface IProps {
  data?: TFileAccessListItem[];
  fileId: number;
  folderId: number;
}

export const SingleFileAccessContainer: React.FC<IProps> = ({
  data = [],
  fileId,
  folderId,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { mutate, isLoading } = useRemoveAccessToFile();
  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  const handleDelete = (id: number) => {
    mutate(
      {
        accessId: id,
        fileId,
        folderId,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          form.resetFields();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ALL_ACCESSES_TO_A_FILE],
            // exact: true,
          });
        },
      }
    );
  };
  const columns: ColumnsType<TFileAccessListItem> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <span className="capitalize">
          {item.type === "department" && item.department?.name}
          {item.type === "group" && item.group?.name}
          {item.type === "role" && item.role?.name}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (_, item) => <span className="capitalize">{item.type}</span>,
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, item) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(item.id)}
          okButtonProps={{ loading: isLoading }}
        >
          <DeleteFilled />
        </Popconfirm>
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <Table
        bordered
        columns={columns}
        pagination={false}
        dataSource={data}
        size="small"
      />
      {showAddForm && <AddAccessForm fileId={fileId} folderId={folderId} />}
      {!showAddForm && (
        <AppButton
          label="Add Access"
          handleClick={() => setShowAddForm(true)}
          type="button"
          variant="transparent"
        />
      )}
      {showAddForm && (
        <AppButton
          label="Cancel"
          handleClick={() => setShowAddForm(false)}
          type="button"
          variant="transparent"
        />
      )}
    </div>
  );
};

const AddAccessForm: React.FC<{ fileId: number; folderId: number }> = ({
  fileId,
  folderId,
}) => {
  interface AccessOption {
    value: number | string;
    label: string;
    children?: AccessOption[];
    disableCheckbox?: boolean;
  }
  const { mutate, isLoading } = useAddAccessToFile();
  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  const handleSubmit = (data: any) => {
    mutate(
      {
        fileId,
        folderId,
        data: {
          type: data.access[0],
          entityId: data.access[1],
        },
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          form.resetFields();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ALL_ACCESSES_TO_A_FILE],
            // exact: true,
          });
        },
      }
    );
  };

  const { companyId, token } = useApiAuth();
  const { data: departments, isFetching: isFetchingDepartments } =
    useFetchDepartments({
      pagination: {
        offset: 0,
        limit: 220,
      },
    });
  const { data: roles, isFetching: isFetchingRoles } = useFetchRoles({
    companyId,
    token,
    pagination: {
      offset: 0,
      limit: 220,
    },
  });
  const { data: groups, isFetching: isFetchingGroups } = useFetchGroups({
    companyId,
    token,
    pagination: {
      offset: 0,
      limit: 220,
    },
  });

  const [accessOptions, setAccessOptions] = useState<AccessOption[]>([]);

  useEffect(() => {
    if (departments && roles && groups) {
      const groupOptions: AccessOption = {
        label: "Group",
        value: "group",
        children: groups?.data?.map((item) => ({
          label: `${item.name}`,

          value: item.id as unknown as number,
        })),
      };
      const departmentOptions: AccessOption = {
        label: "Department",
        value: "department",
        children: departments?.data?.map((item) => ({
          label: `${item.name}`,
          value: item.id as unknown as number,
        })),
      };
      const roleOptions: AccessOption = {
        label: "Role",
        value: "role",
        children: roles?.data?.map((item) => ({
          label: `${item.name}`,

          value: item.id as unknown as number,
        })),
      };
      const options: AccessOption[] = [
        groupOptions,
        departmentOptions,
        roleOptions,
      ];

      setAccessOptions(options);
    }
  }, [departments, roles, groups]);
  return (
    <Skeleton
      active
      loading={isFetchingDepartments || isFetchingRoles || isFetchingGroups}
      paragraph={{ rows: 1 }}
    >
      <Form form={form} onFinish={handleSubmit} requiredMark={false}>
        <div className="flex justify-between gap-4 items-center">
          <Form.Item
            labelCol={{ span: 24 }}
            rules={generalValidationRules}
            name="access"
            label="Access"
            className="flex-1"
          >
            <Cascader
              options={accessOptions}
              allowClear
              showCheckedStrategy="SHOW_CHILD"
            />
          </Form.Item>
          <div className="mt-4">
            <AppButton label="Save" isLoading={isLoading} type="submit" />
          </div>
        </div>
      </Form>
    </Skeleton>
  );
};
