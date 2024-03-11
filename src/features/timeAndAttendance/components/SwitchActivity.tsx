import { Form, Modal } from 'antd'
import { AppButton } from 'components/button/AppButton';
import { useContext } from 'react'
import { useQueryClient } from 'react-query';
import { GlobalContext } from 'stateManagers/GlobalContextProvider';
import { IModalProps } from 'types'

export const SwitchActivity = ({ handleClose, open }: IModalProps) => {
    const globalCtx = useContext(GlobalContext);
    const { dispatch } = globalCtx;
    const queryClient = useQueryClient();
    const [form] = Form.useForm();

    const onSubmit = (values: any) => {
      
    }

  return (
    <Modal
    title="Go on Break"
    open={open}
    onCancel={() => handleClose()}
    footer={null}
    style={{ top: 10 }}
  >
    <Form
      layout="vertical"
      requiredMark="optional"
      form={form}
      onFinish={onSubmit}
    >
      {/* <Form.Item
        name="breakPolicyId"
        label="Type of Break"
        rules={generalValidationRules}
      >
        <Select
          allowClear
          showSearch
          onClear={() => setSearchTerm("")}
          onSearch={handleSearch}
          loading={breakPolicyLoad}
          placeholder="Select"
        >
          {isSuccess ? (
            breakPolicyData?.data.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))
          ) : (
            <div className="flex justify-center items-center w-full">
              <Spin size="small" />
            </div>
          )}
        </Select>
      </Form.Item> */}
      <AppButton label="Submit" type="submit" isLoading={false} />
    </Form>
  </Modal>
  )
}
