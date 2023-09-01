import { Card, Select } from "antd";
import { AppButton } from "components/button/AppButton";

export const ApplicantDocument = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="Container mt-5">
      <h2>Documents (Resume, Cover letter and other document )</h2>
      <div className="my-5">
        <Select
          defaultValue="resume"
          className=""
          onChange={handleChange}
          options={[
            {
              value: "resume",
              label: "Resume",
            },
            {
              value: "coverLetter",
              label: "Cover Letter",
            },
          ]}
        />
      </div>
      <div>
        <div className="flex flex-col md:flex-row gap-4 mt-4 ">
          <Card className="text-caramel md:w-1/2 p-4">
            <a href="#" target="_blank">
              Resume
            </a>
          </Card>
          <Card className="text-caramel md:w-1/2 p-4">
            <a href="#" target="_blank">
              Resume
            </a>
          </Card>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Card className="text-caramel md:w-1/2 p-4">
            <a href="#" target="_blank">
              Resume
            </a>
          </Card>
          <Card className="text-caramel md:w-1/2 p-4">
            <a href="#" target="_blank">
              Resume
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
};
