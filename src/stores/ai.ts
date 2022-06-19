import { atom } from "recoil";
import { mapValues } from "lodash";
import { CPUStateTable } from "../engine/ai";
import core from "../maps/core.json";

const defaultTable: CPUStateTable = mapValues(core.factionTable, (faction) => ({
  factionID: faction.id,
  logs: [],
}));

export interface ICPUProps {
  aiStateTable: CPUStateTable;
}

export const cpuStore = atom<ICPUProps>({
  key: "ai_state",
  default: {
    aiStateTable: defaultTable,
  },
});
