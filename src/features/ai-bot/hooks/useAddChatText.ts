import axios from "axios";
import { useMutation } from "react-query";
import { TChatText, TEmployee } from "../types";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

interface IChatTextData {
  user_query: string;
  audio: boolean;
  chat_id: string;
  employee_metadata: TEmployee;
  }

  const getChatText = async (data: IChatTextData): Promise<TChatText> => {
    const url = `${MICROSERVICE_ENDPOINTS.CHATBOT}/chat`;

    const res = await axios.post(url, data);

    return res.data;
  }


  export const useAddChatText = () => {
    return useMutation((data: IChatTextData) =>
      getChatText( data )
    );
  }