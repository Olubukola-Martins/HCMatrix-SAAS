import { Select } from "antd";
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
        <button className="bg-white rounded text-caramel p-1 ml-4 hover:underline underline-offset-8">
          Download
        </button>
      </div>
      <div className="border border-[rgba(58, 58, 58, 0.30)] h-96 rounded overflow-y-scroll"></div>
    </div>
  );
};
