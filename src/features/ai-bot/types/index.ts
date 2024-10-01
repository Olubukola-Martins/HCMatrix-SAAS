export type TEmployee = {
    department_id: string;
    role_id: string;
    group_id: string;
    company_id: string;
    id: string;
  };
  
  export type TChatHistory = {
    employee_metadata: TEmployee;
    question: string;
    answer: string;
    audio_response: string | null;
    timestamp: string;
    request_id: string;
  };
  
  export interface TChatText extends TChatHistory {
    chat_id: string | null;
    audio: string | null;
  }