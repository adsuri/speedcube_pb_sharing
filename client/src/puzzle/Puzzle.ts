import { PBest, type PBestInit } from "./PBest"

import { CATEGORIES } from "../CONSTANTS";

export interface PuzzleInit {
  name: string;
  currMain?: string;
  records?: Record<string, PBestInit | null>;
}

export class Puzzle {
  name: string;
  currMain: string | null = "";
  records: Record<string, PBest | null> = {};

  constructor(initializer: PuzzleInit) {
    if (!initializer) throw new Error("Provide a Puzzle initializer...");
    this.name = initializer.name;
    if (initializer.currMain) { this.currMain = initializer.currMain; }
      else { this.currMain = null; }

    const init_records: Record<string, PBestInit | null> = initializer.records ?? {};

    for (const category of CATEGORIES) {
      const record: PBestInit | null = init_records[category];
      
      this.records[category] = record == null
        ? null
        : new PBest(record); 
    }
  }
}