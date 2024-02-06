import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FlexContainer } from "Shared/BasicFlexContainer";
import { angleToOrientation, getColor } from "../Utils/data";
import { Favorite } from "../Services/types";

interface ArrowProps {
  force: number;
  angle: number;
  favorite: Favorite;
}

export const Arrow = ({ force, angle, favorite }: ArrowProps) => {
  const orientation = angleToOrientation(angle);
  console.log(favorite.maxHeadWind);

  const getBackgroundColor = (force: number) => {
    if (favorite.maxHeadWind) {
      if (force * 3.6 > favorite.maxHeadWind) return "#ff333399";
    }
    return favorite.headWinds.includes(orientation)
      ? "#33cc3366"
      : favorite.tailWinds.includes(orientation)
      ? "#ff333399"
      : "white";
  };

  return (
    <FlexContainer
      direction="row"
      sx={{
        width: "2rem",
        height: "2rem",
        backgroundColor: getBackgroundColor(force),
      }}
    >
      <div
        style={{
          rotate: `${-angle}deg`,
          color: getColor(force),
        }}
      >
        <ArrowForwardIcon />
      </div>
      {(force * 3.6).toFixed(0)}
    </FlexContainer>
  );
};
