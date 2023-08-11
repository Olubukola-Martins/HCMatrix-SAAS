import { AppButton, TBtnVariant } from "components/button/AppButton";

// Define a btn component

interface IProps {
  description: string | { content: string; className: string };
  hideBackground?: boolean;
  actions?: {
    hidden?: boolean;
    name: string;
    handleClick: Function;
    btnVariant?: TBtnVariant;
    loading?: boolean;
    type?: "submit" | "reset" | "button";
    additionalClassNames?: string[];
  }[];
  comps?: React.ReactNode[];
}

const PageSubHeader = ({
  description,
  actions,
  hideBackground = false,
  comps,
}: IProps) => {
  return (
    <div
      className={`flex flex-col mt-5 gap-2 md:flex-row md:justify-between md:items-center  p-2 rounded text-sm ${
        hideBackground === false ? "bg-card" : ""
      }`}
    >
      {typeof description === "string" && <p>{description}</p>}
      {typeof description === "object" && (
        <p className={description.className}>{description.content}</p>
      )}

      <div className="flex gap-4 items-center ">
        {actions?.some((item) => item.hidden)
          ? actions
              ?.filter((item) => item.hidden === true)
              .map((item, i) => (
                <AppButton
                  key={i}
                  label={item.name}
                  handleClick={() => item.handleClick()}
                  variant={item.btnVariant}
                  isLoading={item.loading}
                  additionalClassNames={item.additionalClassNames}
                />
              ))
          : actions?.map((item, i) => (
              <AppButton
                key={i}
                label={item.name}
                handleClick={() => item.handleClick()}
                variant={item.btnVariant}
                isLoading={item.loading}
                additionalClassNames={item.additionalClassNames}
              />
            ))}
        {comps?.map((item, i) => (
          <div key={i ** 23 + "09"}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default PageSubHeader;
