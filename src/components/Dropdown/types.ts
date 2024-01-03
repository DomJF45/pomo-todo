import { ReactNode } from "react";

export interface iMenuItem {
  name: string;
  icon: {
    active: ReactNode;
    inactive: ReactNode;
  };
  cb: () => void;
}
