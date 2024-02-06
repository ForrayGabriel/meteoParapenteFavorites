import { FlexContainer } from "./BasicFlexContainer";

interface SelectedButtonProps {
  selected: boolean;
  onClick?: () => void;
  text: string;
}

export const SelectedButton = ({
  text,
  onClick,
  selected,
}: SelectedButtonProps) => {
  return (
    <FlexContainer
      direction="row"
      onClick={onClick}
      sx={{
        height: "1rem",
        border: "1px solid white",
        borderRadius: "1.5rem",
        backgroundColor: selected ? "white" : "",
        color: selected ? "black" : "",
        text: "bold",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {text}
    </FlexContainer>
  );
};
