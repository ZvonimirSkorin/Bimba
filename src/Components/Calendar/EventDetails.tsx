import "./EventDetails.scss";

export const EventDetails: React.FC<{
  event: { start: string; duration: string; user: string; date: Date } | null;
  eventClose: Function;
  remove: Function;
}> = ({ event, eventClose, remove }) => {
  return (
    <div style={event ? { opacity: 1, zIndex: 10000000 } : { opacity: 0, zIndex: -1 }} className="event">
      <button
        onClick={() => {
          remove(event);
          eventClose(null);
        }}
      >
        Delete
      </button>
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
