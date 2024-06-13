import { db } from "@/firebaseConfig";
import { LineType } from "@/types";
import { getLines } from "./getLines";

export const API = {
  lines: {
    get: () => getLines(db) as Promise<LineType[]>,
  },
};
