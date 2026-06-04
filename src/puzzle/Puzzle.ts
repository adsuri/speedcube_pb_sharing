import { PBest, type PBestInit } from "./PBest"
import { CATEGORIES } from "../CONSTANTS";

export interface PuzzleInit {
  currMain?: string;
  records?: Record<string, PBestInit | null>;
}

export class Puzzle {
  currMain: string = "";
  records: Record<string, PBest | null> = {};

  constructor(initializer?: PuzzleInit) {
    if (!initializer) throw new Error("Provide a Puzzle initializer...");
    if (initializer.currMain) this.currMain = initializer.currMain;
    
    const records = initializer.records ?? {};

    for (const category of CATEGORIES) {
      const record = records[category];
      
      this.records[category] = record == null
        ? null
        : new PBest(record); 
    }
  }
}