import { ICurrentCompany } from "AppTypes/DataEntitities";

import axios from "axios";
import { useApiAuth } from "Hooks/useApiAuth";
import { useQuery } from "react-query";
import { TSingleConferenceRoom } from "./useFetchSingleConferenceRoom";
import { TBasicWorkflow } from "Settings/Pages/UserAccessControl/Automation/Workflows/hooks/useCreateBasicWorkflow";

export interface TSingleConferenceRoomBooking {
  id: number;
  conferenceRoomId: number;
  employeeId: number;
  departmentId: number;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  priority: string;
  status: string;
  workflowId?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  conferenceRoom: TSingleConferenceRoom;
  employee: Employee;
  department: Department;
  workflow?: TBasicWorkflow; // probably will be refactored
}

// TO DO : REfactor to put department types in its appropriate place or is it needed

interface Department {
  id: number;
  name: string;
  label: string;
  companyId: number;
  departmentHeadId?: any;
  email?: any;
  parentDepartmentId?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hasSelfService: boolean;
  empUid: string;
  roleId: number;
  status: string;
  companyId: number;
  designationId: number;
  userId: number;
  avatarUrl?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}

export const QUERY_KEY_FOR_SINGLE_CONFERENCE_ROOM_BOOKING =
  "conference-room-booking";

interface IGetDataProps {
  id: number;
}

const getSingleConferenceRoomBooking = async (
  props: IGetDataProps & ICurrentCompany
): Promise<TSingleConferenceRoomBooking> => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/conference-room/booking/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const data: TSingleConferenceRoomBooking = {
    ...item,
    // ADHERES TO API
  };
  return data;
};

export const useFetchSingleConferenceRoomBooking = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_CONFERENCE_ROOM_BOOKING, props.id],
    () =>
      getSingleConferenceRoomBooking({
        ...props,
        token,
        companyId,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      // ...preventUnnecessaryRefresh
    }
  );

  return queryData;
};
