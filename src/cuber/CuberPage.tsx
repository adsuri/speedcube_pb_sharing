import PuzzleList from "../puzzle/PuzzleList";
import { Puzzle } from "../puzzle/Puzzle";
import { Cuber } from "./Cuber";
import { useState } from "react";
import { PUZZLES } from "../CONSTANTS";

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
    let newPuzzles: Puzzle[] = puzzleList.map((p: Puzzle) => {
      return p.name == newPuzzle.name ? newPuzzle : p;
    });

    setPuzzleList(newPuzzles);
  };

  return (
    <>
      <h2>{user.name}</h2>

      <h4>ID: {user.id}</h4>

      <PuzzleList puzzles={puzzleList}
        onSave={savePuzzle}/>
    </>
  );
}

export default CuberPage;