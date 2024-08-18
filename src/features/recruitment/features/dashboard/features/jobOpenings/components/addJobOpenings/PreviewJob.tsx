import { Drawer, Skeleton } from "antd";
import { UseWindowWidth } from "features/timeAndAttendance/hooks/UseWindowWidth";
import { IjobOpeningForm } from "../../types";
import { DateFormatter } from "../../utils/functionHelpers";
import { WORK_MODELS } from "constants/general";
import { benefitsData } from "../../utils/mockData";

const PreviewJob = ({ onClose, open, formValues }: { onClose: () => void; open: boolean; formValues?: IjobOpeningForm }) => {
  const { drawerSize } = UseWindowWidth();

  // const experienceType = experncTypData?.find((item) => item.label === formValues?.minimumExperience)?.name;
  // const employmentType = employTypData?.find((item) => item.label === formValues?.employmentType)?.name;
  // const benefitsList = formValues?.addBenefit?.map((item) => benefits?.find((data) => item === data.label)?.name);
  const jobLocation = WORK_MODELS.find((item) => item.value === formValues?.jobLocation)?.label;
  const expiryDate = typeof formValues?.expiryDate === "string" ? formValues?.expiryDate : DateFormatter(formValues?.expiryDate?._d as string);

  return (
    <div>
      <Drawer title="Job Opening Preview" placement="right" onClose={onClose} open={open} size={drawerSize}>
        <Skeleton
          active
          //   loading={expperienceLoading || employmentsLoading || benefitsLoading}
        >
          <div className="px-1 flex flex-col gap-2.5 md:gap-4">
            <div>
              <h2 className="text-xl font-bold">{formValues?.jobTitle}</h2>
              <p>
                {/* {employmentType} ~ {jobLocation} */}
                Remote ~ {jobLocation}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base">Full Job Description</h3>
              <p>{formValues?.jobDescription} </p>
            </div>

            <div>
              <p>
                <span className="font-semibold">Job Type: </span>
                {/* {employmentType} */}
                Remote
              </p>
              <p>
                <span className="font-semibold">Pay: </span>
                {formValues?.compensation}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base">Benefits</h3>
              <ul className="list-disc pl-5">
                {/* {benefitsList?.map((benefit) => (
                  <li>{benefit}</li>
                ))} */}
                {benefitsData?.map((benefit) => (
                  <li>{benefit.label}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base">Experience Level</h3>
              <ul>
                {/* <li>{experienceType}</li> */}
                <li>3 Years</li>
              </ul>
            </div>

            <div>
              <p>
                <span className="font-semibold">Work Location: </span>
                {/* {formValues?.location} ~ {employmentType} */}
                {formValues?.location} ~ Remote
              </p>
              <p>
                <span className="font-semibold">Expiry Date:</span>
                {expiryDate}
              </p>
            </div>
          </div>
        </Skeleton>
      </Drawer>
    </div>
  );
};

export default PreviewJob;
