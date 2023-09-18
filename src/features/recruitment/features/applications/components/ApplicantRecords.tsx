import { List } from "antd";
import avatar from "../../../assets/avatar.png";

export interface ApplicantData {
  key: React.Key;
  title: string;
  img: string;
  date: string;
  emailSubject: string;
  description: string;
}

interface RecordData {
  key: React.Key;
  title: string;
  img: string;
  date: string;
  status: string;
}

export const data: ApplicantData[] = [
  {
    key: "0",
    title: "Adiele Esther",
    img: avatar,
    date: "Jun 23rd at 3:45pm",
    emailSubject: "RE: INTERVIEW WITH UI/UX DESIGNERS",
    description:
      "Hello Samuel, I'm pleased to inform you that after a careful review of your application, you have been selected for the position...",
  },
];

const recordData: RecordData[] = [
  {
    key: "0",
    title: "Adiele Esther",
    img: avatar,
    date: "Jun 23rd at 3:45pm",
    status: "Status set to Put on Hold",
  },
];

export const ApplicantRecords = () => {
  return (
    <div className="Container">
      <h2>Candidate Records</h2>
      <List>
        <List.Item className="my-4 p-2">
          {data.map((item, index) => (
            <div key={item.key} className="flex gap-4">
              <img src={item.img} className="w-14 h-14 rounded-full" />
              <div className="">
                <div className="mb-3">
                  <h2>{item.title}</h2>
                  <p className="text-sm text-[rgba(58, 58, 58, 0.80)]">
                    {item.date}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2">{item.emailSubject}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
              {index < data.length - 1 && (
                <hr className="my- border border-fuchsia-800" />
              )}
            </div>
          ))}
        </List.Item>

        <List.Item>
          {recordData.map((item) => (
            <div key={item.key} className="flex gap-4 p-2">
              <img src={item.img} className="w-14 h-14 rounded-full" />
              <div className="mb-3 p-1">
                <h2>{item.title}</h2>
                <p className="mb-2 text-sm text-[rgba(58, 58, 58, 0.80)]">
                  {item.date}
                </p>
                <p className="text-caramel">{item.status}</p>
              </div>
            </div>
          ))}
        </List.Item>

        <List.Item>
          {recordData.map((item) => (
            <div key={item.key} className="flex gap-4 p-2">
              <img src={item.img} className="w-14 h-14 rounded-full" />
              <div className="mb-3 p-1">
                <h2>{item.title}</h2>
                <p className="mb-2 text-sm text-[rgba(58, 58, 58, 0.80)]">
                  {item.date}
                </p>
                <p className="text-caramel">Status set to Reviewed</p>
              </div>
            </div>
          ))}
        </List.Item>
      </List>
    </div>
  );
};
