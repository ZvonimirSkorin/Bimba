import { nanoid } from "nanoid";

export const List: React.FC<{ events: any[] }> = ({ events }) => {
  return (
    <div>
      {" "}
      {events.map((v: any, index: number) => {
        return <div key={nanoid()}>{v}</div>;
      })}
    </div>
  );
};
