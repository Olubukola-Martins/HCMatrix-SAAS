import { useState, useEffect } from "react";
import { RecruitmentBenefits } from "./RecruitmentBenefits";
import { EmploymentType } from "./EmploymentType";
import { ExperienceType } from "./ExperienceType";
import { JobStatus } from "./JobStatus";
import { InterviewStages } from "./InterviewStages";
import { RatingSetUp } from "./RatingSetUp";
import { InterviewConfiguration } from "./InterviewConfiguration";
import { NotificationSettings } from "./NotificationSettings";
import { PortalLink } from "./PortalLink";
import { RequestDocument } from "./RequestDocument";
import {
  IOtherSettingsMenuComponent,
  IOtherSettingsSubMenuComponent,
} from "../../types";

const OtherSettingsMenuArray: IOtherSettingsMenuComponent[] = [
  { title: "Benefits", menuComponent: <RecruitmentBenefits /> },
  {
    title: "Employment Type",
    menuComponent: <EmploymentType />,
  },
  {
    title: "Experience Type",
    menuComponent: <ExperienceType />,
  },
  { title: "Job Status", menuComponent: <JobStatus /> },
  {
    title: "Interview Settings",
    children: [
      {
        title: "Interview Stages",
        childrenComponent: <InterviewStages />,
      },
      {
        title: "Rating Set Up",
        childrenComponent: <RatingSetUp />,
      },
      {
        title: "Configuration",
        childrenComponent: <InterviewConfiguration />,
      },
    ],
  },
  {
    title: "Notification Settings",
    menuComponent: <NotificationSettings />,
  },
  {
    title: "Request Document",
    menuComponent: <RequestDocument />,
  },
  { title: "Portal Link", menuComponent: <PortalLink /> },
];

export const OtherSettingsMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState<IOtherSettingsMenuComponent>(
    OtherSettingsMenuArray[0]
  );
  const [selectedChild, setSelectedChild] =
    useState<IOtherSettingsSubMenuComponent | null>(null);

  useEffect(() => {
    if (selectedMenu.title === "Interview Settings" && selectedMenu.children) {
      setSelectedChild(selectedMenu.children[0]);
    }
  }, [selectedMenu]);

  return (
    <div className="h-full my-4 grid grid-cols-12 gap-4 border-t p-2">
      <div className="col-span-2">
        {OtherSettingsMenuArray.map((item, index) => (
          <div key={index}>
            <div
              className={`cursor-pointer p-2 rounded-lg m-3 ${
                selectedMenu.title === item.title ? "bg-[#F1F4F5]" : ""
              } ${
                item.title === "Interview Settings" &&
                selectedMenu.title === item.title
                  ? "bg-[#F1F4F5]"
                  : ""
              }`}
              onClick={() => {
                setSelectedMenu(item);
                setSelectedChild(null);
              }}
            >
              {item.title}
            </div>
            {item.title === "Interview Settings" &&
              selectedMenu.title === item.title && (
                <div className="mt-4 bg-[#F1F4F5] p-3 rounded-sm">
                  {selectedMenu.children?.map((child, childIndex) => (
                    <div
                      key={childIndex}
                      className={`cursor-pointer p-2 rounded-lg m-3 ${
                        selectedChild && selectedChild.title === child.title
                          ? "bg-white"
                          : ""
                      }`}
                      onClick={() => setSelectedChild(child)}
                    >
                      {child.title}
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
      <div className="col-span-10 border-l p-3">
        <div>
          {selectedMenu.title === "Interview Settings" && selectedChild
            ? selectedChild.childrenComponent
            : selectedMenu.menuComponent}
        </div>
      </div>
    </div>
  );
};
