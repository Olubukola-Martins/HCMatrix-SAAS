import { Candidate } from "../components/candidates/AllCandidatesTable";
import { InterviewEvent } from "../components/panelist/InterviewCalendar";

// Sample end date
const endDate = new Date();
endDate.setDate(endDate.getDate() + 2); // Set end date to 2 days from now
endDate.setHours(11, 0, 0, 0); // Set time to 11:00 AM

export const PanelistInfoMockData = {
  name: "Emmanuel Ayomide",
  designation: "Product Designer",
  department: "Application Department",
  organization: "Snapnet Solutions",
  panelistImg: "https://res.cloudinary.com/dryuek31u/image/upload/v1682008960/samples/people/smiling-man.jpg",
  numberOfCandidates: 15,
  endDateToAcceptInvite: endDate,
  fullJobDescription: `
We are seeking a talented and experienced Lead UI/UX Designer to join our growing fintech startup. As the lead designer, you will be responsible for the overall look, feel, and usability of our auto loan marketplace platform.

Key Responsibilities:
Own the design and development of a visually stunning and intuitive user interface for our auto loan marketplace platform
Work closely with our product and engineering teams to ensure that the platform meets the needs and expectations of our users
Conduct user research and testing to gather insights and iterate on the design of the platform
Create wireframes, prototypes, and high-fidelity mockups to communicate design concepts and gather feedback
Develop and maintain design systems, style guides, and pattern libraries to ensure consistent and cohesive design across the platform
Collaborate with cross-functional teams, including product management, engineering, and customer support, to ensure that the platform delivers an excellent user experience

Qualifications:
Bachelor's Degree in Human Computer Interaction or a related field
3+ years of experience in UI/UX design, with a strong portfolio of design work
Proficiency in design tools such as Sketch, Figma, or Adobe Creative Suite
Experience with user research and testing methodologies
Strong understanding of HTML and CSS. Javascript a plus
Excellent communication and collaboration skills
Marketing experience a plus
Experience in banking or fintech industry a plus


Benefits:
Dental insurance
Flexible schedule
Health insurance
Paid time off
Parental leave
Vision insurance

Experience level:
3 years

`,
};

export const mockEvents: InterviewEvent[] = [
  {
    id: "1",
    title: "Interview with John Doe",
    start: new Date(2024, 7, 18, 10, 0),
    end: new Date(2024, 7, 18, 11, 0),
    person: "John Doe",
    jobRole: "Frontend Developer",
  },
  {
    id: "2",
    title: "Interview with Jane Smith",
    start: new Date(2024, 8, 22, 14, 0),
    end: new Date(2024, 8, 22, 15, 0),
    person: "Jane Smith",
    jobRole: "Backend Developer",
  },
  {
    id: "3",
    title: "Interview with Alice Johnson",
    start: new Date(2024, 9, 5, 9, 30),
    end: new Date(2024, 9, 5, 10, 30),
    person: "Alice Johnson",
    jobRole: "UI/UX Designer",
  },
  {
    id: "4",
    title: "Interview with Bob Brown",
    start: new Date(2024, 9, 12, 11, 0),
    end: new Date(2024, 9, 12, 12, 0),
    person: "Bob Brown",
    jobRole: "Project Manager",
  },
  {
    id: "5",
    title: "Interview with Charlie Davis",
    start: new Date(2024, 9, 20, 13, 0),
    end: new Date(2024, 9, 20, 14, 0),
    person: "Charlie Davis",
    jobRole: "Data Analyst",
  },
  {
    id: "6",
    title: "Interview with Diane Evans",
    start: new Date(2024, 10, 3, 15, 0),
    end: new Date(2024, 10, 3, 16, 0),
    person: "Diane Evans",
    jobRole: "HR Specialist",
  },
  {
    id: "7",
    title: "Interview with Ethan Fox",
    start: new Date(2024, 10, 7, 10, 0),
    end: new Date(2024, 10, 7, 11, 0),
    person: "Ethan Fox",
    jobRole: "DevOps Engineer",
  },
  {
    id: "8",
    title: "Interview with Fiona Green",
    start: new Date(2024, 10, 15, 14, 0),
    end: new Date(2024, 10, 15, 15, 0),
    person: "Fiona Green",
    jobRole: "Security Analyst",
  },
  {
    id: "9",
    title: "Interview with George Harris",
    start: new Date(2024, 10, 21, 9, 30),
    end: new Date(2024, 10, 21, 10, 30),
    person: "George Harris",
    jobRole: "Cloud Architect",
  },
  {
    id: "10",
    title: "Interview with Hannah Irving",
    start: new Date(2024, 10, 25, 11, 0),
    end: new Date(2024, 10, 25, 12, 0),
    person: "Hannah Irving",
    jobRole: "Business Analyst",
  },
  {
    id: "11",
    title: "Interview with Ian Jacobs",
    start: new Date(2024, 11, 1, 13, 0),
    end: new Date(2024, 11, 1, 14, 0),
    person: "Ian Jacobs",
    jobRole: "Product Manager",
  },
];

