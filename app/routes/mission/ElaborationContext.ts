import { createContext } from "react";

export const ElaborationContext = createContext<{
  elaborate:
    | false
    | {
        title: string;
        body: string;
        elaboration?: string;
      };
  setElaborate: (
    value: false | { title: string; body: string; elaboration?: string }
  ) => void;
}>(undefined as any);
