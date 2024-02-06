import { useEffect, useState } from "react";
import { Data, Favorite } from "../Services/types";
import { getWindData } from "../Utils/data";
import { Arrow } from "./Arrow";

interface WeatherGridProps {
  data: Data;
  favorite: Favorite;
  delta: number;
}

export const WeatherGrid = ({ data, favorite, delta }: WeatherGridProps) => {
  const [altitudes, setAltitudes] = useState<number[]>([]);
  const [windData, setWindData] = useState<
    {
      hour: string;
      winds: { altitude: number; angle: number; force: number }[];
    }[]
  >([]);

  console.log(altitudes, windData);
  const mapData = () => {
    if (!data) return;
    const { altitudes, windData } = getWindData(
      data,
      favorite.altitude,
      delta * 100
    );
    setAltitudes(altitudes);
    setWindData(windData);
  };

  useEffect(() => {
    mapData();
  }, [data, delta]);

  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateRows: `repeat(${altitudes.length}, 1fr) auto`,
        backgroundColor: "white",
        color: "black",
        alignContent: "center",
        justifyItems: "center",
      }}
    >
      {altitudes.map((a) => (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {a}m
        </div>
      ))}
      <div />
      {windData.map((hour) => (
        <>
          {hour.winds.map((wind) => (
            <Arrow {...wind} favorite={favorite} />
          ))}{" "}
          {hour.hour}
        </>
      ))}
    </div>
  );
};
