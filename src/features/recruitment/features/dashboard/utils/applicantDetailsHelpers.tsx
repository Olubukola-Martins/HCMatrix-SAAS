import { Tag } from "antd";
import { IApplicantDetails } from "../types";
import { FaCheck } from "react-icons/fa";
import { TbUserCheck, TbSquareCheck } from "react-icons/tb";

export const getStatusTag = (status: string) => {
  let color;
  let icon;
  switch (status) {
    case "Hired":
      color = "green";
      icon = <FaCheck className={`mr-1 text-[${color}]`} />;
      break;
    case "Offer sent":
      color = "purple";
      icon = <TbSquareCheck className={`mr-1 text-[${color}]`} />;
      break;
    case "Interviewed":
      color = "gold";
      icon = <TbUserCheck className={`mr-1 text-[${color}]`} />;
      break;
    default:
      color = "blue";
  }
  return (
    <Tag color={color} className="rounded-2xl border-none flex flex-row items-center w-fit py-1 px-2 ">
      <span>{icon}</span> <span>{status}</span>
    </Tag>
  );
};

export const mockData: IApplicantDetails[] = [
  {
    key: "1",
    name: "John Brown",
    email: "john.brown@example.com",
    jobTitle: "Software Engineer",
    date: "2023-01-10",
    status: "Hired",
  },
  {
    key: "2",
    name: "Jim Green",
    email: "jim.green@example.com",
    jobTitle: "Product Manager",
    date: "2023-02-15",
    status: "Offer sent",
  },
  {
    key: "3",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    jobTitle: "Data Scientist",
    date: "2023-03-05",
    status: "Interviewed",
  },
  {
    key: "4",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    jobTitle: "Graphic Designer",
    date: "2023-04-10",
    status: "Offer sent",
  },
  {
    key: "5",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    jobTitle: "Marketing Manager",
    date: "2023-05-20",
    status: "Hired",
  },
  {
    key: "6",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    jobTitle: "Business Analyst",
    date: "2023-06-01",
    status: "Interviewed",
  },
  {
    key: "7",
    name: "David Wilson",
    email: "david.wilson@example.com",
    jobTitle: "Sales Executive",
    date: "2023-07-12",
    status: "Offer sent",
  },
  {
    key: "8",
    name: "Emma Taylor",
    email: "emma.taylor@example.com",
    jobTitle: "Customer Support",
    date: "2023-08-18",
    status: "Hired",
  },
  {
    key: "9",
    name: "Frank Harris",
    email: "frank.harris@example.com",
    jobTitle: "DevOps Engineer",
    date: "2023-09-07",
    status: "Interviewed",
  },
  {
    key: "10",
    name: "Grace Lee",
    email: "grace.lee@example.com",
    jobTitle: "Project Manager",
    date: "2023-10-14",
    status: "Offer sent",
  },
  {
    key: "11",
    name: "Hannah Martin",
    email: "hannah.martin@example.com",
    jobTitle: "HR Manager",
    date: "2023-11-22",
    status: "Hired",
  },
  {
    key: "12",
    name: "Steve Smith",
    email: "steve.smith@example.com",
    jobTitle: "UX Designer",
    date: "2023-06-25",
    status: "Interviewed",
  },
];
