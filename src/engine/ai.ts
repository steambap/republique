export interface ICPUState {
  factionID: string;
  logs: string[];
}

export type CPUStateTable = Record<string, ICPUState>;
