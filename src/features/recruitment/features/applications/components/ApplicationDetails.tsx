import { ApplicantSettingsIntro } from "features/recruitment/components/ApplicantSettingsIntro";
import CandidateImg from "../../../assets/candidate.jpeg";
import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu, Select, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import RecruitmentSubNav from "features/recruitment/components/RecruitmentSubNav";
import { appRoutes } from "config/router/paths";
import { AppButton } from "components/button/AppButton";

const ApplicationDetails = () => {
  type DataSourceItem = {
    key: React.Key;
    candidateInfo: string;
    email: string;
    status: string;
    phoneNumber: number;
    applied: string;
  };

  // COLUMS OF TABLE
  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "Candidate Info",
      dataIndex: "candidateInfo",
    },
    {
      key: "2",
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "3",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "4",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">
                  <Link
                    to={
                      appRoutes.applicantDetails(val.key as unknown as number)
                        .path
                    }
                  >
                    View Candidate
                  </Link>
                </Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];

  // DATASOURCE FOR TABLE
  const dataSource: DataSourceItem[] = [];
  for (let i = 0; i < 7; i++) {
    dataSource.push({
      key: i,
      candidateInfo: "5 candidates",
      email: "Sam@gmail.com",
      status: "New - updated yesterday",
      phoneNumber: +2347098265214,
      applied: "June, 23rd 2023",
    });
  }
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <RecruitmentSubNav />
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <ApplicantSettingsIntro
          title="Back to Candidate"
          description=""
          nextLink=""
        />
        <div className="flex flex-col sm:flex-row gap-4 px-5 sm:mt-0">
          <AppButton
            label="Edit Job Opening"
            type="button"
            variant="style-with-class"
            additionalClassNames={[
              "px-[8.5px]",
              "py-[6px]",
              "bg-transparent",
              "border",
              "rounded",
              "text-caramel",
              "border-caramel",
            ]}
          />
          <AppButton label="End Job Opening" type="button" />
        </div>
      </div>

      <div className="Container mt-5">
        <div className=" bg-card lg:grid lg:grid-cols-2 gap-4 items-center justify-center md:p-5 p-3 ">
          <div className="bg-mainBg mb-4 md:mb-3 lg:mb-0  flex flex-col p-4 rounded md:flex-row gap-4 items-center">
            <img src={CandidateImg} className="h-20 rounded-full w-20" />
            <div>
              <p className="pb-2">Job Opening --:-- UI/UX Designer</p>
              <p className="pb-2">Department --:-- Application Department</p>
              <p className="pb-2">Employment type --:-- Full-Time Remote</p>
            </div>
          </div>
          <div className="bg-mainBg p-4 rounded">
            <p className="pb-2">Team Lead --:--</p>
            <p className="pb-2">Status --:--</p>
            <p className="pb-2">Open --:--</p>
          </div>
        </div>
        <div className="md:p-5">
          {!showFullDescription ? (
            <div>
              <h2 className="text-lg p-1">Full Job Description</h2>
              <p className=" p-1 ">
                We are seeking a talented and experienced Lead UI/UX Designer to
                join our growing fintech startup. As the lead designer, you will
                be responsible for the overall look, feel, and usability of our
                auto loan marketplace platform.
              </p>
              <h2 className="text-lg p-1 mt-7">Key Responsibilities:</h2>
              <ul className=" p-1 list-disc ml-7">
                <li>
                  Own the design and development of a visually stunning and
                  intuitive user interface for our auto loan marketplace
                  platform
                </li>
                <li>
                  Work closely with our product and engineering teams to ensure
                  that the platform meets the needs and expectations of our
                  users
                </li>
                <li>
                  Conduct user research and testing to gather insights and
                  iterate on the design of the platform........
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <h2 className="text-lg p-1">Full Job Description</h2>
              <p className=" p-1 ">
                We are seeking a talented and experienced Lead UI/UX Designer to
                join our growing fintech startup. As the lead designer, you will
                be responsible for the overall look, feel, and usability of our
                auto loan marketplace platform.
              </p>
              <h2 className="text-lg p-1 mt-7">Key Responsibilities:</h2>
              <ul className="p-1 list-disc ml-7">
                <li>
                  Own the design and development of a visually stunning and
                  intuitive user interface for our auto loan marketplace
                  platform
                </li>
                <li>
                  Work closely with our product and engineering teams to ensure
                  that the platform meets the needs and expectations of our
                  users
                </li>
                <li>
                  Conduct user research and testing to gather insights and
                  iterate on the design of the platform........
                </li>
              </ul>
              <p className="p-1 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti nisi unde, vitae at eveniet aliquam quos deleniti.
                Ratione praesentium, optio tempora explicabo nam enim asperiores
                amet velit quo sit magni possimus qui repudiandae libero
                placeat, voluptatibus ex blanditiis incidunt laborum earum ad
                facilis. Labore, aliquam? Nisi, voluptates aspernatur blanditiis
                in, magni ipsum cumque labore laudantium aliquam impedit ea fuga
                illo tempora magnam eos molestiae, totam praesentium pariatur
                enim consequuntur nesciunt quaerat. Laboriosam quia vel laborum
                dolor amet ea dolorem minima sint rem, sit eligendi, natus ex
                asperiores magni facere neque possimus praesentium aspernatur
                nam rerum, commodi libero tempora nisi. Vitae fugiat harum
                dolores voluptatem velit in fuga neque corporis corrupti ex,
                animi similique minima! Aut ad distinctio eius praesentium id at
                quibusdam aspernatur ipsum ex laudantium pariatur, optio unde
                omnis quaerat numquam? Accusantium autem iure expedita aut
                officia adipisci quasi, aliquid nisi dolore excepturi deleniti
                obcaecati repudiandae rem perspiciatis? Ad.
              </p>
            </div>
          )}
        </div>
        <div className="mb-2">
          <button
            className="text-caramel underline underline-offset-8 hover:no-underline"
            onClick={toggleDescription}
          >
            {!showFullDescription ? (
              <p className="">
                <i className="ri-arrow-down-s-fill "></i>{" "}
                <span>View full description</span>
              </p>
            ) : (
              <p>Show less</p>
            )}
          </button>
        </div>
        <div className="grid md:grid-cols-2 p-5 gap-4 md:gap-2">
          <div className="">
            <p>45 Candidate (5 New)</p>
          </div>
          <div className="flex gap-8 md:gap-2 md:justify-end items-center">
            <p>Status</p>
            <Select
              defaultValue="stillInRunning"
              className="w-44 border rounded-md hover:border-none important-hover text-[var(--accent)]"
              onChange={handleChange}
              options={[
                {
                  value: "stillInRunning",
                  label: "Still In Running",
                },
              ]}
            />
          </div>
        </div>

        <Table columns={columns} dataSource={dataSource} scroll={{ x: 600 }} />
      </div>
    </>
  );
};

export default ApplicationDetails;
