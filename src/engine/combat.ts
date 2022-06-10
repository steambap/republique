import { produce } from "immer";
import { IUnit, UnitTable } from "./unit";
import { TerrainTile } from "./map_definition";
import { IElement, weapons } from "./elements";
import { getMaxHP, getSlotMultiplier } from "./toe";
import { clamp } from "../util";

const phases = 14;
const minHitChance = 2;
const maxHitChance = 90;
const minFront = 3;
const fireCoh = 0;
const getHitCoh = 1.5;
type TDamageRow = [number, number, number];
const damageTable: TDamageRow[] = [
  [2, 10, 18],
  [7, 15, 8],
  [21, 6, 3],
];

export interface IBattleResult {
  result: number;
  attackerTable: UnitTable;
  attackerLoss: number;
  attackerDisabled: number;
  defenderTable: UnitTable;
  defenderLoss: number;
  defenderDisabled: number;
  log: string[];
}

export interface IHit {
  attacker: IElement;
  defender: IElement;
}

function rnd(n: number): number {
  return Math.floor(Math.random() * n);
}

function dice(n: number): number {
  return rnd(n) + 1;
}

// 0 -> draw 1,-1 -> attacker/defender route 2,-2 attacker/defender shatter
function tryEndBattle(attackMain: IUnit, defenderMain: IUnit): number {
  if (attackMain.cohesion <= 0) {
    return 1;
  } else if (defenderMain.cohesion <= 0) {
    return -1;
  } else {
    return 0;
  }
}

function getFiringElms(unitTable: UnitTable): IElement[] {
  const elms: IElement[] = [];
  for (let id in unitTable) {
    const unit = unitTable[id];
    if (unit.cohesion <= 0) {
      continue;
    }
    unit.elements.forEach((elm) => {
      if (elm.type !== "logistic" && elm.type !== "ambulance") {
        elms.push(elm);
      }
    });
  }

  return elms;
}

function getFiringElmsAtRange(unitTable: UnitTable, range: number): IElement[] {
  const elms = getFiringElms(unitTable);
  const elmsInRange = elms.filter((elm) => {
    const weaponData = weapons[elm.weaponID];

    return weaponData.range >= range;
  });

  return elmsInRange;
}

function getTargetElms(unitTable: UnitTable): IElement[] {
  const combatTarget: IElement[] = [];
  const suppportTarget: IElement[] = [];
  for (let id in unitTable) {
    const unit = unitTable[id];
    unit.elements.forEach((elm) => {
      if (elm.hp <= 0) {
        return;
      }
      if (elm.type === "logistic" || elm.type === "ambulance") {
        suppportTarget.push(elm);
      } else {
        combatTarget.push(elm);
      }
    });
  }

  if (combatTarget.length >= minFront) {
    return combatTarget;
  } else {
    return [...combatTarget, ...suppportTarget];
  }
}

function getRndElement(elms: IElement[]): IElement {
  const arr: number[][] = elms.map((elm, idx): number[] => {
    let weightFac = 1;
    if (
      elm.type === "artillery" ||
      elm.type === "logistic" ||
      elm.type === "ambulance"
    ) {
      weightFac = 0.35;
    }
    const weight = Math.ceil(elm.hp * weightFac);

    return Array(weight).fill(idx);
  });
  const concatArr: number[] = arr.flat(1);
  const index = concatArr[rnd(concatArr.length)];

  return elms[index];
}

function generateHits(
  attackerTable: UnitTable,
  defenderTable: UnitTable,
  attTerrain: TerrainTile,
  defTerrain: TerrainTile,
  range: number,
  isDefenderFire: boolean
): IHit[] {
  const attElements: IElement[] = getFiringElmsAtRange(attackerTable, range);
  const defTargets: IElement[] = getTargetElms(defenderTable);
  const hits: IHit[] = [];

  for (let i = 0; i < attElements.length; i++) {
    const element = attElements[i];
    const unit = attackerTable[element.unitID];
    const enemyElm = getRndElement(defTargets);
    const weapon = weapons[element.weaponID];
    const rfp = range > 0 ? weapon.fire : weapon.shock;
    // Troop quality
    const tqm = unit.moral / 15;
    // Cohesion
    const missingCohPercent =
      (unit.maxCohesion - unit.cohesion) / unit.maxCohesion;
    let cm = 1 - missingCohPercent * 0.25;
    if (unit.cohesion === 0) {
      cm = 0;
    }
    // Hitpoint
    let hm = 1;
    const hpPercent = element.hp / getMaxHP(unit.currentTOE, element.slotID);
    if (hpPercent < 0.5) {
      hm = 0.75;
    } else if (hpPercent < 0.25) {
      hm = 0.5;
    }
    // Terrain
    let wtm = 1;
    if (!isDefenderFire && defTerrain.terrain === 0) {
      wtm = 0.8;
    }
    if (isDefenderFire && attTerrain.terrain === 1) {
      wtm = 1.05;
    }
    // Elavation
    let em = 1;
    if (isDefenderFire && attTerrain.elavation > defTerrain.elavation) {
      em = 1 + (attTerrain.elavation - defTerrain.elavation) * 0.2;
    }

    const hitChance = Math.round(rfp * tqm * cm * hm * wtm * em);
    let rof = 1;
    if (range === weapon.range) {
      rof = weapon.rof;
    }
    if (weapon.rangeOnly && range === 0) {
      rof = 0;
    }

    rof *= getSlotMultiplier(unit.currentTOE, element.slotID);

    for (let i = 0; i < rof; i++) {
      const chance = clamp(hitChance, minHitChance, maxHitChance);
      if (dice(100) < chance) {
        // It's a hit
        hits.push({
          attacker: Object.assign({}, element),
          defender: Object.assign({}, enemyElm),
        });
      }
    }
  }

  return hits;
}

