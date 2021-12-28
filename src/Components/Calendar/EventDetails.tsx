import "./EventDetails.scss";
import { useState } from "react";

export const EventDetails: React.FC<{ event: { start: string; duration: string; user: string; date: Date } | null; eventClose: Function }> = ({
  event,
  eventClose,
}) => {
  return (
    <div style={event ? { opacity: 1, zIndex: 100000 } : { opacity: 0, zIndex: -1 }} className="event">
      <section className="eventBox">
        <p>{event?.start}</p>
        <p>{event?.user}</p>
        <p>{event?.duration}</p>
        <p>{event?.date}</p>
      </section>
      <div
        onClick={() => {
          if (eventClose) eventClose(null);
        }}
        className="blackPart"
      ></div>
    </div>
  );
};
