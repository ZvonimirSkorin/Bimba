import Moment from "moment";

class kalendar {
  dates = new Map();
  today = Moment(new Date()).toDate();
  selectedDate = this.today;
  constructor() {
    this.dates.set(this.formatDate(this.today), DummyEvents);
    this.selectedDate = this.today;
  }
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
