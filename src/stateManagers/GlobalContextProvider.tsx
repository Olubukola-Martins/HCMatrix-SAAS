import React, { useReducer, createContext } from "react";

type TCCompany = {
  id: string;
  name: string;
};

export interface IGlobalState {
  currentCompany: TCCompany | null;
  showInitialSetUp: boolean;
  showAdminWelcomeMessage: boolean;
  upLoadFileString: string;
}

const initState: IGlobalState = {
  currentCompany: null,
  showInitialSetUp: false,
  showAdminWelcomeMessage: true,
  upLoadFileString: "",
};

interface IGlobalContext {
  state: IGlobalState;
  dispatch: Function;
}

export enum EGlobalOps {
  setCurrentCompanyId,
  setAdminWelcomeMessage,
  setShowInitialSetup,
  setUploadFileString,
}

interface IAction {
  payload?: any;
  type: EGlobalOps;
}
const updateLocalStorage = ({ key, val }: { key: string; val: string }) => {
  localStorage.setItem(key, JSON.stringify(val));
};
const removeAuthLocalStorage = ({ key }: { key: string }) => {
  localStorage.removeItem("currentCompany");
};

const GlobalReducer = (state: IGlobalState, action: IAction): IGlobalState => {
  switch (action.type) {
    case EGlobalOps.setCurrentCompanyId:
      const newState = {
        ...state,
        currentCompany: action.payload,
      };
      updateLocalStorage({
        key: "currentCompany",
        val: action.payload,
      });
      return newState;
    case EGlobalOps.setUploadFileString:
      return {
        ...state,
        upLoadFileString: action.payload,
      };

    case EGlobalOps.setShowInitialSetup:
      return {
        ...state,
        showInitialSetUp: action.payload,
      };
    case EGlobalOps.setAdminWelcomeMessage:
      return {
        ...state,
        showAdminWelcomeMessage: action.payload,
      };

    default:
      return state;
  }
};

export const GlobalContext = createContext<IGlobalContext>({
  state: initState,
  dispatch: Function,
});

interface IProps {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    GlobalReducer,
    initState,
    (): IGlobalState => {
      const localCC = localStorage.getItem("currentCompany");
      const currentCompany =
        typeof localCC === "string"
          ? (JSON.parse(localCC) as unknown as TCCompany)
          : null;
      return {
        currentCompany,
        showInitialSetUp: false,
        upLoadFileString: "",
        showAdminWelcomeMessage: true,
      };
    }
  );

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
