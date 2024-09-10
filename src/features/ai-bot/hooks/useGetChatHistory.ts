import axios from "axios";
import { useQuery } from "react-query";
import { TChatHistory } from "../types";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

interface GetChatHistoryProps {
  employee_id: string;
  company_id: string;
  chat_id: string;
}


  const getChatHistory = async ({
    employee_id,
    company_id,
    chat_id,
  }: GetChatHistoryProps
  ): Promise<TChatHistory[]> => {
    const url = `${MICROSERVICE_ENDPOINTS.CHATBOT}/chat-history`;
  
    const config = {
      headers: {
        Accept: "application/json",
      },
      params: {
        employee_id,
        company_id,
        chat_id,
      },
    };

  
    const res = await axios.get(url, config);
    
    const result = res.data;
    return result;
  };

  export const useGetChatHistory = (props: GetChatHistoryProps) => {

    const queryData = useQuery(
      ["chat-history", props.employee_id, props.company_id, props.chat_id ],
      () =>
        getChatHistory(props),
      {
        onError: (err: any) => {},
        onSuccess: (data) => {},
      }
    );
    return queryData;
  };

