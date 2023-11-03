import { Button, Form, Input, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { TLoanType } from "../../../types";
import { DeleteLoanType } from "./DeleteLoanType";
import { QUERY_KEY_FOR_LOAN_TYPES } from "../../../hooks/type/useGetLoanTypes";
import { useUpdateLoanType } from "../../../hooks/type/useUpdateLoanType";

interface IProps {
  data?: TLoanType[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TLoanType>["onChange"];
  total?: number;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "text";
  record: TLoanType;
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
    inputType === "text" ? (
      <Input value={record.name} placeholder="Name" />
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

type TAction = "delete";

const LoanTypeTable = ({
  data = [],
  loading,
  pagination,
  onChange,
  total,
}: IProps) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  const { mutate, isLoading } = useUpdateLoanType();

  const [editingKey, setEditingKey] = useState<number>();
  const isEditing = (record: TLoanType) => record.id === editingKey;
  const edit = (record: Partial<TLoanType> & { id: React.Key }) => {
    form.setFieldsValue({ isLead: false, ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(undefined);
  };
  const [action, setAction] = useState<TAction>();
  const [selectedType, setSelectedType] = useState<TLoanType>();
  const handleDelete = (props: { type: TLoanType }) => {
    setAction("delete");
    setSelectedType(props.type);
  };
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as TLoanType;

      const member = data?.find(
        (item) => item.id === key
      ) as unknown as TLoanType;

      mutate(
        {
          id: member.id,
          body: {
            name: row.name,
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

            // form.resetFields(); //will be added if it was empty vals under to prevent it from being used in the row below on edit
            cancel();

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_LOAN_TYPES],
              // exact: true,
            });
          },
        }
      );
    } catch (errInfo) {}
  };
  const ogColumns: ColumnsType<TLoanType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => item.name,
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 40,
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
              <>
                <i className="ri-pencil-line cursor-not-allowed text-slate-200" />
              </>
            )}
            <i
              className="ri-delete-bin-line cursor-pointer"
              onClick={() => handleDelete({ type: item })}
            />
          </div>
        );
      },
    },
  ];
  const columns = ogColumns;
  const mergedColumns = columns.map((col) => {
    if (col.key !== "name") {
      return col;
    }
    return {
      ...col,
      onCell: (record: TLoanType) => ({
        record,
        inputType: col.key === "name" ? "text" : null,
        dataIndex: col.key,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      {selectedType && (
        <DeleteLoanType
          handleClose={() => setAction(undefined)}
          open={action === "delete"}
          type={selectedType}
        />
      )}

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
          pagination={{ ...pagination, total }}
          onChange={onChange}
        />
      </Form>
    </>
  );
};

export default LoanTypeTable;
