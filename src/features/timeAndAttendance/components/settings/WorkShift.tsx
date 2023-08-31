import "../../assets/style.css";
import { Checkbox, Form, TimePicker } from "antd";
import { AppButton } from "components/button/AppButton";

export const WorkShift = () => {
  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  // {
  //   workDaysAndTime: [   day: "";
  //   startTime:"";
  //   endTime:"";
  //   hours: "";
  //   shift: ""];
  // }
  return (
    <div>
      <Form onFinish={onFinish}>
        <div className="flex items-center flex-wrap gap-6">
          <h4 className="text-base font-medium">Hours</h4>
          <div className="flex items-center flex-wrap md:ml-20">
            <div className="shiftBox">
              <Checkbox>Morning</Checkbox>
            </div>
            <div className="shiftBox">
              <Checkbox>Afternoon</Checkbox>
            </div>
            <div className="shiftBox">
              <Checkbox>Night</Checkbox>
            </div>
          </div>
        </div>
        <p className="py-4">
          Checkbox the working days, input the time frame for each shift.
        </p>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          <div>
            <button className="px-3 py-2 bg-card border shadow-sm rounded-md font-medium mb-5">
              Morning
            </button>
            <Form.List name="users" initialValue={[{}]}>
              {(fields) => (
                <>
                  {fields.map((field, index) => (
                    <>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Mon</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Tues</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Wed</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Thurs</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Fri</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Sat</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Sun</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                    </>
                  ))}
                </>
              )}
            </Form.List>
          </div>

          {/* Afternoon */}
          <div>
            <button className="px-3 py-2 bg-card border shadow-sm rounded-md font-medium mb-5">
              Afternoon
            </button>
            <Form.List name="users" initialValue={[{}]}>
              {(fields) => (
                <>
                  {fields.map((field, index) => (
                    <>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Mon</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Tues</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Wed</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Thurs</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Fri</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Sat</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Sun</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                    </>
                  ))}
                </>
              )}
            </Form.List>
          </div>
          {/* Night */}
          <div>
            <button className="px-3 py-2 bg-card border shadow-sm rounded-md font-medium mb-5">
              Night
            </button>
            <Form.List name="users" initialValue={[{}]}>
              {(fields) => (
                <>
                  {fields.map((field, index) => (
                    <>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Mon</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Tues</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Wed</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Thurs</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Fri</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Sat</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                      <div className="flex items-center gap-2">
                        <Form.Item
                          name={[field.name, "agreement"]}
                          valuePropName="checked"
                        >
                          <Checkbox>Sun</Checkbox>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={field.key}
                          name={[field.name, "monday"]}
                        >
                          <TimePicker.RangePicker />
                        </Form.Item>
                      </div>
                    </>
                  ))}
                </>
              )}
            </Form.List>
          </div>
        </div>
        <div className="flex gap-3">
          <AppButton label="Upload Template" />
          <AppButton type="submit" />
        </div>
      </Form>
    </div>
  );
};
