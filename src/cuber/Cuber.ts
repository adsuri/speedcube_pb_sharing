import { Puzzle, type PuzzleInit } from "../puzzle/Puzzle";
import { PUZZLES } from "../CONSTANTS";

export interface CuberInit {
  id?: string;
  name?: string;
  email?: string;
  pictureURL?: string;
  puzzles?: Record<string, PuzzleInit | null>
}

export class Cuber {
  id: string = crypto.randomUUID();
  name: string = "";
  email: string = "";
  pictureURL: string = "";
  puzzles: Record<string, Puzzle | null> = {};

  constructor(initializer: CuberInit) {
    if (!initializer) throw new Error("Provide a Cuber initializer...");
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.email) this.email = initializer.email;
    if (initializer.pictureURL) this.pictureURL = initializer.pictureURL;

    const puzzles = initializer.puzzles ?? {};

    for (const puzzle of PUZZLES) {
      const puzzleData = puzzles[puzzle];
      
      this.puzzles[puzzle] = puzzleData == null
        ? null
        : new Puzzle(puzzleData); 
    }
  }
}