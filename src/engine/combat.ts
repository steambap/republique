export interface IOrgDamage {
  min: number;
  max: number;
}

export const combatOrgResultTable = new Map<number, IOrgDamage>();
combatOrgResultTable.set(8, { min: 5, max: 15 });
combatOrgResultTable.set(7, { min: 5, max: 18 });
combatOrgResultTable.set(6, { min: 5, max: 20 });
combatOrgResultTable.set(5, { min: 5, max: 23 });
combatOrgResultTable.set(4, { min: 5, max: 25 });
combatOrgResultTable.set(3, { min: 7, max: 25 });
combatOrgResultTable.set(2, { min: 9, max: 25 });
combatOrgResultTable.set(1, { min: 11, max: 25 });
combatOrgResultTable.set(0, { min: 12, max: 28 });
combatOrgResultTable.set(-1, { min: 15, max: 30 });
combatOrgResultTable.set(-2, { min: 19, max: 32 });
combatOrgResultTable.set(-3, { min: 22, max: 33 });
combatOrgResultTable.set(-4, { min: 25, max: 35 });
combatOrgResultTable.set(-5, { min: 28, max: 39 });
combatOrgResultTable.set(-6, { min: 30, max: 42 });
combatOrgResultTable.set(-7, { min: 34, max: 46 });
combatOrgResultTable.set(-8, { min: 37, max: 51 });
combatOrgResultTable.set(-9, { min: 40, max: 55 });
combatOrgResultTable.set(-10, { min: 43, max: 58 });
combatOrgResultTable.set(-11, { min: 46, max: 62 });
combatOrgResultTable.set(-12, { min: 49, max: 66 });
combatOrgResultTable.set(-13, { min: 53, max: 72 });
combatOrgResultTable.set(-14, { min: 65, max: 85 });
combatOrgResultTable.set(-15, { min: 80, max: 100 });
combatOrgResultTable.set(-16, { min: 100, max: 120 });
