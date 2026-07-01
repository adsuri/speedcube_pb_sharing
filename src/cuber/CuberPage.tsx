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

  const handleSavePuzzleAllowEmpty = (newPuzzle: Puzzle): void => {
    setUser((prev) => ({
      ...prev,
      puzzles: {
        ...prev.puzzles,
        [newPuzzle.name]: newPuzzle
      }
    })); 
  };

  const handleSavePuzzle = (newPuzzle: Puzzle): void => {
    setUser((prev) => {
      const tempPuzzles: Record<string, Puzzle | null> = prev.puzzles;

      const hasAnyCategory: boolean = CATEGORIES.some(
        (c) => newPuzzle.records[c] != null
      );

      if (hasAnyCategory) {
        tempPuzzles[newPuzzle.name] = newPuzzle;
      } else {
        tempPuzzles[newPuzzle.name] = null;
      }

      return {
        ...prev,
        puzzles: tempPuzzles
      };
    });
  };

  const handleDelete = (p: Puzzle): void => {
    setUser((prev) => ({
      ...prev,
      puzzles: {
        ...prev.puzzles,
        [p.name]: null
      }
    }));
  };

  return (
    <div className="cuberpage">
      <h2>{user.name}</h2>
      <h4>ID: {user.id}</h4>

      <PuzzleList puzzles={puzzleList}
        onSave={handleSavePuzzle}
        onSaveAllowEmpty={handleSavePuzzleAllowEmpty}
        onDelete={handleDelete} />
    </div>
  );
}

export default CuberPage;