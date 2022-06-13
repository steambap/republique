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

export const mainMapState = atom<IMainMap>({
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
    const { cityTable } = get(mainMapState);

    return Object.values(cityTable);
  },
});

export const getCurrentCity = selector<ICity | null>({
  key: "current_city",
  get: ({ get }) => {
    const { cityTable, citySelected } = get(mainMapState);

    return cityTable[citySelected];
  },
});

export const getRoadList = selector<number[][]>({
  key: "road_list",
  get: ({ get }) => {
    const { cityTable, edges } = get(mainMapState);
    const roadList: number[][] = [];
    forIn(edges, (connData, key) => {
      const city1 = cityTable[key];
      const x1 = city1.posX;
      const y1 = city1.posY;

      forIn(connData, (_, cityName) => {
        const city2 = cityTable[cityName];
        const x2 = city2.posX;
        const y2 = city2.posY;
        const xa = Math.round((x1 + x2 + 10) / 2);
        const ya = Math.round((y1 + y2 - 10) / 2);

        roadList.push([x1, y1, xa, ya, x2, y2]);
      });
    });

    return roadList;
  },
});
