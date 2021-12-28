import { useState } from "react";
import { useCallback, useEffect } from "react";
import kalendar from "./Calendar";
import { EventDetails } from "./Calendar/EventDetails";
import { NetItems } from "./Calendar/NetCreator";
import { nanoid } from "nanoid";
import { useMemo } from "react";

const CalendarInstance = new kalendar();

export const Kalendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(CalendarInstance.formatDate(CalendarInstance.selectedDate));
  const [events, setEvents] = useState<any[]>(CalendarInstance.dates.get(CalendarInstance.formatDate(CalendarInstance.today)));
  const [eventSelected, setEventSelected] = useState<null | { start: string; duration: string; user: string; date: Date }>(null);
  const [scheduleDisplay, setScheduleDisplay] = useState(0);

  const ScheduleBody = useMemo(() => {
    if (scheduleDisplay === 0) return <Day events={events} setEventSelected={setEventSelected} setEvents={setEvents} eventSelected={eventSelected} />;
    else if (scheduleDisplay === 1) return <Month />;
    return <List />;
  }, [scheduleDisplay]);

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

const Day: React.FC<{
  events: any[];
  setEventSelected: Function;
  setEvents: Function;
  eventSelected: null | { start: string; duration: string; user: string; date: Date };
}> = ({ events, setEventSelected, setEvents, eventSelected }) => {
  const marginsLeft = new Map();

  const get_margin_left = useCallback(
    (value: number, index: number) => {
      let initialMargin = marginsLeft.get(index - 1);

      let margin = 50;
      let firstNeighbour = false;
      for (var i = index - 1; i >= 0; i--) {
        if (!firstNeighbour && kalendar.dateTransformer(events[i].start) + Number(events[i].duration) > value && initialMargin) {
          margin += initialMargin;
          firstNeighbour = true;
        } else if (kalendar.dateTransformer(events[i].start) + Number(events[i].duration) > value) margin += 100;
        else if (!initialMargin) break;
      }
      marginsLeft.set(index, margin);
      return margin;
    },
    [events]
  );
  return (
    <section id="net">
      {events?.sort(kalendar.compare).map((v: any, index: number) => {
        const top = kalendar.dateTransformer(v.start);
        const left = get_margin_left(top, index);
        return (
          <div
            key={nanoid()}
            className="box"
            onClick={() => {
              setEventSelected(v);
            }}
            style={{ marginTop: top, height: `${v.duration}px`, marginLeft: left + 50, zIndex: left, backgroundColor: kalendar.get_color(left) }}
          >
            {top} {v.duration} {left} {index}
          </div>
        );
      })}
      <NetItems
        setEvents={(e: any) => {
          const array = [...events, e];
          setEvents(array);
        }}
      />
      <EventDetails event={eventSelected} eventClose={setEventSelected} />
    </section>
  );
};

const Month: React.FC = () => {
  return <div>Mjesec</div>;
};

const List: React.FC = () => {
  return <div>Lista</div>;
};