function updateUnitsForHits(unitTable: UnitTable, hits: IHit[]) {
  const ids = new Set<string>();
  hits.forEach((hit) => {
    const { attacker } = hit;
    const { unitID } = attacker;
    const unit = unitTable[unitID];
    const { moral } = unit;

    ids.add(unitID);
    let shouldIncExp = false;
    if (attacker.experience < moral) {
      if (dice(10) <= (moral - attacker.experience + 1)) {
        shouldIncExp = true;
      }
    }
    if (shouldIncExp) {
      const updatedUnit = produce(unit, (draft) => {
        draft.elements.forEach((elm) => {
          if (elm.slotID === attacker.slotID) {
            elm.experience += 1;
          }
        });
      });
      unitTable[unitID] = updatedUnit;
    }
  });

  ids.forEach((id) => {
    const unit = produce(unitTable[id], (draft) => {
      draft.cohesion -= fireCoh;
      if (draft.cohesion < 0) {
        draft.cohesion = 0;
      }
    });
    unitTable[id] = unit;
  });
}

function receiveHits(
  unitTable: UnitTable,
  hits: IHit[],
  range: number
): [number, number] {
  let totalDisabled = 0;
  let totalKilled = 0;
  hits.forEach((hit) => {
    const weapon = weapons[hit.attacker.weaponID];
    const dmgRow = damageTable[range];
    const dmgBase = weapon.damage;
    const { attacker ,defender } = hit;
    const defExp = (defender.experience - 20) / 100;
    const em = 0.5 * (1 - defExp);
    const wound = rnd(dmgRow[0] * dmgBase * em);
    const disabled = rnd(dmgRow[1] * dmgBase * em);
    const killed = rnd(dmgRow[2] * dmgBase * em);
    const unit = produce(unitTable[defender.unitID], (draft) => {
      draft.cohesion -= getHitCoh * attacker.experience / 50;
      if (draft.cohesion < 0) {
        draft.cohesion = 0;
      }
      draft.elements.forEach((elm) => {
        if (elm.slotID === defender.slotID) {
          totalDisabled = wound + disabled;
          totalKilled = killed;
          elm.hp -= wound + disabled + killed;
        }
      });
    });
    unitTable[defender.unitID] = unit;
  });

  return [totalDisabled, totalKilled];
}

export function battle(
  attackers: IUnit[],
  defenders: IUnit[],
  attTerrain: TerrainTile,
  defTerrain: TerrainTile
): IBattleResult {
  let result = 0;
  const attackerTable: UnitTable = {};
  let attackerLoss = 0;
  let attackerDisabled = 0;
  const defenderTable: UnitTable = {};
  let defenderLoss = 0;
  let defenderDisabled = 0;
  const log: string[] = [];

  attackers.forEach((unit) => {
    attackerTable[unit.id] = unit;
  });
  defenders.forEach((unit) => {
    defenderTable[unit.id] = unit;
  });

  let range = 2;
  for (let i = 0; i < phases; i++) {
    if (range === -1) {
      range = 2;
    }
    log.push(`Day ${i + 1} start range at ${range}`);
    // Generate hits
    const attackerHits = generateHits(
      attackerTable,
      defenderTable,
      attTerrain,
      defTerrain,
      range,
      false
    );
    const defenderHits = generateHits(
      defenderTable,
      attackerTable,
      defTerrain,
      attTerrain,
      range,
      true
    );
    // Apply hits
    updateUnitsForHits(attackerTable, attackerHits);
    updateUnitsForHits(defenderTable, defenderHits);

    const [defDisabled, defKilled] = receiveHits(
      defenderTable,
      attackerHits,
      range
    );
    defenderDisabled += defDisabled;
    defenderLoss += defKilled;
    log.push(
      `Day ${
        i + 1
      } defender loss: ${defDisabled} disabled / ${defKilled} killed`
    );
    const [attDisable, attKilled] = receiveHits(
      attackerTable,
      defenderHits,
      range
    );
    attackerDisabled += attDisable;
    attackerLoss += attKilled;
    log.push(
      `Day ${i + 1} attacker loss: ${attDisable} disabled / ${attKilled} killed`
    );
    // Get closer
    range -= 1;
    result = tryEndBattle(attackerTable[attackers[0].id], defenderTable[defenders[0].id]);
    // End battle if one side routes
    if (result !== 0) {
      log.push(
        `${result === 1 ? "Attacker" : "Defender"} routes in day ${i + 1}`
      );
      break;
    }
  }

  return {
    result,
    attackerTable,
    attackerLoss,
    attackerDisabled,
    defenderTable,
    defenderLoss,
    defenderDisabled,
    log,
  };
}
