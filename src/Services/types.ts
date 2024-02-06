export interface Status {
  france: Run[];
}

export interface Run {
  run: "string";
  day: "string";
  private: boolean;
  status: string;
  update: Date;
}

export interface Favorite {
  id: number;
  name: string;
  location: string;
  altitude: number;
  headWinds: string[];
  tailWinds: string[];
  maxHeadWind?: number;
}

export interface Data {
  gridCoords: GridCoords;
  data: { [key: string]: Datum };
  status: string;
  time: number;
}

export interface Datum {
  z: number[];
  umet: number[];
  vmet: number[];
  ter: number;
  pblh: number;
  raintot: number;
  cfracl: number;
  cfracm: number;
  cfrach: number;
  cldfra: number[];
  ths: number[];
  thr: number[];
}

export interface GridCoords {
  domain: number;
  sn: number;
  we: number;
  lat: number;
  lon: number;
  latDiff: number;
  lonDiff: number;
}

export const hours = [
  { time: "04:00", number: 4 },
  { time: "05:00", number: 5 },
  { time: "06:00", number: 6 },
  { time: "07:00", number: 7 },
  { time: "08:00", number: 8 },
  { time: "09:00", number: 9 },
  { time: "10:00", number: 10 },
  { time: "11:00", number: 11 },
  { time: "12:00", number: 12 },
  { time: "13:00", number: 13 },
  { time: "14:00", number: 14 },
  { time: "15:00", number: 15 },
  { time: "16:00", number: 16 },
  { time: "17:00", number: 17 },
  { time: "18:00", number: 18 },
  { time: "19:00", number: 19 },
  { time: "20:00", number: 20 },
];