export const candidatesTableDummyData: Candidate[] = [
  {
    key: "1",
    name: "Chinonso Okeke",
    email: "chinonso.okeke@example.com",
    jobPosition: "Software Engineer",
    interviewDate: "12/09/24",
    interviewTime: "10:00 AM",
    modeOfInterview: "Virtual",
    totalScore: 85,
  },
  {
    key: "2",
    name: "Amina Bello",
    email: "amina.bello@example.com",
    jobPosition: "Data Analyst",
    interviewDate: "13/09/24",
    interviewTime: "11:00 AM",
    modeOfInterview: "Physical",
    totalScore: 78,
  },
  {
    key: "3",
    name: "Ifeanyi Nwosu",
    email: "ifeanyi.nwosu@example.com",
    jobPosition: "Product Manager",
    interviewDate: "14/09/24",
    interviewTime: "02:00 PM",
    modeOfInterview: "Virtual",
    totalScore: 90,
  },
  {
    key: "4",
    name: "Yetunde Adebayo",
    email: "yetunde.adebayo@example.com",
    jobPosition: "UX Designer",
    interviewDate: "15/09/24",
    interviewTime: "09:00 AM",
    modeOfInterview: "Physical",
    totalScore: 88,
  },
  {
    key: "5",
    name: "Musa Abdullahi",
    email: "musa.abdullahi@example.com",
    jobPosition: "DevOps Engineer",
    interviewDate: "16/09/24",
    interviewTime: "01:00 PM",
    modeOfInterview: "Virtual",
    totalScore: 82,
  },
  {
    key: "6",
    name: "Ngozi Umeh",
    email: "ngozi.umeh@example.com",
    jobPosition: "HR Specialist",
    interviewDate: "17/09/24",
    interviewTime: "03:00 PM",
    modeOfInterview: "Physical",
    totalScore: 77,
  },
  {
    key: "7",
    name: "Tunde Alabi",
    email: "tunde.alabi@example.com",
    jobPosition: "Marketing Manager",
    interviewDate: "18/09/24",
    interviewTime: "12:00 PM",
    modeOfInterview: "Virtual",
    totalScore: 80,
  },
  {
    key: "8",
    name: "Zainab Yusuf",
    email: "zainab.yusuf@example.com",
    jobPosition: "Financial Analyst",
    interviewDate: "19/09/24",
    interviewTime: "11:30 AM",
    modeOfInterview: "Physical",
    totalScore: 84,
  },
  {
    key: "9",
    name: "Olamide Taiwo",
    email: "olamide.taiwo@example.com",
    jobPosition: "Data Scientist",
    interviewDate: "20/09/24",
    interviewTime: "10:30 AM",
    modeOfInterview: "Virtual",
    totalScore: 87,
  },
  {
    key: "10",
    name: "Folake Akinyemi",
    email: "folake.akinyemi@example.com",
    jobPosition: "Customer Service Rep",
    interviewDate: "21/09/24",
    interviewTime: "09:30 AM",
    modeOfInterview: "Physical",
    totalScore: 79,
  },
  {
    key: "11",
    name: "Kunle Obinna",
    email: "kunle.obinna@example.com",
    jobPosition: "Backend Developer",
    interviewDate: "22/09/24",
    interviewTime: "03:30 PM",
    modeOfInterview: "Virtual",
    totalScore: 89,
  },
  {
    key: "12",
    name: "Ezinne Okoro",
    email: "ezinne.okoro@example.com",
    jobPosition: "Frontend Developer",
    interviewDate: "23/09/24",
    interviewTime: "02:30 PM",
    modeOfInterview: "Physical",
    totalScore: 81,
  },
  {
    key: "13",
    name: "Abubakar Aliyu",
    email: "abubakar.aliyu@example.com",
    jobPosition: "Business Analyst",
    interviewDate: "24/09/24",
    interviewTime: "12:30 PM",
    modeOfInterview: "Virtual",
    totalScore: 86,
  },
  {
    key: "14",
    name: "Omolara Bakare",
    email: "omolara.bakare@example.com",
    jobPosition: "IT Support",
    interviewDate: "25/09/24",
    interviewTime: "11:00 AM",
    modeOfInterview: "Physical",
    totalScore: 75,
  },
  {
    key: "15",
    name: "Bashir Suleiman",
    email: "bashir.suleiman@example.com",
    jobPosition: "Systems Administrator",
    interviewDate: "26/09/24",
    interviewTime: "10:00 AM",
    modeOfInterview: "Virtual",
    totalScore: 83,
  },
];
