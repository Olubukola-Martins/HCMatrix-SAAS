import { DatePicker, Drawer, Form, TimePicker } from 'antd'
import { AppButton } from 'components/button/AppButton'
import { FormEmployeeInput } from 'features/core/employees/components/FormEmployeeInput'
import { IDrawerProps } from 'types'

export const FilterUploadedAttendance = ({ handleClose, open }: IDrawerProps) => {

  return (
    <Drawer title="Filter Time sheet" open={open} onClose={() => handleClose()}>
    <Form layout="vertical" requiredMark={false}>
      <FormEmployeeInput
        Form={Form}
        control={{ name: "employee", label: "Select Employee" }}
        mode="multiple"
      />
      <Form.Item name="date" label="Date">
        <DatePicker.RangePicker className="w-full" />
      </Form.Item>
      <Form.Item name="time" label="Time">
        <TimePicker.RangePicker
          className="w-full"
          placeholder={["Time In", "Time Out"]}
        />
      </Form.Item>

      <AppButton label="Apply" type="submit" />
    </Form>
  </Drawer>
  )
}
