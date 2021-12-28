import { useRef } from "react";
import { useState } from "react";
import "./NetCreator.scss";

export const NetItems: React.FC<{ setEvents: Function }> = ({ setEvents }) => {
  const [open, setOpen] = useState<boolean | number>(false);
  return (
    <div>
      {new Array(96).fill(0).map((v, index) => {
        return (
          <div
            onClick={() => {
              setOpen(index);
            }}
            style={index % 4 === 0 ? { borderWidth: 2 } : { borderWidth: 0.2 }}
            className="netItem"
            key={index}
          ></div>
        );
      })}
      {open ? <AddNewItem open={open} setOpen={setOpen} setEvents={setEvents} /> : <></>}
      <section className="hour">
        {new Array(24).fill(0).map((v, index) => {
          return (
            <div className="hourItem" key={index}>
              {index < 10 ? `0${index}:00` : `${index}:00`}
            </div>
          );
        }, [])}
      </section>
    </div>
  );
};

const AddNewItem: React.FC<{ open: boolean | number; setOpen: Function; setEvents: Function }> = ({ open, setOpen, setEvents }) => {
  const name = useRef<HTMLInputElement>(null);
  const when = useRef<HTMLInputElement>(null);
  const duration = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);
  return (
    <div style={!open ? { zIndex: -1, opacity: 0 } : {}} className="newItem">
      <strong
        onClick={() => {
          setOpen(false);
        }}
        className="blackPart"
      ></strong>
      <section className="AddEvent">
        <input ref={when} type={"text"} placeholder="when" />
        <input ref={duration} type={"text"} placeholder="duration" />
        <input ref={date} type="date" placeholder="date" />
        <input ref={name} type={"text"} placeholder="name" />
        <button
          onClick={() => {
            setEvents({ start: when.current?.value, duration: duration.current?.value, user: name.current?.value, date: new Date().getDate() });
            setOpen(false);
          }}
        >
          Add
        </button>
      </section>
    </div>
  );
};
