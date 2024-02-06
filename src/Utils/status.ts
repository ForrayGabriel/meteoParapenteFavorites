import { Run, Status } from "../Services/types";

export function getRuns(status: Status) {
  let runs: Run[] = [];

  status.france.forEach((run) => {
    const existingRun = runs.find((oldRun) => oldRun.day === run.day);
    if (existingRun) {
      if (existingRun.update < run.update) {
        runs = runs.filter((r) => r.day !== run.day);
        runs.push(run);
      }
    } else {
      runs.push(run);
    }
  });
  return runs.sort((a, b) => +a.day - +b.day);
}

export function getParsedDay(date: string) {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6);

  const weekDay = new Date(`${year}-${month}-${day}`);

  return weekDay.toLocaleDateString("en-EN", { weekday: "short" }) + " " + day;
}
