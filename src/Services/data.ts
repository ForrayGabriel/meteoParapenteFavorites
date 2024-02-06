import axios from "../../node_modules/axios/index";
import { Data, Status } from "./types";

export async function getData(run: string, location: string, date: string) {
  const response = await axios<Data>(
    `/api/data.php?run=${run}&location=${location}&date=${date}&plot=windgram`,
    {
      method: "GET",
      headers: {
        "X-Auth-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoyODY5MDM1LCJlbWFpbCI6ImdhYnJpZWwuZm9ycmF5QGdtYWlsLmNvbSIsImV4cGlyZXMiOiIyMDI0LTA2LTE4VDA4OjU5OjQ3LjU4OVoiLCJpc3N1ZWQiOiIyMDI0LTAyLTA0VDE4OjEzOjEwLjczMloiLCJpYXQiOjE3MDcwNzAzOTB9.VOf02_d1ceVD6E8IaeAeA2_Bnlb1I9gD9m_oPuoqhmo",
        Accept: "*/*",
        "Accept-Language": "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3",
        "Accept-Encoding": "gzip, deflate, br",
        "Access-Control-Request-Method": "GET",
        "Access-Control-Request-Headers": "x-auth",
      },
    }
  );
  return response;
}

export async function getStatus() {
  const response = await axios.get<Status>(
    `https://data0.meteo-parapente.com/status.php`
  );
  return response;
}
