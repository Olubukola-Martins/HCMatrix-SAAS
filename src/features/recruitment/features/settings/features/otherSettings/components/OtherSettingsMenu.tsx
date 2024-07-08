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
} from "../types";

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
    useState<IOtherSettingsSubMenuComponent>();

  useEffect(() => {
    if (selectedMenu.title === "Interview Settings" && selectedMenu.children) {
      setSelectedChild(selectedMenu.children[0]);
    }
  }, [selectedMenu]);

  return (
    <div className="my-4 flex flex-col lg:grid lg:grid-cols-12 gap-4 border-t p-2">
      <div className="lg:col-span-2 flex lg:flex-col overflow-auto">
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
      <div className="lg:col-span-10 border-l lg:border-t-0 border-t lg:p-3 p-2">
        <div>
          {selectedMenu.title === "Interview Settings" && selectedChild
            ? selectedChild.childrenComponent
            : selectedMenu.menuComponent}
        </div>
      </div>
    </div>
  );
};
