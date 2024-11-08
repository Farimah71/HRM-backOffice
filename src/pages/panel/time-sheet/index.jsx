import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const events = [{ title: "Meeting", start: new Date() }];

export const TimeSheet = () => {
  return (
    <div className="pb-8">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          start: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          end: "prevYear,prev,next,nextYear",
        }}
      />
    </div>
  );
};
