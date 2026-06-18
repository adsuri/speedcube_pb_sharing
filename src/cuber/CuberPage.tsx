import PuzzleList from "../puzzle/PuzzleList";
import { Puzzle } from "../puzzle/Puzzle";
import { Cuber } from "./Cuber";

export interface CuberPageProps {
  user: Cuber
};

function CuberPage(
  { user }: CuberPageProps
) {
  let puzzleList: Puzzle[] = [];

  Object.entries(user.puzzles).map((puzzle) => {
    if (puzzle[1] == null) {
      return;
    } else {
      puzzleList.push(puzzle[1]);
    }
  });

  const savePuzzle = (p: Puzzle) => {
    // save puzzle to puzzleList
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