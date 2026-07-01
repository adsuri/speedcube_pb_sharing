import { Puzzle, type PuzzleInit } from "../puzzle/Puzzle";

import { PUZZLES } from "../CONSTANTS";

export interface CuberInit {
  id?: string;
  publicId?: string;
  name?: string;
  email?: string;
  pictureURL?: string;
  puzzles: Record<string, PuzzleInit | null>
}

export class Cuber {
  id: string;
  publicId: string;
  name: string | null;
  email: string | null;
  pictureURL: string | null;
  puzzles: Record<string, Puzzle | null> = {};

  constructor(initializer: CuberInit) {
    if (!initializer) throw new Error("Provide a Cuber initializer...");

    this.id = initializer.id ?? crypto.randomUUID();
    this.publicId = initializer.publicId ?? crypto.randomUUID();
    this.name = initializer.name ?? null;
    this.email = initializer.email ?? null;
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