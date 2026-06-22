import PuzzleList from "../puzzle/PuzzleList";
import { Puzzle } from "../puzzle/Puzzle";
import { Cuber } from "./Cuber";
import { useState } from "react";
import { CATEGORIES, PUZZLES } from "../CONSTANTS";

export interface CuberPageProps {
  user: Cuber
};

function CuberPage(
  { user }: CuberPageProps
) {
  

  const [puzzleList, setPuzzleList] = useState<(Puzzle)[]>(
    (() => {
      let tempPuzzles: Puzzle[] = [];

      for (const p of PUZZLES) {
        if (user.puzzles[p] != null) {
          tempPuzzles.push(user.puzzles[p]);
        }
      }

      return tempPuzzles;
    })()
  );

  const savePuzzle = (newPuzzle: Puzzle) => {
    let tempPuzzles: Puzzle[] = [];

    for (const oldPuzzle of puzzleList) {
      if (oldPuzzle.name == newPuzzle.name) {
        let hasAnyCategory: boolean = false;

        for (const category of CATEGORIES) {
          if (newPuzzle.records[category] != null) {
            hasAnyCategory = true;
          }
        }

        if (hasAnyCategory) tempPuzzles.push(newPuzzle);
      } else {
        tempPuzzles.push(oldPuzzle);
      }
    }

    setPuzzleList(tempPuzzles);
  };

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>ID: {user.id}</h4>

      <PuzzleList puzzles={puzzleList}
        onSave={savePuzzle}/>
    </div>
  );
}

export default CuberPage;