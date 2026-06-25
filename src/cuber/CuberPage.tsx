import PuzzleList from "../puzzle/PuzzleList";
import { Puzzle } from "../puzzle/Puzzle";
import { Cuber } from "./Cuber";
import { useState } from "react";
import { CATEGORIES, PUZZLES } from "../CONSTANTS";

export interface CuberPageProps {
  user: Cuber
};

function CuberPage(
  { user: initialUser }: CuberPageProps
) {
  const [user, setUser] = useState<Cuber>(initialUser);

  const puzzleList: Puzzle[] = PUZZLES.map((p) => user.puzzles[p])
    .filter((p): p is Puzzle => p != null);

  const savePuzzleAllowEmpty = (newPuzzle: Puzzle): void => {
    setUser((prev) => ({
      ...prev,
      puzzles: {
        ...prev.puzzles,
        [newPuzzle.name]: newPuzzle
      }
    })); 
  };

  const savePuzzle = (newPuzzle: Puzzle): void => {
    setUser((prev) => {
      const nextPuzzles = { ...prev.puzzles };

      const hasAnyCategory = CATEGORIES.some(
        (c) => newPuzzle.records[c] != null
      );

      if (hasAnyCategory) {
        nextPuzzles[newPuzzle.name] = newPuzzle;
      } else {
        nextPuzzles[newPuzzle.name] = null;
      }

      return {
        ...prev,
        puzzles: nextPuzzles
      };
    });
  };

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>ID: {user.id}</h4>

      <PuzzleList puzzles={puzzleList}
        onSave={savePuzzle}
        onSaveAllowEmpty={savePuzzleAllowEmpty} />
    </div>
  );
}

export default CuberPage;