export interface IFaction {
  id: string;
  name: string;
  player: "human" | "ai";
  countryStatus: "active" | "inactive";
  supply: number;
  gold: number;
  influence: number;
  action: number;
  backgroundColor: string;
}

export type FactionTable = Record<string, IFaction>;
