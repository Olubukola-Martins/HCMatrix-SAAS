import {
  DatePicker,
  Drawer,
  Dropdown,
  Form,
  Input,
  Menu,
  Select,
  Space,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { AppButton } from "components/button/AppButton";
import { appRoutes } from "config/router/paths";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { openNotification } from "utils/notifications";

const ApplicationsList = () => {
  const { RangePicker } = DatePicker;

  const onFinish = (values: any) => {
    console.log(values);
  };

  // job opening search
  const { Search } = Input;
  // const onSearch = (value: string) => console.log(value);
  const [searchTerm, setSearchTerm] = useState("");
  let debounceTimer: NodeJS.Timeout | null = null;
  const searchLogic = (value: string) => {
    //  search logic here
    console.log("Searching for:", value);
  };
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // Clear previous timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      searchLogic(value);
    }, 500);
  };

  // prevent empty form submission
  const [buttonSubmitState, setButtonSubmitState] = useState(false);
  const validateAllFieldsNotEmpty = (changedFields: any, allFields: any) => {
    setButtonSubmitState(false);
    let hasNonEmptyField = false;

    for (let i = 0; i < allFields.length; i++) {
      const currentField = allFields[i];
      const currentFieldValue = currentField.value;

      if (Array.isArray(currentFieldValue)) {
        if (currentFieldValue.length > 0) {
          hasNonEmptyField = true;
          break;
        }
      } else if (typeof currentFieldValue === "string") {
        if (currentFieldValue.trim() !== "") {
          hasNonEmptyField = true;
          break;
        }
      } else if (
        currentFieldValue !== undefined &&
        currentFieldValue !== null
      ) {
        hasNonEmptyField = true;
        break;
      }
    }

    setButtonSubmitState(hasNonEmptyField);
  };

  // Handling drawer
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // created/expiry type
  interface created_ExpiryDateType {
    dateCreated: string;
    expiryDate: string;
  }
  // Candidate lastEmail type
  interface lastEmailType {
    emailSubject: string;
    emailBody: string;
  }
  // Candidate info type
  interface CandidateInfoType {
    candidateName: string;
    candidateEmail: string;
  }
  //Table Data Interface
  type DataSourceItem = {
    key: React.Key;
    candidateInfo: CandidateInfoType;
    jobOpening: string;
    lastUpdated: string;
    created_ExpiryDate: created_ExpiryDateType;
    lastEmail: lastEmailType;
  };

  // Table heading Column
  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "candidateInfo",
      title: "Candidate Info",
      dataIndex: "candidateInfo",
      ellipsis: true,
      render: (candidateInfo) => (
        <div> 
          <h2 className="overflow-hidden whitespace-nowrap truncate text-caramel">
            {candidateInfo.candidateName}
          </h2>
          <p className="overflow-hidden whitespace-nowrap truncate text-xs">
            {candidateInfo.candidateEmail}
          </p>
        </div>
      ),
    },
    {
      key: "jobOpening",
      title: "Job Opening",
      dataIndex: "jobOpening",
      ellipsis: true,
    },
    {
      key: "lastUpdated",
      title: "Last Updated",
      dataIndex: "lastUpdated",
      ellipsis: true,
    },
    {
      key: "created_ExpiryDate",
      title: "Created/Expiry Date",
      dataIndex: "created_ExpiryDate",
      render: (created_ExpiryDate) => (
        <div>
          {created_ExpiryDate.dateCreated} to {created_ExpiryDate.expiryDate}
        </div>
      ),
    },
    {
      key: "lastEmail",
      title: "Last Email",
      dataIndex: "lastEmail",
      ellipsis: true,
      render: (lastEmail) => (
        <div>
          <h2 className="overflow-hidden whitespace-nowrap truncate">
            {lastEmail.emailSubject}
          </h2>
          <p className="overflow-hidden whitespace-nowrap truncate">
            {lastEmail.emailBody}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (_, val) => (
        <div>
          <Select
            defaultValue="Offer Sent"
            className=" text-caramel !important w-full"
            dropdownMatchSelectWidth={false}
            // onChange={handleChange}
            options={[
              {
                value: "new",
                label: "New",
              },
              {
                value: "reviewed",
                label: "Reviewed",
              },
              {
                value: "scheduleInterview",
                label: "Schedule Interview",
              },
              {
                value: "interviewed",
                label: "Interviewed",
              },
              {
                value: "putOnHold",
                label: "Put on Hold",
              },
              {
                value: "madeAnOffer",
                label: "Made an Offer",
              },
              {
                value: "offerSent",
                label: "Offer Sent",
              },
              {
                value: "offerSigned",
                label: "Offer Signed",
              },
            ]}
          />
        </div>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">
                  <Link to={appRoutes.applicantDetails().path}>
                    View Candidate
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">View Resume</Menu.Item>
                <Menu.Item key="3">Send Email</Menu.Item>
                <Menu.Item key="4">Comment</Menu.Item>
                <Menu.Item key="5">Move Candidate to Talent Pool</Menu.Item>
                <Menu.Item key="6">Delete Candidate</Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];

  // Table dataSource
  const dataSource: DataSourceItem[] = [];
  for (let i = 0; i < 10; i++) {
    dataSource.push({
      key: i,
      candidateInfo: {
        candidateName: "Adeyemi Samuel",
        candidateEmail: "Sam@gmail.com",
      },
      jobOpening: "Software Developer",
      lastUpdated: "1 Month ago",
      created_ExpiryDate: {
        dateCreated: "--/--/----",
        expiryDate: "--/--/----",
      },
      lastEmail: {
        emailSubject: "RE: INTERVIEW",
        emailBody: "Hi Samuel, Congratulations you have",
      },
    });
  }

  return (
    <>
      <Drawer
        title="Custom Filter"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Form
          onFieldsChange={validateAllFieldsNotEmpty}
          layout="vertical"
          name="customFilterApplications"
          onFinish={onFinish}
        >
          <Form.Item name="jobStatus" label="Job Status">
            <Select
              mode="multiple"
              placeholder="Please select"
              dropdownMatchSelectWidth={false}
              // onChange={handleChange}
              options={[
                {
                  value: "open",
                  label: "Open",
                },
                {
                  value: "onHold",
                  label: "On-Hold",
                },
                {
                  value: "filled",
                  label: "Filled",
                },
                {
                  value: "cancelled",
                  label: "Cancelled",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="jobOpening" label="Job Opening">
            <Select
              mode="multiple"
              placeholder="Please select"
              dropdownMatchSelectWidth={false}
              // onChange={handleChange}
              options={[
                {
                  value: "iTSecurityEngineer",
                  label: "IT Security Engineer",
                },
                {
                  value: "customerServiceAdvocate",
                  label: "Customer Service Advocate",
                },
                {
                  value: "softwareEngineer",
                  label: "Software Engineer",
                },
                {
                  value: "accountExecutive",
                  label: "Account Executive",
                },
                {
                  value: "videography",
                  label: "Videography",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="candidateStatus" label="Candidate Status">
            <Select
              mode="multiple"
              placeholder="Please select"
              dropdownMatchSelectWidth={false}
              // onChange={handleChange}
              options={[
                {
                  label: "Active",
                  options: [
                    {
                      value: "reviewed",
                      label: "Reviewed",
                    },
                    {
                      value: "scheduleInterview",
                      label: "Schedule Interview",
                    },
                    {
                      value: "interviewed",
                      label: "Interviewed",
                    },
                    {
                      value: "putOnHold",
                      label: "Put on Hold",
                    },
                    {
                      value: "checkingRefrences",
                      label: "Checking Refrences",
                    },
                  ],
                },
                {
                  label: "Not Hired",
                  options: [
                    {
                      value: "notaFit",
                      label: "Not a Fit",
                    },
                    {
                      value: "declinedOffer",
                      label: "Declined Offer",
                    },
                    {
                      value: "notQualified",
                      label: "Not Qualified",
                    },
                    {
                      value: "overQualified",
                      label: "Over Qualified",
                    },
                    {
                      value: "hiredElsewhere",
                      label: "Hired Elsewhere",
                    },
                  ],
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Date Range" name="dateRange">
            <RangePicker />
          </Form.Item>
          <Form.Item name="hiringLead" label="Hiring Lead">
            <Select
              mode="multiple"
              placeholder="Please select"
              dropdownMatchSelectWidth={false}
              // onChange={handleChange}
              options={[
                {
                  value: "basilIkpe",
                  label: "Basil Ikpe",
                },
                {
                  value: "uche",
                  label: "Uche",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="jobLocation" label="Job Location">
            <Select
              mode="multiple"
              placeholder="Please select"
              dropdownMatchSelectWidth={false}
              // onChange={handleChange}
              options={[
                {
                  value: "lagos",
                  label: "Lagos",
                },
                {
                  value: "abuja",
                  label: "Abuja",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="degree" label="Degree">
            <Select
              mode="multiple"
              placeholder="Please select"
              dropdownMatchSelectWidth={false}
              // onChange={handleChange}
              options={[
                {
                  value: "bSc",
                  label: "B.Sc",
                },
                {
                  value: "mSc",
                  label: "M.Sc",
                },
                {
                  value: "phD",
                  label: "PhD",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="educationClass" label="Education Class">
            <Select
              mode="multiple"
              placeholder="Please select"
              dropdownMatchSelectWidth={false}
              // onChange={handleChange}
              options={[
                {
                  value: "firstClass",
                  label: "First class",
                },
                {
                  value: "secondClass",
                  label: "Second Class",
                },
                {
                  value: "thirdClass",
                  label: "Third Class",
                },
                {
                  value: "pass",
                  label: "Pass",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="experienceYears" label="Experience Years">
            <Select
              mode="multiple"
              placeholder="Please select"
              dropdownMatchSelectWidth={false}
              // onChange={handleChange}
              options={[
                {
                  value: "zeroToOneYear",
                  label: "0 -1 year",
                },

                {
                  value: "oneToTwoYears",
                  label: "1 -2 years",
                },
                {
                  value: "threeToFiveYears",
                  label: "3 -5 years",
                },
                {
                  value: "sixToTenYears",
                  label: "6 -10 years",
                },
                {
                  value: "overTenYears",
                  label: "10+ years",
                },
              ]}
            />
          </Form.Item>

          <div
            id="buttons"
            className=" flex flex-row justify-between items-center "
          >
            <AppButton
              type="button"
              label="Cancel"
              variant="style-with-class"
              additionalClassNames={[
                "bg-none text-lg max-sm:text-base hover:text-caramel",
              ]}
              // handleClick={() => handleBackButton()}
            />

            <AppButton
              type={!buttonSubmitState ? "button" : "submit"}
              label="Apply Filter"
              handleClick={() => {
                if (!buttonSubmitState) {
                  openNotification({
                    title: "Submit failed",
                    description:
                      "Please select at least one option in a field to apply the filter.",
                    state: "error",
                    duration: 3.0,
                  });
                } else if (buttonSubmitState) {
                  setOpen(false);
                }
              }}
            />
          </div>
        </Form>
      </Drawer>
      <div className="flex flex-row max-[389px]:block justify-between  mt-2 mb-9">
        <Space className="max-[389px]:mb-3">
          <Search
            // value={searchTerm}
            // onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
            placeholder="Search jobs"
            allowClear
          />
        </Space>
        <AppButton handleClick={() => showDrawer()} label="Custom Filter" />
      </div>

      {/* candidates number returned */}
      <div className="flex flex-row gap-3 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
        >
          <path
            className="fill-caramel"
            d="M11.4998 10.5C10.4832 10.5 9.50815 10.1049 8.78926 9.40165C8.07037 8.69839 7.6665 7.74456 7.6665 6.75C7.6665 5.75544 8.07037 4.80161 8.78926 4.09835C9.50815 3.39509 10.4832 3 11.4998 3C12.5165 3 13.4915 3.39509 14.2104 4.09835C14.9293 4.80161 15.3332 5.75544 15.3332 6.75C15.3332 7.74456 14.9293 8.69839 14.2104 9.40165C13.4915 10.1049 12.5165 10.5 11.4998 10.5ZM11.4998 4.5C10.2272 4.5 9.19984 5.505 9.19984 6.75C9.19984 7.995 10.2272 9 11.4998 9C12.7725 9 13.7998 7.995 13.7998 6.75C13.7998 5.505 12.7725 4.5 11.4998 4.5Z"
          />
          <path
            className="fill-caramel"
            d="M20.7 16.5C20.2707 16.5 19.9333 16.17 19.9333 15.75C19.9333 15.33 20.2707 15 20.7 15C21.1293 15 21.4667 14.67 21.4667 14.25C21.4667 13.2554 21.0628 12.3016 20.3439 11.5983C19.625 10.8951 18.65 10.5 17.6333 10.5H16.1C15.6707 10.5 15.3333 10.17 15.3333 9.75C15.3333 9.33 15.6707 9 16.1 9C17.3727 9 18.4 7.995 18.4 6.75C18.4 5.505 17.3727 4.5 16.1 4.5C15.6707 4.5 15.3333 4.17 15.3333 3.75C15.3333 3.33 15.6707 3 16.1 3C17.1167 3 18.0917 3.39509 18.8106 4.09835C19.5295 4.80161 19.9333 5.75544 19.9333 6.75C19.9333 7.68 19.596 8.52 19.0133 9.18C21.298 9.78 23 11.82 23 14.25C23 15.495 21.9727 16.5 20.7 16.5ZM2.3 16.5C1.02733 16.5 0 15.495 0 14.25C0 11.82 1.68667 9.78 3.98667 9.18C3.41933 8.52 3.06667 7.68 3.06667 6.75C3.06667 5.75544 3.47053 4.80161 4.18942 4.09835C4.90831 3.39509 5.88334 3 6.9 3C7.32933 3 7.66667 3.33 7.66667 3.75C7.66667 4.17 7.32933 4.5 6.9 4.5C5.62733 4.5 4.6 5.505 4.6 6.75C4.6 7.995 5.62733 9 6.9 9C7.32933 9 7.66667 9.33 7.66667 9.75C7.66667 10.17 7.32933 10.5 6.9 10.5H5.36667C4.35 10.5 3.37498 10.8951 2.65609 11.5983C1.9372 12.3016 1.53333 13.2554 1.53333 14.25C1.53333 14.67 1.87067 15 2.3 15C2.72933 15 3.06667 15.33 3.06667 15.75C3.06667 16.17 2.72933 16.5 2.3 16.5ZM16.1 21H6.9C5.62733 21 4.6 19.995 4.6 18.75V17.25C4.6 14.355 7.00733 12 9.96667 12H13.0333C15.9927 12 18.4 14.355 18.4 17.25V18.75C18.4 19.995 17.3727 21 16.1 21ZM9.96667 13.5C8.95 13.5 7.97498 13.8951 7.25609 14.5983C6.5372 15.3016 6.13333 16.2554 6.13333 17.25V18.75C6.13333 19.17 6.47067 19.5 6.9 19.5H16.1C16.5293 19.5 16.8667 19.17 16.8667 18.75V17.25C16.8667 16.2554 16.4628 15.3016 15.7439 14.5983C15.025 13.8951 14.05 13.5 13.0333 13.5H9.96667Z"
          />
        </svg>
        <p className="text-caramel ">
          46 Candidate were found with the selected filter{" "}
        </p>
      </div>

      {/* TABLE */}
      <Table columns={columns} dataSource={dataSource} scroll={{ x: 900 }} />
    </>
  );
};

export default ApplicationsList;
