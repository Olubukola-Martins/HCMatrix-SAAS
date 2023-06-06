import { DatePicker, Form, Input, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { AppButton } from "components/button/AppButton";
import moment from "moment";
import { useGetSingleAssetRequisition } from "../../requisitions/hooks/asset/useGetSingleAssetRequisition";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { boxStyle } from "styles/reused";

interface IProps extends IModalProps {
  id: number;
}

export const AssetRequestDetails: React.FC<IProps> = ({
  open,
  handleClose,
  id,
}) => {
  const { companyId, token } = useApiAuth();
  const [form] = Form.useForm();
  const { data, isFetching } = useGetSingleAssetRequisition({
    id,
    companyId,
    token,
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        date: data.date ? moment(data.date) : null,
        employee: getEmployeeFullName(data.employee),
        asset: data.asset.name,
        description: data.description,
      });
    }
  }, [id, form, data]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Asset Request Details"}
      style={{ top: 20 }}
    >
      <Skeleton active loading={isFetching} paragraph={{ rows: 8 }}>
        <Form form={form} disabled layout="vertical">
          <Form.Item name={"date"} label="Date">
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item name={"employee"} label="Employee">
            <Input />
          </Form.Item>
          <Form.Item name={"asset"} label="Asset">
            <Input />
          </Form.Item>
          <Form.Item name={"description"} label="Description">
            <Input.TextArea />
          </Form.Item>
          {data?.attachmentUrls && data?.attachmentUrls.length > 0 && (
            <div className={boxStyle}>
              {data?.attachmentUrls.map((item, i) => (
                <a
                  href={item}
                  className="mb-2 text-sm underline text-caramel hover:no-underline"
                >
                  Document {i + 1}
                </a>
              ))}
            </div>
          )}
        </Form>
        <div className="flex justify-end">
          <AppButton label="Download" type="button" />
        </div>
      </Skeleton>
    </Modal>
  );
};
