import { useState } from "react";
import { useCallback, useEffect } from "react";
import kalendar from "./Calendar";
import { EventDetails } from "./Calendar/EventDetails";
import { NetItems } from "./Calendar/NetCreator";
import { nanoid } from "nanoid";
import { useMemo } from "react";
import { Day } from "./Calendar/DayView";
import { Month } from "./Calendar/MonthView";
import { List } from "./Calendar/ListView";

const CalendarInstance = new kalendar();

export const Kalendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(CalendarInstance.formatDate(CalendarInstance.selectedDate));
  const [events, setEvents] = useState<any[]>(CalendarInstance.dates.get(CalendarInstance.formatDate(CalendarInstance.today)));
  const [eventSelected, setEventSelected] = useState<null | { start: string; duration: string; user: string; date: Date }>(null);
  const [scheduleDisplay, setScheduleDisplay] = useState(0);
  useEffect(() => {
    CalendarInstance.setEventsPointer(setEvents);
  }, []);
  const ScheduleBody = useMemo(() => {
    if (scheduleDisplay === 0)
      return (
        <Day
          CalendarInstance={CalendarInstance}
          events={events}
          selectedDay={selectedDay}
          setEventSelected={setEventSelected}
          setEvents={setEvents}
          eventSelected={eventSelected}
        />
      );
    else if (scheduleDisplay === 1) return <Month events={CalendarInstance.monthCount()} />;
    return <List events={CalendarInstance.flatter()} />;
  }, [scheduleDisplay, events, selectedDay]);

  return (
    <div className="kalendar">
      <section className="nav">
        <p
          onClick={() => {
            setScheduleDisplay(0);
          }}
          className="time"
          style={scheduleDisplay === 0 ? { backgroundColor: "blue" } : {}}
        >
          Day
        </p>
        <p
          onClick={() => {
            setScheduleDisplay(1);
          }}
          style={scheduleDisplay === 1 ? { backgroundColor: "blue" } : {}}
          className="time"
        >
          Month
        </p>
        <p
          onClick={() => {
            setScheduleDisplay(2);
          }}
          style={scheduleDisplay === 2 ? { backgroundColor: "blue" } : {}}
          className="time"
        >
          List
        </p>
        <p
          onClick={() => {
            CalendarInstance.addDay(setEvents, setSelectedDay);
          }}
        >
          Naprijed
        </p>
        <p>{selectedDay}</p>
        <p
          onClick={() => {
            CalendarInstance.prevDay(setEvents, setSelectedDay);
          }}
        >
          Nazad
        </p>
      </section>
      {ScheduleBody}
    </div>
  );
};
