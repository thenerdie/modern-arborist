import { Composition } from "remotion";
import { MyComposition } from "./Felling";

const duration = 60;
const fps = 15;

export const RemotionRoot = () => (
  <Composition
    id="Empty"
    component={MyComposition}
    durationInFrames={duration * fps}
    fps={fps}
    width={1280}
    height={720}
  />
);
