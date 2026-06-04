export class PBest {
  score: number | [number, number];
  setOn: Date = new Date();
  setInComp: boolean = false;

  constructor(initializer?: any) {
    if (!initializer) throw new Error("Provide a PBest initializer...");
    if (!initializer.score) throw new Error("Provide a time or score for a PBest...");

    if (typeof initializer.score === "number") {
      this.score = initializer.score;
    }
    else if (
      Array.isArray(initializer.score) &&
      initializer.score.length === 2 &&
      typeof initializer.score[0] === "number" &&
      typeof initializer.score[1] === "number"
    ) {
      this.score = [initializer.score[0], initializer.score[1]];
    } else {
      throw new Error("Provide a valid score for a PBest...");
    }

    if (initializer.setOn) this.setOn = initializer.setOn;
    if (initializer.setInComp) this.setInComp = initializer.setInComp;
  }
}