import { GlobalContext } from "Contexts/GlobalContextProvider";
import { useContext } from "react";

export const useCurrentFileUploadUrl = () => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const url = globalState.upLoadFileString;
  return url;
};
