import { boxStyle, boxTitle } from "styles/reused";

type IProps = {
  title: string;
  highlights?: { name: string; value: string }[];
  details?: { name: string; value: string }[];
};

const nameStyle = "font-light text-sm capitalize";
const valueStyle = "font-bold text-lg";
export const SummaryCard: React.FC<IProps> = ({
  title,
  highlights = [],
  details = [],
}) => {
  return (
    <div className={`${boxStyle} text-sm flex flex-col gap-6`}>
      <div className="flex items-center justify-between mb-4">
        <h5 className={boxTitle}>{title}</h5>
      </div>
      <div className="grid grid-cols-2 gap-4 border rounded-md px-4 py-4">
        {highlights.map(({ name, value }, i) => (
          <div key={i} className="flex flex-col gap-2">
            <h6 className={nameStyle}>{name}</h6>
            <p className={valueStyle}>{value}</p>
          </div>
        ))}
      </div>
      <table className="">
        <tbody>
          {details.map(({ name, value }, i) => (
            <tr key={i} className="pb-6">
              <td>
                <h6 className={nameStyle}>{name}</h6>
              </td>
              <td>
                <p className={`${valueStyle} text-right`}>{value}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
