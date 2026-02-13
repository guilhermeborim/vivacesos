import { ClipLoader } from "react-spinners";

export const ActivityIndicator = () => {
  return (
    <ClipLoader
      color={"#2563eb"}
      size={15}
      speedMultiplier={0.5}
      cssOverride={{
        display: "block",
        margin: "0 auto",
      }}
    />
  );
};
