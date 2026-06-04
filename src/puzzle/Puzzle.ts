import { PBest } from "./PBest"

export class Puzzle {
  currMain: string = "";
  bests: Record<string, PBest | null> = {};

  constructor(initializer?: any) {
    if (!initializer) throw new Error("Provide a Puzzle initializer...");
    if (initializer.currMain) this.currMain = initializer.currMain;
    if (!initializer.bests) throw new Error("Provide scores for a Puzzle...");

    let categories: string[] = [
      "single", "mo3", "ao5", "ao12", "ao25", "ao50", "ao100"
    ]

    for (const category of categories) {
      if (category in initializer.bests) {
        this.bests[category] = initializer.bests[category];
      } else {
        this.bests[category] = null;
      }
    }
  }
}