import { Puzzle } from "../puzzle/Puzzle";
import { PBest } from "../puzzle/PBest";

export class Cuber {
  id: number = 0;
  name: string = "";
  email: string = "";
  pictureUrl: string = "";
  puzzles: Record<string, Puzzle | null> = {};

  constructor(initializer?: any) {
    if (!initializer) throw new Error("Provide a Cuber initializer...");
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.email) this.email = initializer.email;
    if (initializer.pictureUrl) this.pictureUrl = initializer.pictureUrl;

    let valid_puzzles: string[] = [
      "222", "333", "444", "555", "666", "777",
      "3bld", "4bld", "5bld", "mbld", "skewb", "squan",
      "pyra", "mega", "fmc", "clock", "oh"
    ];

    for (const puzzle of valid_puzzles) {
      if (puzzle in initializer.puzzles) {
        this.puzzles[puzzle] = initializer.puzzles[puzzle];
      } else {
        this.puzzles[puzzle] = null;
      }
    }
  }
}