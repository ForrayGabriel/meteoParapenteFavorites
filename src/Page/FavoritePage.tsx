import { FlexContainer } from "Shared/BasicFlexContainer";
import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from "react";
import { SelectedButton } from "Shared/SelectedButton";
import { Favorite, Run, Status } from "../Services/types";
import { getStatus } from "../Services/data";
import { getParsedDay, getRuns } from "../Utils/status";
import { FavoriteRow } from "./FavoriteRow";

const favorites: Favorite[] = [
  {
    id: 1,
    name: "Planfait",
    location: "45.8533,6.2229",
    altitude: 900,
    headWinds: ["O", "SO"],
    tailWinds: ["E", "NE"],
    maxHeadWind: 15,
  },
  {
    id: 2,
    name: "Semnoz",
    location: "45.7969,6.1046",
    altitude: 1700,
    headWinds: ["SE"],
    tailWinds: ["O"],
  },
  {
    id: 3,
    name: "Sur Cou",
    location: "46.0199,6.3463",
    altitude: 1800,
    headWinds: ["N"],
    tailWinds: [],
  },
];

export const FavoritePage = () => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [status, setStatus] = useState<Status | null>(null);
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);

  console.log(selectedRun);

  const fetchStatus = useCallback(async () => {
    setLoadingStatus(true);
    const response = await getStatus();
    setStatus(response.data);
    setLoadingStatus(false);
  }, []);

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <FlexContainer direction="column" sx={{ width: "95vw" }}>
      <FlexContainer direction="row">
        {status &&
          getRuns(status).map((run) => (
            <SelectedButton
              selected={selectedRun === run}
              text={getParsedDay(run.day)}
              onClick={() => setSelectedRun(run)}
            />
          ))}
      </FlexContainer>
      {favorites.map((favorite) => (
        <FavoriteRow favorite={favorite} run={selectedRun} />
      ))}
    </FlexContainer>
  );
};
