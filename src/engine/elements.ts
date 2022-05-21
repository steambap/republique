export interface IWeapon {
  fire: number;
  shock: number;
  rof: number;
  range: number;
  rangeOnly: boolean;
  damage: number;
  damagePerEqp: number;
}

export interface IWeaponList {
  [key: string]: IWeapon;
}

export const weapons: IWeaponList = {
  // infantry
  hanyang_88: {
    fire: 8,
    shock: 6,
    rof: 1,
    range: 1,
    rangeOnly: false,
    damage: 15,
    damagePerEqp: 0,
  },
  xuantong_type_27: {
    fire: 11,
    shock: 8,
    rof: 1,
    range: 1,
    rangeOnly: false,
    damage: 40,
    damagePerEqp: 0,
  },
  xuantong_type_35: {
    fire: 11,
    shock: 8,
    rof: 2,
    range: 1,
    rangeOnly: false,
    damage: 40,
    damagePerEqp: 0,
  },
  // support
  pistol: {
    fire: 6,
    shock: 6,
    rof: 1,
    range: 0,
    rangeOnly: false,
    damage: 10,
    damagePerEqp: 0,
  },
  qingdao_mp18: {
    fire: 6,
    shock: 8,
    rof: 2,
    range: 0,
    rangeOnly: false,
    damage: 25,
    damagePerEqp: 0,
  },
  // artillery
  M1906: {
    fire: 9,
    shock: 0,
    rof: 1,
    range: 2,
    rangeOnly: true,
    damage: 20,
    damagePerEqp: 0,
  },
  xuantong_type_13: {
    fire: 10,
    shock: 0,
    rof: 1,
    range: 2,
    rangeOnly: true,
    damage: 0,
    damagePerEqp: 6,
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
  weaponID: string;
  experience: number;
  hp: number;
  hpDamaged: number;
}
