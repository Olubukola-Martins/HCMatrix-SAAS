import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MoreOutlined } from "@ant-design/icons";
import { enUS } from "date-fns/locale";
import EventDetailsModal from "./EventDetailsModal"; 

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export interface InterviewEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  person: string;
  jobRole: string;
}

interface CalendarProps {
  events: InterviewEvent[];
}

const InterviewCalendar: React.FC<CalendarProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<InterviewEvent | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleEventClick = (event: InterviewEvent) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const EventComponent = ({ event }: { event: InterviewEvent }) => {
    return (
      <div className="bg-blue-200 p-2 rounded-lg text-accent">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold max-md:text-sm">{event.person}</p>
            <p className="max-md:text-xs text-sm">{event.jobRole}</p>
          </div>
          <MoreOutlined />
        </div>
      </div>
    );
  };

  return (
    <div className="h-full">
      <EventDetailsModal visible={modalVisible} onClose={handleCloseModal} event={selectedEvent} />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event) => handleEventClick(event)}
        components={{
          event: EventComponent,
        }}
      />
    </div>
  );
};

export default InterviewCalendar;
