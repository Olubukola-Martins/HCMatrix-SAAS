import { AppButton, TBtnVariant } from "components/button/AppButton";

export interface SupplementaryActionsProps {
  actions?: {
    hidden?: boolean;
    name: string;
    handleClick: Function;
    btnVariant?: TBtnVariant;
    loading?: boolean;
    type?: "submit" | "reset" | "button";
    additionalClassNames?: string[];
    disabled?: boolean;
  }[];
  comps?: React.ReactNode[];
}
export const SupplementaryActions: React.FC<SupplementaryActionsProps> = ({
  actions,
  comps,
}) => {
  return (
    <div className="flex flex-row flex-wrap lg:flex-nowrap gap-4 lg:items-center ">
      {actions?.some((item) => item.hidden)
        ? actions
            ?.filter((item) => item.hidden === false)
            .map((item, i) => (
              <AppButton
                key={i}
                label={item.name}
                handleClick={() => item.handleClick()}
                variant={item.btnVariant}
                isLoading={item.loading}
                additionalClassNames={item.additionalClassNames}
                disabled={item.disabled}
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
              disabled={item.disabled}
            />
          ))}
      {comps?.map((item, i) => (
        <div key={i ** 23 + "09"}>{item}</div>
      ))}
    </div>
  );
};
