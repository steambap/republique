import { TBattalion, IElement } from "./elements";

export type TRole = "combat" | "support" | "multi";
export const RoleList: TRole[] = ["combat", "support", "multi"];

export interface ISlotData {
  type: TBattalion;
  // Changes are not allowed
  fixed: boolean;
  // default weapon to use
  defaultWeapon: string;
  maxHP: number;
  slotMultiplier: number;
}

export interface ITableOfElm {
  role: TRole;
  slots: {
    [slotID: string]: ISlotData;
  };
}

export const infantry30Slot: ISlotData = {
  type: "infantry",
  fixed: false,
  defaultWeapon: "hanyang_88",
  maxHP: 2256,
  slotMultiplier: 3,
};

export const infantry37Slot: ISlotData = {
  type: "infantry",
  fixed: false,
  defaultWeapon: "hanyang_88",
  maxHP: 2352,
  slotMultiplier: 3,
};

export const mixedSlot: ISlotData = {
  type: "mixed",
  fixed: true,
  defaultWeapon: "hanyang_88",
  maxHP: 1206,
  slotMultiplier: 2,
};

export const artillerySlot: ISlotData = {
  type: "artillery",
  fixed: false,
  defaultWeapon: "",
  maxHP: 396,
  slotMultiplier: 1,
};

export const logisticSlot: ISlotData = {
  type: "logistic",
  fixed: true,
  defaultWeapon: "pistol",
  maxHP: 756,
  slotMultiplier: 1,
};

export const logisticAndMaintainceSlot: ISlotData = {
  type: "logistic",
  fixed: true,
  defaultWeapon: "pistol",
  maxHP: 1368,
  slotMultiplier: 2,
};

export const InfantryDivision: ITableOfElm = {
  role: "combat",
  slots: {
    "1st": infantry30Slot,
    "2nd": infantry30Slot,
    "3rd": infantry30Slot,
    support: logisticAndMaintainceSlot,
  },
};

export const ReserveDivision: ITableOfElm = {
  role: "combat",
  slots: {
    "1st": infantry30Slot,
    "2nd": infantry30Slot,
    support: logisticSlot,
  },
};

export const Brigade: ITableOfElm = {
  role: "combat",
  slots: {
    "1st": infantry30Slot,
    "2nd": infantry30Slot,
  },
};

export const MixedBrigade: ITableOfElm = {
  role: "multi",
  slots: {
    "1st": infantry30Slot,
    mixed: mixedSlot,
  },
};

export function newElmsFromTOE(
  toe: ITableOfElm,
  unitID: string,
  experience: number = 35
) {
  const elms: IElement[] = [];
  Object.keys(toe.slots).forEach((slotID) => {
    const { defaultWeapon } = toe.slots[slotID];
    if (!defaultWeapon) {
      return;
    }
    elms.push({
      type: toe.slots[slotID].type,
      slotID,
      unitID,
      weaponID: defaultWeapon,
      experience,
      hp: toe.slots[slotID].maxHP,
      hpDamaged: 0,
    });
  });

  return elms;
}

export function getMaxHP(toe: ITableOfElm, slotID: string): number {
  return toe.slots[slotID].maxHP;
}

export function getSlotMultiplier(toe: ITableOfElm, slotID: string): number {
  return toe.slots[slotID].slotMultiplier;
}
