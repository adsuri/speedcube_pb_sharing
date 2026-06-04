import { PBest } from "./PBest"

export class Puzzle {
  id: string;
  currMain: string | undefined;
  single: PBest | undefined;
  mo3: PBest | undefined;
  ao5: PBest | undefined;
  ao12: PBest | undefined;
  ao25: PBest | undefined;
  ao50: PBest | undefined;
  ao100: PBest | undefined;

  constructor(initializer?: any) {
    let valid_ids: string[] = [
      "222", "333", "444", "555", "666", "777",
      "3bld", "4bld", "5bld", "mbld", "skewb", "squan",
      "pyra", "mega", "fmc", "clock", "oh"
    ];

    if (!initializer) throw new Error("Provide a Puzzle initializer...");
    if (!initializer.id) throw new Error("Provide a Puzzle id...")

    if (initializer.id in valid_ids) {
      this.id = initializer.id;
    } else {
      throw new Error("Provide a valid id for a Puzzle...")
    }

    if (initializer.currMain) this.currMain = initializer.currMain;
    if (initializer.single) this.single = initializer.single;
    if (initializer.mo3) this.mo3 = initializer.mo3;
    if (initializer.ao5) this.ao5 = initializer.ao5;
    if (initializer.ao12) this.ao12 = initializer.ao12;
    if (initializer.ao25) this.ao25 = initializer.ao25;
    if (initializer.ao50) this.ao50 = initializer.ao50;
    if (initializer.ao100) this.ao100 = initializer.ao100;
  }
}