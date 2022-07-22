import { atom, selector } from "recoil";
import { forIn } from "lodash";
import { ICity, CityTable, TEdges } from "../engine/main_map";
import core from "../maps/core.json";
import { IPos } from "../engine/hex";

export interface IMainMap {
  cityTable: CityTable;
  citySelected: string;
  bSlotSelected: IPos | null;
}

export const mainMapStore = atom<IMainMap>({
  key: "main_map_v1",
  default: {
    cityTable: core.cityTable as CityTable,
    citySelected: "",
    bSlotSelected: null,
  },
});

export const getCityList = selector<ICity[]>({
  key: "city_list_v1",
  get: ({ get }) => {
    const { cityTable } = get(mainMapStore);

    return Object.values(cityTable);
  },
});

export const getCurrentCity = selector<ICity | null>({
  key: "current_city_v1",
  get: ({ get }) => {
    const { cityTable, citySelected } = get(mainMapStore);

    return cityTable[citySelected];
  },
});
