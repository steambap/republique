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
  maxHP: 1128,
};

export const infantry36Slot: ISlotData = {
  type: "infantry",
  fixed: false,
  defaultWeapon: "hanyang_88",
  maxHP: 654,
};

export const infantry39Slot: ISlotData = {
  type: "infantry",
  fixed: false,
  defaultWeapon: "hanyang_88",
  maxHP: 784,
};

export const mixedSlot: ISlotData = {
  type: "mixed",
  fixed: true,
  defaultWeapon: "hanyang_88_mixed",
  maxHP: 602,
};

export const artillerySlot: ISlotData = {
  type: "artillery",
  fixed: false,
  defaultWeapon: "",
  maxHP: 396,
};

export const logistic30Slot: ISlotData = {
  type: "logistic",
  fixed: true,
  defaultWeapon: "hanyang_88_mixed",
  maxHP: 756,
};

export const logistic36Slot: ISlotData = {
  type: "logistic",
  fixed: true,
  defaultWeapon: "hanyang_88_mixed",
  maxHP: 1368,
};

export const TypeADiv: ITableOfElm = {
  role: "combat",
  slots: {
    "1r_1b": infantry30Slot,
    "1r_2b": infantry30Slot,
    "2r_1b": infantry30Slot,
    "2r_2b": infantry30Slot,
    "3r_1b": infantry30Slot,
    "3r_2b": infantry30Slot,
    "4r_1b": infantry30Slot,
    "4r_2b": infantry30Slot,
    res: infantry30Slot,
    support: logistic30Slot,
  },
};

export const TypeBDiv: ITableOfElm = {
  role: "combat",
  slots: {
    "1r_1b": infantry30Slot,
    "1r_2b": infantry30Slot,
    "2r_1b": infantry30Slot,
    "2r_2b": infantry30Slot,
    "3r_1b": infantry30Slot,
    "3r_2b": infantry30Slot,
    "4r_1b": infantry30Slot,
    "4r_2b": infantry30Slot,
    support: logistic30Slot,
  },
};

export const TypeCDiv: ITableOfElm = {
  role: "combat",
  slots: {
    "1r": infantry30Slot,
    "2r": infantry30Slot,
    "3r": infantry30Slot,
    "4r": infantry30Slot,
  },
};

export const InfantryDivision: ITableOfElm = {
  role: "combat",
  slots: {
    "1r_1b": infantry36Slot,
    "1r_2b": infantry36Slot,
    "1r_3b": infantry36Slot,
    "2r_1b": infantry36Slot,
    "2r_2b": infantry36Slot,
    "2r_3b": infantry36Slot,
    "3r_1b": infantry36Slot,
    "3r_2b": infantry36Slot,
    "3r_3b": infantry36Slot,
    support: logistic36Slot,
  },
};

export const ReserveDivision: ITableOfElm = {
  role: "combat",
  slots: {
    "1r_1b": infantry36Slot,
    "1r_2b": infantry36Slot,
    "2r_1b": infantry36Slot,
    "2r_2b": infantry36Slot,
    "3r_1b": infantry36Slot,
    "3r_2b": infantry36Slot,
  },
};

export const MixedBrigade: ITableOfElm = {
  role: "combat",
  slots: {
    "1r": infantry30Slot,
    "2r": infantry30Slot,
    "3r": infantry30Slot,
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
      weapon: defaultWeapon,
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
