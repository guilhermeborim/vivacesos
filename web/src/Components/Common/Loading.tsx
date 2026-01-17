import { InfinitySpin } from "react-loader-spinner";

export const Loading = ({ loading }: { loading: boolean }) => {
  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <InfinitySpin width="200" color="#ffffff" />
        </div>
      )}
    </>
  );
};
