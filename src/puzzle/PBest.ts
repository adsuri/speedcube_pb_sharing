export interface PBestInit {
  score: number | [number, number];
  setOn?: Date;
  setInComp?: boolean;
  cubeUsed?: string;
}

export class PBest {
  score: number | [number, number];
  setOn: Date = new Date();
  setInComp: boolean = false;
  cubeUsed: string = "";

  constructor(initializer?: PBestInit) {
    if (!initializer) throw new Error("Provide a PBest initializer...");
    if (initializer.score == null) throw new Error("Provide a score for a PBest...");

    this.score = initializer.score;
    if (initializer.setOn) this.setOn = initializer.setOn;
    if (initializer.setInComp) this.setInComp = initializer.setInComp;
    if (initializer.cubeUsed) this.cubeUsed = initializer.cubeUsed;
  }
}