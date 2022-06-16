import { atom } from "recoil";
import { mapValues } from "lodash";
import { AIStateTable } from "../engine/ai";
import core from "../maps/core.json";

const defaultTable: AIStateTable = mapValues(core.factionTable, () => ({
  logs: [],
}));

export interface IComputerState {
  aiStateTable: AIStateTable;
}

export const aiState = atom<IComputerState>({
  key: "ai_state",
  default: {
    aiStateTable: defaultTable,
  },
});
