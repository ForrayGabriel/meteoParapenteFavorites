import { styled } from "@mui/system";

export const FlexContainer = styled("div")<{ direction: "column" | "row" }>(
  ({ theme, direction }) => ({
    display: "flex",
    flexDirection: direction,
    padding: "1rem",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  })
);
