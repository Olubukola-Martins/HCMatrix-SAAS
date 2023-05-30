import { Avatar, Button, Form, Input, Switch, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { useRemoveMemberFromGroup } from "../hooks/useRemoveMemberFromGroup";
import { useUpdateMemberInGroup } from "../hooks/useUpdateMemberInGroup";
import { TGroup, TGroupMember } from "../types";
import { useApiAuth } from "hooks/useApiAuth";

interface IProps {
  group: TGroup;
  data?: TGroupMember[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TGroupMember>["onChange"];
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "text" | "switch";
  record: TGroupMember;
  index: number;
  children: React.ReactNode;
}
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "switch" ? (
      <Switch
        unCheckedChildren="No"
        checkedChildren="Yes"
        defaultChecked={record.isLead}
      />
    ) : (
      <Input />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const GroupMembers = ({
  group,
  data,
  loading,
  pagination,
  onChange,
}: IProps) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { token, companyId } = useApiAuth();

  const { mutate, isLoading } = useUpdateMemberInGroup();

  const [editingKey, setEditingKey] = useState<number>();
  const isEditing = (record: TGroupMember) => record.id === editingKey;
  const edit = (record: Partial<TGroupMember> & { id: React.Key }) => {
    form.setFieldsValue({ isLead: false, ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(undefined);
  };
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as TGroupMember;

      const member = data?.find(
        (item) => item.id === key
      ) as unknown as TGroupMember;
      if (companyId && group) {
        mutate(
          {
            id: group.id as number,
            companyId,

            token,
            managementId: member.id,
            employeeId: member.employeeId,
            isLead: row.isLead,
          },
          {
            onError: (err: any) => {
              openNotification({
                state: "error",
                title: "Error Occurred",
                description:
                  err?.response.data.message ??
                  err?.response.data.error.message,
              });
            },
            onSuccess: (res: any) => {
              openNotification({
                state: "success",

                title: "Success",
                description: res.data.message,
                // duration: 0.4,
              });

              // form.resetFields(); //will be added if it was empty vals under to prevent it from being used in the row below on edit
              cancel();

              queryClient.invalidateQueries({
                queryKey: ["single-group-members", group.id],
                // exact: true,
              });
            },
          }
        );
      }
    } catch (errInfo) {}
  };
  const columns: ColumnsType<TGroupMember> = [
    {
      title: "",
      dataIndex: "Avatar",
      key: "Avatar",
      render: (_, item) => <Avatar src={item.avatarUrl} shape="circle" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => item.firstName + " " + item.lastName,
    },
    {
      title: "Is a Lead",
      dataIndex: "isLead",
      key: "isLead",
      render: (val) => (val ? "Yes" : "No"),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, item) => {
        const editable = isEditing(item);
        return editable ? (
          <div className="flex gap-4">
            <Button
              onClick={() => save(item.id)}
              type="text"
              loading={isLoading}
            >
              <span className="capitalize text-caramel cursor-pointer">
                Save
              </span>
            </Button>
            <Button onClick={() => cancel()} type="text">
              <span>Cancel</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-lg">
            {!editingKey ? (
              <i
                className="ri-pencil-line cursor-pointer hover:text-caramel"
                onClick={() => edit(item)}
              />
            ) : (
              <i className="ri-pencil-line cursor-not-allowed text-slate-200" />
            )}
            {deleteKey !== item.id && (
              <i
                className="ri-delete-bin-line cursor-pointer hover:text-caramel"
                onClick={() => handleMemberRemoval(item)}
              />
            )}

            {isDeleteLoading && deleteKey === item.id && <LoadingOutlined />}
          </div>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (col.key !== "isLead") {
      return col;
    }
    return {
      ...col,
      onCell: (record: TGroupMember) => ({
        record,
        inputType: col.key === "isLead" ? "switch" : "text",
        dataIndex: col.key,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const { mutate: deleteMutate, isLoading: isDeleteLoading } =
    useRemoveMemberFromGroup();
  const [deleteKey, setDeleteKey] = useState<number>();
  const handleMemberRemoval = (member: TGroupMember) => {
    setDeleteKey(member.id);
    if (companyId && group) {
      deleteMutate(
        {
          id: group.id as number,
          companyId,

          token,
          managementId: member.id,
          employeeId: member.employeeId,
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

            // form.resetFields(); //will be added if it was empty vals under to prevent it from being used in the row below on edit
            setDeleteKey(undefined);

            queryClient.invalidateQueries({
              queryKey: ["single-group-members", group.id],
              // exact: true,
            });
          },
        }
      );
    }
  };

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        columns={mergedColumns as any}
        size="small"
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
    </Form>
  );
};
