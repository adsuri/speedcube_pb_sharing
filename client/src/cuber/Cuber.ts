import { Puzzle, type PuzzleInit } from "../puzzle/Puzzle";

import { PUZZLES } from "../CONSTANTS";

export interface CuberInit {
  publicId?: string;
  name?: string;
  pictureURL?: string;
  puzzles: Record<string, PuzzleInit | null>
}

export class Cuber {
  publicId: string;
  name: string | null;
  pictureURL: string | null;
  puzzles: Record<string, Puzzle | null> = {};

  constructor(initializer: CuberInit) {
    if (!initializer) throw new Error("Provide a Cuber initializer...");

    this.publicId = initializer.publicId ?? crypto.randomUUID();
    this.name = initializer.name ?? null;
    this.pictureURL = initializer.pictureURL ?? null;

    const initialPuzzles: Record<string, PuzzleInit | null> = initializer.puzzles ?? {};

    for (const puzzle of PUZZLES) {
      const puzzleData: PuzzleInit | null = initialPuzzles[puzzle];
      
      this.puzzles[puzzle] = puzzleData == null
        ? null
        : new Puzzle(puzzleData); 
    }
  }
}