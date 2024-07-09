import { Form, Input, Modal } from 'antd';
import { AppButton } from 'components/button/AppButton';
import { IModalProps } from 'types';
import { generalValidationRules } from 'utils/formHelpers/validation';

export const SetupTwoFA = ({ open, handleClose }: IModalProps) => {
    const [form] = Form.useForm();

    const handleFormSubmit = (values: any) => {
      console.log(values);
    };
  return (
    <Modal
      open={open}
      footer={null}
      onCancel={() => handleClose()}
      title={`Enable Two-Factor Authentication`}
    >
      <div className=" pt-5">
       <p>1. To enable 2FA, you need to install an authenticator app like Authy, or Google Authenticator.</p>
       <p className='pt-3'>2. Scan the QR Code below with your authenticator app. If you can't scan this barcode, enter the text code (CBSRYISEBBJWW3R3) on the authenticator app instead.</p>

       <div>
        
       </div>

        {/* <Form
          onFinish={handleFormSubmit}
          form={form}
          layout="vertical"
          className="mt-4"
          requiredMark={false}
        >
          <Form.Item name="digits" rules={generalValidationRules}>
            <Input.OTP formatter={(str) => str.toUpperCase()} />
          </Form.Item>

          <div className="flex justify-between mt-3">
           
            <AppButton label="Disable" type="submit" />
          </div>
        </Form> */}
      </div>
    </Modal>
  )
}
