import { iApp } from "../../../types";

export interface IProps {
  children: React.ReactNode;
}

export interface IMainLayoutContext {
  isLoading: boolean;
  error: Error | null;
  app: iApp | null;
}
