import { string } from "yup/lib/locale";

type InComingProps = {
  title: string;
  color: string;
  description: string;
  icon: string;
};

export const IncomingModules = ({
  title,
  color,
  description,
  icon,
}: InComingProps) => {
  return (
    <div className="border rounded-xl bg-card p-2">
      <div className="bg-mainBg p-3 rounded-xl shadow">
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center">
            <span
              className="rounded-md h-9 w-9 flex justify-center items-center"
              style={{ background: color }}
            >
              <i className={`${icon} text-white text-lg`}></i>
            </span>
          </div>
          <h4 className="font-medium">{title}</h4>
        </div>
        <p className="text-sm pt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
      </div>
    </div>
  );
};
