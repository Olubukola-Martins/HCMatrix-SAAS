import React, { useReducer, createContext, ReactNode, useContext } from "react";
import { TCreateCompanySubscriptionProps } from "../hooks/company/useCreateCompanySubscription";

type StateProps = Omit<Partial<TCreateCompanySubscriptionProps>, "addOns"> & {
  addOns?: Partial<TCreateCompanySubscriptionProps["addOns"]>;
};

const initState: StateProps = {
  billingCycle: "yearly",
  priceType: "usd",
  autoRenew: true,
};

interface ICreateCompanySubscriptionContext {
  state: StateProps;
  dispatch: React.Dispatch<IAction>;
}

export enum ECreateCompanySubscriptionOps {
  update,
  updateAddOnsOnly,
}

type IAction = {
  payload?: StateProps;
  type: ECreateCompanySubscriptionOps;
};

const reducer = (state: StateProps, action: IAction): StateProps => {
  let newState: StateProps = {
    ...state,
  };
  switch (action.type) {
    case ECreateCompanySubscriptionOps.update:
      newState = {
        ...state,
        ...action.payload,
      };

      return newState;

    case ECreateCompanySubscriptionOps.updateAddOnsOnly:
      if (!action.payload?.addOns) return state;
      newState = {
        ...state,
        addOns: {
          ...state.addOns,
          ...action.payload?.addOns,
        },
      };

      return newState;

    default:
      return state;
  }
};

interface IProps {
  children: ReactNode;
}

export const CreateCompanySubscriptionContext =
  createContext<ICreateCompanySubscriptionContext>({
    state: initState,
    dispatch: () => {},
  });
export const CreateCompanySubscriptionContextProvider: React.FC<IProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initState, (): StateProps => {
    // TODO: Implement geolocation to be able to determine default pricing type, based on product owner description
    return {
      billingCycle: "yearly",
      priceType: "usd",
      autoRenew: true,
    };
  });

  return (
    <CreateCompanySubscriptionContext.Provider value={{ state, dispatch }}>
      {children}
    </CreateCompanySubscriptionContext.Provider>
  );
};

export const useCreateCompanySubscriptionStateAndDispatch = () => {
  const context = useContext(CreateCompanySubscriptionContext);
  if (context === undefined) {
    throw new Error(
      "useCreateCompanySubscriptionStateAndDispatch must be used within a CreateCompanySubscriptionContextProvider"
    );
  }
  const { dispatch, state } = context;
  return { dispatch, state };
};
