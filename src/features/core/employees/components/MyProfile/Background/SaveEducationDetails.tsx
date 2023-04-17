import { DatePicker, Drawer, Form, Input } from "antd";
import { IAuthDets } from "features/authentication/types";
import { useSaveEmployeeEducationDetail } from "features/core/employees/hooks/useSaveEmployeeEducationDetail";
import { TEducationDetail } from "features/core/employees/types";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";
import { useContext, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import { GlobalContext } from "stateManagers/GlobalContextProvider";
import { IDrawerProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

interface IProps extends IDrawerProps {
  employeeId?: number;
  educationDetail?: TEducationDetail;
}

export const SaveEducationDetails = ({
  open,
  handleClose,
  employeeId,
  educationDetail,
}: IProps) => {
  const { mutate, isLoading } = useSaveEmployeeEducationDetail();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();

  useEffect(() => {
    if (educationDetail) {
      form.setFieldsValue({
        ...educationDetail,
        duration: [
          moment(educationDetail.startDate),
          moment(educationDetail.endDate),
        ],
      });
    } else {
      form.resetFields();
    }
  }, [educationDetail, form]);
  const handleFinish = (data: any) => {
    if (companyId && employeeId) {
      mutate(
        {
          companyId,

          token,
          employeeId: employeeId,

          endDate: data.duration[1].format("YYYY/MM/DD"),
          specialization: data.specialization,
          degree: data.degree,
          school: data.school,
          startDate: data.duration[0].format("YYYY/MM/DD"),
          detailId: educationDetail?.id,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res?.data?.message,
            });
            queryClient.invalidateQueries({
              queryKey: ["single-employee", employeeId],
              // exact: true,
            });
            if (!educationDetail) form.resetFields();
            handleClose();
          },
        }
      );
    }
  };
  return (
    <Drawer
      title={educationDetail ? "Edit Education Detail" : "Add Education Detail"}
      placement="right"
      onClose={() => handleClose()}
      open={open}
      className="drawerBg"
    >
      <Form
        layout="vertical"
        className="mt-5"
        requiredMark={false}
        onFinish={handleFinish}
        form={form}
      >
        <Form.Item name="school" label="School" rules={generalValidationRules}>
          <Input className="generalInputStyle" placeholder="Enter School" />
        </Form.Item>
        <Form.Item name="degree" label="Degree" rules={generalValidationRules}>
          <Input className="generalInputStyle" placeholder="Enter Degree" />
        </Form.Item>
        <Form.Item
          name="specialization"
          label="Specialization"
          rules={generalValidationRules}
        >
          <Input
            className="generalInputStyle"
            placeholder="Enter Specialization"
          />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration"
          rules={generalValidationRules}
        >
          <DatePicker.RangePicker
            placeholder={["Start Date", "End Date"]}
            format="YYYY/MM/DD"
            className="generalInputStyle"
          />
        </Form.Item>

        <button className="button" type="submit">
          {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
        </button>
      </Form>
    </Drawer>
  );
};
