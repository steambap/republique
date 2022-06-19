import { atom, selector } from "recoil";
import { forIn } from "lodash";
import { ICity, CityTable, TEdges } from "../engine/main_map";
import core from "../maps/core.json";

const { cityTable, edges } = core;

export interface IMainMap {
  cityTable: CityTable;
  edges: TEdges;
  citySelected: string;
}

export const mainMapStore = atom<IMainMap>({
  key: "main_map",
  default: {
    cityTable,
    edges,
    citySelected: "",
  },
});

export const getCityList = selector<ICity[]>({
  key: "city_list",
  get: ({ get }) => {
    const { cityTable } = get(mainMapStore);

    return Object.values(cityTable);
  },
});

export const getCurrentCity = selector<ICity | null>({
  key: "current_city",
  get: ({ get }) => {
    const { cityTable, citySelected } = get(mainMapStore);

    return cityTable[citySelected];
  },
});

export const getRoadList = selector<number[][]>({
  key: "road_list",
  get: ({ get }) => {
    const { cityTable, edges } = get(mainMapStore);
    const roadList: number[][] = [];
    forIn(edges, (connData, key) => {
      const city1 = cityTable[key];
      const x1 = city1.posX;
      const y1 = city1.posY;

      forIn(connData, (_, cityName) => {
        const city2 = cityTable[cityName];
        const x2 = city2.posX;
        const y2 = city2.posY;

        roadList.push([x1, y1, x2, y2]);
      });
    });

    return roadList;
  },
});
