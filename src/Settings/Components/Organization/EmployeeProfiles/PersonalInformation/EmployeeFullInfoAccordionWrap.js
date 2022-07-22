import React from "react";
import FramerAccordian from "../../../custom/FramerAccordian";
import Dependant from "./Dependant";
import EmployeeInformation from "./EmployeeInformation";
import FingerPrints from "./FingerPrints";
import ManagerDirectReport from "./ManagerDirectReport";
import MedicalHistory from "./MedicalHistory";
import Qualification from "./Qualification";
import QueryHistory from "./QueryHistory";
import Salary from "./Salary";
import Skills from "./Skills";
import SocialHistory from "./SocialHistory";
import TrainingHistory from "./TrainingHistory";
import UserGroups from "./UserGroups";
import WorkHistory from "./WorkHistory";

export const EmployeeFullInfoAccordionWrap = () => {
  return (
    <>
      {" "}
      <FramerAccordian
        heading={
          <h5 className="text-accent font-semibold">Personal Information</h5>
        }
        bgClassName="bg-card"
      >
        <EmployeeInformation />
      </FramerAccordian>
      <br />
      <FramerAccordian
        heading={
          <h5 className="text-accent font-semibold">
            Manager(s)/Direct Report(s)
          </h5>
        }
        bgClassName="bg-card"
      >
        <ManagerDirectReport />
      </FramerAccordian>
      <br />
      <FramerAccordian
        heading={<h5 className="text-accent font-semibold">Work History</h5>}
        bgClassName="bg-card"
      >
        <WorkHistory />
      </FramerAccordian>
      <br />
      <FramerAccordian
        heading={<h5 className="text-accent font-semibold">Salary</h5>}
        bgClassName="bg-card"
      >
        <Salary />
      </FramerAccordian>
      <br />
      <FramerAccordian
        heading={
          <h5 className="text-accent font-semibold">Academic History</h5>
        }
        bgClassName="bg-card"
      >
        <Qualification />
      </FramerAccordian>
      <br />
      <FramerAccordian
        heading={<h5 className="text-accent font-semibold">Dependant</h5>}
        bgClassName="bg-card"
      >
        <Dependant />
      </FramerAccordian>
      <br />
      <FramerAccordian
        heading={<h5 className="text-accent font-semibold">Skills</h5>}
        bgClassName="bg-card"
      >
        <Skills />
      </FramerAccordian>
      <br />
      <FramerAccordian
        heading={<h5 className="text-accent font-semibold">Query History</h5>}
        bgClassName="bg-card"
      >
        <QueryHistory />
      </FramerAccordian>
      <br />
      <FramerAccordian
        heading={
          <h5 className="text-accent font-semibold">Training History</h5>
        }
        bgClassName="bg-card"
      >
        <TrainingHistory />
      </FramerAccordian>
      <br />
      <FramerAccordian
        heading={<h5 className="text-accent font-semibold">User Groups</h5>}
        bgClassName="bg-card"
      >
        <UserGroups />
      </FramerAccordian>
      <br />
      <FramerAccordian
        heading={<h5 className="text-accent font-semibold">Finger Prints</h5>}
        bgClassName="bg-card"
      >
        <FingerPrints />
      </FramerAccordian>
      <br />
      <FramerAccordian
        heading={<h5 className="text-accent font-semibold">Medical History</h5>}
        bgClassName="bg-card"
      >
        <MedicalHistory />
      </FramerAccordian><br />
      <FramerAccordian
        heading={<h5 className="text-accent font-semibold">Social History</h5>}
        bgClassName="bg-card"
      >
        <SocialHistory />
      </FramerAccordian>

    </>
  );
};
