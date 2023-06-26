export type TConferenceRoomAnalytics = {
  requests: Requests;
  bookings: Bookings;
  availableRooms: AvailableRoom[];
};

interface AvailableRoom {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface Bookings {
  pending: number;
  approved: number;
  rejected: number;
}

interface Requests {
  total: number;
  pending: number;
  rejected: number;
}
