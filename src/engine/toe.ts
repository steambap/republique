import { TBattalion, IElement } from "./elements";

export interface ISlotData {
  type: TBattalion;
  // Changes are not allowed
  fixed: boolean;
  // default weapon to use
  defaultWeapon: string;
}

export interface ITableOfElm {
  [slotID: string]: ISlotData;
}

export const infantrySlot: ISlotData = {
  type: "infantry",
  fixed: false,
  defaultWeapon: "hanyang_88",
};

export const mixedSlot: ISlotData = {
  type: "mixed",
  fixed: true,
  defaultWeapon: "hanyang_88_mixed",
};

export const artillerySlot: ISlotData = {
  type: "artillery",
  fixed: false,
  defaultWeapon: "",
};

export const TypeADiv: ITableOfElm = {
  "1r_1b": infantrySlot,
  "1r_2b": infantrySlot,
  "2r_1b": infantrySlot,
  "2r_2b": infantrySlot,
  "3r_1b": infantrySlot,
  "3r_2b": infantrySlot,
  "4r_1b": infantrySlot,
  "4r_2b": infantrySlot,
  "res": infantrySlot,
};

export const TypeBDiv: ITableOfElm = {
  "1r_1b": infantrySlot,
  "1r_2b": infantrySlot,
  "2r_1b": infantrySlot,
  "2r_2b": infantrySlot,
  "3r_1b": infantrySlot,
  "3r_2b": infantrySlot,
  "4r_1b": infantrySlot,
  "4r_2b": infantrySlot,
};

export const TypeCDiv: ITableOfElm = {
  "1r": infantrySlot,
  "2r": infantrySlot,
  "3r": infantrySlot,
  "4r": infantrySlot,
};

export const InfantryDivision: ITableOfElm = {
  "1r_1b": infantrySlot,
  "1r_2b": infantrySlot,
  "1r_3b": infantrySlot,
  "2r_1b": infantrySlot,
  "2r_2b": infantrySlot,
  "2r_3b": infantrySlot,
  "3r_1b": infantrySlot,
  "3r_2b": infantrySlot,
  "3r_3b": infantrySlot,
};

export const ReserveDivision: ITableOfElm = {
  "1r_1b": infantrySlot,
  "1r_2b": infantrySlot,
  "2r_1b": infantrySlot,
  "2r_2b": infantrySlot,
  "3r_1b": infantrySlot,
  "3r_2b": infantrySlot,
};

export function newElmsFromTOE(toe: ITableOfElm) {
  const elms: IElement[] = [];
  Object.keys(toe).forEach((slotID) => {
    const { defaultWeapon } = toe[slotID];
    if (!defaultWeapon) {
      return;
    }
    elms.push({
      type: toe[slotID].type,
      slotID,
      weapon: defaultWeapon,
      experience: 35,
    });
  });

  return elms;
}
