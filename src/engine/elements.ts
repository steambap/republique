export interface IWeapon {
  fire: number;
  shock: number;
  rof: number;
  range: number;
  rangeOnly: boolean;
  damage: number;
}

export interface IWeaponList {
  [key: string]: IWeapon;
}

export const weapons: IWeaponList = {
  hanyang_88: {
    fire: 8,
    shock: 6,
    rof: 1,
    range: 1,
    rangeOnly: false,
    damage: 15,
  },
  hanyang_88_mixed: {
    fire: 7,
    shock: 7,
    rof: 1,
    range: 1,
    rangeOnly: false,
    damage: 10,
  },
  hanyang_88_cav: {
    fire: 6,
    shock: 8,
    rof: 1,
    range: 1,
    rangeOnly: false,
    damage: 20,
  },
  zb_26: {
    fire: 10,
    shock: 6,
    rof: 1,
    range: 1,
    rangeOnly: false,
    damage: 30,
  },
  type_24_HMG: {
    fire: 11,
    shock: 6,
    rof: 1,
    range: 1,
    rangeOnly: false,
    damage: 40,
  },
  type_36_HMG: {
    fire: 11,
    shock: 6,
    rof: 2,
    range: 1,
    rangeOnly: false,
    damage: 40,
  },
  M1906: {
    fire: 9,
    shock: 0,
    rof: 1,
    range: 2,
    rangeOnly: true,
    damage: 20,
  },
  kruppe_m1903: {
    fire: 10,
    shock: 0,
    rof: 1,
    range: 2,
    rangeOnly: true,
    damage: 25,
  },
  bofors_m1930: {
    fire: 10,
    shock: 0,
    rof: 1,
    range: 2,
    rangeOnly: true,
    damage: 25,
  },
} as const;

export type weaponNames = keyof typeof weapons;

export type TBattalion =
  | "infantry"
  | "cavalry"
  | "armor"
  | "artillery"
  | "mixed"
  | "logistic"
  | "ambulance";
export const BattalionTList: TBattalion[] = [
  "infantry",
  "cavalry",
  "armor",
  "artillery",
  "mixed",
  "logistic",
  "ambulance",
];

export interface IElement {
  type: TBattalion;
  slotID: string;
  unitID: string;
  weapon: string;
  experience: number;
  hp: number;
  hpDamaged: number;
}
