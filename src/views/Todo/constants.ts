import { TTitleRequiredRule } from "./types";

export const titleRequiredRule: TTitleRequiredRule = (title: string) =>
  !!title || "Title is required";
