import Moment from "moment";

class kalendar {
  dates = new Map<string, any>();
  today = Moment(new Date()).toDate();
  selectedDate = this.today;
  eventsPointer: null | Function = null;
  constructor() {
    this.dates.set(this.formatDate(this.today), DummyEvents);
    this.selectedDate = this.today;
  }
  setEventsPointer = (eventsPointer: Function) => {
    this.eventsPointer = eventsPointer;
  };
  addDay = (setEvent: Function, setSelectedDay: Function) => {
    this.selectedDate = Moment(this.selectedDate).add(1, "day").toDate();
    setSelectedDay(this.formatDate(this.selectedDate));
    setEvent(this.dates.get(this.formatDate(this.selectedDate)));
  };
  prevDay = (setEvent: Function, setSelectedDay: Function) => {
    this.selectedDate = Moment(this.selectedDate).add(-1, "day").toDate();

    setSelectedDay(this.formatDate(this.selectedDate));
    setEvent(this.dates.get(this.formatDate(this.selectedDate)));
  };
  flatter = () => {
    let arr = [""];

    this.dates.forEach((v, key) => {
      arr.push(key);
      v.forEach((val: any) => {
        arr.push(JSON.stringify(val));
      });
    });

    return arr;
  };
  monthCount = () => {
    let map = new Map();

    this.dates.forEach((v, key) => {
      let month = key.split(":")[0] + key.split(":")[1];
      const singleMonth = map.get(month);
      if (singleMonth) map.set(month, singleMonth + v.length);
      else map.set(month, v.length);
    });
    const arr: any[] = [];
    map.forEach((v, key) => {
      arr.push([key, v]);
    });
    return arr;
  };
  removeEvent = (event: any, date: string) => {
    this.dates.set(
      date,
      this.dates.get(date).filter((v: any) => {
        if (v !== event) return v;
      })
    );
    if (this.eventsPointer !== null) this.eventsPointer(this.dates.get(date));
  };
  static dateTransformer = (date: string) => {
    const splitted = date.split(":");
    const hours = Number(splitted[0]);
    const minutes = Number(splitted[1]);
    return hours * 60 + minutes;
  };
  static colors = ["blue", "red", "black", "purple"];
  static get_color = (margin: number) => {
    if (margin < 100) return kalendar.colors[0];
    if (margin < 200) return kalendar.colors[1];
    if (margin < 300) return kalendar.colors[2];
    return kalendar.colors[3];
  };

  formatDate(date: any) {
    return Moment(date).format("DD:MM:yyyy");
  }

  static compare(a: { start: string; duration: string }, b: { start: string; duration: string }) {
    return kalendar.dateTransformer(a.start) - kalendar.dateTransformer(b.start);
  }
}

const DummyEvents: any = [
  { start: "0:0", duration: "130", user: "Marin", date: new Date().getDate() },
  { start: "2:0", duration: "40", user: "Marin", date: new Date().getDate() },
  { start: "1:0", duration: "40", user: "Marin", date: new Date().getDate() },
  { start: "5:0", duration: "40", user: "Marin", date: new Date().getDate() },
  { start: "4:0", duration: "40", user: "Marin", date: new Date().getDate() },
];

export default kalendar;
