import { FlexContainer } from "Shared/BasicFlexContainer";
import { Data, Favorite, Run, hours } from "../Services/types";
import { useCallback, useEffect, useState } from "react";
import { getData } from "../Services/data";
import { WeatherGrid } from "./WeatherGrid";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";

interface FavoriteRowProps {
  favorite: Favorite;
  run: Run | null;
}

export const FavoriteRow = ({ favorite, run }: FavoriteRowProps) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [delta, setDelta] = useState(0);

  console.log(delta);

  const fetchData = useCallback(async () => {
    if (run) {
      setLoading(true);
      const response = await getData(run.run, favorite.location, run.day);
      setData(response.data);
      setLoading(false);
    } else setData(null);
  }, [run]);

  useEffect(() => {
    fetchData();
  }, [run]);

  return (
    <FlexContainer
      direction="column"
      sx={{
        width: "100%",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <FlexContainer direction="row">
            {favorite.name} - {favorite.altitude}{" "}
            <IconButton onClick={() => setDelta(delta + 1)}>
              <AddOutlined color="info" />
            </IconButton>
            <IconButton onClick={() => setDelta(Math.max(delta - 1, 0))}>
              <RemoveOutlined color="info" />
            </IconButton>
          </FlexContainer>
          {data && (
            <WeatherGrid data={data} favorite={favorite} delta={delta} />
          )}
        </>
      )}
    </FlexContainer>
  );
};
