import { DatePicker, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

const CandidateInfo = () => {
  const { RangePicker } = DatePicker;
  return (
    <Form layout="vertical" className="flex flex-col gap-y-3">
      <div className="bg-gray-100 w-full py-2 px-10 grid grid-cols-2 justify-between gap-y-1 gap-x-14">
        <FormItem label={"Experience"} className="col-span-2 sm:col-span-1 ">
          <Input value={"SNAPNET NIGERIA LIMITED"} className="bg-white cursor-not-allowed" />
        </FormItem>
        <FormItem className="col-span-2 sm:col-span-1" label=" ">
          <Input value={"xyz.example.com"} contentEditable={false} className="cursor-not-allowed" />
        </FormItem>
        <FormItem className="col-span-2 sm:col-span-1" label="Duration">
          <RangePicker disabled={true} defaultValue={[dayjs("2015/01/01", "YYYY/MM/DD"), dayjs("2015/01/01", "YYYY/MM/DD")]} />
        </FormItem>
        <FormItem label="Role" className="col-span-2">
          <TextArea rows={3} className="cursor-not-allowed" value={"Software Engineer"} contentEditable={false} />
        </FormItem>
      </div>

      <div className="bg-gray-100 w-full py-2 px-10 grid grid-cols-2 justify-between gap-y-1 gap-x-14">
        <FormItem label={"Education"} className="col-span-2 sm:col-span-1 ">
          <Input value={"University of Lagos"} className="bg-white cursor-not-allowed" />
        </FormItem>
        <FormItem className="col-span-2 sm:col-span-1" label=" ">
          <Input value={"B.Sc Accounting"} contentEditable={false} className="cursor-not-allowed" />
        </FormItem>
        <FormItem label={"Date"} className="col-span-2 sm:col-span-1 ">
          <DatePicker allowClear={false} value={dayjs("2015/01/01", "YYYY/MM/DD")} className="bg-white cursor-not-allowed" />
        </FormItem>
        <FormItem className="col-span-2 sm:col-span-1" label=" ">
          <Input value={"First Class Honour"} contentEditable={false} className="cursor-not-allowed" />
        </FormItem>
      </div>

      <div className="bg-gray-100 w-full py-2 px-10 grid grid-cols-2 justify-between gap-y-1 gap-x-14">
        <FormItem label={"Website, Blog or Portfolio URL"} className="col-span-2 w-full">
          <div className="rounded-md bg-white border py-1 pl-3 text-caramel w-full">
            <a href="https://www.website.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer underline">
              www.website.com
            </a>
          </div>
        </FormItem>
      </div>
      <div className="bg-gray-100 w-full py-2 px-10 grid grid-cols-2 justify-between gap-y-1 gap-x-14">
        <FormItem label={"LinkedIn URL"} className="col-span-2 w-full">
          <div className="rounded-md bg-white border py-1 pl-3 text-caramel w-full">
            <a href="https://www.LinkedIn/Profile/you.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer underline">
              www.LinkedIn/Profile/you.com
            </a>
          </div>
        </FormItem>
      </div>

      <div className="bg-gray-100 w-full py-2 px-10 grid grid-cols-2 justify-between gap-y-1 gap-x-14">
        <FormItem label="Why do you want to work for SNAPNET NIGERIA LIMITED?" className="col-span-2">
          <TextArea rows={3} className="cursor-not-allowed" value={"Lorem ipsum dolor sit amet consectetur. Eu tristique venenatis aliquet amet convallis. Vulputate velit ut consectetur tortor mi at amet egestas in. Lorem ipsum dolor sit amet consectetur."} contentEditable={false} />
        </FormItem>
      </div>
    </Form>
  );
};

export default CandidateInfo;
