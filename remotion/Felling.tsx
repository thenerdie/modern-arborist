import { Img, staticFile, useCurrentFrame } from "remotion";

export const MyComposition = () => {
  const frame = useCurrentFrame();

  return (
    <Img
      src={staticFile("logo.png")}
      alt="Example Image"
      style={{ width: frame, height: "auto" }}
    />
  );
};
