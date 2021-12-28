import { nanoid } from "nanoid";
import { useState } from "react";
import { useCallback } from "react";
import kalendar from "../Calendar";
import { EventDetails } from "./EventDetails";
import { NetItems } from "./NetCreator";

export const Day: React.FC<{
  events: any[];
  selectedDay: string;
  setEventSelected: Function;
  setEvents: Function;
  CalendarInstance: kalendar;
  eventSelected: null | { start: string; duration: string; user: string; date: Date };
}> = ({ events, setEvents, selectedDay, CalendarInstance }) => {
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
  const [eventSelected, setEventSelected] = useState<null | { start: string; duration: string; user: string; date: Date }>(null);

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
            {top} {v.duration} {left}
          </div>
        );
      })}
      <NetItems
        selectedDay={selectedDay}
        setEvents={(e: any) => {
          const oldDates = CalendarInstance.dates.get(selectedDay) ? CalendarInstance.dates.get(selectedDay) : [];
          const array = [...oldDates, e];

          CalendarInstance.dates.set(selectedDay, array);
          setEvents(array);
        }}
      />
      <EventDetails
        remove={(e: any) => {
          CalendarInstance.removeEvent(e, selectedDay);
        }}
        event={eventSelected}
        eventClose={setEventSelected}
      />
    </section>
  );
};
