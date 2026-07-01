import { Puzzle, type PuzzleInit } from "../puzzle/Puzzle";

import { PUZZLES } from "../CONSTANTS";

export interface CuberInit {
  id?: string;
  name?: string;
  email?: string;
  pictureURL?: string;
  puzzles: Record<string, PuzzleInit | null>
}

export class Cuber {
  id: string = crypto.randomUUID();
  name: string | null;
  email: string | null;
  pictureURL: string | null;
  puzzles: Record<string, Puzzle | null> = {};

  constructor(initializer: CuberInit) {
    if (!initializer) throw new Error("Provide a Cuber initializer...");
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) { this.name = initializer.name; }
      else { this.name = null; }
    if (initializer.email) { this.email = initializer.email; }
      else { this.email = null; }
    if (initializer.pictureURL) { this.pictureURL = initializer.pictureURL; }
      else { this.pictureURL = null; }

    const puzzles: Record<string, PuzzleInit | null> = initializer.puzzles ?? {};

    for (const puzzle of PUZZLES) {
      const puzzleData: PuzzleInit | null = puzzles[puzzle];
      
      this.puzzles[puzzle] = puzzleData == null
        ? null
        : new Puzzle(puzzleData); 
    }
  }
}